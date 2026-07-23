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
        flexDirection: 'column',
        background: theme.backgroundColor,
        borderRadius: theme.borderRadius,
        padding: '32px',
        border: `1px solid ${hexToRgba(theme.primaryColor, 0.3)}`,
        width,
        height,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Avatar */}
        <img
          src={stats.avatarUrl}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: `3px solid ${theme.primaryColor}`,
          }}
        />

        {/* Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: theme.textColor,
              marginBottom: '4px',
            }}
          >
            {stats.name}
          </div>

          {/* Username */}
          <div
            style={{
              fontSize: '16px',
              color: hexToRgba(theme.textColor, 0.6),
            }}
          >
            @{stats.username}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          marginTop: '24px',
        }}
      >
        {/* Repos */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: theme.primaryColor,
            }}
          >
            {stats.repositories}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: hexToRgba(theme.textColor, 0.6),
            }}
          >
            Repositories
          </div>
        </div>

        {/* Followers */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: theme.secondaryColor,
            }}
          >
            {stats.followers}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: hexToRgba(theme.textColor, 0.6),
            }}
          >
            Followers
          </div>
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: theme.accentColor,
            }}
          >
            {stats.totalStars}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: hexToRgba(theme.textColor, 0.6),
            }}
          >
            Stars
          </div>
        </div>
      </div>
    </div>
  );
}
