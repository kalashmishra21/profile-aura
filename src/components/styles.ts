/**
 * Shared styles and theme utilities for SVG components
 */

import type { ThemeConfig } from '../types/index.js';
import { hexToRgba } from '../utils/helpers.js';

// Re-export hexToRgba for components
export { hexToRgba };

export function getGradientBackground(theme: ThemeConfig): string {
  return `linear-gradient(135deg, ${theme.backgroundColor} 0%, ${hexToRgba(theme.primaryColor, 0.1)} 100%)`;
}

export function getGlowStyle(color: string, enabled: boolean): any {
  if (!enabled) return {};
  
  return {
    boxShadow: `0 0 20px ${hexToRgba(color, 0.3)}, 0 0 40px ${hexToRgba(color, 0.1)}`,
  };
}

export const baseCardStyle = (theme: ThemeConfig) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  background: theme.backgroundColor,
  borderRadius: theme.borderRadius,
  padding: '32px',
  border: `1px solid ${hexToRgba(theme.primaryColor, 0.2)}`,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

export const glassCardStyle = (theme: ThemeConfig) => ({
  ...baseCardStyle(theme),
  background: `linear-gradient(135deg, ${hexToRgba(theme.backgroundColor, 0.9)} 0%, ${hexToRgba(theme.primaryColor, 0.05)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${hexToRgba(theme.primaryColor, 0.3)}`,
  ...getGlowStyle(theme.primaryColor, theme.glowEffect),
});

export const titleStyle = (theme: ThemeConfig) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: theme.textColor,
  marginBottom: '8px',
  background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const subtitleStyle = (theme: ThemeConfig) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: hexToRgba(theme.textColor, 0.7),
  marginBottom: '24px',
});

export const statStyle = (theme: ThemeConfig) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: '8px',
});

export const statValueStyle = (theme: ThemeConfig) => ({
  fontSize: '32px',
  fontWeight: 700,
  color: theme.primaryColor,
});

export const statLabelStyle = (theme: ThemeConfig) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: hexToRgba(theme.textColor, 0.6),
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
});

export const iconContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
};

export const badgeStyle = (color: string) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '20px',
  background: hexToRgba(color, 0.1),
  border: `1px solid ${hexToRgba(color, 0.3)}`,
});

export const progressBarStyle = (theme: ThemeConfig, percentage: number, color: string) => ({
  width: '100%',
  height: '8px',
  background: hexToRgba(theme.textColor, 0.1),
  borderRadius: '4px',
  overflow: 'hidden' as const,
  position: 'relative' as const,
});

export const progressFillStyle = (percentage: number, color: string) => ({
  width: `${percentage}%`,
  height: '100%',
  background: color,
  borderRadius: '4px',
});

// Animation keyframes (as CSS string for inline styles)
export const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
`;

export const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
