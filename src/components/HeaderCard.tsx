/**
 * Header/Profile Card Component with Live Animations
 * Returns raw animated SVG string
 */

import type { GitHubStats, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import {
  createParticleAnimation,
  createAuroraEffect,
  createBorderGlow,
  createSparkles,
  createFloatingOrbs,
} from './animations.js';

interface HeaderCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
  statusLine?: string;
}

export function HeaderCard({ stats, theme, width, height }: HeaderCardProps): string {
  // Generate unique IDs for this card
  const cardId = `header-${Date.now()}`;
  
  return `<svg 
    width="${width}" 
    height="${height}" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="${cardId}-title"
  >
    <title id="${cardId}-title">${stats.name}'s GitHub Profile</title>
    
    <!-- Background with rounded corners -->
    <rect 
      width="${width}" 
      height="${height}" 
      rx="${theme.borderRadius}" 
      fill="${theme.backgroundColor}"
    />
    
    <!-- Animated background layers -->
    <g opacity="0.4">
      ${createAuroraEffect(width, height)}
    </g>
    <g opacity="0.6">
      ${createFloatingOrbs(width, height, 6)}
    </g>
    <g opacity="0.8">
      ${createParticleAnimation(width, height, 40)}
    </g>
    <g opacity="0.9">
      ${createSparkles(width, height, 25)}
    </g>
    
    <!-- Animated border glow -->
    ${createBorderGlow(width, height, theme.borderRadius)}
    
    <!-- Avatar with glow -->
    <defs>
      <clipPath id="${cardId}-avatar-clip">
        <circle cx="82" cy="${height / 2}" r="50" />
      </clipPath>
      <filter id="${cardId}-glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <!-- Avatar glow ring -->
    <circle 
      cx="82" 
      cy="${height / 2}" 
      r="53" 
      fill="none" 
      stroke="${theme.primaryColor}" 
      stroke-width="3"
      filter="url(#${cardId}-glow)"
    >
      <animate 
        attributeName="stroke-opacity" 
        values="0.5;1;0.5" 
        dur="2s" 
        repeatCount="indefinite" 
      />
    </circle>
    
    <!-- Avatar image -->
    <image
      href="${stats.avatarUrl}"
      x="32"
      y="${height / 2 - 50}"
      width="100"
      height="100"
      clip-path="url(#${cardId}-avatar-clip)"
    />
    
    <!-- Content -->
    <g transform="translate(164, 40)">
      <!-- Name -->
      <text
        x="0"
        y="0"
        font-family="Roboto, 'Segoe UI', sans-serif"
        font-size="28"
        font-weight="700"
        fill="${theme.textColor}"
      >
        ${stats.name}
        <animate 
          attributeName="opacity" 
          values="0;1" 
          dur="0.5s" 
          fill="freeze" 
        />
      </text>
      
      <!-- Username -->
      <text
        x="0"
        y="24"
        font-family="Roboto, 'Segoe UI', sans-serif"
        font-size="16"
        fill="${hexToRgba(theme.textColor, 0.6)}"
      >
        @${stats.username}
        <animate 
          attributeName="opacity" 
          values="0;1" 
          dur="0.5s" 
          begin="0.2s"
          fill="freeze" 
        />
      </text>
      
      <!-- Stats -->
      <g transform="translate(0, 60)">
        <!-- Repos -->
        <g>
          <text
            x="0"
            y="0"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="24"
            font-weight="700"
            fill="${theme.primaryColor}"
          >
            ${stats.repositories}
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.4s"
              fill="freeze" 
            />
          </text>
          <text
            x="0"
            y="18"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="12"
            fill="${hexToRgba(theme.textColor, 0.6)}"
          >
            Repos
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.4s"
              fill="freeze" 
            />
          </text>
        </g>
        
        <!-- Followers -->
        <g transform="translate(100, 0)">
          <text
            x="0"
            y="0"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="24"
            font-weight="700"
            fill="${theme.secondaryColor}"
          >
            ${stats.followers}
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.6s"
              fill="freeze" 
            />
          </text>
          <text
            x="0"
            y="18"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="12"
            fill="${hexToRgba(theme.textColor, 0.6)}"
          >
            Followers
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.6s"
              fill="freeze" 
            />
          </text>
        </g>
        
        <!-- Stars -->
        <g transform="translate(220, 0)">
          <text
            x="0"
            y="0"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="24"
            font-weight="700"
            fill="${theme.accentColor}"
          >
            ${stats.totalStars}
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.8s"
              fill="freeze" 
            />
          </text>
          <text
            x="0"
            y="18"
            font-family="Roboto, 'Segoe UI', sans-serif"
            font-size="12"
            fill="${hexToRgba(theme.textColor, 0.6)}"
          >
            Stars
            <animate 
              attributeName="opacity" 
              values="0;1" 
              dur="0.5s" 
              begin="0.8s"
              fill="freeze" 
            />
          </text>
        </g>
      </g>
    </g>
    
    <!-- Powered by Profile Aura -->
    <text
      x="${width - 10}"
      y="${height - 10}"
      font-family="Roboto, 'Segoe UI', sans-serif"
      font-size="10"
      fill="${hexToRgba(theme.textColor, 0.4)}"
      text-anchor="end"
    >
      Powered by Profile Aura
    </text>
  </svg>`;
}
