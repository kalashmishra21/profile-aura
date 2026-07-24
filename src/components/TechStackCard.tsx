/**
 * Tech Stack Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { ThemeConfig, IconData } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
  createCodeRain,
  createHexPattern,
  createBorderGlow,
  createSparkles,
} from './animations.js';

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
}: TechStackCardProps): string {
  // Calculate grid layout
  const itemsPerRow = 4;
  const itemWidth = 160;
  const itemHeight = 50;
  const gap = 12;
  const startX = 40;
  const startY = 120;

  // Generate tech badges with animations
  const techBadges = technologies.map((tech, index) => {
    const col = index % itemsPerRow;
    const row = Math.floor(index / itemsPerRow);
    const x = startX + col * (itemWidth + gap);
    const y = startY + row * (itemHeight + gap);
    const techColor = tech.color || theme.primaryColor;

    return `
      <!-- Tech Badge ${index + 1}: ${tech.name} -->
      <g>
        <!-- Badge background with hover effect -->
        <rect
          x="${x}"
          y="${y}"
          width="${itemWidth}"
          height="${itemHeight}"
          rx="8"
          fill="${hexToRgba(techColor, 0.1)}"
          stroke="${hexToRgba(techColor, 0.3)}"
          stroke-width="1"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(techColor, 0.1)};${hexToRgba(techColor, 0.2)};${hexToRgba(techColor, 0.1)}"
            dur="3s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon background -->
        <rect
          x="${x + 10}"
          y="${y + 13}"
          width="24"
          height="24"
          rx="4"
          fill="${techColor}"
        >
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="${index * 0.15}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon text -->
        <text
          x="${x + 22}"
          y="${y + 30}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="700"
          fill="#ffffff"
        >
          ${tech.name.charAt(0)}
        </text>

        <!-- Tech name -->
        <text
          x="${x + 44}"
          y="${y + 30}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="600"
          fill="${theme.textColor}"
        >
          ${tech.name}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.5s"
            begin="${index * 0.1}s"
            fill="freeze"
          />
        </text>

        <!-- Glow effect on icon -->
        <circle
          cx="${x + 22}"
          cy="${y + 25}"
          r="2"
          fill="${techColor}"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="2;15;2"
            dur="2.5s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2.5s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    `;
  }).join('');

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tech Stack Card"
    >
      <defs>
        <!-- Gradient for background -->
        <linearGradient id="tech-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#tech-bg-gradient)" />

      <!-- Animated background effects -->
      ${createHexPattern(width, height)}
      ${createCodeRain(width, height, 15)}
      ${createSparkles(width, height, 25)}

      <!-- Glass card effect -->
      <rect
        x="5"
        y="5"
        width="${width - 10}"
        height="${height - 10}"
        rx="12"
        fill="${hexToRgba(theme.backgroundColor, 0.3)}"
        stroke="${hexToRgba(theme.primaryColor, 0.2)}"
        stroke-width="1"
      />

      <!-- Border glow animation -->
      ${createBorderGlow(width, height, 15)}

      <!-- Title -->
      <text
        x="40"
        y="50"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="24"
        font-weight="700"
        fill="${theme.textColor}"
      >
        ${title}
      </text>

      <!-- Subtitle -->
      <text
        x="40"
        y="75"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="14"
        font-weight="400"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        Technologies I work with
      </text>

      <!-- Tech badges -->
      ${techBadges}
    </svg>
  `;
}
