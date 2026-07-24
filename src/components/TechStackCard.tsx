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
  // Calculate grid layout - 4 items per row for better fit
  const itemsPerRow = 4;
  const itemWidth = 170;
  const itemHeight = 56;
  const gap = 16;
  const totalGridWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * gap;
  const startX = (width - totalGridWidth) / 2; // Center the grid
  const startY = 120;

  // Generate tech badges with proper icons
  const techBadges = technologies.map((tech, index) => {
    const col = index % itemsPerRow;
    const row = Math.floor(index / itemsPerRow);
    const x = startX + col * (itemWidth + gap);
    const y = startY + row * (itemHeight + gap);
    const techColor = tech.color || theme.primaryColor;

    // First letter for icon
    const iconLetter = tech.name.charAt(0).toUpperCase();

    return `
      <!-- Tech Badge ${index + 1}: ${tech.name} -->
      <g>
        <!-- Badge background with hover effect -->
        <rect
          x="${x}"
          y="${y}"
          width="${itemWidth}"
          height="${itemHeight}"
          rx="10"
          fill="${hexToRgba(techColor, 0.12)}"
          stroke="${hexToRgba(techColor, 0.35)}"
          stroke-width="2"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(techColor, 0.12)};${hexToRgba(techColor, 0.2)};${hexToRgba(techColor, 0.12)}"
            dur="3s"
            begin="${index * 0.15}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            values="2;3;2"
            dur="2s"
            begin="${index * 0.15}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon circle background -->
        <circle
          cx="${x + 30}"
          cy="${y + 28}"
          r="18"
          fill="${techColor}"
        >
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2.5s"
            begin="${index * 0.1}s"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Icon letter -->
        <text
          x="${x + 30}"
          y="${y + 35}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="16"
          font-weight="700"
          fill="#ffffff"
        >
          ${iconLetter}
        </text>

        <!-- Tech name -->
        <text
          x="${x + 56}"
          y="${y + 32}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="15"
          font-weight="600"
          fill="${theme.textColor}"
        >
          ${tech.name.length > 12 ? tech.name.substring(0, 11) + '.' : tech.name}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.5s"
            begin="${index * 0.08}s"
            fill="freeze"
          />
        </text>

        <!-- Glow effect on icon -->
        <circle
          cx="${x + 30}"
          cy="${y + 28}"
          r="4"
          fill="${techColor}"
          opacity="0.7"
        >
          <animate
            attributeName="r"
            values="4;20;4"
            dur="2.5s"
            begin="${index * 0.15}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;0;0.7"
            dur="2.5s"
            begin="${index * 0.15}s"
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
      ${createCodeRain(width, height, 12)}
      ${createSparkles(width, height, 20)}

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
        x="${width / 2}"
        y="50"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="24"
        font-weight="700"
        fill="${theme.textColor}"
      >
        ${title}
      </text>

      <!-- Subtitle -->
      <text
        x="${width / 2}"
        y="75"
        text-anchor="middle"
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
