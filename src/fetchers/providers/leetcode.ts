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
      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            profile {
              ranking
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `;

      const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({ query, variables: { username } })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      if (json.errors || !json.data?.matchedUser) {
        throw new Error('User not found or API error');
      }

      const matchedUser = json.data.matchedUser;
      const allCount = matchedUser.submitStats?.acSubmissionNum?.find((s: any) => s.difficulty === 'All')?.count || 0;
      
      const stats: CodingProfileStats = {
        platform: 'LeetCode',
        username,
        problemsSolved: allCount,
        ranking: matchedUser.profile?.ranking || 0,
        badge: 'Member'
      };
      
      CacheService.set(cacheKey, stats);
      return stats;
    } catch (err: any) {
      Logger.warn(`LeetCode provider error for @${username}: ${err.message}`);
      return null;
    }
  }
}
