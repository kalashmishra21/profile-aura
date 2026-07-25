/**
 * GitHub API service for fetching user statistics and data
 */

import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import type {
  GitHubStats,
  LanguageStats,
  Repository,
  StreakData,
  CommitActivity,
} from '../types/index.js';

export class GitHubService {
  private octokit: Octokit;
  private graphqlClient: typeof graphql;
  private username: string;

  constructor(username: string, token?: string) {
    this.username = username;
    
    // Debug: Check if token is provided
    if (!token) {
      console.warn('⚠️  WARNING: No GitHub token provided. API rate limit will be 60/hour.');
      console.warn('   Provide a token to increase rate limit to 5000/hour.');
    } else {
      console.log('✅ GitHub token provided (authenticated requests enabled)');
    }
    
    this.octokit = new Octokit({ auth: token });
    this.graphqlClient = graphql.defaults({
      headers: {
        authorization: token ? `token ${token}` : undefined,
      },
    });
  }

  /**
   * Fetch comprehensive GitHub user statistics
   */
  async fetchUserStats(): Promise<GitHubStats> {
    const [user, repos, contributions, streak, techStack] = await Promise.all([
      this.fetchUserProfile(),
      this.fetchRepositories(),
      this.fetchContributions(),
      this.fetchStreakData(),
      this.fetchTechStackCategories(),
    ]);

    const languages = await this.calculateLanguageStats(repos);
    const recentRepos = repos
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
      .map(repo => ({
        name: repo.name,
        description: repo.description || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      username: this.username,
      name: user.name || this.username,
      displayName: user.name || undefined, // Preferred display name
      bio: user.bio || '',
      avatarUrl: user.avatar_url,
      location: user.location || undefined,
      company: user.company || undefined,
      website: user.blog || undefined,
      twitterUsername: user.twitter_username || undefined,
      email: user.email || undefined,
      createdAt: user.created_at,
      totalStars,
      totalForks,
      totalContributions: contributions.totalContributions,
      totalCommits: contributions.totalCommits,
      totalPRs: contributions.totalPRs,
      totalIssues: contributions.totalIssues,
      followers: user.followers,
      following: user.following,
      repositories: user.public_repos,
      languages,
      recentRepos,
      contributionStreak: streak,
      techStack,
    };
  }

  /**
   * Fetch user profile information
   */
  private async fetchUserProfile() {
    const { data } = await this.octokit.users.getByUsername({
      username: this.username,
    });
    return data;
  }

  /**
   * Fetch all user repositories
   */
  private async fetchRepositories() {
    const repos: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const { data } = await this.octokit.repos.listForUser({
        username: this.username,
        per_page: perPage,
        page,
        sort: 'updated',
      });

      if (data.length === 0) break;
      repos.push(...data);
      if (data.length < perPage) break;
      page++;
    }

    return repos;
  }

  /**
   * Fetch contribution statistics using GitHub GraphQL API
   * Fetches LIFETIME data (all years since account creation)
   */
  private async fetchContributions(): Promise<{
    totalContributions: number;
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
  }> {
    try {
      // First get user creation date to calculate years
      const user = await this.fetchUserProfile();
      const createdAt = new Date(user.created_at);
      const currentYear = new Date().getFullYear();
      const startYear = createdAt.getFullYear();
      
      console.log(`📅 Fetching lifetime stats from ${startYear} to ${currentYear}...`);

      // Fetch contributions for each year
      let totalContributions = 0;
      let totalCommits = 0;
      let totalPRs = 0;
      let totalIssues = 0;

      for (let year = startYear; year <= currentYear; year++) {
        const from = `${year}-01-01T00:00:00Z`;
        const to = year === currentYear 
          ? new Date().toISOString() 
          : `${year}-12-31T23:59:59Z`;

        try {
          const query = `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
                    totalContributions
                  }
                  totalCommitContributions
                  totalPullRequestContributions
                  totalIssueContributions
                }
              }
            }
          `;

          const result: any = await this.graphqlClient(query, {
            username: this.username,
            from,
            to,
          });

          const collection = result.user.contributionsCollection;
          
          totalContributions += collection.contributionCalendar.totalContributions;
          totalCommits += collection.totalCommitContributions;
          totalPRs += collection.totalPullRequestContributions;
          totalIssues += collection.totalIssueContributions;

          console.log(`  ✅ Year ${year}: ${collection.contributionCalendar.totalContributions} contributions`);
        } catch (error) {
          console.warn(`  ⚠️  Failed to fetch ${year} data, skipping...`);
        }
      }

      console.log(`✅ Lifetime totals: ${totalContributions} contributions, ${totalCommits} commits, ${totalPRs} PRs, ${totalIssues} issues`);

      return {
        totalContributions,
        totalCommits,
        totalPRs,
        totalIssues,
      };
    } catch (error) {
      console.warn('Failed to fetch contributions, using fallback values');
      return {
        totalContributions: 0,
        totalCommits: 0,
        totalPRs: 0,
        totalIssues: 0,
      };
    }
  }

  /**
   * Calculate streak data from contribution calendar
   * Fetches ALL years to calculate accurate longest streak
   */
  private async fetchStreakData(): Promise<StreakData> {
    try {
      // Get user creation date
      const user = await this.fetchUserProfile();
      const createdAt = new Date(user.created_at);
      const currentYear = new Date().getFullYear();
      const startYear = createdAt.getFullYear();
      
      console.log(`📊 Calculating streaks from ${startYear} to ${currentYear}...`);

      // Collect ALL contribution days across all years
      const allDays: Array<{ date: string; count: number }> = [];

      for (let year = startYear; year <= currentYear; year++) {
        const from = `${year}-01-01T00:00:00Z`;
        const to = year === currentYear 
          ? new Date().toISOString() 
          : `${year}-12-31T23:59:59Z`;

        try {
          const query = `
            query($username: String!, $from: DateTime!, $to: DateTime!) {
              user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `;

          const result: any = await this.graphqlClient(query, {
            username: this.username,
            from,
            to,
          });

          const calendar = result.user.contributionsCollection.contributionCalendar;
          
          for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
              allDays.push({
                date: day.date,
                count: day.contributionCount,
              });
            }
          }
        } catch (error) {
          console.warn(`  ⚠️  Failed to fetch ${year} streak data, skipping...`);
        }
      }

      // Sort by date
      allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      console.log(`  📅 Analyzing ${allDays.length} days of contribution history...`);

      // Calculate current streak (counting backwards from today)
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Start from the most recent day and count backwards
      for (let i = allDays.length - 1; i >= 0; i--) {
        const dayDate = new Date(allDays[i].date);
        dayDate.setHours(0, 0, 0, 0);
        
        // Check if this day or yesterday has contributions
        const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (allDays[i].count > 0) {
          // Only count if it's today or consecutive days
          if (currentStreak === 0 && daysDiff > 1) {
            // If current streak is 0 and this contribution is more than 1 day old, skip
            break;
          }
          currentStreak++;
        } else if (currentStreak > 0) {
          // If we've started counting and hit a zero, stop
          break;
        }
      }

      // Calculate longest streak - independent of current streak
      let longestStreak = 0;
      let tempStreak = 0;

      for (const day of allDays) {
        if (day.count > 0) {
          tempStreak++;
          // Update longest if current temp is longer
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
        } else {
          // Reset temp streak on gap
          tempStreak = 0;
        }
      }
      
      // Ensure longest is at least as long as current
      longestStreak = Math.max(longestStreak, currentStreak);

      const contributionDays = allDays.filter(d => d.count > 0);
      const firstContribution = contributionDays[0]?.date || allDays[0]?.date || '';
      const lastContribution = contributionDays[contributionDays.length - 1]?.date || allDays[allDays.length - 1]?.date || '';

      // Calculate total contributions (sum of all contribution counts)
      const totalContributions = allDays.reduce((sum, day) => sum + day.count, 0);

      console.log(`  ✅ Current streak: ${currentStreak} days, Longest: ${longestStreak} days, Total: ${totalContributions} contributions`);

      return {
        current: currentStreak,
        longest: longestStreak,
        totalContributions,
        firstContribution,
        lastContribution,
      };
    } catch (error) {
      console.warn('Failed to fetch streak data, using fallback values');
      return {
        current: 0,
        longest: 0,
        totalContributions: 0,
        firstContribution: new Date().toISOString().split('T')[0],
        lastContribution: new Date().toISOString().split('T')[0],
      };
    }
  }

  /**
   * Fetch tech stack categories from all repositories
   */
  async fetchTechStackCategories(): Promise<{
    languages: string[];
    frameworks: string[];
    others: string[];
  }> {
    try {
      const repos = await this.fetchRepositories();
      const allLanguages = new Set<string>();
      const frameworks = new Set<string>();
      const others = new Set<string>();

      // Fetch languages from each repository
      for (const repo of repos) {
        if (repo.language) {
          allLanguages.add(repo.language);
        }

        // Try to get more detailed language breakdown
        try {
          const languages = await this.octokit.rest.repos.listLanguages({
            owner: this.username,
            repo: repo.name,
          });

          Object.keys(languages.data).forEach(lang => allLanguages.add(lang));
        } catch (error) {
          // Ignore individual repo language fetch errors
        }
      }

      // Categorize technologies
      const languagesList = Array.from(allLanguages);
      
      // Define framework patterns (common frameworks)
      const frameworkPatterns = [
        'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
        'Express', 'Koa', 'Fastify', 'NestJS', 'Django', 'Flask', 
        'FastAPI', 'Spring', 'Laravel', 'Symfony', 'Rails',
        'React Native', 'Flutter', 'Ionic', 'Xamarin',
        'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn'
      ];

      // Define other tools/technologies
      const otherPatterns = [
        'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
        'Git', 'GitHub', 'GitLab', 'Bitbucket',
        'Webpack', 'Vite', 'Parcel', 'Rollup',
        'Jest', 'Cypress', 'Selenium', 'Puppeteer'
      ];

      // Categorize based on repository names, descriptions, and package.json detection
      for (const repo of repos) {
        const repoName = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        const combined = `${repoName} ${description}`;

        // Check for frameworks in repo name/description
        frameworkPatterns.forEach(framework => {
          if (combined.includes(framework.toLowerCase())) {
            frameworks.add(framework);
          }
        });

        // Check for other tools
        otherPatterns.forEach(tool => {
          if (combined.includes(tool.toLowerCase())) {
            others.add(tool);
          }
        });
      }

      // Filter out frameworks and others from languages list
      const pureLanguages = languagesList.filter(lang => 
        !frameworkPatterns.some(fw => fw.toLowerCase().includes(lang.toLowerCase())) &&
        !otherPatterns.some(tool => tool.toLowerCase().includes(lang.toLowerCase()))
      );

      return {
        languages: pureLanguages.slice(0, 8), // Limit to top 8 languages
        frameworks: Array.from(frameworks).slice(0, 6), // Limit to top 6 frameworks  
        others: Array.from(others).slice(0, 4) // Limit to top 4 others
      };
    } catch (error) {
      console.warn('Failed to fetch tech stack categories, using fallback');
      return {
        languages: ['JavaScript', 'TypeScript', 'Python'],
        frameworks: ['React', 'Node.js'],
        others: ['Git', 'Docker']
      };
    }
  }
  private async calculateLanguageStats(repos: any[]): Promise<LanguageStats[]> {
    const languageBytes: Record<string, number> = {};
    const languageColors: Record<string, string> = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      Ruby: '#701516',
      PHP: '#4F5D95',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Vue: '#41b883',
      Svelte: '#ff3e00',
    };

    // Fetch language data for each repo (with rate limiting consideration)
    const languagePromises = repos.slice(0, 50).map(async repo => {
      try {
        const { data } = await this.octokit.repos.listLanguages({
          owner: this.username,
          repo: repo.name,
        });
        return data;
      } catch {
        return {};
      }
    });

    const languageData = await Promise.all(languagePromises);

    // Aggregate language bytes
    for (const data of languageData) {
      for (const [lang, bytes] of Object.entries(data)) {
        languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number);
      }
    }

    // Calculate percentages
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);
    const languages: LanguageStats[] = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        percentage: (bytes / totalBytes) * 100,
        color: languageColors[name] || '#858585',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8); // Top 8 languages

    return languages;
  }

  /**
   * Fetch recent commit activity
   */
  async fetchRecentActivity(limit = 10): Promise<CommitActivity[]> {
    try {
      const { data: events } = await this.octokit.activity.listPublicEventsForUser({
        username: this.username,
        per_page: 100,
      });

      const commits: CommitActivity[] = [];

      for (const event of events) {
        if (event.type === 'PushEvent' && (event.payload as any).commits) {
          for (const commit of (event.payload as any).commits.slice(0, 3)) {
            if (commits.length >= limit) break;
            
            commits.push({
              date: event.created_at || '',
              message: commit.message || '',
              repo: event.repo.name,
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
            });
          }
        }
        if (commits.length >= limit) break;
      }

      return commits;
    } catch (error) {
      console.warn('Failed to fetch recent activity');
      return [];
    }
  }
}
