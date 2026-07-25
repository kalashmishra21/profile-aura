import fs from 'fs';
import path from 'path';
import { DEFAULT_CACHE_TTL_MS } from '../config/defaults.js';
import { Logger } from '../utils/logger.js';
import { ensureDirectoryExists } from '../utils/fs.js';

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

export class CacheService {
  private static memoryCache: Map<string, CacheEntry> = new Map();
  private static cacheDir = path.resolve(process.cwd(), '.profile-aura', 'cache');
  private static cacheFilePath = path.join(CacheService.cacheDir, 'data.json');

  static set<T>(key: string, data: T, ttlMs: number = DEFAULT_CACHE_TTL_MS): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs
    };

    // Update memory cache
    this.memoryCache.set(key, entry);

    // Persist to disk cache
    try {
      ensureDirectoryExists(this.cacheDir);
      const diskData = this.loadDiskCacheData();
      diskData[key] = entry;
      fs.writeFileSync(this.cacheFilePath, JSON.stringify(diskData, null, 2), 'utf-8');
      Logger.debug(`Persisted cache entry for key '${key}' to disk.`);
    } catch (err: any) {
      Logger.warn(`Failed to write disk cache for key '${key}': ${err.message}`);
    }
  }

  static get<T>(key: string): T | null {
    // 1. Check memory cache
    const memEntry = this.memoryCache.get(key);
    if (memEntry && !this.isExpired(memEntry)) {
      Logger.debug(`Memory cache hit for key '${key}'`);
      return memEntry.data as T;
    }

    // 2. Check disk cache
    const diskData = this.loadDiskCacheData();
    const diskEntry = diskData[key] as CacheEntry<T> | undefined;

    if (diskEntry && !this.isExpired(diskEntry)) {
      Logger.debug(`Disk cache hit for key '${key}'`);
      this.memoryCache.set(key, diskEntry); // Populate memory cache
      return diskEntry.data;
    }

    return null;
  }

  static clear(): void {
    this.memoryCache.clear();
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        fs.unlinkSync(this.cacheFilePath);
        Logger.info('Cleared local disk cache file.');
      }
    } catch (err: any) {
      Logger.warn(`Failed to clear disk cache: ${err.message}`);
    }
  }

  private static isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttlMs;
  }

  private static loadDiskCacheData(): Record<string, CacheEntry> {
    try {
      if (fs.existsSync(this.cacheFilePath)) {
        const content = fs.readFileSync(this.cacheFilePath, 'utf-8');
        return JSON.parse(content);
      }
    } catch (err: any) {
      Logger.debug(`Failed to read disk cache file: ${err.message}`);
    }
    return {};
  }
}
