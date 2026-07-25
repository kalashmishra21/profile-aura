import { DataProvider } from './base.js';
import { CodingProfileStats } from '../normalization.js';
import { CacheService } from '../../services/cache.js';
import { Logger } from '../../utils/logger.js';

export class LeetCodeProvider implements DataProvider<CodingProfileStats> {
  id = 'leetcode';
  name = 'LeetCode Data Provider';

  async fetch(username: string): Promise<CodingProfileStats | null> {
    if (!username) return null;
    const cacheKey = `leetcode:${username}`;
    const cached = CacheService.get<CodingProfileStats>(cacheKey);
    if (cached) return cached;

    try {
      // Mock / fallback fetch for LeetCode API
      const stats: CodingProfileStats = {
        platform: 'LeetCode',
        username,
        problemsSolved: 245,
        ranking: 45210,
        badge: 'Knight'
      };
      CacheService.set(cacheKey, stats);
      return stats;
    } catch (err: any) {
      Logger.warn(`LeetCode provider error for @${username}: ${err.message}`);
      return null;
    }
  }
}
