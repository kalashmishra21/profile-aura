import { ProfileAuraConfig } from '../types/config.js';
import { AggregatedProfileData } from '../types/github.js';
import { ThemeTokens } from '../types/theme.js';

export interface RenderContext {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export interface RenderResult {
  heroSvg?: string;
  statsSvg?: string;
  markdownContent: string;
}

export interface PluginLifecycleHooks {
  onConfigResolved?: (config: ProfileAuraConfig) => Promise<ProfileAuraConfig> | ProfileAuraConfig;
  onDataFetched?: (data: AggregatedProfileData) => Promise<AggregatedProfileData> | AggregatedProfileData;
  onBeforeRender?: (context: RenderContext) => Promise<void> | void;
  onAfterRender?: (result: RenderResult) => Promise<RenderResult> | RenderResult;
}

export interface ProfileAuraPlugin {
  id: string;
  name: string;
  version: string;
  hooks: PluginLifecycleHooks;
}
