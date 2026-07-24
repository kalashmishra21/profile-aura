/**
 * Top Languages Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { LanguageStats, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
  createParticleAnimation,
  createBorderGlow,
  createSparkles,
  createGradientWave,
} from './animations.js';

interface LanguagesCardProps {
  languages: LanguageStats[];
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function LanguagesCard({ languages, theme, width, height }: LanguagesCardProps): string {
  // Generate language bars with animations
  const languageBars = languages.map((lang, index) => {
    const y = 140 + index * 70;
    const barY = y + 30;
    const maxBarWidth = width - 300;

    return `
      <!-- Language ${index + 1}: ${lang.name} -->
      <g>
        <!-- Color dot with glow -->
        <circle
          cx="50"
          cy="${barY}"
          r="8"
          fill="${lang.color}"
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="8;10;8"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Language name -->
        <text
          x="75"
          y="${barY + 5}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="16"
          font-weight="600"
          fill="${theme.textColor}"
        >
          ${lang.name}
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.6s"
            begin="${index * 0.15}s"
            fill="freeze"
          />
        </text>

        <!-- Progress bar background -->
        <rect
          x="220"
          y="${barY - 4}"
          width="${maxBarWidth}"
          height="8"
          rx="4"
          fill="${hexToRgba(theme.textColor, 0.1)}"
        />

        <!-- Progress bar fill with animation -->
        <rect
          x="220"
          y="${barY - 4}"
          width="0"
          height="8"
          rx="4"
          fill="${lang.color}"
        >
          <animate
            attributeName="width"
            from="0"
            to="${(lang.percentage / 100) * maxBarWidth}"
            dur="1.5s"
            begin="${index * 0.15}s"
            fill="freeze"
          />
        </rect>

        <!-- Shimmer effect on progress bar -->
        <rect
          x="220"
          y="${barY - 4}"
          width="${(lang.percentage / 100) * maxBarWidth}"
          height="8"
          rx="4"
          fill="url(#shimmer)"
          opacity="0.3"
        >
          <animate
            attributeName="x"
            from="220"
            to="${220 + (lang.percentage / 100) * maxBarWidth + 50}"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Percentage text -->
        <text
          x="${width - 60}"
          y="${barY + 5}"
          text-anchor="end"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="16"
          font-weight="600"
          fill="${lang.color}"
        >
          ${lang.percentage.toFixed(1)}%
          <animate
            attributeName="opacity"
            values="0;1"
            dur="0.6s"
            begin="${index * 0.15 + 0.3}s"
            fill="freeze"
          />
        </text>
      </g>
    `;
  }).join('');

  // Generate language bubbles at bottom
  const languageBubbles = languages.slice(0, 5).map((lang, index) => {
    const x = 80 + index * 140;
    const y = height - 60;

    return `
      <!-- Language bubble ${index + 1} -->
      <g>
        <rect
          x="${x}"
          y="${y}"
          width="120"
          height="36"
          rx="18"
          fill="${hexToRgba(lang.color, 0.15)}"
          stroke="${hexToRgba(lang.color, 0.3)}"
          stroke-width="1"
        >
          <animate
            attributeName="y"
            values="${y};${y - 5};${y}"
            dur="2s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </rect>

        <circle
          cx="${x + 20}"
          cy="${y + 18}"
          r="4"
          fill="${lang.color}"
        />

        <text
          x="${x + 32}"
          y="${y + 23}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="12"
          font-weight="600"
          fill="${lang.color}"
        >
          ${lang.name}
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
      aria-label="Top Languages Card"
    >
      <defs>
        <!-- Gradient for background -->
        <linearGradient id="lang-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>

        <!-- Shimmer gradient for progress bars -->
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="50%" stop-color="white" stop-opacity="0.8" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </linearGradient>

        <!-- Glow filter -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#lang-bg-gradient)" />

      <!-- Animated background effects -->
      ${createGradientWave(width, height)}
      ${createParticleAnimation(width, height, 25)}
      ${createSparkles(width, height, 15)}

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
        💻 Most Used Languages
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
        Based on repository analysis
      </text>

      <!-- Language bars -->
      ${languageBars}

      <!-- Language bubbles at bottom -->
      ${languageBubbles}
    </svg>
  `;
}
