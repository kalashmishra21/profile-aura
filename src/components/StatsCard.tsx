/**
 * GitHub Statistics Card Component
 */

import React from 'react';
import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, statStyle, statValueStyle, statLabelStyle, hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';

interface StatsCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StatsCard({ stats, theme, width, height }: StatsCardProps) {
  const statItems = [
    { label: 'Total Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor },
    { label: 'Pull Requests', value: formatNumber(stats.totalPRs), color: theme.secondaryColor },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: theme.accentColor },
    { label: 'Contributed To', value: formatNumber(stats.totalContributions), color: theme.primaryColor },
    { label: 'Total Stars', value: formatNumber(stats.totalStars), color: '#fbbf24' },
    { label: 'Total Forks', value: formatNumber(stats.totalForks), color: '#34d399' },
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
      <div style={titleStyle(theme)}>📊 GitHub Statistics</div>
      <div
        style={{
          fontSize: '14px',
          color: hexToRgba(theme.textColor, 0.6),
          marginBottom: '32px',
        }}
      >
        Overall contribution metrics
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'space-between',
        }}
      >
        {statItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...statStyle(theme),
              flex: '1 1 calc(33.333% - 24px)',
              minWidth: '150px',
              padding: '20px',
              background: hexToRgba(item.color, 0.05),
              borderRadius: '12px',
              border: `1px solid ${hexToRgba(item.color, 0.2)}`,
            }}
          >
            <div
              style={{
                ...statValueStyle(theme),
                color: item.color,
              }}
            >
              {item.value}
            </div>
            <div style={statLabelStyle(theme)}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Contribution Bar */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: hexToRgba(theme.textColor, 0.8),
              fontWeight: 600,
            }}
          >
            Activity Level
          </span>
          <span
            style={{
              fontSize: '14px',
              color: theme.primaryColor,
              fontWeight: 700,
            }}
          >
            {stats.totalContributions} contributions
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: hexToRgba(theme.textColor, 0.1),
            borderRadius: '6px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '75%',
              height: '100%',
              background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              borderRadius: '6px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
