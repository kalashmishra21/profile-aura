import React from 'react';
import { ThemeTokens } from '../types/theme.js';

export interface DecorationProps {
  theme: ThemeTokens;
  accentOffset?: number;
}

export const AccentBar: React.FC<DecorationProps> = ({ theme, accentOffset = 0 }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: `${Math.max(0, accentOffset)}px`,
      width: '4px',
      height: '100%',
      backgroundImage: `linear-gradient(180deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`,
      borderTopLeftRadius: theme.borders.radiusLg,
      borderBottomLeftRadius: theme.borders.radiusLg,
      boxShadow: `0 0 12px ${theme.colors.accentPrimary}`
    }}
  />
);

export const GlowAura: React.FC<DecorationProps> = ({ theme }) => (
  <div
    style={{
      position: 'absolute',
      top: '-60px',
      right: '-40px',
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      backgroundImage: `radial-gradient(circle, ${theme.colors.accentPrimary}44 0%, ${theme.colors.accentSecondary}11 60%, transparent 80%)`,
      filter: 'blur(30px)'
    }}
  />
);

export const TechFrame: React.FC<DecorationProps> = ({ theme }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '14px',
      right: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '10px',
      fontFamily: theme.typography.fontFamilyCode,
      color: theme.colors.textMuted,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      opacity: 0.8
    }}
  >
    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.colors.accentPrimary }} />
    <span>PROFILE AURA v2.0 • EDITORIAL</span>
  </div>
);

export const GridPatternOverlay: React.FC<DecorationProps> = ({ theme }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `radial-gradient(${theme.colors.border} 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
      opacity: 0.25,
      pointerEvents: 'none'
    }}
  />
);
