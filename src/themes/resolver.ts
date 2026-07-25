import { ThemeTokens, ThemePreset } from '../types/theme.js';
import { blackObsidian } from './presets/index.js';

export class ThemeResolver {
  static resolveTheme(preset: ThemePreset, customOverrides?: Partial<ThemeTokens>): ThemeTokens {
    if (!customOverrides) {
      return { ...preset };
    }

    return {
      ...preset,
      ...customOverrides,
      colors: {
        ...preset.colors,
        ...(customOverrides.colors || {})
      },
      typography: {
        ...preset.typography,
        ...(customOverrides.typography || {})
      },
      borders: {
        ...preset.borders,
        ...(customOverrides.borders || {})
      },
      glow: {
        ...preset.glow,
        ...(customOverrides.glow || {})
      },
      spacing: {
        ...preset.spacing,
        ...(customOverrides.spacing || {})
      },
      motion: {
        ...preset.motion,
        ...(customOverrides.motion || {})
      }
    };
  }
}
