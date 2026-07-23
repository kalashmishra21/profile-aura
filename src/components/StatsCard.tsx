/**
 * GitHub Statistics Card Component
 */

import React from 'react';
import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';

interface StatsCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StatsCard({ stats, theme, width, height }: StatsCardProps) {
  const statItems = [
    { label: 'Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor },
    { label: 'PRs', value: formatNumber(stats.totalPRs), color: theme.secondaryColor },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: theme.accentColor },
    { label: 'Stars', value: formatNumber(stats.totalStars), color: '#fbbf24' },
    { label: 'Forks', value: formatNumber(stats.totalForks), color: '#34d399' },
    { label: 'Contributions', value: formatNumber(stats.totalContributions), color: theme.primaryColor },
  ];

  return (
    <div
      style={{
        ...glassCardStyle(theme),
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
        <div style={titleStyle(theme)}>📊 GitHub Statistics</div>
        <div
          style={{
            fontSize: '14px',
            color: hexToRgba(theme.textColor, 0.6),
          }}
        >
          Overall metrics
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {statItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '30%',
              padding: '16px',
              background: hexToRgba(item.color, 0.1),
              borderRadius: '12px',
              border: `1px solid ${hexToRgba(item.color, 0.3)}`,
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: item.color,
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: hexToRgba(theme.textColor, 0.6),
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
