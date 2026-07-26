import { ThemeTokens } from '../types/theme.js';
import { AggregatedProfileData } from '../types/github.js';
import { ProfileAuraConfig } from '../types/config.js';

export type HeroLayoutVariant = 
  | 'editorial-left' 
  | 'editorial-right' 
  | 'centered' 
  | 'magazine' 
  | 'split' 
  | 'apple-inspired' 
  | 'poster' 
  | 'showcase' 
  | 'luxury' 
  | 'minimal' 
  | 'portfolio';

export interface HeroDecorationConfig {
  showGlow?: boolean;
  showGrid?: boolean;
  showAccentBar?: boolean;
  showBlobs?: boolean;
  showFrame?: boolean;
}

export interface ResolvedHeroData {
  name: string;
  username: string;
  role: string;
  about: string;
  avatarUrl: string;
  location?: string;
  company?: string;
  website?: string;
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  socials: Record<string, string | undefined>;
}

export interface HeroRenderPipelineContext {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  heroData: ResolvedHeroData;
  theme: ThemeTokens;
  seed: string;
  variant: HeroLayoutVariant;
  decorations: HeroDecorationConfig;
}
