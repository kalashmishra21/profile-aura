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
      const response = await fetch(`https://dev.to/api/articles?username=${username}`);
      if (!response.ok) throw new Error(`Dev.to API returned ${response.status}`);
      const data = await response.json();
      
      const articles: WritingProfileArticle[] = data.slice(0, 5).map((article: any) => ({
        title: article.title,
        url: article.url,
        publishedAt: article.published_at.substring(0, 10),
        platform: 'Dev.to'
      }));
      
      CacheService.set(cacheKey, articles);
      return articles;
    } catch (err: any) {
      Logger.warn(`Dev.to provider error for @${username}: ${err.message}`);
      return null;
    }
  }
}
