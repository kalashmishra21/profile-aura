/**
 * Core type definitions for README Aura Engine
 */

export interface Config {
  github: {
    username: string;
    token?: string;
  };
  output: {
    readmePath: string;
    assetsPath: string;
  };
  ai?: {
    enabled: boolean;
    provider: 'openai' | 'anthropic';
    apiKey?: string;
    model?: string;
  };
  theme?: ThemeConfig;
}

export interface ThemeConfig {
  mode: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  glowEffect: boolean;
  animation: boolean;
}

export interface GitHubStats {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  followers: number;
  following: number;
  repositories: number;
  languages: LanguageStats[];
  recentRepos: Repository[];
  contributionStreak: StreakData;
}

export interface LanguageStats {
  name: string;
  percentage: number;
  color: string;
}

export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

export interface StreakData {
  current: number;
  longest: number;
  totalContributions: number;
  firstContribution: string;
  lastContribution: string;
}

export interface CommitActivity {
  date: string;
  message: string;
  repo: string;
  url: string;
}

export interface TechStackConfig {
  categories: TechCategory[];
  showIcons: boolean;
  iconSize: number;
  layout: 'grid' | 'rows' | 'inline';
}

export interface TechCategory {
  name: string;
  items: string[];
}

export interface CardConfig {
  type: 'header' | 'stats' | 'streak' | 'languages' | 'activity' | 'custom';
  title?: string;
  width: number;
  height: number;
  theme?: ThemeConfig;
  data?: any;
  props?: Record<string, any>;
}

export interface AuraBlock {
  type: string;
  content: string;
  props: Record<string, string>;
  startLine: number;
  endLine: number;
}

export interface ParsedMarkdown {
  content: string;
  auraBlocks: AuraBlock[];
}

export interface SvgRenderOptions {
  width: number;
  height: number;
  fonts: FontConfig[];
  debug?: boolean;
}

export interface FontConfig {
  name: string;
  path: string;
  weight?: number;
  style?: 'normal' | 'italic';
}

export interface IconData {
  name: string;
  svg: string;
  color?: string;
}

export interface AIGeneratedContent {
  summary: string;
  projectStatus: string;
  weeklyFocus: string;
  generatedAt: string;
}

export interface BuildOptions {
  sourcePath: string;
  outputPath: string;
  config: Config;
  verbose?: boolean;
  dryRun?: boolean;
}

export interface CLIOptions {
  config?: string;
  source?: string;
  output?: string;
  verbose?: boolean;
  dryRun?: boolean;
}
