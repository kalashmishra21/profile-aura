/**
 * Tech Stack Card Component
 * Returns animated SVG string directly (bypasses Satori for animation support)
 */

import type { ThemeConfig, IconData } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
  createCodeRain,
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
  const itemWidth = 160;
  const itemHeight = 50;
  const gapX = 24;
  const gapY = 16;
  
  // Calculate total grid dimensions
  const gridWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * gapX;
  const startX = (width - gridWidth) / 2; // Center horizontally
  const startY = 110; // Start below title

  // Generate tech badges
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
        <!-- Badge background -->
        <rect
          x="${x}"
          y="${y}"
          width="${itemWidth}"
          height="${itemHeight}"
          rx="8"
          fill="${hexToRgba(techColor, 0.15)}"
          stroke="${hexToRgba(techColor, 0.4)}"
          stroke-width="2"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.4;0.8;0.4"
            dur="3s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon circle -->
        <circle
          cx="${x + 25}"
          cy="${y + 25}"
          r="16"
          fill="${techColor}"
          opacity="0.9"
        />

        <!-- Icon letter -->
        <text
          x="${x + 25}"
          y="${y + 31}"
          text-anchor="middle"
          font-family="'Inter', sans-serif"
          font-size="14"
          font-weight="700"
          fill="#ffffff"
        >
          ${iconLetter}
        </text>

        <!-- Tech name with better font -->
        <text
          x="${x + 50}"
          y="${y + 29}"
          font-family="'Poppins', 'Inter', sans-serif"
          font-size="15"
          font-weight="700"
          fill="${theme.textColor}"
          letter-spacing="0.3"
        >
          ${tech.name.length > 11 ? tech.name.substring(0, 10) + '.' : tech.name}
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
          <stop offset="0%" stop-color="${hexToRgba(theme.backgroundColor, 0.95)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 0.85)}" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#tech-bg-gradient)" />

      <!-- Animated background -->
      ${createHexPattern(width, height)}
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

      <!-- Title with better font -->
      <text
        x="${width / 2}"
        y="45"
        text-anchor="middle"
        font-family="'Poppins', 'Inter', sans-serif"
        font-size="24"
        font-weight="800"
        fill="${theme.textColor}"
        letter-spacing="0.5"
      >
        ${title}
      </text>

      <!-- Subtitle -->
      <text
        x="${width / 2}"
        y="68"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        font-weight="500"
        fill="${hexToRgba(theme.textColor, 0.6)}"
        letter-spacing="0.3"
      >
        Technologies I work with
      </text>

      <!-- Tech badges -->
      ${techBadges}
    </svg>
  `;
}
