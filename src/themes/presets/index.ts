import { ThemePreset } from '../tokens.js';

export const voidDark: ThemePreset = {
  id: 'void-dark',
  name: 'Void Dark (Obsidian & Neon Violet)',
  description: 'Ultra-deep obsidian background with glowing neon violet and electric cyan accents.',
  isDark: true,
  colors: {
    background: '#090A0F',
    backgroundSecondary: '#121524',
    cardBackground: '#16192B',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accentPrimary: '#A855F7',
    accentSecondary: '#06B6D4',
    border: '#2E3553',
    glow: 'rgba(168, 85, 247, 0.4)',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#C084FC'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '6px',
    radiusMd: '12px',
    radiusLg: '20px',
    width: '1px'
  },
  glow: {
    primary: '0 0 25px rgba(168, 85, 247, 0.4)',
    secondary: '0 0 25px rgba(6, 182, 212, 0.4)',
    intensity: 0.8
  }
};

export const cyberpunk2099: ThemePreset = {
  id: 'cyberpunk-2099',
  name: 'Cyberpunk 2099',
  description: 'Neon cyan, high-voltage magenta and grid lines on pitch dark canvas.',
  isDark: true,
  colors: {
    background: '#05050A',
    backgroundSecondary: '#0E0F1A',
    cardBackground: '#131526',
    textPrimary: '#00F0FF',
    textSecondary: '#E2E8F0',
    textMuted: '#64748B',
    accentPrimary: '#FF0055',
    accentSecondary: '#00F0FF',
    border: '#FF005533',
    glow: 'rgba(0, 240, 255, 0.5)',
    badgeBg: 'rgba(255, 0, 85, 0.2)',
    badgeText: '#FF3377'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '2px',
    radiusMd: '6px',
    radiusLg: '10px',
    width: '1px'
  },
  glow: {
    primary: '0 0 30px rgba(0, 240, 255, 0.5)',
    secondary: '0 0 30px rgba(255, 0, 85, 0.5)',
    intensity: 1.0
  }
};

export const tokyoNight: ThemePreset = {
  id: 'tokyo-night',
  name: 'Tokyo Night',
  description: 'Deep indigo with soft lavender typography, cyan highlights and pastel teal accents.',
  isDark: true,
  colors: {
    background: '#1A1B26',
    backgroundSecondary: '#24283B',
    cardBackground: '#292E42',
    textPrimary: '#C0CAF5',
    textSecondary: '#A9B1D6',
    textMuted: '#565F89',
    accentPrimary: '#7DCFFF',
    accentSecondary: '#BB9AF7',
    border: '#414868',
    glow: 'rgba(125, 207, 255, 0.35)',
    badgeBg: 'rgba(187, 154, 247, 0.2)',
    badgeText: '#C0CAF5'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '8px',
    radiusMd: '14px',
    radiusLg: '22px',
    width: '1px'
  },
  glow: {
    primary: '0 0 20px rgba(125, 207, 255, 0.35)',
    secondary: '0 0 20px rgba(187, 154, 247, 0.35)',
    intensity: 0.7
  }
};

export const monochromePro: ThemePreset = {
  id: 'monochrome-pro',
  name: 'Monochrome Pro (Editorial)',
  description: 'Stark high-end magazine dark style with crisp white typography and silver accents.',
  isDark: true,
  colors: {
    background: '#0A0A0A',
    backgroundSecondary: '#141414',
    cardBackground: '#1F1F1F',
    textPrimary: '#FFFFFF',
    textSecondary: '#D4D4D8',
    textMuted: '#71717A',
    accentPrimary: '#E4E4E7',
    accentSecondary: '#A1A1AA',
    border: '#3F3F46',
    glow: 'rgba(255, 255, 255, 0.15)',
    badgeBg: 'rgba(255, 255, 255, 0.1)',
    badgeText: '#FAFAFA'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '16px',
    width: '1px'
  },
  glow: {
    primary: '0 0 15px rgba(255, 255, 255, 0.15)',
    secondary: '0 0 15px rgba(161, 161, 170, 0.15)',
    intensity: 0.5
  }
};

export const draculaVamp: ThemePreset = {
  id: 'dracula-vamp',
  name: 'Dracula Vamp',
  description: 'Gothic crimson red, bright pink, and deep midnight velvet card frames.',
  isDark: true,
  colors: {
    background: '#181825',
    backgroundSecondary: '#1E1E2E',
    cardBackground: '#313244',
    textPrimary: '#F5E0DC',
    textSecondary: '#CDD6F4',
    textMuted: '#6C7086',
    accentPrimary: '#FF5555',
    accentSecondary: '#FF79C6',
    border: '#45475A',
    glow: 'rgba(255, 85, 85, 0.4)',
    badgeBg: 'rgba(255, 121, 198, 0.2)',
    badgeText: '#FF79C6'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '8px',
    radiusMd: '14px',
    radiusLg: '20px',
    width: '1px'
  },
  glow: {
    primary: '0 0 25px rgba(255, 85, 85, 0.4)',
    secondary: '0 0 25px rgba(255, 121, 198, 0.4)',
    intensity: 0.8
  }
};

export const nordicFrost: ThemePreset = {
  id: 'nordic-frost',
  name: 'Nordic Frost',
  description: 'Deep polar navy canvas with icy turquoise and crisp frost blue highlights.',
  isDark: true,
  colors: {
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    cardBackground: '#334155',
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',
    accentPrimary: '#38BDF8',
    accentSecondary: '#818CF8',
    border: '#475569',
    glow: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    badgeText: '#38BDF8'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '6px',
    radiusMd: '12px',
    radiusLg: '18px',
    width: '1px'
  },
  glow: {
    primary: '0 0 20px rgba(56, 189, 248, 0.35)',
    secondary: '0 0 20px rgba(129, 140, 248, 0.35)',
    intensity: 0.7
  }
};

export const emeraldMatrix: ThemePreset = {
  id: 'emerald-matrix',
  name: 'Emerald Matrix',
  description: 'Terminal obsidian canvas with glowing cyber emerald green and mint highlights.',
  isDark: true,
  colors: {
    background: '#05100C',
    backgroundSecondary: '#0B2019',
    cardBackground: '#123026',
    textPrimary: '#ECFDF5',
    textSecondary: '#A7F3D0',
    textMuted: '#059669',
    accentPrimary: '#10B981',
    accentSecondary: '#34D399',
    border: '#04785744',
    glow: 'rgba(16, 185, 129, 0.4)',
    badgeBg: 'rgba(16, 185, 129, 0.2)',
    badgeText: '#34D399'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '14px',
    width: '1px'
  },
  glow: {
    primary: '0 0 25px rgba(16, 185, 129, 0.4)',
    secondary: '0 0 25px rgba(52, 211, 153, 0.4)',
    intensity: 0.8
  }
};

export const sunsetOverdrive: ThemePreset = {
  id: 'sunset-overdrive',
  name: 'Sunset Overdrive',
  description: 'Midnight plum background with synthwave orange, amber gold and warm golden aura.',
  isDark: true,
  colors: {
    background: '#180E29',
    backgroundSecondary: '#271742',
    cardBackground: '#37205C',
    textPrimary: '#FFFBEB',
    textSecondary: '#FDE68A',
    textMuted: '#9575CD',
    accentPrimary: '#F97316',
    accentSecondary: '#F59E0B',
    border: '#5B3B8C',
    glow: 'rgba(249, 115, 22, 0.4)',
    badgeBg: 'rgba(249, 115, 22, 0.2)',
    badgeText: '#FBBF24'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '8px',
    radiusMd: '14px',
    radiusLg: '22px',
    width: '1px'
  },
  glow: {
    primary: '0 0 25px rgba(249, 115, 22, 0.4)',
    secondary: '0 0 25px rgba(245, 158, 11, 0.4)',
    intensity: 0.85
  }
};

export const animeMecha: ThemePreset = {
  id: 'anime-mecha',
  name: 'Anime Mecha Tactical',
  description: 'Tactical gunmetal grey with hazard yellow warnings, white typography & crimson accents.',
  isDark: true,
  colors: {
    background: '#111827',
    backgroundSecondary: '#1F2937',
    cardBackground: '#374151',
    textPrimary: '#FFFFFF',
    textSecondary: '#E5E7EB',
    textMuted: '#9CA3AF',
    accentPrimary: '#FBBF24',
    accentSecondary: '#EF4444',
    border: '#FBBF2466',
    glow: 'rgba(251, 191, 36, 0.4)',
    badgeBg: 'rgba(251, 191, 36, 0.2)',
    badgeText: '#FBBF24'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '8px',
    width: '2px'
  },
  glow: {
    primary: '0 0 20px rgba(251, 191, 36, 0.4)',
    secondary: '0 0 20px rgba(239, 68, 68, 0.4)',
    intensity: 0.9
  }
};

export const roseGoldDark: ThemePreset = {
  id: 'rose-gold-dark',
  name: 'Rose Gold Dark Luxury',
  description: 'Muted dark quartz canvas with warm rose gold metallic accents & champagne text.',
  isDark: true,
  colors: {
    background: '#141115',
    backgroundSecondary: '#201A22',
    cardBackground: '#2E2631',
    textPrimary: '#FAF5F7',
    textSecondary: '#F3D5DF',
    textMuted: '#887480',
    accentPrimary: '#F43F5E',
    accentSecondary: '#FDE68A',
    border: '#4A3B4F',
    glow: 'rgba(244, 63, 94, 0.35)',
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    badgeText: '#FDA4AF'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '8px',
    radiusMd: '16px',
    radiusLg: '24px',
    width: '1px'
  },
  glow: {
    primary: '0 0 25px rgba(244, 63, 94, 0.35)',
    secondary: '0 0 25px rgba(253, 230, 138, 0.35)',
    intensity: 0.75
  }
};

export const solarizedDark: ThemePreset = {
  id: 'solarized-dark',
  name: 'Solarized Dark',
  description: 'Warm dark teal background with cyan, magenta, and warm yellow highlights.',
  isDark: true,
  colors: {
    background: '#002B36',
    backgroundSecondary: '#073642',
    cardBackground: '#094352',
    textPrimary: '#93A1A1',
    textSecondary: '#839496',
    textMuted: '#586E75',
    accentPrimary: '#2AA198',
    accentSecondary: '#B58900',
    border: '#105B6D',
    glow: 'rgba(42, 161, 152, 0.35)',
    badgeBg: 'rgba(42, 161, 152, 0.15)',
    badgeText: '#2AA198'
  },
  typography: {
    fontFamilyHeading: 'Inter, sans-serif',
    fontFamilyBody: 'Inter, sans-serif',
    fontFamilyCode: 'monospace'
  },
  borders: {
    radiusSm: '6px',
    radiusMd: '12px',
    radiusLg: '18px',
    width: '1px'
  },
  glow: {
    primary: '0 0 20px rgba(42, 161, 152, 0.35)',
    secondary: '0 0 20px rgba(181, 137, 0, 0.35)',
    intensity: 0.7
  }
};

export const themePresets: Record<string, ThemePreset> = {
  'void-dark': voidDark,
  'cyberpunk-2099': cyberpunk2099,
  'tokyo-night': tokyoNight,
  'monochrome-pro': monochromePro,
  'dracula-vamp': draculaVamp,
  'nordic-frost': nordicFrost,
  'emerald-matrix': emeraldMatrix,
  'sunset-overdrive': sunsetOverdrive,
  'anime-mecha': animeMecha,
  'rose-gold-dark': roseGoldDark,
  'solarized-dark': solarizedDark
};
