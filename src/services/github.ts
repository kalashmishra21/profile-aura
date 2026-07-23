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
    const [user, repos, contributions, streak] = await Promise.all([
      this.fetchUserProfile(),
      this.fetchRepositories(),
      this.fetchContributions(),
      this.fetchStreakData(),
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
      bio: user.bio || '',
      avatarUrl: user.avatar_url,
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
   */
  private async fetchContributions(): Promise<{
    totalContributions: number;
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
  }> {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
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
      });

      const collection = result.user.contributionsCollection;

      return {
        totalContributions: collection.contributionCalendar.totalContributions,
        totalCommits: collection.totalCommitContributions,
        totalPRs: collection.totalPullRequestContributions,
        totalIssues: collection.totalIssueContributions,
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
   */
  private async fetchStreakData(): Promise<StreakData> {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
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
      });

      const calendar = result.user.contributionsCollection.contributionCalendar;
      const days: Array<{ date: string; count: number }> = [];

      for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
          days.push({
            date: day.date,
            count: day.contributionCount,
          });
        }
      }

      // Sort by date
      days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Calculate current streak (counting backwards from today)
      let currentStreak = 0;
      for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].count > 0) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Calculate longest streak
      let longestStreak = 0;
      let tempStreak = 0;

      for (const day of days) {
        if (day.count > 0) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      const contributionDays = days.filter(d => d.count > 0);
      const firstContribution = contributionDays[0]?.date || days[0]?.date || '';
      const lastContribution = contributionDays[contributionDays.length - 1]?.date || days[days.length - 1]?.date || '';

      return {
        current: currentStreak,
        longest: longestStreak,
        totalContributions: calendar.totalContributions,
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
   * Calculate language statistics from repositories
   */
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
