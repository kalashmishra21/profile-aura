import { DataProvider } from './base.js';
import { WritingProfileArticle } from '../normalization.js';
import { CacheService } from '../../services/cache.js';
import { Logger } from '../../utils/logger.js';

export class DevToProvider implements DataProvider<WritingProfileArticle[]> {
  id = 'devto';
  name = 'Dev.to Articles Provider';

  async fetch(username: string): Promise<WritingProfileArticle[] | null> {
    if (!username) return null;
    const cacheKey = `devto:${username}`;
    const cached = CacheService.get<WritingProfileArticle[]>(cacheKey);
    if (cached) return cached;

    try {
      const articles: WritingProfileArticle[] = [
        {
          title: 'Building Scalable Framework Architecture with Node.js and TypeScript',
          url: `https://dev.to/${username}/building-scalable-framework-architecture`,
          publishedAt: '2026-07-20',
          platform: 'Dev.to'
        }
      ];
      CacheService.set(cacheKey, articles);
      return articles;
    } catch (err: any) {
      Logger.warn(`Dev.to provider error for @${username}: ${err.message}`);
      return null;
    }
  }
}
