/**
 * Contribution Streak Card Component
 */

import React from 'react';
import type { StreakData, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';

interface StreakCardProps {
  streak: StreakData;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StreakCard({ streak, theme, width, height }: StreakCardProps) {
  return (
    <div
      style={{
        ...glassCardStyle(theme),
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {/* Fire Emoji Icon */}
      <div
        style={{
          fontSize: '64px',
          marginBottom: '16px',
        }}
      >
        🔥
      </div>

      {/* Title */}
      <div style={{ ...titleStyle(theme), marginBottom: '32px' }}>
        Contribution Streak
      </div>

      {/* Streak Stats */}
      <div
        style={{
          display: 'flex',
          gap: '48px',
          marginBottom: '32px',
        }}
      >
        {/* Current Streak */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {streak.current}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: hexToRgba(theme.textColor, 0.6),
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Current Streak
          </div>
          <div
            style={{
              fontSize: '12px',
              color: hexToRgba(theme.textColor, 0.5),
            }}
          >
            {streak.current === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Longest Streak */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: theme.accentColor,
            }}
          >
            {streak.longest}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: hexToRgba(theme.textColor, 0.6),
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Longest Streak
          </div>
          <div
            style={{
              fontSize: '12px',
              color: hexToRgba(theme.textColor, 0.5),
            }}
          >
            {streak.longest === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>

      {/* Total Contributions */}
      <div
        style={{
          width: '100%',
          padding: '20px',
          background: hexToRgba(theme.primaryColor, 0.1),
          borderRadius: '12px',
          border: `1px solid ${hexToRgba(theme.primaryColor, 0.2)}`,
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: theme.primaryColor,
            marginBottom: '4px',
          }}
        >
          {formatNumber(streak.totalContributions)}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: hexToRgba(theme.textColor, 0.6),
            textTransform: 'uppercase',
          }}
        >
          Total Contributions
        </div>
      </div>

      {/* Motivational Message */}
      <div
        style={{
          marginTop: '24px',
          fontSize: '14px',
          color: hexToRgba(theme.textColor, 0.7),
          fontStyle: 'italic',
        }}
      >
        {streak.current > 0
          ? `Keep the streak alive! 💪`
          : 'Start your contribution streak today! 🚀'}
      </div>
    </div>
  );
}
