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
      width: '6px',
      height: '100%',
      backgroundColor: theme.colors.accentPrimary,
      borderTopLeftRadius: theme.borders.radiusLg,
      borderBottomLeftRadius: theme.borders.radiusLg
    }}
  />
);

export const GlowAura: React.FC<DecorationProps> = ({ theme }) => (
  <div
    style={{
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      backgroundColor: theme.colors.accentPrimary,
      opacity: 0.15,
      filter: 'blur(40px)'
    }}
  />
);

export const TechFrame: React.FC<DecorationProps> = ({ theme }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '12px',
      right: '20px',
      display: 'flex',
      fontSize: '10px',
      fontFamily: theme.typography.fontFamilyCode,
      color: theme.colors.textMuted,
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }}
  >
    // PROFILE_AURA_V2_EDITORIAL
  </div>
);
