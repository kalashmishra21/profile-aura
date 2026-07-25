import { ProfileAuraConfig } from '../types/config.js';
import { AggregatedProfileData } from '../types/github.js';
import { ThemeTokens } from '../types/theme.js';
import { PluginExecutionContext } from '../types/plugin.js';

export function createExecutionContext(
  config: ProfileAuraConfig,
  data: AggregatedProfileData,
  theme: ThemeTokens
): PluginExecutionContext {
  return {
    config: Object.freeze({ ...config }),
    data: Object.freeze({ ...data }),
    theme: Object.freeze({ ...theme })
  };
}
