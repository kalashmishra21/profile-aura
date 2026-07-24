/**
 * GitHub Statistics Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';
import {
  createParticleAnimation,
  createFloatingOrbs,
  createBorderGlow,
  createSparkles,
} from './animations.js';

interface StatsCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StatsCard({ stats, theme, width, height }: StatsCardProps): string {
  const statItems = [
    { label: 'Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor },
    { label: 'PRs', value: formatNumber(stats.totalPRs), color: theme.secondaryColor },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: theme.accentColor },
    { label: 'Stars', value: formatNumber(stats.totalStars), color: '#fbbf24' },
    { label: 'Forks', value: formatNumber(stats.totalForks), color: '#34d399' },
    { label: 'Contributions', value: formatNumber(stats.totalContributions), color: theme.primaryColor },
  ];

  // 3 columns, 2 rows - properly calculated
  const cols = 3;
  const rows = 2;
  const boxWidth = 220;
  const boxHeight = 90;
  const gapX = 28;
  const gapY = 20;
  
  // Calculate grid dimensions and center it
  const gridWidth = cols * boxWidth + (cols - 1) * gapX;
  const gridHeight = rows * boxHeight + (rows - 1) * gapY;
  const startX = (width - gridWidth) / 2;
  const startY = 100; // Start position

  const statsBoxes = statItems.map((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = startX + col * (boxWidth + gapX);
    const y = startY + row * (boxHeight + gapY);

    return `
      <!-- Stat: ${item.label} -->
      <g>
        <!-- Box -->
        <rect
          x="${x}"
          y="${y}"
          width="${boxWidth}"
          height="${boxHeight}"
          rx="10"
          fill="${hexToRgba(item.color, 0.15)}"
          stroke="${hexToRgba(item.color, 0.4)}"
          stroke-width="2"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.7;0.4"
            dur="3s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Value -->
        <text
          x="${x + boxWidth / 2}"
          y="${y + 42}"
          text-anchor="middle"
          font-family="'Inter', sans-serif"
          font-size="28"
          font-weight="700"
          fill="${item.color}"
        >
          ${item.value}
        </text>

        <!-- Label -->
        <text
          x="${x + boxWidth / 2}"
          y="${y + 65}"
          text-anchor="middle"
          font-family="'Inter', sans-serif"
          font-size="12"
          font-weight="600"
          letter-spacing="0.5"
          fill="${hexToRgba(theme.textColor, 0.6)}"
        >
          ${item.label.toUpperCase()}
        </text>
      </g>
    `;
  }).join('');

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GitHub Statistics Card"
    >
      <defs>
        <linearGradient id="stats-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#stats-bg-gradient)" />

      <!-- Animated background -->
      ${createFloatingOrbs(width, height, 5)}
      ${createParticleAnimation(width, height, 20)}
      ${createSparkles(width, height, 15)}

      <!-- Glass effect -->
      <rect
        x="5"
        y="5"
        width="${width - 10}"
        height="${height - 10}"
        rx="12"
        fill="${hexToRgba(theme.backgroundColor, 0.2)}"
        stroke="${hexToRgba(theme.primaryColor, 0.3)}"
        stroke-width="1"
      />

      <!-- Title -->
      <text
        x="${width / 2}"
        y="45"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="22"
        font-weight="700"
        fill="${theme.textColor}"
      >
        📊 GitHub Statistics
      </text>

      <!-- Subtitle -->
      <text
        x="${width / 2}"
        y="68"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        Overall metrics
      </text>

      <!-- Stats boxes -->
      ${statsBoxes}
    </svg>
  `;
}
