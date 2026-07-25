import { AggregatedProfileData, SocialLinks } from '../types/github.js';

export interface CodingProfileStats {
  platform: 'LeetCode' | 'Codeforces' | 'CodeChef' | 'HackerRank';
  username: string;
  problemsSolved: number;
  ranking?: number;
  rating?: number;
  badge?: string;
}

export interface WakaTimeCodingStats {
  totalHoursThisWeek: string;
  dailyAverageHours: string;
  topLanguage: string;
}

export interface WritingProfileArticle {
  title: string;
  url: string;
  publishedAt: string;
  platform: 'Dev.to' | 'Hashnode' | 'Medium' | 'RSS';
}

export interface SpotifyListeningActivity {
  isPlaying: boolean;
  trackName?: string;
  artistName?: string;
  albumArtUrl?: string;
}

export interface DeveloperPlatformData {
  profile: AggregatedProfileData;
  codingStats?: CodingProfileStats[];
  wakatime?: WakaTimeCodingStats;
  articles?: WritingProfileArticle[];
  spotify?: SpotifyListeningActivity;
}

export class DataNormalizer {
  static normalizeProfile(data: Partial<AggregatedProfileData>): AggregatedProfileData {
    return {
      name: data.name || data.username || 'Developer',
      username: data.username || 'developer',
      roles: data.roles || ['Software Engineer'],
      bio: data.bio || 'Building open source projects.',
      company: data.company || '',
      location: data.location || '',
      website: data.website || '',
      avatarUrl: data.avatarUrl || `https://github.com/${data.username || 'octocat'}.png`,
      followers: data.followers || 0,
      following: data.following || 0,
      publicRepos: data.publicRepos || 0,
      stats: data.stats || {
        totalContributions: 350,
        totalCommits: 280,
        totalPRs: 45,
        totalIssues: 18,
        totalStars: 10,
        currentStreak: 14,
        longestStreak: 42
      },
      repositories: data.repositories || [],
      topLanguages: data.topLanguages || [],
      socials: data.socials || {}
    };
  }
}
