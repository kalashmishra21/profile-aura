export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  [key: string]: string | undefined;
}

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
  license?: string | null;
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

export interface LanguageMetric {
  name: string;
  count: number;
  color: string;
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
  topLanguages: LanguageMetric[];
  socials: SocialLinks;
}
