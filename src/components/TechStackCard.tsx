/**
 * Tech Stack Card Component with Icons
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
  layout = 'grid',
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
      <div style={titleStyle(theme)}>{title}</div>
      <div
        style={{
          fontSize: '14px',
          color: hexToRgba(theme.textColor, 0.6),
          marginBottom: '32px',
        }}
      >
        Technologies I work with
      </div>

      {/* Tech Grid/Rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: layout === 'grid' ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: layout === 'grid' ? 'flex-start' : 'flex-start',
        }}
      >
        {technologies.map((tech, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: hexToRgba(tech.color || theme.primaryColor, 0.1),
              border: `1px solid ${hexToRgba(tech.color || theme.primaryColor, 0.3)}`,
              borderRadius: '10px',
              width: layout === 'grid' ? 'auto' : '100%',
            }}
          >
            {/* Icon - Simple colored box instead of SVG */}
            <div
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: tech.color || theme.primaryColor,
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  color: '#ffffff',
                }}
              >
                {tech.name.charAt(0)}
              </div>
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

      {/* Footer Stats */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '24px',
          borderTop: `1px solid ${hexToRgba(theme.textColor, 0.1)}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              color: hexToRgba(theme.textColor, 0.6),
            }}
          >
            Total Technologies
          </span>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: theme.primaryColor,
            }}
          >
            {technologies.length}
          </span>
        </div>
      </div>
    </div>
  );
}
