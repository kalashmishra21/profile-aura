/**
 * Header/Profile Card Component - Satori JSX Version
 * Uses CSS animations for smoother rendering
 */

import type { GitHubStats, ThemeConfig } from '../types/index.js';

interface HeaderCardProps {
  stats: GitHubStats;
  theme: ThemeConfig;
  width: number;
  height: number;
  statusLine?: string;
}

export function generateHeaderCardJsx(props: HeaderCardProps): string {
  const { stats, theme, width, height } = props;
  
  // Darker gradient colors with higher opacity
  const darkGradients = {
    purple1: 'rgba(45, 15, 90, 0.9)',
    purple2: 'rgba(69, 46, 123, 0.8)',
    purple3: 'rgba(89, 28, 135, 0.75)',
    purple4: 'rgba(30, 10, 60, 0.95)',
    magenta1: 'rgba(120, 20, 140, 0.85)',
    magenta2: 'rgba(160, 30, 180, 0.8)',
    blue1: 'rgba(20, 30, 100, 0.85)',
    blue2: 'rgba(40, 60, 140, 0.8)',
  };

  return `
<div style={{
  display: 'flex',
  width: '${width}px',
  height: '${height}px',
  background: '${theme.backgroundColor}',
  borderRadius: '${theme.borderRadius}px',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
}}>
  <style>
    {\`
      /* Floating orbs with ease-in-out */
      @keyframes drift-right {
        0%, 100% { transform: translate(0, 0); opacity: 0.8; }
        50% { transform: translate(35px, -18px); opacity: 1; }
      }
      @keyframes drift-left {
        0%, 100% { transform: translate(0, 0); opacity: 0.75; }
        50% { transform: translate(-28px, 15px); opacity: 0.95; }
      }
      @keyframes drift-up {
        0%, 100% { transform: translate(0, 0); opacity: 0.85; }
        50% { transform: translate(20px, -25px); opacity: 1; }
      }
      @keyframes pulse-glow {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.25); opacity: 0.5; }
      }
      
      /* Border glow animation */
      @keyframes border-flow {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: ${width * 2 + height * 2}; }
      }
      
      /* Text fade in */
      @keyframes fade-in {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      /* Avatar pulse */
      @keyframes avatar-pulse {
        0%, 100% { stroke-opacity: 0.5; }
        50% { stroke-opacity: 1; }
      }
      
      /* Apply animations */
      #orb-1 { animation: drift-right 7.5s ease-in-out infinite; }
      #orb-2 { animation: drift-left 8.3s ease-in-out infinite 0.3s; }
      #orb-3 { animation: drift-up 6.7s ease-in-out infinite 0.6s; }
      #orb-4 { animation: pulse-glow 5.5s ease-in-out infinite; }
      #orb-5 { animation: drift-right 9.2s ease-in-out infinite 0.2s; }
      #orb-6 { animation: drift-left 7.8s ease-in-out infinite 0.8s; }
      
      #avatar-ring { animation: avatar-pulse 2s ease-in-out infinite; }
      #border-glow { animation: border-flow 8s linear infinite; }
      
      .fade-in-1 { animation: fade-in 0.6s ease-out forwards; }
      .fade-in-2 { animation: fade-in 0.6s ease-out 0.2s forwards; opacity: 0; }
      .fade-in-3 { animation: fade-in 0.6s ease-out 0.4s forwards; opacity: 0; }
      .fade-in-4 { animation: fade-in 0.6s ease-out 0.6s forwards; opacity: 0; }
      .fade-in-5 { animation: fade-in 0.6s ease-out 0.8s forwards; opacity: 0; }
    \`}
  </style>
  
  {/* SVG Layer for animations */}
  <svg 
    width="${width}" 
    height="${height}" 
    style={{ position: 'absolute', top: 0, left: 0 }}
  >
    <defs>
      {/* Darker radial gradients */}
      <radialGradient id="grad-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.purple1}" />
        <stop offset="70%" stopColor="${darkGradients.purple1.replace('0.9', '0')}" />
      </radialGradient>
      <radialGradient id="grad-2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.purple2}" />
        <stop offset="70%" stopColor="${darkGradients.purple2.replace('0.8', '0')}" />
      </radialGradient>
      <radialGradient id="grad-3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.purple3}" />
        <stop offset="70%" stopColor="${darkGradients.purple3.replace('0.75', '0')}" />
      </radialGradient>
      <radialGradient id="grad-4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.magenta1}" />
        <stop offset="70%" stopColor="${darkGradients.magenta1.replace('0.85', '0')}" />
      </radialGradient>
      <radialGradient id="grad-5" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.blue1}" />
        <stop offset="70%" stopColor="${darkGradients.blue1.replace('0.85', '0')}" />
      </radialGradient>
      <radialGradient id="grad-6" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="${darkGradients.blue2}" />
        <stop offset="70%" stopColor="${darkGradients.blue2.replace('0.8', '0')}" />
      </radialGradient>
      
      {/* Avatar clip */}
      <clipPath id="avatar-clip">
        <circle cx="82" cy="${height / 2}" r="50" />
      </clipPath>
      
      {/* Glow filter */}
      <filter id="glow-filter">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Floating orbs with darker colors */}
    <ellipse id="orb-1" cx="${width * 0.25}" cy="${height * 0.6}" rx="180" ry="120" fill="url(#grad-1)" />
    <ellipse id="orb-2" cx="${width * 0.75}" cy="${height * 0.4}" rx="160" ry="110" fill="url(#grad-2)" />
    <ellipse id="orb-3" cx="${width * 0.5}" cy="${height * 0.7}" rx="140" ry="100" fill="url(#grad-3)" />
    <ellipse id="orb-4" cx="${width * 0.35}" cy="${height * 0.3}" rx="120" ry="90" fill="url(#grad-4)" />
    <ellipse id="orb-5" cx="${width * 0.65}" cy="${height * 0.8}" rx="100" ry="80" fill="url(#grad-5)" />
    <ellipse id="orb-6" cx="${width * 0.45}" cy="${height * 0.5}" rx="90" ry="75" fill="url(#grad-6)" />
    
    {/* Border glow */}
    <rect 
      id="border-glow"
      x="2" 
      y="2" 
      width="${width - 4}" 
      height="${height - 4}" 
      rx="${theme.borderRadius}" 
      fill="none" 
      stroke="url(#grad-1)" 
      strokeWidth="3"
      strokeDasharray="${(width * 2 + height * 2) / 4}"
      filter="url(#glow-filter)"
    />
    
    {/* Avatar glow ring */}
    <circle 
      id="avatar-ring"
      cx="82" 
      cy="${height / 2}" 
      r="53" 
      fill="none" 
      stroke="${theme.primaryColor}" 
      strokeWidth="3"
      filter="url(#glow-filter)"
    />
    
    {/* Avatar image */}
    <image
      href="${stats.avatarUrl}?s=200"
      x="32"
      y="${height / 2 - 50}"
      width="100"
      height="100"
      clipPath="url(#avatar-clip)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  
  {/* Content Layer */}
  <div style={{
    position: 'absolute',
    left: '164px',
    top: '${height / 2 - 55}px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 10,
  }}>
    {/* Name */}
    <div className="fade-in-1" style={{
      fontSize: '34px',
      fontWeight: 800,
      color: '${theme.textColor}',
      letterSpacing: '0.5px',
      fontFamily: 'Inter, sans-serif',
    }}>
      ${stats.name}
    </div>
    
    {/* Username */}
    <div className="fade-in-2" style={{
      fontSize: '16px',
      fontWeight: 500,
      color: 'rgba(${parseInt(theme.textColor.slice(1, 3), 16)}, ${parseInt(theme.textColor.slice(3, 5), 16)}, ${parseInt(theme.textColor.slice(5, 7), 16)}, 0.65)',
      letterSpacing: '0.3px',
    }}>
      @${stats.username}
    </div>
    
    {/* Stats Row */}
    <div style={{
      display: 'flex',
      gap: '40px',
      marginTop: '32px',
    }}>
      {/* Repos */}
      <div className="fade-in-3" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '${theme.primaryColor}',
          letterSpacing: '0.5px',
        }}>
          ${stats.repositories}
        </div>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(${parseInt(theme.textColor.slice(1, 3), 16)}, ${parseInt(theme.textColor.slice(3, 5), 16)}, ${parseInt(theme.textColor.slice(5, 7), 16)}, 0.65)',
          letterSpacing: '0.8px',
        }}>
          REPOS
        </div>
      </div>
      
      {/* Followers */}
      <div className="fade-in-4" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '${theme.secondaryColor}',
          letterSpacing: '0.5px',
        }}>
          ${stats.followers}
        </div>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(${parseInt(theme.textColor.slice(1, 3), 16)}, ${parseInt(theme.textColor.slice(3, 5), 16)}, ${parseInt(theme.textColor.slice(5, 7), 16)}, 0.65)',
          letterSpacing: '0.8px',
        }}>
          FOLLOWERS
        </div>
      </div>
      
      {/* Stars */}
      <div className="fade-in-5" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '${theme.accentColor}',
          letterSpacing: '0.5px',
        }}>
          ${stats.totalStars}
        </div>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(${parseInt(theme.textColor.slice(1, 3), 16)}, ${parseInt(theme.textColor.slice(3, 5), 16)}, ${parseInt(theme.textColor.slice(5, 7), 16)}, 0.65)',
          letterSpacing: '0.8px',
        }}>
          STARS
        </div>
      </div>
    </div>
  </div>
  
  {/* Footer */}
  <div style={{
    position: 'absolute',
    bottom: '25px',
    right: '15px',
    fontSize: '11px',
    color: 'rgba(${parseInt(theme.textColor.slice(1, 3), 16)}, ${parseInt(theme.textColor.slice(3, 5), 16)}, ${parseInt(theme.textColor.slice(5, 7), 16)}, 0.5)',
    zIndex: 10,
  }}>
    Powered by Profile Aura
  </div>
</div>
  `.trim();
}
