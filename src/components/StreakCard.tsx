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

      <!-- Fire Emoji with pulse animation (centered top) -->
      <text
        x="${centerX}"
        y="70"
        text-anchor="middle"
        font-size="48"
        filter="url(#fire-glow)"
      >
        🔥
        <animate
          attributeName="font-size"
          values="48;54;48"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          values="70;66;70"
          dur="2s"
          repeatCount="indefinite"
        />
      </text>

      <!-- Ripple effect behind fire -->
      ${createRippleEffect(centerX, 60, 60)}

      <!-- Title -->
      <text
        x="${centerX}"
        y="120"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="20"
        font-weight="700"
        fill="${theme.textColor}"
      >
        Contribution Streak
      </text>

      <!-- Current and Longest Streak Side by Side -->
      <g transform="translate(${centerX - 150}, 160)">
        <!-- Current Streak Box -->
        <rect
          x="0"
          y="0"
          width="140"
          height="80"
          rx="10"
          fill="${hexToRgba(theme.primaryColor, 0.15)}"
          stroke="${hexToRgba(theme.primaryColor, 0.3)}"
          stroke-width="2"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(theme.primaryColor, 0.15)};${hexToRgba(theme.primaryColor, 0.25)};${hexToRgba(theme.primaryColor, 0.15)}"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Current number -->
        <text
          x="70"
          y="40"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="32"
          font-weight="700"
          fill="url(#current-gradient)"
        >
          ${streak.current}
        </text>

        <!-- Current label -->
        <text
          x="70"
          y="60"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="11"
          font-weight="600"
          fill="${hexToRgba(theme.textColor, 0.6)}"
          letter-spacing="0.5"
        >
          CURRENT STREAK
        </text>
      </g>

      <!-- Longest Streak Box -->
      <g transform="translate(${centerX + 10}, 160)">
        <rect
          x="0"
          y="0"
          width="140"
          height="80"
          rx="10"
          fill="${hexToRgba(theme.accentColor, 0.15)}"
          stroke="${hexToRgba(theme.accentColor, 0.3)}"
          stroke-width="2"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(theme.accentColor, 0.15)};${hexToRgba(theme.accentColor, 0.25)};${hexToRgba(theme.accentColor, 0.15)}"
            dur="3s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Longest number -->
        <text
          x="70"
          y="40"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="32"
          font-weight="700"
          fill="${theme.accentColor}"
        >
          ${streak.longest}
        </text>

        <!-- Longest label -->
        <text
          x="70"
          y="60"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="11"
          font-weight="600"
          fill="${hexToRgba(theme.textColor, 0.6)}"
          letter-spacing="0.5"
        >
          LONGEST STREAK
        </text>
      </g>

      <!-- Total Contributions Box (Bottom) -->
      <g>
        <rect
          x="60"
          y="${height - 100}"
          width="${width - 120}"
          height="60"
          rx="10"
          fill="${hexToRgba(theme.secondaryColor, 0.15)}"
          stroke="${hexToRgba(theme.secondaryColor, 0.3)}"
          stroke-width="2"
        >
          <animate
            attributeName="fill"
            values="${hexToRgba(theme.secondaryColor, 0.15)};${hexToRgba(theme.secondaryColor, 0.2)};${hexToRgba(theme.secondaryColor, 0.15)}"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Total number -->
        <text
          x="${centerX}"
          y="${height - 70}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="28"
          font-weight="700"
          fill="${theme.secondaryColor}"
        >
          ${formatNumber(streak.totalContributions)}
        </text>

        <!-- Total label -->
        <text
          x="${centerX}"
          y="${height - 50}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="11"
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
        y="${height - 15}"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="12"
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
