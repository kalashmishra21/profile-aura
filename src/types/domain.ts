import { ContributionStats, RepositoryData, SocialLinks } from './github.js';

export interface GitHubUser {
  name: string;
  username: string;
  bio: string;
  company: string;
  location: string;
  website: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export type Repository = RepositoryData;

export { ContributionStats };

export interface LanguageStats {
  name: string;
  count: number;
  color: string;
}

export interface ProfileMetrics {
  user: GitHubUser;
  stats: ContributionStats;
  repositories: Repository[];
  topLanguages: LanguageStats[];
  roles: string[];
  socials: SocialLinks;
}

export interface READMEModel {
  user: GitHubUser;
  stats: ContributionStats;
  repositories: Repository[];
  topLanguages: LanguageStats[];
  roles: string[];
  socials: SocialLinks;
}
