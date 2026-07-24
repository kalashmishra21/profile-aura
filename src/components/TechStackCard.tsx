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
  const itemWidth = 170;
  const itemHeight = 60;
  const gapX = 20;
  const gapY = 20;
  
  // Calculate total grid dimensions
  const gridWidth = itemsPerRow * itemWidth + (itemsPerRow - 1) * gapX;
  const startX = (width - gridWidth) / 2; // Center horizontally
  const startY = 120; // Start below title

  // Generate tech badges with enhanced styling
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
        <!-- Badge background with gradient -->
        <defs>
          <linearGradient id="tech-grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${hexToRgba(techColor, 0.25)}" />
            <stop offset="100%" stop-color="${hexToRgba(techColor, 0.05)}" />
          </linearGradient>
          
          <filter id="tech-shadow-${index}">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${hexToRgba(techColor, 0.4)}"/>
          </filter>
        </defs>
        
        <rect
          x="${x}"
          y="${y}"
          width="${itemWidth}"
          height="${itemHeight}"
          rx="12"
          fill="url(#tech-grad-${index})"
          stroke="${hexToRgba(techColor, 0.5)}"
          stroke-width="2"
          filter="url(#tech-shadow-${index})"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.5;1;0.5"
            dur="3s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="${y};${y - 2};${y}"
            dur="2s"
            begin="${index * 0.3}s"
            repeatCount="indefinite"
          />
        </rect>

        <!-- Icon circle with glow -->
        <circle
          cx="${x + 30}"
          cy="${y + 30}"
          r="20"
          fill="${techColor}"
          opacity="1"
        >
          <animate
            attributeName="r"
            values="20;22;20"
            dur="2s"
            begin="${index * 0.2}s"
            repeatCount="indefinite"
          />
        </circle>
        
        <!-- Inner circle for depth -->
        <circle
          cx="${x + 30}"
          cy="${y + 30}"
          r="16"
          fill="${hexToRgba('#ffffff', 0.2)}"
        />

        <!-- Icon letter -->
        <text
          x="${x + 30}"
          y="${y + 37}"
          text-anchor="middle"
          font-family="'Poppins', 'Inter', sans-serif"
          font-size="18"
          font-weight="800"
          fill="#ffffff"
        >
          ${iconLetter}
        </text>

        <!-- Tech name with better font -->
        <text
          x="${x + 60}"
          y="${y + 35}"
          font-family="'Poppins', 'Inter', sans-serif"
          font-size="16"
          font-weight="700"
          fill="${theme.textColor}"
          letter-spacing="0.5"
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
          <stop offset="50%" stop-color="${hexToRgba(theme.primaryColor, 0.05)}" />
          <stop offset="100%" stop-color="${hexToRgba(theme.backgroundColor, 1)}" />
        </linearGradient>
        
        <filter id="title-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="15" fill="url(#tech-bg-gradient)" />

      <!-- Animated background -->
      ${createHexPattern(width, height)}
      ${createSparkles(width, height, 20)}

      <!-- Glass effect overlay -->
      <rect
        x="5"
        y="5"
        width="${width - 10}"
        height="${height - 10}"
        rx="12"
        fill="${hexToRgba(theme.backgroundColor, 0.3)}"
        stroke="${hexToRgba(theme.primaryColor, 0.4)}"
        stroke-width="2"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.4;0.7;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>

      <!-- Title with glow -->
      <text
        x="${width / 2}"
        y="50"
        text-anchor="middle"
        font-family="'Poppins', 'Inter', sans-serif"
        font-size="26"
        font-weight="900"
        fill="${theme.textColor}"
        letter-spacing="1"
        filter="url(#title-glow)"
      >
        ${title}
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="2s"
          repeatCount="indefinite"
        />
      </text>

      <!-- Subtitle -->
      <text
        x="${width / 2}"
        y="75"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="14"
        font-weight="600"
        fill="${hexToRgba(theme.textColor, 0.7)}"
        letter-spacing="0.5"
      >
        Technologies I work with
      </text>

      <!-- Tech badges -->
      ${techBadges}
    </svg>
  `;
}
