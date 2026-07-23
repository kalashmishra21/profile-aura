/**
 * Header/Profile Card Component
 */

import React from 'react';
import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';

interface HeaderCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
  statusLine?: string;
}

export function HeaderCard({ stats, theme, width, height }: HeaderCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: theme.backgroundColor,
        borderRadius: theme.borderRadius,
        padding: '32px',
        border: `1px solid ${hexToRgba(theme.primaryColor, 0.3)}`,
        width,
        height,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {/* Avatar */}
      <div style={{ display: 'flex' }}>
        <img
          src={stats.avatarUrl}
          width="100"
          height="100"
          style={{
            borderRadius: '50%',
            border: `3px solid ${theme.primaryColor}`,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          marginLeft: '32px',
        }}
      >
        {/* Name & Username - SINGLE div with line break */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px', fontWeight: 700, color: theme.textColor }}>
            {stats.name}
          </span>
          <span style={{ fontSize: '16px', color: hexToRgba(theme.textColor, 0.6), marginTop: '4px' }}>
            @{stats.username}
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: theme.primaryColor }}>
              {stats.repositories}
            </span>
            <span style={{ fontSize: '12px', color: hexToRgba(theme.textColor, 0.6) }}>
              Repos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: theme.secondaryColor }}>
              {stats.followers}
            </span>
            <span style={{ fontSize: '12px', color: hexToRgba(theme.textColor, 0.6) }}>
              Followers
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: theme.accentColor }}>
              {stats.totalStars}
            </span>
            <span style={{ fontSize: '12px', color: hexToRgba(theme.textColor, 0.6) }}>
              Stars
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
