import { ProfileAuraConfig } from './config.js';
import { AggregatedProfileData } from './github.js';
import { ThemeTokens } from './theme.js';

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author?: string;
}

export interface PluginExecutionContext {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export interface PluginHooks {
  setup?: (context: PluginExecutionContext) => Promise<void> | void;
  validate?: (config: ProfileAuraConfig) => Promise<boolean> | boolean;
  onConfigResolved?: (config: ProfileAuraConfig) => Promise<ProfileAuraConfig> | ProfileAuraConfig;
  onDataFetched?: (data: AggregatedProfileData) => Promise<AggregatedProfileData> | AggregatedProfileData;
  render?: (context: PluginExecutionContext) => Promise<string | void> | string | void;
  cleanup?: () => Promise<void> | void;
}

export interface ProfileAuraPlugin {
  metadata: PluginMetadata;
  schema?: Record<string, any>;
  defaultConfig?: Record<string, any>;
  hooks: PluginHooks;
}
