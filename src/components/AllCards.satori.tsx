/**
 * All Card Components - Satori JSX Versions (Redesigned)
 * Complete redesign with streak integration and new layouts
 */

import type { GitHubStats, StreakData, LanguageStats, ThemeConfig, TechStackCategories } from '../types/index.js';
import { formatNumber } from '../utils/helpers.js';

// ========================================
// ENHANCED STATS CARD (WITH STREAK DATA)
// ========================================
export function generateStatsCardJsx(props: { stats: GitHubStats; streak?: StreakData; theme: ThemeConfig; width: number; height: number }): string {
  const { stats, streak, theme, width, height } = props;
  
  // Main stats (top 2 rows)
  const mainStats = [
    { label: 'Total Contributions', value: formatNumber(stats.totalContributions), color: '#10b981', icon: '📊' },
    { label: 'Commits', value: formatNumber(stats.totalCommits), color: theme.primaryColor, icon: '💻' },
    { label: 'Pull Requests', value: formatNumber(stats.totalPRs), color: '#3b82f6', icon: '🔄' },
    { label: 'Issues', value: formatNumber(stats.totalIssues), color: '#f59e0b', icon: '🐛' },
    { label: 'Stars Earned', value: formatNumber(stats.totalStars), color: '#fbbf24', icon: '⭐' },
    { label: 'Repositories', value: formatNumber(stats.totalForks), color: '#34d399', icon: '📚' },
  ];

  // Streak stats (bottom section)
  const streakStats = streak ? [
    { label: 'Current Streak', value: `${streak.current} days`, color: '#ef4444', icon: '🔥' },
    { label: 'Longest Streak', value: `${streak.longest} days`, color: '#8b5cf6', icon: '🚀' },
  ] : [];

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '25px',
  border: '1px solid rgba(148, 163, 184, 0.1)',
}}>
  <style>
    {\`
      @keyframes stat-slide-in {
        0% { opacity: 0; transform: translateX(-20px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.6); }
      }
      @keyframes number-counter {
        0% { transform: scale(0.8); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      .stat-item { animation: stat-slide-in 0.6s ease-out forwards; }
      .stat-item:nth-child(1) { animation-delay: 0.1s; }
      .stat-item:nth-child(2) { animation-delay: 0.2s; }
      .stat-item:nth-child(3) { animation-delay: 0.3s; }
      .stat-item:nth-child(4) { animation-delay: 0.4s; }
      .stat-item:nth-child(5) { animation-delay: 0.5s; }
      .stat-item:nth-child(6) { animation-delay: 0.6s; }
      .streak-item { animation: glow-pulse 3s ease-in-out infinite; }
      .number-value { animation: number-counter 1s ease-out; }
    \`}
  </style>
  
  <div style={{ fontSize: '24px', fontWeight: 800, color: '${theme.textColor}', marginBottom: '8px', textAlign: 'center' }}>
    📊 GitHub Statistics & Streaks
  </div>
  <div style={{ fontSize: '14px', color: 'rgba(148, 163, 184, 0.8)', marginBottom: '30px', textAlign: 'center' }}>
    Complete development metrics
  </div>
  
  
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '25px', justifyContent: 'center' }}>
    ${mainStats.map((stat, index) => `
      <div className="stat-item" style={{
        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.6) 0%, rgba(71, 85, 105, 0.4) 100%)',
        borderRadius: '12px',
        padding: '18px 12px',
        textAlign: 'center',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        backdropFilter: 'blur(10px)',
        opacity: 0,
        flex: '1 1 180px',
        minWidth: '180px',
        maxWidth: '220px',
      }}>
        <div style={{ fontSize: '20px', marginBottom: '8px' }}>
          ${stat.icon}
        </div>
        <div className="number-value" style={{ 
          fontSize: '22px', 
          fontWeight: 700, 
          color: '${stat.color}',
          marginBottom: '5px',
          textShadow: '0 0 10px ${stat.color}40',
        }}>
          ${stat.value}
        </div>
        <div style={{ 
          fontSize: '10px', 
          fontWeight: 600, 
          color: 'rgba(148, 163, 184, 0.7)',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          ${stat.label}
        </div>
      </div>
    `).join('')}
  </div>
  
  ${streak ? `
  <div style={{ 
    background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  }}>
    <div style={{ fontSize: '16px', fontWeight: 700, color: '${theme.textColor}', marginBottom: '15px', textAlign: 'center' }}>
      🔥 Contribution Streaks
    </div>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      ${streakStats.map(streakStat => `
        <div className="streak-item" style={{
          background: 'rgba(${streakStat.color === '#ef4444' ? '239, 68, 68' : '139, 92, 246'}, 0.15)',
          borderRadius: '10px',
          padding: '15px 25px',
          textAlign: 'center',
          border: '1px solid rgba(${streakStat.color === '#ef4444' ? '239, 68, 68' : '139, 92, 246'}, 0.3)',
        }}>
          <div style={{ fontSize: '18px', marginBottom: '5px' }}>
            ${streakStat.icon}
          </div>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 700, 
            color: '${streakStat.color}',
            marginBottom: '3px' 
          }}>
            ${streakStat.value}
          </div>
          <div style={{ 
            fontSize: '9px', 
            fontWeight: 600, 
            color: 'rgba(148, 163, 184, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            ${streakStat.label}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}
</div>
  `.trim();
}

// ========================================
// MODERN LANGUAGES CARD (REDESIGNED)
// ========================================
export function generateLanguagesCardJsx(props: { languages: LanguageStats[]; theme: ThemeConfig; width: number; height: number }): string {
  const { languages, theme, width, height } = props;
  const topLanguages = languages.slice(0, 6); // Show 6 languages

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '25px',
  border: '1px solid rgba(148, 163, 184, 0.1)',
}}>
  <style>
    {\`
      @keyframes language-reveal {
        0% { opacity: 0; transform: translateY(20px) scale(0.9); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes progress-fill {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }
      @keyframes icon-bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      .lang-item { animation: language-reveal 0.8s ease-out forwards; }
      .lang-item:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
      .lang-item:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
      .lang-item:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
      .lang-item:nth-child(4) { animation-delay: 0.4s; opacity: 0; }
      .lang-item:nth-child(5) { animation-delay: 0.5s; opacity: 0; }
      .lang-item:nth-child(6) { animation-delay: 0.6s; opacity: 0; }
      .progress-bar { animation: progress-fill 1.5s ease-out 0.5s forwards; transform-origin: left; }
      .lang-icon { animation: icon-bounce 2s ease-in-out infinite; }
    \`}
  </style>
  
  <div style={{ textAlign: 'center', marginBottom: '25px' }}>
    <div className="lang-icon" style={{ fontSize: '28px', marginBottom: '8px' }}>
      💻
    </div>
    <div style={{ fontSize: '22px', fontWeight: 800, color: '${theme.textColor}', marginBottom: '5px' }}>
      Most Used Languages
    </div>
    <div style={{ fontSize: '13px', color: 'rgba(148, 163, 184, 0.7)' }}>
      Based on repository analysis
    </div>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    ${topLanguages.map((lang, index) => `
      <div className="lang-item" style={{
        background: 'linear-gradient(135deg, rgba(71, 85, 105, 0.4) 0%, rgba(51, 65, 85, 0.6) 100%)',
        borderRadius: '12px',
        padding: '15px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(10px)',
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '${lang.color}',
              boxShadow: '0 0 8px ${lang.color}50',
            }}></div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: '${theme.textColor}',
            }}>
              ${lang.name}
            </div>
          </div>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: 700, 
            color: '${lang.color}',
            background: 'rgba(${parseInt(lang.color.slice(1, 3), 16)}, ${parseInt(lang.color.slice(3, 5), 16)}, ${parseInt(lang.color.slice(5, 7), 16)}, 0.15)',
            padding: '2px 8px',
            borderRadius: '8px',
          }}>
            ${lang.percentage.toFixed(1)}%
          </div>
        </div>
        
        <div style={{ 
          width: '100%', 
          height: '6px', 
          background: 'rgba(148, 163, 184, 0.1)', 
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div className="progress-bar" style={{
            height: '100%',
            background: 'linear-gradient(90deg, ${lang.color}, ${lang.color}DD)',
            borderRadius: '3px',
            width: '${lang.percentage}%',
            transform: 'scaleX(0)',
          }}></div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
  `.trim();
}

// ========================================
// MODERN TECH STACK CARD (REDESIGNED & FIXED)
// ========================================
export function generateAutoTechStackCardJsx(props: { techStack: TechStackCategories; theme: ThemeConfig; width: number; height: number }): string {
  const { techStack, theme, width, height } = props;
  
  // Ensure techStack exists and has data
  if (!techStack || (!techStack.languages?.length && !techStack.frameworks?.length && !techStack.others?.length)) {
    return generateEmptyTechStackCard({ theme, width, height });
  }
  
  const categories = [
    { name: 'Languages', icon: '�', items: techStack.languages || [], color: 'rgba(34, 197, 94, 0.8)', bgColor: 'rgba(34, 197, 94, 0.1)' },
    { name: 'Frameworks', icon: '⚙️', items: techStack.frameworks || [], color: 'rgba(59, 130, 246, 0.8)', bgColor: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Tools & Others', icon: '🛠️', items: techStack.others || [], color: 'rgba(168, 85, 247, 0.8)', bgColor: 'rgba(168, 85, 247, 0.1)' },
  ].filter(cat => cat.items.length > 0); // Only show categories with items

  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '25px',
  border: '1px solid rgba(75, 85, 99, 0.2)',
}}>
  <style>
    {\`
      @keyframes tech-slide-up {
        0% { opacity: 0; transform: translateY(15px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes tech-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.6); }
      }
      @keyframes rotate-icon {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .tech-category { animation: tech-slide-up 0.8s ease-out forwards; }
      .tech-category:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
      .tech-category:nth-child(2) { animation-delay: 0.3s; opacity: 0; }
      .tech-category:nth-child(3) { animation-delay: 0.5s; opacity: 0; }
      .tech-badge { animation: tech-glow 4s ease-in-out infinite; }
      .main-icon { animation: rotate-icon 20s linear infinite; }
    \`}
  </style>
  
  <div style={{ textAlign: 'center', marginBottom: '25px' }}>
    <div className="main-icon" style={{ fontSize: '32px', marginBottom: '10px' }}>
      🚀
    </div>
    <div style={{ fontSize: '24px', fontWeight: 800, color: '${theme.textColor}', marginBottom: '5px' }}>
      Tech Stack
    </div>
    <div style={{ fontSize: '13px', color: 'rgba(156, 163, 175, 0.8)' }}>
      Auto-detected from repositories
    </div>
  </div>
  
  ${categories.map((category, catIndex) => `
    <div className="tech-category" style={{ marginBottom: '20px', opacity: 0 }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        marginBottom: '12px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      }}>
        <span style={{ fontSize: '18px' }}>${category.icon}</span>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: 700, 
          color: '${category.color}',
          letterSpacing: '0.5px',
        }}>
          ${category.name}
        </div>
        <div style={{ 
          fontSize: '11px',
          color: 'rgba(156, 163, 175, 0.6)',
          background: '${category.bgColor}',
          padding: '2px 8px',
          borderRadius: '10px',
          marginLeft: 'auto',
        }}>
          ${category.items.length} items
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '8px',
      }}>
        ${category.items.slice(0, 8).map((tech, index) => `
          <div className="tech-badge" style={{
            padding: '8px 12px',
            background: '${category.bgColor}',
            border: '1px solid ${category.color.replace('0.8', '0.3')}',
            borderRadius: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(5px)',
            flex: '0 0 auto',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '${category.color}',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '80px',
            }}>
              ${tech.length > 10 ? tech.substring(0, 8) + '..' : tech}
            </div>
          </div>
        `).join('')}
        
        ${category.items.length > 8 ? `
          <div style={{
            padding: '8px 12px',
            background: 'rgba(75, 85, 99, 0.2)',
            border: '1px dashed rgba(156, 163, 175, 0.4)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(156, 163, 175, 0.8)',
            }}>
              +${category.items.length - 8} more
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('')}
</div>
  `.trim();
}

// ========================================
// EMPTY TECH STACK FALLBACK
// ========================================
function generateEmptyTechStackCard(props: { theme: ThemeConfig; width: number; height: number }): string {
  const { theme, width, height } = props;
  
  return `
<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '${width}px',
  height: '${height}px',
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  padding: '25px',
  border: '1px solid rgba(75, 85, 99, 0.2)',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <div style={{ fontSize: '48px', marginBottom: '15px', opacity: 0.6 }}>
    🔧
  </div>
  <div style={{ fontSize: '18px', fontWeight: 700, color: '${theme.textColor}', marginBottom: '8px', textAlign: 'center' }}>
    Tech Stack Loading...
  </div>
  <div style={{ fontSize: '13px', color: 'rgba(156, 163, 175, 0.7)', textAlign: 'center', maxWidth: '300px' }}>
    Scanning repositories for technologies. This may take a moment for new accounts.
  </div>
</div>
  `.trim();
}
