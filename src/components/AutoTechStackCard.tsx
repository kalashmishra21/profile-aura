/**
 * Auto Tech Stack Card - Modern Clean Design
 * Automatically detected technologies from repositories
 */

import type { TechStackCategories, ThemeConfig } from '../types/index.js';

interface AutoTechStackCardProps {
  techStack: TechStackCategories;
  theme: ThemeConfig;
  width: number;
  height: number;
}

export function AutoTechStackCard({ techStack, theme, width, height }: AutoTechStackCardProps): string {
  // Check if we have any data
  const hasData = (techStack.languages?.length || 0) + (techStack.frameworks?.length || 0) + (techStack.others?.length || 0) > 0;
  
  if (!hasData) {
    return generateEmptyState(theme, width, height);
  }

  const categories = [
    { name: 'Languages', icon: '🔤', items: techStack.languages || [], color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
    { name: 'Frameworks', icon: '⚙️', items: techStack.frameworks || [], color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Tools & Others', icon: '🛠️', items: techStack.others || [], color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)' },
  ].filter(cat => cat.items.length > 0);

  let currentY = 100;
  const categoryHeight = 110;

  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tech Stack Card"
    >
      <defs>
        <linearGradient id="tech-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(17, 24, 39, 0.98)" />
          <stop offset="100%" stop-color="rgba(31, 41, 55, 0.98)" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" rx="20" fill="url(#tech-bg)" />
      <rect width="${width}" height="${height}" rx="20" fill="none" stroke="rgba(75, 85, 99, 0.2)" stroke-width="1" />

      <!-- Animated Icon -->
      <text
        x="${width / 2}"
        y="40"
        text-anchor="middle"
        font-size="32"
      >
        🚀
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values="0 ${width / 2} 40; 360 ${width / 2} 40"
          dur="20s"
          repeatCount="indefinite"
        />
      </text>

      <!-- Title -->
      <text
        x="${width / 2}"
        y="68"
        text-anchor="middle"
        font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        font-size="24"
        font-weight="800"
        fill="${theme.textColor}"
      >
        Tech Stack
      </text>
      
      <text
        x="${width / 2}"
        y="86"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        fill="rgba(156, 163, 175, 0.8)"
      >
        Auto-detected from repositories
      </text>

      <!-- Categories -->
      ${categories.map((category, catIndex) => {
        const y = currentY + (catIndex * categoryHeight);
        const badges = category.items.slice(0, 8); // Show max 8 items
        const moreCount = category.items.length - 8;
        
        return `
        <g class="category" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="${catIndex * 0.2}s" fill="freeze" />
          
          <!-- Category Header -->
          <g transform="translate(40, ${y})">
            <!-- Icon -->
            <text
              x="0"
              y="0"
              font-size="18"
            >
              ${category.icon}
            </text>
            
            <!-- Category Name -->
            <text
              x="30"
              y="0"
              font-family="'Inter', sans-serif"
              font-size="16"
              font-weight="700"
              fill="${category.color}"
              letter-spacing="0.5"
            >
              ${category.name}
            </text>
            
            <!-- Item Count Badge -->
            <rect
              x="${width - 110}"
              y="-14"
              width="60"
              height="22"
              rx="11"
              fill="${category.bgColor}"
              stroke="rgba(34, 197, 94, 0.3)"
              stroke-width="1"
            />
            <text
              x="${width - 80}"
              y="1"
              text-anchor="middle"
              font-family="'Inter', sans-serif"
              font-size="11"
              font-weight="600"
              fill="rgba(34, 197, 94, 0.8)"
            >
              ${category.items.length} items
            </text>
          </g>
          
          <!-- Tech Badges -->
          <g transform="translate(40, ${y + 30})">
            ${badges.map((tech, index) => {
              const badgeX = (index % 4) * 170;
              const badgeY = Math.floor(index / 4) * 35;
              
              return `
              <g transform="translate(${badgeX}, ${badgeY})" opacity="0">
                <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="${catIndex * 0.2 + index * 0.08}s" fill="freeze" />
                
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="28"
                  rx="14"
                  fill="${category.bgColor}"
                  stroke="rgba(59, 130, 246, 0.3)"
                  stroke-width="1"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.6;0.3"
                    dur="4s"
                    begin="${index * 0.3}s"
                    repeatCount="indefinite"
                  />
                </rect>
                
                <text
                  x="80"
                  y="18"
                  text-anchor="middle"
                  font-family="'Inter', sans-serif"
                  font-size="12"
                  font-weight="600"
                  fill="${category.color}"
                >
                  ${tech.length > 14 ? tech.substring(0, 12) + '..' : tech}
                </text>
              </g>
              `;
            }).join('')}
            
            ${moreCount > 0 ? `
            <g transform="translate(${badges.length >= 4 ? (badges.length % 4) * 170 : badges.length * 170}, ${Math.floor(badges.length / 4) * 35})" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="${catIndex * 0.2 + badges.length * 0.08}s" fill="freeze" />
              
              <rect
                x="0"
                y="0"
                width="80"
                height="28"
                rx="14"
                fill="rgba(75, 85, 99, 0.2)"
                stroke="rgba(156, 163, 175, 0.4)"
                stroke-width="1"
                stroke-dasharray="4,4"
              />
              
              <text
                x="40"
                y="18"
                text-anchor="middle"
                font-family="'Inter', sans-serif"
                font-size="11"
                font-weight="600"
                fill="rgba(156, 163, 175, 0.8)"
              >
                +${moreCount} more
              </text>
            </g>
            ` : ''}
          </g>
        </g>
        `;
      }).join('')}
    </svg>
  `.trim();
}

function generateEmptyState(theme: ThemeConfig, width: number, height: number): string {
  return `
    <svg
      width="${width}"
      height="${height}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tech Stack Card"
    >
      <rect width="${width}" height="${height}" rx="20" fill="rgba(17, 24, 39, 0.98)" />
      <rect width="${width}" height="${height}" rx="20" fill="none" stroke="rgba(75, 85, 99, 0.2)" stroke-width="1" />
      
      <text
        x="${width / 2}"
        y="${height / 2 - 30}"
        text-anchor="middle"
        font-size="48"
        opacity="0.6"
      >
        🔧
      </text>
      
      <text
        x="${width / 2}"
        y="${height / 2 + 10}"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="18"
        font-weight="700"
        fill="${theme.textColor}"
      >
        Tech Stack Loading...
      </text>
      
      <text
        x="${width / 2}"
        y="${height / 2 + 35}"
        text-anchor="middle"
        font-family="'Inter', sans-serif"
        font-size="13"
        fill="rgba(156, 163, 175, 0.7)"
      >
        Scanning repositories for technologies
      </text>
    </svg>
  `.trim();
}
