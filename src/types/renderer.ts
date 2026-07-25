import { ProfileAuraConfig } from './config.js';
import { AggregatedProfileData } from './github.js';
import { ThemeTokens } from './theme.js';

export interface RenderPipelineResult {
  heroSvg?: string;
  statsSvg?: string;
  markdownContent: string;
}

export interface HeroRenderOptions {
  width: number;
  height: number;
  fonts?: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    style: 'normal' | 'italic';
  }>;
}

export interface MarkdownRenderOptions {
  includeFooter?: boolean;
  bentoGrid?: boolean;
}
