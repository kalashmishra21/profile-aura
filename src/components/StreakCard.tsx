/**
 * Contribution Streak Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { StreakData, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';
import {
  createRippleEffect,
  createBorderGlow,
  createSparkles,
  createFloatingOrbs,
} from './animations.js';

interface StreakCardProps {
  streak: StreakData;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StreakCard({ streak, theme, width, height }: StreakCardProps): string {
  const centerX = width / 2;
  const motivationalMessage = streak.current > 0
    ? 'Keep the streak alive! 💪'
    : 'Start your contribution streak today! 🚀';

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Contribution Streak Card"
    >
      <defs>
        <!-- Gradient for background -->
        <linearGradient id="streak-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>

        <!-- Gradient for current streak number -->
        <linearGradient id="current-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.primaryColor}" />
          <stop offset="100%" stop-color="${theme.secondaryColor}" />
        </linearGradient>

        <!-- Fire glow filter -->
        <filter id="fire-glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#streak-bg-gradient)" />

      <!-- Animated background effects -->
      ${createFloatingOrbs(width, height, 5)}
      ${createSparkles(width, height, 30)}

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

      <!-- Fire Emoji with pulse animation -->
      <text
        x="${centerX}"
        y="80"
        text-anchor="middle"
        font-size="64"
        filter="url(#fire-glow)"
      >
        🔥
        <animate
          attributeName="font-size"
          values="64;72;64"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="80;75;80"
          dur="2s"
          repeatCount="indefinite"
        />
      </text>

      <!-- Ripple effect behind fire -->
      ${createRippleEffect(centerX, 70, 80)}

      <!-- Title -->
      <text
        x="${centerX}"
        y="140"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="24"
        font-weight="700"
        fill="${theme.textColor}"
      >
        Contribution Streak
      </text>

      <!-- Current Streak -->
      <g>
        <!-- Number with gradient -->
        <text
          x="${centerX - 80}"
          y="230"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="48"
          font-weight="700"
          fill="url(#current-gradient)"
        >
          ${streak.current}
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </text>

        <!-- Label -->
        <text
          x="${centerX - 80}"
          y="255"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="600"
          fill="${hexToRgba(theme.textColor, 0.6)}"
          letter-spacing="0.5"
        >
          CURRENT STREAK
        </text>

        <!-- Days -->
        <text
          x="${centerX - 80}"
          y="275"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="12"
          fill="${hexToRgba(theme.textColor, 0.5)}"
        >
          ${streak.current === 1 ? 'day' : 'days'}
        </text>
      </g>

      <!-- Longest Streak -->
      <g>
        <!-- Number -->
        <text
          x="${centerX + 80}"
          y="230"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="48"
          font-weight="700"
          fill="${theme.accentColor}"
        >
          ${streak.longest}
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </text>

        <!-- Label -->
        <text
          x="${centerX + 80}"
          y="255"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="600"
          fill="${hexToRgba(theme.textColor, 0.6)}"
          letter-spacing="0.5"
        >
          LONGEST STREAK
        </text>

        <!-- Days -->
        <text
          x="${centerX + 80}"
          y="275"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="12"
          fill="${hexToRgba(theme.textColor, 0.5)}"
        >
          ${streak.longest === 1 ? 'day' : 'days'}
        </text>
      </g>

      <!-- Total Contributions Box -->
      <g>
        <!-- Box background with pulse -->
        <rect
          x="60"
          y="${height - 130}"
          width="${width - 120}"
          height="80"
          rx="12"
          fill="${hexToRgba(theme.primaryColor, 0.1)}"
          stroke="${hexToRgba(theme.primaryColor, 0.2)}"
          stroke-width="1"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(theme.primaryColor, 0.1)};${hexToRgba(theme.primaryColor, 0.15)};${hexToRgba(theme.primaryColor, 0.1)}"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Number -->
        <text
          x="${centerX}"
          y="${height - 90}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="32"
          font-weight="700"
          fill="${theme.primaryColor}"
        >
          ${formatNumber(streak.totalContributions)}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="1s"
            fill="freeze"
          />
        </text>

        <!-- Label -->
        <text
          x="${centerX}"
          y="${height - 65}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="600"
          fill="${hexToRgba(theme.textColor, 0.6)}"
          letter-spacing="0.5"
        >
          TOTAL CONTRIBUTIONS
        </text>
      </g>

      <!-- Motivational Message -->
      <text
        x="${centerX}"
        y="${height - 20}"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="14"
        font-style="italic"
        fill="${hexToRgba(theme.textColor, 0.7)}"
      >
        ${motivationalMessage}
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
    </svg>
  `;
}
