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

  const bio = config.profile.bio || data.bio || 'Open Source Developer building innovative tools and web experiences.';
  const location = config.profile.location || data.location;
  const company = config.profile.company || data.company;
  const website = config.profile.website || data.website;
  const githubUrl = `github.com/${data.username || config.github.username}`;
  const metaParts = [
    location ? `📍 ${location}` : '',
    `💻 GitHub`,
    company ? `🏢 ${company}` : '',
    website ? `🌐 ${website}` : ''
  ].filter(Boolean);
  const metadataText = metaParts.join('   •   ');

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(15, 15, 20, 0.2)',
        color: '#ffffff',
        padding: '24px 32px',
        borderRadius: theme.borders.radiusLg,
        border: `1px solid ${theme.colors.border}`,
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

  return sanitizeSvgString(rawSvg, theme);
}
