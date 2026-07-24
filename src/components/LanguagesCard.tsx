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
} from './animations.js';

interface LanguagesCardProps {
  languages: LanguageStats[];
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function LanguagesCard({ languages, theme, width, height }: LanguagesCardProps): string {
  // Limit to top 5 languages to prevent overflow
  const topLanguages = languages.slice(0, 5);
  
  // Generate language bars with animations
  const languageBars = topLanguages.map((lang, index) => {
    const y = 120 + index * 45;  // Tighter spacing - 45px instead of 55
    const barY = y + 20;
    const maxBarWidth = width - 260;  // Reduced from 280 to 260

    return `
      <!-- Language ${index + 1}: ${lang.name} -->
      <g>
        <!-- Color dot with glow -->
        <circle
          cx="45"
          cy="${barY}"
          r="5"
          fill="${lang.color}"
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="5;7;5"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Language name -->
        <text
          x="60"
          y="${barY + 3}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
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
          x="180"
          y="${barY - 3}"
          width="${maxBarWidth}"
          height="6"
          rx="3"
          fill="${hexToRgba(theme.textColor, 0.1)}"
        />

        <!-- Progress bar fill with animation -->
        <rect
          x="180"
          y="${barY - 3}"
          width="0"
          height="6"
          rx="3"
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
          x="180"
          y="${barY - 3}"
          width="${(lang.percentage / 100) * maxBarWidth}"
          height="6"
          rx="3"
          fill="url(#shimmer)"
          opacity="0.3"
        >
          <animate
            attributeName="x"
            from="180"
            to="${180 + (lang.percentage / 100) * maxBarWidth + 40}"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Percentage text -->
        <text
          x="${width - 40}"
          y="${barY + 3}"
          text-anchor="end"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
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

  // Generate language bubbles at bottom - only top 5, smaller and tighter
  const languageBubbles = languages.slice(0, 5).map((lang, index) => {
    const bubbleWidth = 100;  // Smaller bubbles
    const totalWidth = 5 * (bubbleWidth + 10) - 10;  // Tighter spacing
    const startX = (width - totalWidth) / 2;  // Center align
    const x = startX + index * (bubbleWidth + 10);
    const y = height - 45;  // Higher position

    return `
      <!-- Language bubble ${index + 1} -->
      <g>
        <rect
          x="${x}"
          y="${y}"
          width="${bubbleWidth}"
          height="28"
          rx="14"
          fill="${hexToRgba(lang.color, 0.15)}"
          stroke="${hexToRgba(lang.color, 0.3)}"
          stroke-width="1"
        >
          <animate
            attributeName="y"
            values="${y};${y - 2};${y}"
            dur="2s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </rect>

        <circle
          cx="${x + 15}"
          cy="${y + 14}"
          r="3"
          fill="${lang.color}"
        />

        <text
          x="${x + 24}"
          y="${y + 17}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="10"
          font-weight="600"
          fill="${lang.color}"
        >
          ${lang.name.length > 7 ? lang.name.substring(0, 6) + '.' : lang.name}
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
      ${createParticleAnimation(width, height, 20)}
      ${createSparkles(width, height, 12)}

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
        x="35"
        y="40"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="20"
        font-weight="700"
        fill="${theme.textColor}"
      >
        💻 Most Used Languages
      </text>

      <!-- Subtitle -->
      <text
        x="35"
        y="60"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="12"
        font-weight="400"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        Based on repository analysis
      </text>

      <!-- Language bars -->
      ${languageBars}
    </svg>
  `;
}
