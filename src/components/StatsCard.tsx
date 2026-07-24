/**
 * Enhanced GitHub Statistics Card with Streak Data
 * Modern design with combined stats and streaks
 */

import type { GitHubStats, StreakData, ThemeConfig } from '../types/index.js';
import { hexToRgba } from './styles.js';
import { formatNumber } from '../utils/helpers.js';

interface StatsCardProps {
  stats: GitHubStats;
  streak?: StreakData;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function StatsCard({ stats, streak, theme, width, height }: StatsCardProps): string {
  // Main stats (6 items in 2 rows)
  const mainStats = [
    { label: 'Total Contributions', value: formatNumber(stats.totalContributions), color: '#10b981', icon: '📊' },
    { label: 'Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor, icon: '💻' },
    { label: 'Pull Requests', value: formatNumber(stats.totalPRs), color: '#3b82f6', icon: '🔄' },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: '#f59e0b', icon: '🐛' },
    { label: 'Stars Earned', value: formatNumber(stats.totalStars), color: '#fbbf24', icon: '⭐' },
    { label: 'Repositories', value: formatNumber(stats.totalForks), color: '#34d399', icon: '📚' },
  ];

  // Layout calculations
  const cols = 3;
  const boxWidth = 230;
  const boxHeight = 95;
  const gapX = 20;
  const gapY = 18;
  
  const gridWidth = cols * boxWidth + (cols - 1) * gapX;
  const startX = (width - gridWidth) / 2;
  const startY = 85;

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GitHub Statistics Card"
    >
      <defs>
        <linearGradient id="card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(15, 23, 42, 0.98)" />
          <stop offset="100%" stop-color="rgba(30, 41, 59, 0.98)" />
        </linearGradient>
        
        <linearGradient id="streak-bg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(239, 68, 68, 0.15)" />
          <stop offset="100%" stop-color="rgba(139, 92, 246, 0.15)" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="20" fill="url(#card-bg)" />
      <rect width="${width}" height="${height}" rx="20" fill="none" stroke="rgba(148, 163, 184, 0.1)" stroke-width="1" />

      <!-- Title -->
      <text
        x="${width / 2}"
        y="45"
        text-anchor="middle"
        font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        font-size="24"
        font-weight="800"
        fill="${theme.textColor}"
      >
        📊 GitHub Statistics${streak ? ' & Streaks' : ''}
      </text>
      
      <text
        x="${width / 2}"
        y="65"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        fill="rgba(148, 163, 184, 0.7)"
      >
        Complete development metrics
      </text>

      <!-- Main Stats Grid -->
      ${mainStats.map((stat, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = startX + col * (boxWidth + gapX);
        const y = startY + row * (boxHeight + gapY);
        
        return `
        <g class="stat-box" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="${index * 0.1}s" fill="freeze" />
          
          <!-- Box Background -->
          <rect
            x="${x}"
            y="${y}"
            width="${boxWidth}"
            height="${boxHeight}"
            rx="12"
            fill="rgba(51, 65, 85, 0.5)"
            stroke="rgba(148, 163, 184, 0.15)"
            stroke-width="1"
          />
          
          <!-- Icon -->
          <text
            x="${x + boxWidth / 2}"
            y="${y + 30}"
            text-anchor="middle"
            font-size="20"
          >
            ${stat.icon}
          </text>
          
          <!-- Value -->
          <text
            x="${x + boxWidth / 2}"
            y="${y + 55}"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="22"
            font-weight="700"
            fill="${stat.color}"
          >
            ${stat.value}
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </text>
          
          <!-- Label -->
          <text
            x="${x + boxWidth / 2}"
            y="${y + 75}"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="10"
            font-weight="600"
            letter-spacing="0.5"
            fill="rgba(148, 163, 184, 0.7)"
          >
            ${stat.label.toUpperCase()}
          </text>
        </g>
        `;
      }).join('')}

      ${streak ? `
      <!-- Streak Section -->
      <g transform="translate(0, ${startY + 2 * boxHeight + 2 * gapY + 25})">
        <!-- Streak Background -->
        <rect
          x="${startX}"
          y="0"
          width="${gridWidth}"
          height="90"
          rx="15"
          fill="url(#streak-bg)"
          stroke="rgba(239, 68, 68, 0.2)"
          stroke-width="1"
        />
        
        <!-- Streak Title -->
        <text
          x="${width / 2}"
          y="25"
          text-anchor="middle"
          font-family="'Inter', sans-serif"
          font-size="16"
          font-weight="700"
          fill="${theme.textColor}"
        >
          🔥 Contribution Streaks
        </text>
        
        <!-- Current Streak -->
        <g transform="translate(${startX + gridWidth * 0.25}, 45)">
          <rect
            x="-80"
            y="0"
            width="160"
            height="55"
            rx="10"
            fill="rgba(239, 68, 68, 0.15)"
            stroke="rgba(239, 68, 68, 0.3)"
            stroke-width="1"
          >
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </rect>
          
          <text
            x="0"
            y="15"
            text-anchor="middle"
            font-size="16"
          >
            🔥
          </text>
          
          <text
            x="0"
            y="35"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="20"
            font-weight="700"
            fill="#ef4444"
          >
            ${streak.current} days
          </text>
          
          <text
            x="0"
            y="48"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="9"
            font-weight="600"
            fill="rgba(148, 163, 184, 0.6)"
          >
            CURRENT STREAK
          </text>
        </g>
        
        <!-- Longest Streak -->
        <g transform="translate(${startX + gridWidth * 0.75}, 45)">
          <rect
            x="-80"
            y="0"
            width="160"
            height="55"
            rx="10"
            fill="rgba(139, 92, 246, 0.15)"
            stroke="rgba(139, 92, 246, 0.3)"
            stroke-width="1"
          >
            <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          
          <text
            x="0"
            y="15"
            text-anchor="middle"
            font-size="16"
          >
            🚀
          </text>
          
          <text
            x="0"
            y="35"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="20"
            font-weight="700"
            fill="#8b5cf6"
          >
            ${streak.longest} days
          </text>
          
          <text
            x="0"
            y="48"
            text-anchor="middle"
            font-family="'Inter', sans-serif"
            font-size="9"
            font-weight="600"
            fill="rgba(148, 163, 184, 0.6)"
          >
            LONGEST STREAK
          </text>
        </g>
      </g>
      ` : ''}
    </svg>
  `.trim();
}
