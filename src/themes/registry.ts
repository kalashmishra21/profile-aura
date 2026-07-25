import { ThemePreset } from '../types/theme.js';
import { productionThemes, blackObsidian } from './presets/index.js';

export class ThemeRegistry {
  private static themes: Map<string, ThemePreset> = new Map();

  static initialize(): void {
    Object.values(productionThemes).forEach((preset) => {
      this.themes.set(preset.id, preset);
    });
  }

  static getTheme(id: string): ThemePreset {
    if (this.themes.size === 0) {
      this.initialize();
    }
    return this.themes.get(id) || blackObsidian;
  }

  static listThemes(): ThemePreset[] {
    if (this.themes.size === 0) {
      this.initialize();
    }
    return Array.from(this.themes.values());
  }

  static registerTheme(theme: ThemePreset): void {
    this.themes.set(theme.id, theme);
  }
}
