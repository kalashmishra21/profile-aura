/**
 * Layout presets and layout engine
 */

import type { LayoutConfig, LayoutPreset } from '../types/index.js';

export const LAYOUT_PRESETS: Record<LayoutPreset, LayoutConfig> = {
  'character-left': {
    template: 'character-left',
    characterPosition: 'left',
    headerAlign: 'left',
    spacing: 'normal',
    width: 1200,
    height: 600,
  },
  'character-right': {
    template: 'character-right',
    characterPosition: 'right',
    headerAlign: 'right',
    spacing: 'normal',
    width: 1200,
    height: 600,
  },
  centered: {
    template: 'centered',
    characterPosition: 'center',
    headerAlign: 'center',
    spacing: 'spacious',
    width: 1000,
    height: 650,
  },
  split: {
    template: 'split',
    characterPosition: 'left',
    headerAlign: 'center',
    spacing: 'normal',
    width: 1400,
    height: 700,
  },
  magazine: {
    template: 'magazine',
    characterPosition: 'right',
    headerAlign: 'left',
    spacing: 'compact',
    width: 1200,
    height: 550,
  },
  hero: {
    template: 'hero',
    characterPosition: 'center',
    headerAlign: 'center',
    spacing: 'spacious',
    width: 1600,
    height: 800,
  },
  profile: {
    template: 'profile',
    characterPosition: 'left',
    headerAlign: 'left',
    spacing: 'normal',
    width: 1000,
    height: 500,
  },
  landing: {
    template: 'landing',
    characterPosition: 'center',
    headerAlign: 'center',
    spacing: 'spacious',
    width: 1800,
    height: 900,
  },
  poster: {
    template: 'poster',
    characterPosition: 'center',
    headerAlign: 'center',
    spacing: 'normal',
    width: 900,
    height: 1200,
  },
};

/**
 * Get layout configuration from preset or custom config
 */
export function getLayout(layout: LayoutPreset | LayoutConfig | undefined): LayoutConfig {
  // If no layout provided, use default
  if (!layout) {
    return LAYOUT_PRESETS['hero'];
  }

  // If layout is a string (preset name), return the preset
  if (typeof layout === 'string') {
    return LAYOUT_PRESETS[layout] || LAYOUT_PRESETS['hero'];
  }

  // If layout is a custom config object, merge with default
  return {
    ...LAYOUT_PRESETS['hero'],
    ...layout,
  };
}

/**
 * Get spacing values based on spacing mode
 */
export function getSpacing(spacing: 'compact' | 'normal' | 'spacious' = 'normal'): {
  padding: number;
  gap: number;
  margin: number;
} {
  switch (spacing) {
    case 'compact':
      return { padding: 24, gap: 16, margin: 12 };
    case 'spacious':
      return { padding: 48, gap: 32, margin: 24 };
    case 'normal':
    default:
      return { padding: 32, gap: 24, margin: 16 };
  }
}
