export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  discord?: string;
  youtube?: string;
  email?: string;
}

export interface ProfileInfo {
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

export interface TechStackCategory {
  category: string;
  skills: string[];
}

export interface SectionToggleConfig {
  enabled: boolean;
  [key: string]: any;
}

export interface SectionsConfig {
  hero: SectionToggleConfig & {
    style?: 'magazine' | 'compact' | 'split';
  };
  stats: SectionToggleConfig & {
    show: string[];
  };
  streak: SectionToggleConfig;
  techStack: SectionToggleConfig & {
    categories?: TechStackCategory[];
  };
  topRepositories: SectionToggleConfig & {
    limit?: number;
  };
  socials: SectionToggleConfig;
}

export interface OutputConfig {
  readmePath: string;
  assetsDir: string;
  heroSvgFilename: string;
  statsSvgFilename: string;
}

export interface ProfileAuraConfig {
  github: {
    username: string;
    token?: string;
  };
  profile: ProfileInfo;
  theme: string;
  template: string;
  sections: SectionsConfig;
  output: OutputConfig;
  plugins?: string[];
}
