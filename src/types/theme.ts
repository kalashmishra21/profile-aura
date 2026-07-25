export interface ThemeColorTokens {
  background: string;
  backgroundSecondary: string;
  cardBackground: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary?: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  glow: string;
  badgeBg: string;
  badgeText: string;
}

export interface ThemeTypographyTokens {
  fontFamilyHeading: string;
  fontFamilyBody: string;
  fontFamilyCode: string;
  fontSizeDisplay: string;
  fontSizeHeroTitle: string;
  fontSizeHeroSubtitle: string;
  fontSizeSectionHeading: string;
  fontSizeBody: string;
  fontSizeCaption: string;
  fontSizeLabel: string;
  fontSizeCode: string;
  letterSpacingTight: string;
  letterSpacingNormal: string;
  letterSpacingWide: string;
}

export interface ThemeBorderTokens {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusFull: string;
  widthThin: string;
  widthNormal: string;
  widthThick: string;
}

export interface ThemeGlowTokens {
  primary: string;
  secondary: string;
  intensity: number;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  blurSm: string;
  blurMd: string;
  blurLg: string;
}

export interface ThemeSpacingTokens {
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  gapSm: string;
  gapMd: string;
  gapLg: string;
  widgetGap: string;
  sectionGap: string;
  heroGap: string;
  containerWidth: string;
}

export interface ThemeMotionTokens {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easingDefault: string;
  easingBounce: string;
  enableMotion: boolean;
}

export type CardStyleVariant = 'glass' | 'solid' | 'outlined' | 'elevated' | 'minimal' | 'rounded' | 'sharp';
export type BackgroundStyleVariant = 'solid' | 'gradient' | 'aurora' | 'glass' | 'noise' | 'grid' | 'dots' | 'mesh';

export interface ThemeTokens {
  id: string;
  name: string;
  description: string;
  isDark: boolean;
  colors: ThemeColorTokens;
  typography: ThemeTypographyTokens;
  borders: ThemeBorderTokens;
  glow: ThemeGlowTokens;
  spacing: ThemeSpacingTokens;
  motion: ThemeMotionTokens;
  defaultCardStyle: CardStyleVariant;
  defaultBackgroundStyle: BackgroundStyleVariant;
}

export interface ThemePreset extends ThemeTokens {
  overrides?: Partial<ThemeTokens>;
}
