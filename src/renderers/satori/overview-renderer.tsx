import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../types/github.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriOverviewEngineOptions {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export async function renderSatoriOverviewSvg(options: SatoriOverviewEngineOptions): Promise<string> {
  const { config, data, theme } = options;
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    {
      name: 'Inter',
      data: fontData,
      weight: 400 as const,
      style: 'normal' as const
    }
  ] : [];

  const bio = data.bio || 'Building high-performance tools, AI agents, and editorial web experiences.';
  const location = data.location ? `📍 ${data.location}` : '';
  const company = data.company ? `🏢 ${data.company}` : '';
  const website = data.website ? `🌐 ${data.website}` : '';
  const metadataText = [location, company, website].filter(Boolean).join('   •   ');

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
        padding: '24px 32px',
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.widthNormal} solid ${theme.colors.border}`,
        fontFamily: theme.typography.fontFamilyHeading,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: theme.colors.accentPrimary,
          fontWeight: 800,
          marginBottom: '10px'
        }}
      >
        // EDITORIAL BIOGRAPHY & PROFILE OVERVIEW
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: '14px',
          color: theme.colors.textPrimary,
          lineHeight: 1.6,
          marginBottom: '14px',
          maxWidth: '700px',
          textAlign: 'center'
        }}
      >
        {bio}
      </div>

      {metadataText ? (
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            color: theme.colors.textMuted,
            fontWeight: 500
          }}
        >
          {metadataText}
        </div>
      ) : null}
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 160,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg);
}
