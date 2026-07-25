import { SocialLinks } from '../types/github.js';

export interface RepositoryData {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  isFork: boolean;
  updatedAt?: string | null;
}

export interface ContributionStats {
  /** Real: summed from REST repos list */
  totalStars: number;
  /** Optional — only present when obtained from a real API endpoint, never estimated */
  totalContributions?: number;
  totalCommits?: number;
  totalPRs?: number;
  totalIssues?: number;
  currentStreak?: number;
  longestStreak?: number;
}

export interface AggregatedProfileData {
  name: string;
  username: string;
  roles: string[];
  bio: string;
  company: string;
  location: string;
  website: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  stats: ContributionStats;
  repositories: RepositoryData[];
  topLanguages: { name: string; count: number; color: string }[];
  socials: Record<string, string | undefined>;
}
