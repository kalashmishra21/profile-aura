import { ThemePreset } from './tokens.js';
import { themePresets, voidDark } from './presets/index.js';

export class ThemeRegistry {
  private static themes: Map<string, ThemePreset> = new Map();

  static initialize(): void {
    Object.values(themePresets).forEach((preset) => {
      this.themes.set(preset.id, preset);
    });
  }

  static getTheme(id: string): ThemePreset {
    if (this.themes.size === 0) {
      this.initialize();
    }
    return this.themes.get(id) || voidDark;
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
