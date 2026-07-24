/**
 * All Card Components - Satori JSX Versions
 * Consolidated file for all remaining cards with CSS animations
 */

import type { GitHubStats, StreakData, LanguageStats, ThemeConfig, TechStackCategories } from '../types/index.js';
import { formatNumber } from '../utils/helpers.js';

// ========================================
// STATS CARD
// ========================================
export function generateStatsCardJsx(props: { stats: GitHubStats; theme: ThemeConfig; width: number; height: number }): string {
  const { stats, theme, width, height } = props;
  
  const statItems = [
    { label: 'Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor },
    { label: 'PRs', value: formatNumber(stats.totalPRs), color: theme.secondaryColor },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: theme.accentColor },
    { label: 'Stars', value: formatNumber(stats.totalStars), color: '#fbbf24' },
    { label: 'Forks', value: formatNumber(stats.totalForks), color: '#34d399' },
    { label: 'Contributions', value: formatNumber(stats.totalContributions), color: theme.primaryColor },
  ];

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: '${theme.backgroundColor}',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  alignItems: 'center',
  padding: '20px',
}}>
  <style>
    {\`
      @keyframes box-pulse {
        0%, 100% { opacity: 0.85; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
      }
      @keyframes orb-float-1 {
        0%, 100% { transform: translate(0, 0); opacity: 0.8; }
        50% { transform: translate(25px, -15px); opacity: 1; }
      }
      @keyframes orb-float-2 {
        0%, 100% { transform: translate(0, 0); opacity: 0.75; }
        50% { transform: translate(-20px, 12px); opacity: 0.95; }
      }
      .stat-box { animation: box-pulse 3s ease-in-out infinite; }
      .stat-box:nth-child(1) { animation-delay: 0s; }
      .stat-box:nth-child(2) { animation-delay: 0.3s; }
      .stat-box:nth-child(3) { animation-delay: 0.6s; }
      .stat-box:nth-child(4) { animation-delay: 0.9s; }
      .stat-box:nth-child(5) { animation-delay: 1.2s; }
      .stat-box:nth-child(6) { animation-delay: 1.5s; }
      #stats-orb-1 { animation: orb-float-1 8s ease-in-out infinite; }
      #stats-orb-2 { animation: orb-float-2 7s ease-in-out infinite 0.5s; }
    \`}
  </style>
  
  <svg width="${width}" height="${height}" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="stats-grad-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(69, 46, 123, 0.85)" />
        <stop offset="70%" stopColor="rgba(69, 46, 123, 0)" />
      </radialGradient>
      <radialGradient id="stats-grad-2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(89, 28, 135, 0.8)" />
        <stop offset="70%" stopColor="rgba(89, 28, 135, 0)" />
      </radialGradient>
    </defs>
    <ellipse id="stats-orb-1" cx="${width * 0.3}" cy="${height * 0.5}" rx="160" ry="110" fill="url(#stats-grad-1)" />
    <ellipse id="stats-orb-2" cx="${width * 0.7}" cy="${height * 0.6}" rx="140" ry="100" fill="url(#stats-grad-2)" />
  </svg>
  
  <div style={{ fontSize: '22px', fontWeight: 700, color: '${theme.textColor}', marginBottom: '10px', zIndex: 10 }}>
    📊 GitHub Statistics
  </div>
  <div style={{ fontSize: '13px', color: 'rgba(241, 245, 249, 0.6)', marginBottom: '20px', zIndex: 10 }}>
    Overall metrics
  </div>
  
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', zIndex: 10 }}>
    ${statItems.map((item, idx) => `
      <div className="stat-box" style={{
        width: '210px',
        height: '85px',
        background: 'rgba(${parseInt(item.color.slice(1, 3), 16)}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(item.color.slice(5, 7), 16)}, 0.15)',
        border: '2px solid rgba(${parseInt(item.color.slice(1, 3), 16)}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(item.color.slice(5, 7), 16)}, 0.4)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '${item.color}' }}>
          ${item.value}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(241, 245, 249, 0.6)', letterSpacing: '0.5px' }}>
          ${item.label.toUpperCase()}
        </div>
      </div>
    `).join('')}
  </div>
</div>
  `.trim();
}

// ========================================
// STREAK CARD
// ========================================
export function generateStreakCardJsx(props: { streak: StreakData; theme: ThemeConfig; width: number; height: number }): string {
  const { streak, theme, width, height } = props;
  const motivationalMessage = streak.current > 0 ? 'Keep the streak alive! 💪' : 'Start your contribution streak today! 🚀';

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: '${theme.backgroundColor}',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  alignItems: 'center',
  padding: '20px',
}}>
  <style>
    {\`
      @keyframes fire-pulse {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scale(1.12) translateY(-4px); }
      }
      @keyframes streak-glow {
        0%, 100% { opacity: 0.85; box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); }
        50% { opacity: 1; box-shadow: 0 0 25px rgba(139, 92, 246, 0.6); }
      }
      @keyframes ripple {
        0% { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      #fire-emoji { animation: fire-pulse 2s ease-in-out infinite; }
      .streak-box { animation: streak-glow 3s ease-in-out infinite; }
      #ripple-1 { animation: ripple 2s ease-out infinite; }
      #ripple-2 { animation: ripple 2s ease-out infinite 0.6s; }
      #ripple-3 { animation: ripple 2s ease-out infinite 1.2s; }
    \`}
  </style>
  
  <svg width="${width}" height="${height}" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="streak-grad-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(89, 28, 135, 0.8)" />
        <stop offset="70%" stopColor="rgba(89, 28, 135, 0)" />
      </radialGradient>
      <radialGradient id="current-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${theme.primaryColor}" />
        <stop offset="100%" stopColor="${theme.secondaryColor}" />
      </radialGradient>
    </defs>
    <ellipse cx="${width * 0.5}" cy="${height * 0.3}" rx="180" ry="120" fill="url(#streak-grad-1)" />
    <circle id="ripple-1" cx="${width / 2}" cy="60" r="30" fill="none" stroke="${theme.primaryColor}" strokeWidth="2" />
    <circle id="ripple-2" cx="${width / 2}" cy="60" r="30" fill="none" stroke="${theme.primaryColor}" strokeWidth="2" />
    <circle id="ripple-3" cx="${width / 2}" cy="60" r="30" fill="none" stroke="${theme.primaryColor}" strokeWidth="2" />
  </svg>
  
  <div id="fire-emoji" style={{ fontSize: '48px', marginTop: '10px', zIndex: 10 }}>🔥</div>
  <div style={{ fontSize: '20px', fontWeight: 700, color: '${theme.textColor}', marginTop: '10px', zIndex: 10 }}>
    Contribution Streak
  </div>
  
  <div style={{ display: 'flex', gap: '20px', marginTop: '20px', zIndex: 10 }}>
    <div className="streak-box" style={{
      width: '150px',
      height: '60px',
      background: 'rgba(139, 92, 246, 0.15)',
      border: '2px solid rgba(139, 92, 246, 0.4)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: '22px', fontWeight: 700, fill: 'url(#current-gradient)' }}>
        ${streak.current}
      </div>
      <div style={{ fontSize: '8px', fontWeight: 600, color: 'rgba(241, 245, 249, 0.6)', letterSpacing: '0.5px' }}>
        CURRENT STREAK
      </div>
    </div>
    
    <div className="streak-box" style={{
      width: '150px',
      height: '60px',
      background: 'rgba(236, 72, 153, 0.15)',
      border: '2px solid rgba(236, 72, 153, 0.4)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: '22px', fontWeight: 700, color: '${theme.accentColor}' }}>
        ${streak.longest}
      </div>
      <div style={{ fontSize: '8px', fontWeight: 600, color: 'rgba(241, 245, 249, 0.6)', letterSpacing: '0.5px' }}>
        LONGEST STREAK
      </div>
    </div>
  </div>
  
  <div style={{
    width: '400px',
    height: '35px',
    background: 'rgba(45, 212, 191, 0.15)',
    border: '2px solid rgba(45, 212, 191, 0.4)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    zIndex: 10,
  }}>
    <div style={{ fontSize: '16px', fontWeight: 700, color: '${theme.secondaryColor}' }}>
      ${formatNumber(streak.totalContributions)}
    </div>
    <div style={{ fontSize: '7px', fontWeight: 600, color: 'rgba(241, 245, 249, 0.6)', letterSpacing: '0.5px' }}>
      TOTAL CONTRIBUTIONS
    </div>
  </div>
  
  <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'rgba(241, 245, 249, 0.7)', marginTop: '15px', zIndex: 10 }}>
    ${motivationalMessage}
  </div>
</div>
  `.trim();
}

// ========================================
// LANGUAGES CARD
// ========================================
export function generateLanguagesCardJsx(props: { languages: LanguageStats[]; theme: ThemeConfig; width: number; height: number }): string {
  const { languages, theme, width, height } = props;
  const topLanguages = languages.slice(0, 5);

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: '${theme.backgroundColor}',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '30px',
}}>
  <style>
    {\`
      @keyframes bar-fill {
        0% { width: 0; }
        100% { width: var(--target-width); }
      }
      @keyframes dot-pulse {
        0%, 100% { r: 4; }
        50% { r: 6; }
      }
      .lang-bar { animation: bar-fill 1.5s ease-out forwards; }
      .lang-dot { animation: dot-pulse 2s ease-in-out infinite; }
    \`}
  </style>
  
  <svg width="${width}" height="${height}" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="lang-grad-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(45, 15, 90, 0.85)" />
        <stop offset="70%" stopColor="rgba(45, 15, 90, 0)" />
      </radialGradient>
    </defs>
    <ellipse cx="${width * 0.5}" cy="${height * 0.5}" rx="200" ry="150" fill="url(#lang-grad-1)" />
  </svg>
  
  <div style={{ fontSize: '20px', fontWeight: 700, color: '${theme.textColor}', marginBottom: '5px', zIndex: 10 }}>
    💻 Most Used Languages
  </div>
  <div style={{ fontSize: '12px', color: 'rgba(241, 245, 249, 0.6)', marginBottom: '25px', zIndex: 10 }}>
    Based on repository analysis
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', zIndex: 10 }}>
    ${topLanguages.map((lang, index) => {
      const maxBarWidth = width - 220;
      const barWidth = (lang.percentage / 100) * maxBarWidth;
      return `
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <svg width="10" height="10">
            <circle className="lang-dot" cx="5" cy="5" r="4" fill="${lang.color}" />
          </svg>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '${theme.textColor}', width: '100px' }}>
            ${lang.name}
          </div>
          <div style={{ flex: 1, height: '5px', background: 'rgba(241, 245, 249, 0.1)', borderRadius: '3px', position: 'relative' }}>
            <div className="lang-bar" style={{
              height: '100%',
              background: '${lang.color}',
              borderRadius: '3px',
              '--target-width': '${barWidth}px',
            }}></div>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '${lang.color}', width: '50px', textAlign: 'right' }}>
            ${lang.percentage.toFixed(1)}%
          </div>
        </div>
      `;
    }).join('')}
  </div>
</div>
  `.trim();
}

// ========================================
// AUTO TECH STACK CARD
// ========================================
export function generateAutoTechStackCardJsx(props: { techStack: TechStackCategories; theme: ThemeConfig; width: number; height: number }): string {
  const { techStack, theme, width, height } = props;
  
  const categories = [
    { name: 'LANGUAGES', icon: '💬', items: techStack.languages, color: 'rgba(139, 92, 246, 0.8)' },
    { name: 'FRAMEWORKS', icon: '🔧', items: techStack.frameworks, color: 'rgba(59, 130, 246, 0.8)' },
    { name: 'OTHERS', icon: '⚡', items: techStack.others, color: 'rgba(6, 182, 212, 0.8)' },
  ];

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: '${theme.backgroundColor}',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '25px',
}}>
  <style>
    {\`
      @keyframes badge-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
      .tech-badge { animation: badge-float 3s ease-in-out infinite; }
      .tech-badge:nth-child(odd) { animation-delay: 0.2s; }
    \`}
  </style>
  
  <svg width="${width}" height="${height}" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <radialGradient id="tech-grad-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(69, 46, 123, 0.75)" />
        <stop offset="70%" stopColor="rgba(69, 46, 123, 0)" />
      </radialGradient>
    </defs>
    <ellipse cx="${width * 0.5}" cy="${height * 0.5}" rx="220" ry="140" fill="url(#tech-grad-1)" />
  </svg>
  
  <div style={{ fontSize: '20px', fontWeight: 700, color: '${theme.textColor}', marginBottom: '5px', zIndex: 10 }}>
    🚀 Tech Stack
  </div>
  <div style={{ fontSize: '12px', color: 'rgba(241, 245, 249, 0.6)', marginBottom: '20px', zIndex: 10 }}>
    Auto-detected from repositories
  </div>
  
  ${categories.map((category, catIndex) => `
    <div style={{ marginBottom: '15px', zIndex: 10 }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(241, 245, 249, 0.8)', letterSpacing: '1px', marginBottom: '10px' }}>
        ${category.icon} ${category.name}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        ${category.items.map((tech, index) => `
          <div className="tech-badge" style={{
            padding: '4px 14px',
            background: '${category.color.replace('0.8', '0.15')}',
            border: '1px solid ${category.color.replace('0.8', '0.3')}',
            borderRadius: '14px',
            fontSize: '11px',
            fontWeight: 600,
            color: '${category.color.replace('0.8', '1')}',
          }}>
            ${tech.length > 12 ? tech.substring(0, 10) + '.' : tech}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('')}
</div>
  `.trim();
}
