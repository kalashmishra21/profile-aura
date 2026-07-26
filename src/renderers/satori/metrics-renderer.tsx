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

  const fmt = (val: number | undefined): string =>
    val !== undefined && val !== null ? val.toLocaleString() : '-';

  // 8 cards — same visual layout as the approved design.
  const metricItems = [
    {
      label: 'CONTRIBUTIONS',
      val: fmt(stats.totalContributions),
      sub: 'Total Activity',
      color: theme.colors.accentPrimary
    },
    {
      label: 'COMMITS',
      val: fmt(stats.totalCommits),
      sub: 'Code Commits',
      color: theme.colors.accentSecondary
    },
    {
      label: 'PULL REQUESTS',
      val: fmt(stats.totalPRs),
      sub: 'Merged PRs',
      color: '#3B82F6'
    },
    {
      label: 'ISSUES',
      val: fmt(stats.totalIssues),
      sub: 'Resolved Issues',
      color: '#EAB308'
    },
    {
      label: 'REPOSITORIES',
      val: publicRepos.toLocaleString(),
      sub: 'Total Projects',
      color: theme.colors.textPrimary
    },
    {
      label: 'TOTAL STARS',
      val: stats.totalStars.toLocaleString(),
      sub: 'Stars Earned',
      color: '#EAB308'
    },
    {
      label: 'CURRENT STREAK',
      val: fmt(stats.currentStreak),
      sub: 'Days Active',
      color: theme.colors.accentSecondary
    },
    {
      label: 'LONGEST STREAK',
      val: fmt(stats.longestStreak),
      sub: 'Personal Best',
      color: theme.colors.accentPrimary
    }
  ];

  const half = Math.ceil(metricItems.length / 2);
  const row1 = metricItems.slice(0, half);
  const row2 = metricItems.slice(half);

  const cardStyle = (color: string): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    width: '172px',
    backgroundColor: 'rgba(25, 25, 35, 0.3)',
    border: `1px solid rgba(255, 255, 255, 0.05)`,
    borderTop: `2px solid ${color}`,
    borderRadius: theme.borders.radiusMd,
    padding: '12px 14px',
    boxSizing: 'border-box',
    alignItems: 'center',
    textAlign: 'center',
    filter: 'url(#glassShadow)'
  });

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background || '#0a0a0a',
        color: theme.colors.textPrimary,
        padding: '24px 28px',
        borderRadius: theme.borders.radiusLg,
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        fontFamily: theme.typography.fontFamilyHeading,
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div id="pulsing-glow" style={{ position: 'absolute', top: '-150px', right: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)' }} />
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: theme.colors.accentPrimary,
          fontWeight: 800,
          marginBottom: '20px'
        }}
      >
        // DEVELOPER PERFORMANCE & METRICS DASHBOARD
      </div>

      {/* Row 1 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%',
          marginBottom: '14px'
        }}
      >
        {row1.map((item, idx) => (
          <div key={idx} id="floating-element" style={cardStyle(item.color)}>
            <span style={{ fontSize: '9px', fontWeight: 800, color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {item.label}
            </span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: item.color, margin: '4px 0 2px 0' }}>
              {item.val}
            </span>
            <span style={{ fontSize: '9px', color: theme.colors.textSecondary }}>
              {item.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%'
        }}
      >
        {row2.map((item, idx) => (
          <div key={idx} id="floating-element" style={cardStyle(item.color)}>
            <span style={{ fontSize: '9px', fontWeight: 800, color: theme.colors.textMuted, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {item.label}
            </span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: item.color, margin: '4px 0 2px 0' }}>
              {item.val}
            </span>
            <span style={{ fontSize: '9px', color: theme.colors.textSecondary }}>
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 240,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg);
}
