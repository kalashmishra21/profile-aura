import { ProfileAuraConfig } from '../types/config.js';
import { AggregatedProfileData } from './types.js';
import { GitHubProviderFactory } from './providers/github-provider.js';
import { CacheService } from '../services/cache.js';
import { Logger } from '../utils/logger.js';

export async function fetchGitHubData(config: ProfileAuraConfig): Promise<AggregatedProfileData> {
  const username = config.github.username || config.profile.username || 'octocat';
  const cacheKey = `github-profile-data-${username}`;

  // 1. Check 24-hour cache first
  const cachedData = CacheService.get<AggregatedProfileData>(cacheKey);
  if (cachedData) {
    Logger.info(`[CACHE HIT] Loaded 24-hour cached GitHub profile data for @${username}`);
    return cachedData;
  }

  // 2. Instantiate Provider via Factory Pattern
  const provider = GitHubProviderFactory.createProvider(config);
  const metrics = await provider.fetchMetrics(config);

  // 3. Map Domain Model to Aggregated Profile Data
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

  // 4. Store in 24-hour disk cache
  CacheService.set(cacheKey, result, 24 * 60 * 60 * 1000);

  return result;
}
