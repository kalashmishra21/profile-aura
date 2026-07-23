/**
 * Header/Profile Card Component
 */

import React from 'react';
import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, subtitleStyle, hexToRgba } from './styles.js';

interface HeaderCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
  statusLine?: string;
}

export function HeaderCard({ stats, theme, width, height, statusLine }: HeaderCardProps) {
  return (
    <div
      style={{
        ...glassCardStyle(theme),
        width,
        height,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      {/* Avatar with glow effect */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            filter: 'blur(20px)',
            opacity: 0.6,
          }}
        />
        <img
          src={stats.avatarUrl}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: `3px solid ${theme.primaryColor}`,
            position: 'relative',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '12px',
        }}
      >
        {/* Name */}
        <div style={titleStyle(theme)}>{stats.name}</div>

        {/* Username */}
        <div
          style={{
            fontSize: '18px',
            color: hexToRgba(theme.textColor, 0.6),
            fontWeight: 500,
          }}
        >
          @{stats.username}
        </div>

        {/* Bio */}
        {stats.bio && (
          <div
            style={{
              fontSize: '16px',
              color: hexToRgba(theme.textColor, 0.8),
              lineHeight: 1.5,
              marginTop: '8px',
            }}
          >
            {stats.bio}
          </div>
        )}

        {/* Status Line (AI-generated or custom) */}
        {statusLine && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
              padding: '12px 16px',
              background: hexToRgba(theme.primaryColor, 0.1),
              borderRadius: '8px',
              border: `1px solid ${hexToRgba(theme.primaryColor, 0.3)}`,
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: theme.textColor,
                fontWeight: 500,
              }}
            >
              {statusLine}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '16px',
          }}
        >
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
                textTransform: 'uppercase',
              }}
            >
              Repositories
            </div>
          </div>

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
                textTransform: 'uppercase',
              }}
            >
              Followers
            </div>
          </div>

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
                textTransform: 'uppercase',
              }}
            >
              Stars
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
