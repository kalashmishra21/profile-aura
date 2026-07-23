/**
 * Tech Stack Card Component
 */

import React from 'react';
import type { ThemeConfig, IconData } from '../types/index.js';
import { glassCardStyle, titleStyle, hexToRgba } from './styles.js';

interface TechStackCardProps {
  technologies: IconData[];
  theme: ThemeConfig;
  width: number;
  height: number;
  title?: string;
  layout?: 'grid' | 'rows';
}

export function TechStackCard({
  technologies,
  theme,
  width,
  height,
  title = '🛠️ Tech Stack',
}: TechStackCardProps) {
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
        <div style={titleStyle(theme)}>{title}</div>
        <div
          style={{
            fontSize: '14px',
            color: hexToRgba(theme.textColor, 0.6),
          }}
        >
          Technologies I work with
        </div>
      </div>

      {/* Tech Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {technologies.map((tech, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              background: hexToRgba(tech.color || theme.primaryColor, 0.1),
              border: `1px solid ${hexToRgba(tech.color || theme.primaryColor, 0.3)}`,
              borderRadius: '8px',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: tech.color || theme.primaryColor,
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {tech.name.charAt(0)}
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: theme.textColor,
              }}
            >
              {tech.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
