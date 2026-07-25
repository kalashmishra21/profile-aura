/**
 * Core type definitions for Profile Aura
 */

export interface Config {
  github: {
    username: string;
    token?: string;
  };
  profile: {
    name?: string; // Override display name
    about?: string; // Custom about text (priority over GitHub bio)
    roles?: string[]; // e.g., ["Software Engineer", "Open Source Contributor"]
    location?: string;
    company?: string;
    website?: string;
    email?: string;
    socials?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      portfolio?: string;
      [key: string]: string | undefined;
    };
  };
  theme?: ThemePreset | ThemeConfig;
  layout?: LayoutPreset | LayoutConfig;
  customization?: CustomizationConfig;
  sections?: SectionsConfig;
  output: {
    readmePath: string;
    assetsPath: string;
  };
}

// Theme Presets
export type ThemePreset = 
  | 'blue-minimal'
  | 'black-premium'
  | 'white-clean'
  | 'purple-cyber'
  | 'red-akatsuki'
  | 'ocean'
  | 'sunset'
  | 'glassmorphism'
  | 'neon';

// Layout Presets
export type LayoutPreset =
  | 'character-left'
  | 'character-right'
  | 'centered'
  | 'split'
  | 'magazine'
  | 'hero'
  | 'profile'
  | 'landing'
  | 'poster';

export interface ThemeConfig {
  mode: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  backgroundGradient?: string; // e.g., "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  textColor: string;
  secondaryTextColor?: string;
  borderRadius: number;
  glowEffect: boolean;
  animation: boolean;
  shadow?: string;
  opacity?: number;
  background?: {
    type: 'solid' | 'gradient' | 'glass' | 'noise' | 'dots' | 'grid' | 'aurora' | 'animated';
    value?: string;
  };
}

export interface LayoutConfig {
  template: LayoutPreset;
  characterPosition?: 'left' | 'right' | 'center';
  headerAlign?: 'left' | 'center' | 'right';
  spacing?: 'compact' | 'normal' | 'spacious';
  width?: number;
  height?: number;
}

export interface CustomizationConfig {
  fonts?: {
    heading?: string;
    body?: string;
    code?: string;
  };
  colors?: {
    [key: string]: string;
  };
  spacing?: {
    [key: string]: number;
  };
  effects?: {
    blur?: number;
    brightness?: number;
    contrast?: number;
    saturate?: number;
  };
}

export interface SectionsConfig {
  header?: {
    enabled: boolean;
    showAvatar?: boolean;
    showBio?: boolean;
    showRoles?: boolean;
    showStats?: boolean; // Small stats in header (followers, repos, stars, etc.)
    showSocials?: boolean;
  };
  techStack?: {
    enabled: boolean;
    autoDetect?: boolean;
    categories?: {
      languages?: string[];
      frameworks?: string[];
      tools?: string[];
      databases?: string[];
      cloud?: string[];
      devops?: string[];
      ai?: string[];
    };
  };
  stats?: {
    enabled: boolean;
    show?: ('contributions' | 'commits' | 'prs' | 'issues' | 'stars' | 'streak')[];
  };
  languages?: {
    enabled: boolean;
    limit?: number;
    showPercentage?: boolean;
  };
  activity?: {
    enabled: boolean;
    limit?: number;
  };
  plugins?: PluginConfig[];
}

export interface PluginConfig {
  type: 'spotify' | 'discord' | 'leetcode' | 'wakatime' | 'custom';
  enabled: boolean;
  config?: Record<string, any>;
}

export interface GitHubStats {
  username: string;
  name: string;
  displayName?: string; // GitHub display name (preferred over username)
  bio: string;
  avatarUrl: string;
  location?: string;
  company?: string;
  website?: string;
  twitterUsername?: string;
  email?: string;
  createdAt: string;
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
  techStack: TechStackCategories;
}

export interface TechStackCategories {
  languages: string[];
  frameworks: string[];
  others: string[];
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
