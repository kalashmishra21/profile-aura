import { DataProvider } from './base.js';
import { WakaTimeCodingStats } from '../normalization.js';
import { CacheService } from '../../services/cache.js';
import { Logger } from '../../utils/logger.js';

export class WakaTimeProvider implements DataProvider<WakaTimeCodingStats> {
  id = 'wakatime';
  name = 'WakaTime Coding Time Provider';

  async fetch(username: string): Promise<WakaTimeCodingStats | null> {
    if (!username) return null;
    const cacheKey = `wakatime:${username}`;
    const cached = CacheService.get<WakaTimeCodingStats>(cacheKey);
    if (cached) return cached;

    try {
      const apiKey = process.env.WAKATIME_API_KEY;
      if (!apiKey) {
        Logger.warn('WAKATIME_API_KEY is not set. Returning null for WakaTime stats.');
        return null;
      }

      const response = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days`, {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`
        }
      });
      if (!response.ok) throw new Error(`WakaTime API returned ${response.status}`);
      const json = await response.json();
      const waka = json.data;

      const stats: WakaTimeCodingStats = {
        totalHoursThisWeek: waka.human_readable_total || '0 hrs',
        dailyAverageHours: waka.human_readable_daily_average || '0 hrs',
        topLanguage: waka.languages && waka.languages.length > 0 ? waka.languages[0].name : 'Unknown'
      };
      
      CacheService.set(cacheKey, stats);
      return stats;
    } catch (err: any) {
      Logger.warn(`WakaTime provider error for @${username}: ${err.message}`);
      return null;
    }
  }
}
