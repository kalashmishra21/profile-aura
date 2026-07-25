export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  border: string;
  glow: string;
  badgeBg: string;
  badgeText: string;
}

export interface ThemeTypography {
  fontFamilyHeading: string;
  fontFamilyBody: string;
  fontFamilyCode: string;
}

export interface ThemeBorders {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  width: string;
}

export interface ThemeGlow {
  primary: string;
  secondary: string;
  intensity: number;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  isDark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
  borders: ThemeBorders;
  glow: ThemeGlow;
}
