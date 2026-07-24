/**
 * Auto Tech Stack Card Component with Categories
 * Automatically fetches tech stack from GitHub repositories
 */

import type { TechStackCategories, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
  createParticleAnimation,
  createBorderGlow,
  createSparkles,
} from './animations.js';

interface AutoTechStackCardProps {
  techStack: TechStackCategories;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function AutoTechStackCard({ techStack, theme, width, height }: AutoTechStackCardProps): string {
  // Create category sections
  const categorySpacing = 80;
  let currentY = 80;

  const categories = [
    {
      name: 'LANGUAGES',
      items: techStack.languages,
      color: theme.primaryColor,
      icon: '💬'
    },
    {
      name: 'FRAMEWORKS',
      items: techStack.frameworks,
      color: theme.secondaryColor,
      icon: '🔧'
    },
    {
      name: 'OTHERS',
      items: techStack.others,
      color: theme.accentColor,
      icon: '⚡'
    }
  ].filter(category => category.items.length > 0); // Only show categories with items

  const categoryElements = categories.map((category, categoryIndex) => {
    const categoryY = currentY + (categoryIndex * categorySpacing);
    
    // Create badge elements for each item in category
    const badgeElements = category.items.map((tech, index) => {
      const badgeWidth = 90;
      const badgeHeight = 28;
      const margin = 8;
      const itemsPerRow = Math.floor((width - 80) / (badgeWidth + margin));
      
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;
      
      const x = 40 + col * (badgeWidth + margin);
      const y = categoryY + 35 + row * (badgeHeight + margin);

      return `
        <!-- Tech Badge: ${tech} -->
        <g>
          <rect
            x="${x}"
            y="${y}"
            width="${badgeWidth}"
            height="${badgeHeight}"
            rx="14"
            fill="${hexToRgba(category.color, 0.15)}"
            stroke="${hexToRgba(category.color, 0.3)}"
            stroke-width="1"
          >
            <animate
              attributeName="y"
              values="${y};${y - 2};${y}"
              dur="3s"
              begin="${(categoryIndex + index) * 0.1}s"
              repeatCount="indefinite"
            />
          </rect>

          <!-- Tech name -->
          <text
            x="${x + badgeWidth / 2}"
            y="${y + badgeHeight / 2 + 3}"
            text-anchor="middle"
            font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
            font-size="11"
            font-weight="600"
            fill="${category.color}"
          >
            ${tech.length > 10 ? tech.substring(0, 9) + '.' : tech}
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.6s"
              begin="${(categoryIndex + index) * 0.15}s"
              fill="freeze"
            />
          </text>
        </g>
      `;
    }).join('');

    return `
      <!-- Category: ${category.name} -->
      <g>
        <!-- Category Header -->
        <text
          x="40"
          y="${categoryY + 20}"
          font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
          font-size="14"
          font-weight="700"
          fill="${hexToRgba(theme.textColor, 0.8)}"
          letter-spacing="1px"
        >
          ${category.icon} ${category.name}
        </text>

        <!-- Category Items -->
        ${badgeElements}
      </g>
    `;
  }).join('');

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Auto Tech Stack Card"
    >
      <defs>
        <!-- Gradient for background -->
        <linearGradient id="auto-tech-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#auto-tech-bg-gradient)" />

      <!-- Animated background effects -->
      ${createParticleAnimation(width, height, 15)}
      ${createSparkles(width, height, 8)}

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
        y="45"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="20"
        font-weight="700"
        fill="${theme.textColor}"
      >
        🚀 Tech Stack
      </text>

      <!-- Subtitle -->
      <text
        x="40"
        y="62"
        font-family="'Inter', 'Segoe UI', system-ui, sans-serif"
        font-size="12"
        font-weight="400"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        Auto-detected from repositories
      </text>

      <!-- Category sections -->
      ${categoryElements}
    </svg>
  `;
}