import { SocialLinks } from './github.js';

export interface ProfileInfoConfig {
  name: string;
  username: string;
  roles: string[];
  bio: string;
  company?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  socials: SocialLinks;
}

export interface TechStackCategoryConfig {
  category: string;
  skills: string[];
}

export interface SectionConfig {
  enabled: boolean;
  [key: string]: any;
}

export interface SectionsConfig {
  hero: SectionConfig & { style?: 'magazine' | 'compact' | 'split' };
  overview: SectionConfig;

  graph: SectionConfig;
  stats: SectionConfig & { show: string[] };
  streak: SectionConfig;
  techStack: SectionConfig & { categories?: TechStackCategoryConfig[] };
  socials: SectionConfig;
  [key: string]: SectionConfig;
}

export interface OutputPathsConfig {
  readmePath: string;
  assetsDir: string;
  heroSvgFilename: string;
  statsSvgFilename: string;
}

export interface ProfileAuraConfig {
  github: {
    username: string;
    token?: string;
    includePrivate?: boolean;
  };
  profile: ProfileInfoConfig;
  theme: string;
  template: string;
  sections: SectionsConfig;
  output: OutputPathsConfig;
  plugins?: string[];
  customTokens?: Record<string, any>;
}
