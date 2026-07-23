/**
 * Recent Activity Card Component
 */

import React from 'react';
import type { Repository, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, hexToRgba } from './styles.js';
import { getRelativeTime } from '../utils/helpers.js';

interface ActivityCardProps {
  repositories: Repository[];
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function ActivityCard({ repositories, theme, width, height }: ActivityCardProps) {
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
      <div style={titleStyle(theme)}>⚡ Recent Activity</div>
      <div
        style={{
          fontSize: '14px',
          color: hexToRgba(theme.textColor, 0.6),
          marginBottom: '24px',
        }}
      >
        Latest repository updates
      </div>

      {/* Repository List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {repositories.slice(0, 5).map((repo, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: hexToRgba(theme.textColor, 0.03),
              border: `1px solid ${hexToRgba(theme.textColor, 0.1)}`,
              borderRadius: '10px',
            }}
          >
            {/* Repo Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: theme.primaryColor,
                }}
              >
                📦 {repo.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: hexToRgba(theme.textColor, 0.5),
                }}
              >
                {getRelativeTime(repo.updatedAt)}
              </div>
            </div>

            {/* Description */}
            {repo.description && (
              <div
                style={{
                  fontSize: '14px',
                  color: hexToRgba(theme.textColor, 0.7),
                  lineHeight: 1.4,
                }}
              >
                {repo.description.length > 80
                  ? repo.description.substring(0, 80) + '...'
                  : repo.description}
              </div>
            )}

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              {/* Language */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: hexToRgba(theme.textColor, 0.6),
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: theme.accentColor,
                  }}
                />
                {repo.language}
              </div>

              {/* Stars */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: hexToRgba(theme.textColor, 0.6),
                }}
              >
                ⭐ {repo.stars}
              </div>

              {/* Forks */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: hexToRgba(theme.textColor, 0.6),
                }}
              >
                🔱 {repo.forks}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
