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
  
  // Calculate optimal spacing - much tighter like readme-aura
  const languageCount = Math.min(topLanguages.length, 5);
  const availableHeight = height - 110; // Leave space for title and bottom
  const baseSpacing = Math.max(28, Math.min(38, availableHeight / languageCount));
  const startY = 70; // Much tighter top margin

  // Generate language bars with animations
  const languageBars = topLanguages.slice(0, 5).map((lang, index) => {
    const y = startY + index * baseSpacing;
    const barY = y + 18;
    const maxBarWidth = width - 220;  // Tighter margins

    return `
      <!-- Language ${index + 1}: ${lang.name} -->
      <g>
        <!-- Color dot -->
        <circle
          cx="30"
          cy="${barY}"
          r="4"
          fill="${lang.color}"
        >
          <animate
            attributeName="r"
            values="4;6;4"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Language name -->
        <text
          x="45"
          y="${barY + 3}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="13"
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
          x="160"
          y="${barY - 3}"
          width="${maxBarWidth}"
          height="5"
          rx="2.5"
          fill="${hexToRgba(theme.textColor, 0.1)}"
        />

        <!-- Progress bar fill with animation -->
        <rect
          x="160"
          y="${barY - 3}"
          width="0"
          height="5"
          rx="2.5"
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

        <!-- Percentage text -->
        <text
          x="${width - 25}"
          y="${barY + 3}"
          text-anchor="end"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="13"
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
        y="35"
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
        y="52"
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
