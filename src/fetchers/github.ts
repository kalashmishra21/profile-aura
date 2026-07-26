import { ProfileAuraConfig } from '../types/config.js';
import { AggregatedProfileData } from './types.js';
import { GitHubProviderFactory } from './providers/github-provider.js';
import { CacheService } from '../services/cache.js';
import { Logger } from '../utils/logger.js';

export async function fetchGitHubData(config: ProfileAuraConfig): Promise<AggregatedProfileData> {
  const username = config.github.username || config.profile.username || 'octocat';

  // Always fetch fresh data via Provider Factory (No stale disk cache)
  const provider = GitHubProviderFactory.createProvider(config);
  const metrics = await provider.fetchMetrics(config);

  // Map Domain Model to Aggregated Profile Data
  const result: AggregatedProfileData = {
    name: metrics.user.name,
    username: metrics.user.username,
    roles: metrics.roles,
    bio: metrics.user.bio,
    company: metrics.user.company,
    location: metrics.user.location,
    website: metrics.user.website,
    avatarUrl: metrics.user.avatarUrl,
    followers: metrics.user.followers,
    following: metrics.user.following,
    publicRepos: metrics.user.publicRepos,
    stats: metrics.stats,
    repositories: metrics.repositories,
    topLanguages: metrics.topLanguages,
    socials: metrics.socials
  };

  return result;
}
