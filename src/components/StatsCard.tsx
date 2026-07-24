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

  // Generate stat boxes with animations - 3 columns, 2 rows
  const statsBoxes = statItems.map((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const boxWidth = 230;
    const boxHeight = 100;
    const gapX = 20;
    const gapY = 20;
    const totalWidth = 3 * boxWidth + 2 * gapX;
    const startX = (width - totalWidth) / 2;  // Center horizontally
    const startY = 110;  // Moved up from 120
    const x = startX + col * (boxWidth + gapX);
    const y = startY + row * (boxHeight + gapY);

    return `
      <!-- Stat Box ${index + 1}: ${item.label} -->
      <g>
        <!-- Box background with pulse -->
        <rect
          x="${x}"
          y="${y}"
          width="${boxWidth}"
          height="${boxHeight}"
          rx="12"
          fill="${hexToRgba(item.color, 0.12)}"
          stroke="${hexToRgba(item.color, 0.35)}"
          stroke-width="2"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(item.color, 0.12)};${hexToRgba(item.color, 0.18)};${hexToRgba(item.color, 0.12)}"
            dur="3s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            values="2;3;2"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Value with counter animation -->
        <text
          x="${x + boxWidth / 2}"
          y="${y + 50}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="32"
          font-weight="700"
          fill="${item.color}"
        >
          ${item.value}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.8s"
            begin="${index * 0.2}s"
            fill="freeze"
          />
        </text>

        <!-- Label -->
        <text
          x="${x + boxWidth / 2}"
          y="${y + 75}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="13"
          font-weight="600"
          letter-spacing="0.5"
          fill="${hexToRgba(theme.textColor, 0.65)}"
        >
          ${item.label.toUpperCase()}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.8s"
            begin="${index * 0.2 + 0.2}s"
            fill="freeze"
          />
        </text>

        <!-- Icon glow effect -->
        <circle
          cx="${x + boxWidth / 2}"
          cy="${y + 35}"
          r="3"
          fill="${item.color}"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values="3;12;3"
            dur="2.5s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2.5s"
            begin="${index * 0.3}s"
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
      aria-label="GitHub Statistics Card"
    >
      <defs>
        <!-- Gradient for background -->
        <linearGradient id="stats-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>

        <!-- Blur filter for glass effect -->
        <filter id="stats-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#stats-bg-gradient)" />

      <!-- Animated background effects -->
      ${createFloatingOrbs(width, height, 6)}
      ${createParticleAnimation(width, height, 25)}
      ${createSparkles(width, height, 18)}

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
        📊 GitHub Statistics
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
        Overall metrics
      </text>

      <!-- Stats boxes -->
      ${statsBoxes}
    </svg>
  `;
}
