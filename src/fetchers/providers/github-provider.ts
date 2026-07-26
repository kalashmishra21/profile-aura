import { Octokit } from '@octokit/rest';
import { ProfileMetrics, Repository, ContributionStats } from '../../types/domain.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { CacheService } from '../../services/cache.js';
import { Logger } from '../../utils/logger.js';

export interface GitHubProvider {
  fetchMetrics(config: ProfileAuraConfig): Promise<ProfileMetrics>;
}

export class BaseGitHubProvider {
  protected octokit: Octokit;

  constructor(auth?: string) {
    this.octokit = auth ? new Octokit({ auth }) : new Octokit();
  }

  protected async fetchBaseRestUser(username: string): Promise<any> {
    try {
      const res = await this.octokit.rest.users.getByUsername({ username });
      return res.data || {};
    } catch (err: any) {
      Logger.warn(`Failed to fetch REST profile for ${username}: ${err.message}`);
      return {};
    }
  }

  protected async fetchBaseRepos(username: string, type: 'all' | 'owner' = 'owner'): Promise<any[]> {
    try {
      const res = await this.octokit.rest.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 30,
        type
      });
      return res.data || [];
    } catch (err: any) {
      Logger.warn(`Failed to fetch repos for ${username}: ${err.message}`);
      return [];
    }
  }

  protected async fetchAuthenticatedRepos(): Promise<any[]> {
    try {
      const res = await this.octokit.rest.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100,
        visibility: 'all'
      });
      return res.data || [];
    } catch (err: any) {
      Logger.warn(`Failed to fetch authenticated repos: ${err.message}`);
      return [];
    }
  }

  protected async fetchGraphQLStats(username: string): Promise<any> {
    try {
      // 1. Fetch user creation date to know starting year
      const metaQuery = `
        query($login: String!) {
          user(login: $login) {
            createdAt
          }
        }
      `;
      const metaRes: any = await this.octokit.graphql(metaQuery, { login: username });
      const startYear = new Date(metaRes.user.createdAt).getFullYear();
      const currentYear = new Date().getFullYear();
      
      let totalContributions = 0;
      let totalCommits = 0;
      let totalPRs = 0;
      let totalIssues = 0;
      let allDays: any[] = [];
      
      // 2. Fetch contributions for each year
      for (let year = startYear; year <= currentYear; year++) {
        const from = new Date(Date.UTC(year, 0, 1)).toISOString();
        let to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
        if (year === currentYear) {
          to = new Date().toISOString(); // Don't exceed current time
        }
        
        const yearQuery = `
          query userInfo($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
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
                totalCommitContributions
                totalPullRequestContributions
                totalIssueContributions
              }
            }
          }
        `;
        const response: any = await this.octokit.graphql(yearQuery, { login: username, from, to });
        const collection = response.user.contributionsCollection;
        
        totalContributions += collection.contributionCalendar.totalContributions;
        totalCommits += collection.totalCommitContributions;
        totalPRs += collection.totalPullRequestContributions;
        totalIssues += collection.totalIssueContributions;
        
        const days = collection.contributionCalendar.weeks.flatMap((w: any) => w.contributionDays);
        allDays = allDays.concat(days);
      }
      
      // 3. Sort days and calculate streaks across all years
      allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      let longestStreak = 0;
      let tempStreak = 0;
      for (const day of allDays) {
        if (day.contributionCount > 0) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }
      
      const todayStr = new Date().toISOString().split('T')[0];
      const todayIndex = allDays.findIndex((d: any) => d.date.startsWith(todayStr));
      let walkIndex = todayIndex >= 0 ? todayIndex : allDays.length - 1;
      
      if (walkIndex >= 0 && allDays[walkIndex].contributionCount === 0) {
        walkIndex--;
      }
      
      let currentStreak = 0;
      while (walkIndex >= 0 && allDays[walkIndex].contributionCount > 0) {
        currentStreak++;
        walkIndex--;
      }
      
      return {
        totalContributions,
        totalCommits,
        totalPRs,
        totalIssues,
        currentStreak,
        longestStreak
      };
    } catch (err: any) {
      Logger.warn(`Failed to fetch GraphQL stats for ${username}: ${err.message}`);
      return null;
    }
  }

  protected processRepositories(repos: any[]): { mappedRepos: Repository[]; totalStars: number; topLanguages: any[] } {
    let totalStars = 0;
    const langMap: Record<string, { count: number; color: string }> = {};

    const mappedRepos: Repository[] = repos.map((r: any) => {
      totalStars += r.stargazers_count || 0;
      if (r.language) {
        if (!langMap[r.language]) {
          langMap[r.language] = { count: 0, color: '#38BDF8' };
        }
        langMap[r.language].count += 1;
      }
      return {
        name: r.name,
        description: r.description || '',
        url: r.html_url,
        stargazerCount: r.stargazers_count || 0,
        forkCount: r.forks_count || 0,
        primaryLanguage: r.language ? { name: r.language, color: '#38BDF8' } : null,
        isFork: r.fork || false,
        updatedAt: r.updated_at || null,
        license: r.license ? (r.license.spdx_id || r.license.name) : null
      };
    });

    const topLanguages = Object.entries(langMap)
      .map(([name, val]) => ({ name, count: val.count, color: val.color }))
      .sort((a, b) => b.count - a.count);

    return { mappedRepos, totalStars, topLanguages };
  }
}

export class AnonymousGitHubProvider extends BaseGitHubProvider implements GitHubProvider {
  constructor() {
    super(); // Unauthenticated Octokit
  }

  async fetchMetrics(config: ProfileAuraConfig): Promise<ProfileMetrics> {
    const username = config.github.username || config.profile.username || 'octocat';
    Logger.info(`[AnonymousGitHubProvider] Fetching public metrics for @${username} (Web Scraper)...`);

    const restUser = await this.fetchBaseRestUser(username);
    const repos = await this.fetchBaseRepos(username, 'owner');
    const { mappedRepos, totalStars, topLanguages } = this.processRepositories(repos);

    const totalReposCount = restUser.public_repos || repos.length || 0;

    let scrapedTotal = undefined;
    try {
      const response = await fetch(`https://github.com/users/${username}/contributions`);
      if (response.ok) {
        const html = await response.text();
        const match = html.match(/(\d{1,3}(?:,\d{3})*)\s+contributions/i);
        if (match && match[1]) {
          scrapedTotal = parseInt(match[1].replace(/,/g, ''), 10);
        }
      }
    } catch (e) {
      Logger.warn(`Scraping fallback failed: ${e}`);
    }

    const stats: ContributionStats = {
      totalStars,
      totalContributions: scrapedTotal
    };

    return {
      user: {
        name: config.profile.name || restUser.name || username,
        username,
        bio: config.profile.bio || restUser.bio || '',
        company: config.profile.company || restUser.company || '',
        location: config.profile.location || restUser.location || '',
        website: config.profile.website || restUser.blog || '',
        avatarUrl: restUser.avatar_url || `https://github.com/${username}.png`,
        followers: restUser.followers || 0,
        following: restUser.following || 0,
        publicRepos: totalReposCount
      },
      stats,
      repositories: mappedRepos.slice(0, 6),
      topLanguages: topLanguages.slice(0, 6),
      roles: config.profile.roles || ['Software Engineer', 'Open Source Developer'],
      socials: (config.profile.socials as Record<string, string | undefined>) || {}
    };
  }
}

export class AuthenticatedGitHubProvider extends BaseGitHubProvider implements GitHubProvider {
  constructor(token: string) {
    super(token);
  }

  async fetchMetrics(config: ProfileAuraConfig): Promise<ProfileMetrics> {
    const username = config.github.username || config.profile.username || 'octocat';
    Logger.info(`[AuthenticatedGitHubProvider] Fetching authenticated metrics for @${username}...`);

    const restUser = await this.fetchBaseRestUser(username);
    const repos = await this.fetchBaseRepos(username, 'owner');
    const { mappedRepos, totalStars, topLanguages } = this.processRepositories(repos);
    const totalReposCount = restUser.public_repos || repos.length || 0;

    const gqlStats = await this.fetchGraphQLStats(username);

    const stats: ContributionStats = {
      totalStars,
      totalContributions: gqlStats?.totalContributions,
      totalCommits: gqlStats?.totalCommits,
      totalPRs: gqlStats?.totalPRs,
      totalIssues: gqlStats?.totalIssues,
      currentStreak: gqlStats?.currentStreak,
      longestStreak: gqlStats?.longestStreak
    };

    return {
      user: {
        name: config.profile.name || restUser.name || username,
        username,
        bio: config.profile.bio || restUser.bio || '',
        company: config.profile.company || restUser.company || '',
        location: config.profile.location || restUser.location || '',
        website: config.profile.website || restUser.blog || '',
        avatarUrl: restUser.avatar_url || `https://github.com/${username}.png`,
        followers: restUser.followers || 0,
        following: restUser.following || 0,
        publicRepos: totalReposCount
      },
      stats,
      repositories: mappedRepos.slice(0, 6),
      topLanguages: topLanguages.slice(0, 6),
      roles: config.profile.roles || ['Software Engineer', 'Open Source Developer'],
      socials: (config.profile.socials as Record<string, string | undefined>) || {}
    };
  }
}

export class PrivateGitHubProvider extends BaseGitHubProvider implements GitHubProvider {
  constructor(token: string) {
    super(token);
  }

  async fetchMetrics(config: ProfileAuraConfig): Promise<ProfileMetrics> {
    const username = config.github.username || config.profile.username || 'octocat';
    Logger.info(`[PrivateGitHubProvider] Fetching private & public metrics for @${username}...`);

    const restUser = await this.fetchBaseRestUser(username);
    // Use authenticated endpoint to get ALL repos including private
    const repos = await this.fetchAuthenticatedRepos();
    const { mappedRepos, totalStars, topLanguages } = this.processRepositories(repos);

    // Correct total = public + private repos from REST API
    const totalReposCount = (restUser.public_repos || 0) + (restUser.owned_private_repos || 0);
    
    const gqlStats = await this.fetchGraphQLStats(username);

    // Only real data — no estimations, no fabricated arithmetic
    const stats: ContributionStats = {
      totalStars,
      totalContributions: gqlStats?.totalContributions,
      totalCommits: gqlStats?.totalCommits,
      totalPRs: gqlStats?.totalPRs,
      totalIssues: gqlStats?.totalIssues,
      currentStreak: gqlStats?.currentStreak,
      longestStreak: gqlStats?.longestStreak
    };

    return {
      user: {
        name: config.profile.name || restUser.name || username,
        username,
        bio: config.profile.bio || restUser.bio || '',
        company: config.profile.company || restUser.company || '',
        location: config.profile.location || restUser.location || '',
        website: config.profile.website || restUser.blog || '',
        avatarUrl: restUser.avatar_url || `https://github.com/${username}.png`,
        followers: restUser.followers || 0,
        following: restUser.following || 0,
        publicRepos: totalReposCount
      },
      stats,
      repositories: mappedRepos.slice(0, 6),
      topLanguages: topLanguages.slice(0, 6),
      roles: config.profile.roles || ['Software Engineer', 'Open Source Developer'],
      socials: (config.profile.socials as Record<string, string | undefined>) || {}
    };
  }
}

export class GitHubProviderFactory {
  static createProvider(config: ProfileAuraConfig): GitHubProvider {
    const token = config.github.token || process.env.WORKFLOW_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
    const includePrivate = config.github.includePrivate === true;

    if (includePrivate) {
      if (!token) {
        throw new Error(`[PRIVATE MODE FAILURE] Private repository fetching requires authentication. Please set GITHUB_TOKEN environment variable or specify token in configuration.`);
      }
      return new PrivateGitHubProvider(token);
    }

    if (token) {
      return new AuthenticatedGitHubProvider(token);
    }

    return new AnonymousGitHubProvider();
  }
}
