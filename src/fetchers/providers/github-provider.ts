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
        updatedAt: r.updated_at || null
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
    Logger.info(`[AnonymousGitHubProvider] Fetching public metrics for @${username}...`);

    const restUser = await this.fetchBaseRestUser(username);
    const repos = await this.fetchBaseRepos(username, 'owner');
    const { mappedRepos, totalStars, topLanguages } = this.processRepositories(repos);

    const totalReposCount = restUser.public_repos || repos.length || 0;

    // Only real data — no estimations, no fabricated arithmetic
    const stats: ContributionStats = {
      totalStars
      // totalContributions, totalCommits, totalPRs, totalIssues, currentStreak, longestStreak
      // are NOT available from the unauthenticated REST API and are intentionally omitted.
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

    // Only real data — no estimations, no fabricated arithmetic
    const stats: ContributionStats = {
      totalStars
      // Contribution counts (contributions, commits, PRs, issues, streaks) require
      // GraphQL or the GitHub Stats API which needs explicit user consent & scopes.
      // They are intentionally omitted to avoid displaying false data.
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
    const repos = await this.fetchBaseRepos(username, 'all');
    const { mappedRepos, totalStars, topLanguages } = this.processRepositories(repos);

    const totalReposCount = restUser.public_repos || repos.length || 0;

    // Only real data — no estimations, no fabricated arithmetic
    const stats: ContributionStats = {
      totalStars
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
    const token = config.github.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
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
