/**
 * Top Languages Card Component
 */

import React from 'react';
import type { LanguageStats, ThemeConfig } from '../types/index.js';
import { glassCardStyle, titleStyle, hexToRgba } from './styles.js';

interface LanguagesCardProps {
  languages: LanguageStats[];
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function LanguagesCard({ languages, theme, width, height }: LanguagesCardProps) {
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
      <div style={titleStyle(theme)}>💻 Most Used Languages</div>
      <div
        style={{
          fontSize: '14px',
          color: hexToRgba(theme.textColor, 0.6),
          marginBottom: '32px',
        }}
      >
        Based on repository analysis
      </div>

      {/* Languages List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {languages.map((lang, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Color Dot */}
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: lang.color,
                boxShadow: `0 0 8px ${hexToRgba(lang.color, 0.5)}`,
              }}
            />

            {/* Language Name */}
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: theme.textColor,
                minWidth: '120px',
              }}
            >
              {lang.name}
            </div>

            {/* Progress Bar */}
            <div
              style={{
                flex: 1,
                height: '8px',
                background: hexToRgba(theme.textColor, 0.1),
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: `${lang.percentage}%`,
                  height: '100%',
                  background: lang.color,
                  borderRadius: '4px',
                }}
              />
            </div>

            {/* Percentage */}
            <div
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: lang.color,
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              {lang.percentage.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

      {/* Language Bubbles Visual */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '32px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {languages.slice(0, 5).map((lang, index) => (
          <div
            key={index}
            style={{
              padding: '8px 16px',
              background: hexToRgba(lang.color, 0.15),
              border: `1px solid ${hexToRgba(lang.color, 0.3)}`,
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: lang.color,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: lang.color,
              }}
            />
            {lang.name}
          </div>
        ))}
      </div>
    </div>
  );
}
