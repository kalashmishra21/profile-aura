import { ProfileAuraConfig } from '../configuration/types.js';
import { AggregatedProfileData } from '../fetchers/types.js';
import { ThemePreset } from '../themes/tokens.js';
import { RenderContext } from '../plugins/contract.js';

export function createRenderContext(
  config: ProfileAuraConfig,
  data: AggregatedProfileData,
  theme: ThemePreset
): RenderContext {
  return {
    config,
    data,
    theme
  };
}
