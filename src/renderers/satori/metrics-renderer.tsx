import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../types/github.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriMetricsEngineOptions {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export async function renderSatoriMetricsSvg(options: SatoriMetricsEngineOptions): Promise<string> {
  const { data, theme } = options;
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    {
      name: 'Inter',
      data: fontData,
      weight: 400 as const,
      style: 'normal' as const
    }
  ] : [];

  const { stats, publicRepos, followers, following } = data;

  // Only real, verifiable metrics from the GitHub REST API
  const metricItems = [
    {
      label: 'PUBLIC REPOS',
      val: publicRepos.toLocaleString(),
      sub: 'Repositories',
      color: theme.colors.accentPrimary
    },
    {
      label: 'TOTAL STARS',
      val: stats.totalStars.toLocaleString(),
      sub: 'Stars Earned',
      color: '#EAB308'
    },
    {
      label: 'FOLLOWERS',
      val: followers.toLocaleString(),
      sub: 'Community',
      color: theme.colors.accentSecondary
    },
    {
      label: 'FOLLOWING',
      val: following.toLocaleString(),
      sub: 'Following',
      color: theme.colors.textSecondary
    }
  ];

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
        padding: '28px 32px',
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.widthNormal} solid ${theme.colors.border}`,
        fontFamily: theme.typography.fontFamilyHeading,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          fontSize: '10px',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: theme.colors.accentPrimary,
          fontWeight: 800,
          marginBottom: '20px'
        }}
      >
        // PROFILE METRICS & COMMUNITY REACH
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          width: '100%'
        }}
      >
        {metricItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              backgroundColor: `${theme.colors.cardBackground}EE`,
              border: `1px solid ${theme.colors.border}`,
              borderTop: `2px solid ${item.color}`,
              borderRadius: theme.borders.radiusMd,
              padding: '18px 16px',
              boxSizing: 'border-box',
              alignItems: 'center',
              textAlign: 'center',
              gap: '4px'
            }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                color: theme.colors.textMuted,
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: item.color,
                lineHeight: 1,
                marginTop: '4px'
              }}
            >
              {item.val}
            </span>
            <span
              style={{
                fontSize: '10px',
                color: theme.colors.textMuted,
                marginTop: '2px'
              }}
            >
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 180,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg);
}
