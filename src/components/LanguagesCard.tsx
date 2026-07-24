/**
 * Most Used Languages Card - Modern Clean Design
 * Vertical bar layout with animations
 */

import type { LanguageStats, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';

interface LanguagesCardProps {
  languages: LanguageStats[];
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function LanguagesCard({ languages, theme, width, height }: LanguagesCardProps): string {
  const topLanguages = languages.slice(0, 6); // Show top 6 languages
  
  const barHeight = 40;
  const barGap = 22;
  const startY = 100;
  const maxBarWidth = width - 280; // Space for labels and percentages

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Most Used Languages Card"
    >
      <defs>
        <linearGradient id="lang-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.98)" />
          <stop offset="100%" stop-color="rgba(51, 65, 85, 0.98)" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="20" fill="url(#lang-card-bg)" />
      <rect width="${width}" height="${height}" rx="20" fill="none" stroke="rgba(148, 163, 184, 0.1)" stroke-width="1" />

      <!-- Animated Icon -->
      <text
        x="${width / 2}"
        y="40"
        text-anchor="middle"
        font-size="28"
      >
        💻
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="scale"
          values="1;1.1;1"
          dur="2s"
          repeatCount="indefinite"
          additive="sum"
        />
      </text>

      <!-- Title -->
      <text
        x="${width / 2}"
        y="65"
        text-anchor="middle"
        font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        font-size="22"
        font-weight="800"
        fill="${theme.textColor}"
      >
        Most Used Languages
      </text>
      
      <text
        x="${width / 2}"
        y="83"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        fill="rgba(148, 163, 184, 0.7)"
      >
        Based on repository analysis
      </text>

      <!-- Language Bars -->
      ${topLanguages.map((lang, index) => {
        const y = startY + index * (barHeight + barGap);
        const barWidth = (lang.percentage / 100) * maxBarWidth;
        
        return `
        <g class="lang-item" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="${index * 0.15}s" fill="freeze" />
          
          <!-- Dot Indicator -->
          <circle
            cx="30"
            cy="${y + barHeight / 2}"
            r="5"
            fill="${lang.color}"
          >
            <animate attributeName="r" values="5;7;5" dur="2s" begin="${index * 0.3}s" repeatCount="indefinite" />
          </circle>
          
          <!-- Language Name -->
          <text
            x="50"
            y="${y + barHeight / 2 + 5}"
            font-family="'Inter', sans-serif"
            font-size="14"
            font-weight="600"
            fill="${theme.textColor}"
          >
            ${lang.name}
          </text>
          
          <!-- Progress Bar Background -->
          <rect
            x="160"
            y="${y + (barHeight - 8) / 2}"
            width="${maxBarWidth}"
            height="8"
            rx="4"
            fill="rgba(148, 163, 184, 0.1)"
          />
          
          <!-- Progress Bar Fill -->
          <rect
            x="160"
            y="${y + (barHeight - 8) / 2}"
            width="0"
            height="8"
            rx="4"
            fill="${lang.color}"
          >
            <animate
              attributeName="width"
              from="0"
              to="${barWidth}"
              dur="1.5s"
              begin="${index * 0.15 + 0.5}s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          
          <!-- Percentage Badge -->
          <g transform="translate(${160 + maxBarWidth + 15}, ${y + barHeight / 2})">
            <rect
              x="-25"
              y="-12"
              width="50"
              height="24"
              rx="12"
              fill="${hexToRgba(lang.color, 0.15)}"
              stroke="${hexToRgba(lang.color, 0.3)}"
              stroke-width="1"
            />
            
            <text
              x="0"
              y="5"
              text-anchor="middle"
              font-family="'Inter', sans-serif"
              font-size="13"
              font-weight="700"
              fill="${lang.color}"
            >
              ${lang.percentage.toFixed(1)}%
            </text>
          </g>
        </g>
        `;
      }).join('')}
    </svg>
  `.trim();
}
