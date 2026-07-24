/**
 * Tech Stack Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { ThemeConfig, IconData } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
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
  // Limit to 8 technologies to fit properly in 800x300
  const displayTechs = technologies.slice(0, 8);
  
  // Calculate grid layout - 4 items per row
  const itemsPerRow = 4;
  const itemWidth = 165;
  const itemHeight = 56;
  const gapX = 22;
  const gapY = 18;
  
  // Calculate total grid dimensions
  const gridWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * gapX;
  const startX = (width - gridWidth) / 2; // Center horizontally
  const startY = 115; // Start below title

  // Generate tech badges with clean, simple styling
  const techBadges = displayTechs.map((tech, index) => {
    const col = index % itemsPerRow;
    const row = Math.floor(index / itemsPerRow);
    const x = startX + col * (itemWidth + gapX);
    const y = startY + row * (itemHeight + gapY);
    const techColor = tech.color || theme.primaryColor;
    const iconLetter = tech.name.charAt(0).toUpperCase();

    return `
      <!-- Tech: ${tech.name} -->
      <g>
        <!-- Badge background - clean and simple -->
        <defs>
          <linearGradient id="tech-grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${hexToRgba(techColor, 0.2)}" />
            <stop offset="100%" stop-color="${hexToRgba(techColor, 0.08)}" />
          </linearGradient>
        </defs>
        
        <rect
          x="${x}"
          y="${y}"
          width="${itemWidth}"
          height="${itemHeight}"
          rx="10"
          fill="url(#tech-grad-${index})"
          stroke="${hexToRgba(techColor, 0.4)}"
          stroke-width="1.5"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.7;0.4"
            dur="3s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon circle - clean design -->
        <circle
          cx="${x + 28}"
          cy="${y + 28}"
          r="18"
          fill="${techColor}"
          opacity="0.95"
        />

        <!-- Icon letter -->
        <text
          x="${x + 28}"
          y="${y + 35}"
          text-anchor="middle"
          font-family="'Inter', 'Segoe UI', sans-serif"
          font-size="16"
          font-weight="700"
          fill="#ffffff"
        >
          ${iconLetter}
        </text>

        <!-- Tech name - simple and clean -->
        <text
          x="${x + 56}"
          y="${y + 32}"
          font-family="'Inter', 'Segoe UI', sans-serif"
          font-size="15"
          font-weight="600"
          fill="${theme.textColor}"
        >
          ${tech.name.length > 10 ? tech.name.substring(0, 9) + '.' : tech.name}
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
      aria-label="Tech Stack Card"
    >
      <defs>
        <linearGradient id="tech-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 1)}" />
          <stop offset="50%" stop-color="${hexToRgba(theme.primaryColor, 0.03)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 1)}" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#tech-bg-gradient)" />

      <!-- Animated background - subtle -->
      ${createHexPattern(width, height)}
      ${createSparkles(width, height, 15)}

      <!-- Glass effect overlay -->
      <rect
        x="5"
        y="5"
        width="${width - 10}"
        height="${height - 10}"
        rx="12"
        fill="${hexToRgba(theme.backgroundColor, 0.2)}"
        stroke="${hexToRgba(theme.primaryColor, 0.3)}"
        stroke-width="1.5"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;0.5;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>

      <!-- Title - clean and simple -->
      <text
        x="${width / 2}"
        y="48"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', sans-serif"
        font-size="22"
        font-weight="700"
        fill="${theme.textColor}"
      >
        ${title}
      </text>

      <!-- Subtitle -->
      <text
        x="${width / 2}"
        y="72"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', sans-serif"
        font-size="13"
        font-weight="500"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        Technologies I work with
      </text>

      <!-- Tech badges -->
      ${techBadges}
    </svg>
  `;
}
