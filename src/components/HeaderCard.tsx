/**
 * Premium Hero Header Card Component - Anime-Inspired Portfolio Style
 * Fully dynamic with NO hardcoded data
 */

import type { GitHubStats, ThemeConfig, Config } from '../types/index.js';
import { getTheme } from '../utils/themes.js';

interface HeaderCardProps {
  stats: GitHubStats;
  config: Config;
  theme: ThemeConfig;
  width?: number;
  height?: number;
}

/**
 * Generate premium anime-inspired hero header
 * Features: Large typography, magazine style, minimal design, auto-fetch all data
 */
export function HeaderCard({ stats, config, theme, width = 1600, height = 800 }: HeaderCardProps): string {
  // Priority for name: config override > GitHub display name > username
  const displayName = config.profile?.name || stats.displayName || stats.name || stats.username;
  
  // Priority for about: config override > GitHub bio > empty placeholder
  const about = config.profile?.about || stats.bio || '';
  
  // Roles from config or empty
  const roles = config.profile?.roles || [];
  
  // Social links - auto-detect or from config
  const socials = {
    github: config.profile?.socials?.github || `https://github.com/${stats.username}`,
    linkedin: config.profile?.socials?.linkedin,
    twitter: stats.twitterUsername ? `https://twitter.com/${stats.twitterUsername}` : config.profile?.socials?.twitter,
    website: stats.website || config.profile?.website,
    email: config.profile?.email,
  };

  // Small info tags
  const infoTags = [
    stats.location || config.profile?.location,
    stats.company || config.profile?.company,
    stats.followers && `${stats.followers} followers`,
    stats.repositories && `${stats.repositories} repos`,
    stats.totalStars && `${stats.totalStars} stars`,
    stats.createdAt && `${new Date().getFullYear() - new Date(stats.createdAt).getFullYear()}+ years on GitHub`,
  ].filter(Boolean);

  // Colors from theme
  const primaryColor = theme.primaryColor;
  const secondaryColor = theme.secondaryColor;
  const accentColor = theme.accentColor;
  const textColor = theme.textColor;
  const secondaryTextColor = theme.secondaryTextColor || `${textColor}99`;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="hero-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.backgroundColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${theme.backgroundColor};stop-opacity:0.95" />
    </linearGradient>
    
    <!-- Text Gradient for Name -->
    <linearGradient id="hero-name-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${primaryColor}" />
      <stop offset="50%" style="stop-color:${secondaryColor}" />
      <stop offset="100%" style="stop-color:${accentColor}" />
    </linearGradient>

    <!-- Glow Effect -->
    ${theme.glowEffect ? `
    <filter id="hero-glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    ` : ''}

    <!-- Avatar Clip -->
    <clipPath id="hero-avatar-clip">
      <circle cx="${width - 300}" cy="${height / 2}" r="180"/>
    </clipPath>

    <!-- Decorative Circle Clip -->
    <clipPath id="hero-deco-clip">
      <circle cx="${width - 300}" cy="${height / 2}" r="220"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#hero-bg-gradient)" rx="${theme.borderRadius}"/>

  <!-- Decorative Background Elements (Anime-inspired) -->
  <circle cx="${width - 300}" cy="${height / 2}" r="280" fill="${primaryColor}" opacity="0.03" />
  <circle cx="${width - 300}" cy="${height / 2}" r="240" fill="${secondaryColor}" opacity="0.05" />
  <circle cx="150" cy="150" r="100" fill="${accentColor}" opacity="0.02" />
  <circle cx="200" cy="${height - 150}" r="80" fill="${primaryColor}" opacity="0.02" />

  <!-- Character/Avatar Section (Right Side) -->
  <!-- Decorative Ring -->
  <circle 
    cx="${width - 300}" 
    cy="${height / 2}" 
    r="220" 
    fill="none" 
    stroke="${primaryColor}" 
    stroke-width="3" 
    opacity="0.2"
    ${theme.glowEffect ? 'filter="url(#hero-glow)"' : ''}
  />
  
  <!-- Avatar Background Glow -->
  <circle 
    cx="${width - 300}" 
    cy="${height / 2}" 
    r="200" 
    fill="${primaryColor}" 
    opacity="0.1"
    ${theme.glowEffect ? 'filter="url(#hero-glow)"' : ''}
  />
  
  <!-- Avatar Image -->
  <image 
    href="${stats.avatarUrl}" 
    x="${width - 480}" 
    y="${height / 2 - 180}" 
    width="360" 
    height="360" 
    clip-path="url(#hero-avatar-clip)"
    opacity="0.95"
  />

  <!-- Content Section (Left Side) -->
  <g transform="translate(80, ${height / 2 - 200})">
    
    <!-- Large Name (Magazine Style) -->
    <text 
      x="0" 
      y="0" 
      font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="96" 
      font-weight="900" 
      fill="url(#hero-name-gradient)"
      letter-spacing="-4"
      ${theme.glowEffect ? 'filter="url(#hero-glow)"' : ''}
    >
      ${displayName.toUpperCase()}
    </text>

    <!-- Roles (Under Name) -->
    ${roles.map((role, index) => `
    <text 
      x="0" 
      y="${80 + index * 40}" 
      font-family="'Inter', sans-serif" 
      font-size="28" 
      font-weight="500" 
      fill="${secondaryTextColor}"
      letter-spacing="-1"
    >
      ${role}
    </text>
    `).join('')}

    <!-- About Section -->
    ${about ? `
    <text 
      x="0" 
      y="${140 + roles.length * 40}" 
      font-family="'Inter', sans-serif" 
      font-size="20" 
      font-weight="400" 
      fill="${secondaryTextColor}"
      opacity="0.9"
    >
      ${about.substring(0, 80)}
    </text>
    ${about.length > 80 ? `
    <text 
      x="0" 
      y="${165 + roles.length * 40}" 
      font-family="'Inter', sans-serif" 
      font-size="20" 
      font-weight="400" 
      fill="${secondaryTextColor}"
      opacity="0.9"
    >
      ${about.substring(80, 160)}
    </text>
    ` : ''}
    ` : `
    <!-- Empty Placeholder -->
    <text 
      x="0" 
      y="${140 + roles.length * 40}" 
      font-family="'Inter', sans-serif" 
      font-size="20" 
      font-weight="400" 
      fill="${secondaryTextColor}"
      opacity="0.5"
      font-style="italic"
    >
      Developer • Creator • Builder
    </text>
    `}

    <!-- Info Tags (Small Stats) -->
    <g transform="translate(0, ${220 + roles.length * 40})">
      ${infoTags.slice(0, 6).map((tag, index) => {
        const xPos = (index % 3) * 280;
        const yPos = Math.floor(index / 3) * 35;
        return `
        <g transform="translate(${xPos}, ${yPos})">
          <rect 
            x="0" 
            y="-20" 
            width="${String(tag).length * 9 + 20}" 
            height="28" 
            fill="${primaryColor}" 
            opacity="0.1" 
            rx="6"
          />
          <text 
            x="10" 
            y="0" 
            font-family="'Inter', sans-serif" 
            font-size="14" 
            font-weight="500" 
            fill="${textColor}"
            opacity="0.8"
          >
            ${tag}
          </text>
        </g>
        `;
      }).join('')}
    </g>

    <!-- Social Links -->
    <g transform="translate(0, ${310 + roles.length * 40 + Math.ceil(infoTags.length / 3) * 35})">
      ${Object.entries(socials)
        .filter(([_, url]) => url)
        .map(([platform, _], index) => {
          const xPos = index * 50;
          return `
          <g transform="translate(${xPos}, 0)">
            <circle 
              cx="16" 
              cy="0" 
              r="20" 
              fill="${primaryColor}" 
              opacity="0.15"
            />
            <text 
              x="16" 
              y="6" 
              font-family="'Inter', sans-serif" 
              font-size="16" 
              font-weight="600" 
              fill="${textColor}"
              text-anchor="middle"
            >
              ${platform[0].toUpperCase()}
            </text>
          </g>
          `;
        }).join('')}
    </g>

  </g>

  <!-- Bottom Accent Line -->
  <line 
    x1="80" 
    y1="${height - 60}" 
    x2="${width - 80}" 
    y2="${height - 60}" 
    stroke="url(#hero-name-gradient)" 
    stroke-width="2" 
    opacity="0.3"
  />

  <!-- Username Tag (Bottom Right) -->
  <text 
    x="${width - 80}" 
    y="${height - 30}" 
    font-family="'JetBrains Mono', 'Fira Code', monospace" 
    font-size="16" 
    font-weight="500" 
    fill="${secondaryTextColor}"
    text-anchor="end"
  >
    @${stats.username}
  </text>

</svg>
`.trim();
}
