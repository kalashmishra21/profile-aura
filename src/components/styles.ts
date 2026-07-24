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
