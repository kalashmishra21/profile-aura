/**
 * Theme presets and theme engine
 */

import type { ThemeConfig, ThemePreset } from '../types/index.js';

export const THEME_PRESETS: Record<ThemePreset, ThemeConfig> = {
  'blue-minimal': {
    mode: 'dark',
    primaryColor: '#3b82f6',
    secondaryColor: '#60a5fa',
    accentColor: '#93c5fd',
    backgroundColor: '#0f172a',
    backgroundGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    textColor: '#f1f5f9',
    secondaryTextColor: '#cbd5e1',
    borderRadius: 16,
    glowEffect: true,
    animation: true,
    shadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
    opacity: 1,
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
  },
  'black-premium': {
    mode: 'dark',
    primaryColor: '#ffffff',
    secondaryColor: '#e5e5e5',
    accentColor: '#a3a3a3',
    backgroundColor: '#000000',
    backgroundGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    textColor: '#ffffff',
    secondaryTextColor: '#a3a3a3',
    borderRadius: 24,
    glowEffect: true,
    animation: true,
    shadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    opacity: 1,
    background: {
      type: 'solid',
      value: '#000000',
    },
  },
  'white-clean': {
    mode: 'light',
    primaryColor: '#1f2937',
    secondaryColor: '#4b5563',
    accentColor: '#6b7280',
    backgroundColor: '#ffffff',
    backgroundGradient: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
    textColor: '#111827',
    secondaryTextColor: '#6b7280',
    borderRadius: 12,
    glowEffect: false,
    animation: true,
    shadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    opacity: 1,
    background: {
      type: 'solid',
      value: '#ffffff',
    },
  },
  'purple-cyber': {
    mode: 'dark',
    primaryColor: '#a855f7',
    secondaryColor: '#c084fc',
    accentColor: '#e879f9',
    backgroundColor: '#18181b',
    backgroundGradient: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
    textColor: '#fafafa',
    secondaryTextColor: '#d4d4d8',
    borderRadius: 20,
    glowEffect: true,
    animation: true,
    shadow: '0 12px 48px rgba(168, 85, 247, 0.25)',
    opacity: 1,
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
    },
  },
  'red-akatsuki': {
    mode: 'dark',
    primaryColor: '#ef4444',
    secondaryColor: '#f87171',
    accentColor: '#fca5a5',
    backgroundColor: '#0a0a0a',
    backgroundGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a0a0a 100%)',
    textColor: '#fef2f2',
    secondaryTextColor: '#fecaca',
    borderRadius: 16,
    glowEffect: true,
    animation: true,
    shadow: '0 16px 56px rgba(239, 68, 68, 0.3)',
    opacity: 1,
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a0a0a 100%)',
    },
  },
  ocean: {
    mode: 'dark',
    primaryColor: '#06b6d4',
    secondaryColor: '#22d3ee',
    accentColor: '#67e8f9',
    backgroundColor: '#0c4a6e',
    backgroundGradient: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0e7490 100%)',
    textColor: '#f0f9ff',
    secondaryTextColor: '#bae6fd',
    borderRadius: 18,
    glowEffect: true,
    animation: true,
    shadow: '0 12px 40px rgba(6, 182, 212, 0.2)',
    opacity: 1,
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0e7490 100%)',
    },
  },
  sunset: {
    mode: 'dark',
    primaryColor: '#f97316',
    secondaryColor: '#fb923c',
    accentColor: '#fdba74',
    backgroundColor: '#431407',
    backgroundGradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #c2410c 100%)',
    textColor: '#fff7ed',
    secondaryTextColor: '#fed7aa',
    borderRadius: 20,
    glowEffect: true,
    animation: true,
    shadow: '0 16px 48px rgba(249, 115, 22, 0.25)',
    opacity: 1,
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #c2410c 100%)',
    },
  },
  glassmorphism: {
    mode: 'light',
    primaryColor: '#3b82f6',
    secondaryColor: '#60a5fa',
    accentColor: '#93c5fd',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    textColor: '#1e293b',
    secondaryTextColor: '#475569',
    borderRadius: 24,
    glowEffect: true,
    animation: true,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    opacity: 0.9,
    background: {
      type: 'glass',
      value: 'rgba(255, 255, 255, 0.1)',
    },
  },
  neon: {
    mode: 'dark',
    primaryColor: '#22d3ee',
    secondaryColor: '#a855f7',
    accentColor: '#ec4899',
    backgroundColor: '#000000',
    backgroundGradient: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    textColor: '#ffffff',
    secondaryTextColor: '#d4d4d8',
    borderRadius: 16,
    glowEffect: true,
    animation: true,
    shadow: '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
    opacity: 1,
    background: {
      type: 'solid',
      value: '#000000',
    },
  },
};

/**
 * Get theme configuration from preset or custom config
 */
export function getTheme(theme: ThemePreset | ThemeConfig | undefined): ThemeConfig {
  // If no theme provided, use default
  if (!theme) {
    return THEME_PRESETS['blue-minimal'];
  }

  // If theme is a string (preset name), return the preset
  if (typeof theme === 'string') {
    return THEME_PRESETS[theme] || THEME_PRESETS['blue-minimal'];
  }

  // If theme is a custom config object, merge with default to ensure all fields exist
  return {
    ...THEME_PRESETS['blue-minimal'],
    ...theme,
  };
}

/**
 * Apply theme to SVG styles
 */
export function applyTheme(theme: ThemeConfig): Record<string, any> {
  return {
    backgroundColor: theme.background?.value || theme.backgroundColor,
    color: theme.textColor,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: theme.borderRadius,
    boxShadow: theme.shadow,
    opacity: theme.opacity || 1,
  };
}

/**
 * Get gradient CSS for backgrounds
 */
export function getGradientCSS(theme: ThemeConfig): string {
  if (theme.backgroundGradient) {
    return theme.backgroundGradient;
  }
  return theme.backgroundColor;
}
