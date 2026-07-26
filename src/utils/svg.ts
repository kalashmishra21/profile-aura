export function sanitizeSvgString(svg: string): string {
  let clean = svg.trim();
  if (!clean.includes('xmlns="http://www.w3.org/2000/svg"')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Ultimate Readme-Aura Style Injector (SMIL Animations for GitHub Camo)
  const premiumDefs = `
    <defs>
      <!-- Deep Space Radial Gradient Background -->
      <radialGradient id="spaceBg" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#140a28" />
        <stop offset="50%" stop-color="#05030a" />
        <stop offset="100%" stop-color="#000000" />
      </radialGradient>
      
      <!-- Intense Glowing Aura Filter -->
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur1" />
        <feGaussianBlur stdDeviation="16" result="blur2" />
        <feMerge>
          <feMergeNode in="blur2" />
          <feMergeNode in="blur1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Glassmorphism subtle drop shadow -->
      <filter id="glassShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
      </filter>

      <!-- Glow Gradient for Pulse -->
      <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#A855F7" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#A855F7" stop-opacity="0" />
      </radialGradient>
    </defs>
    
    <!-- Animated Pulsing Glow Background -->
    <rect width="100%" height="100%" fill="url(#spaceBg)" />
    <circle cx="80%" cy="-10%" r="400" fill="url(#pulseGlow)">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="20%" cy="110%" r="300" fill="url(#pulseGlow)">
      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="7s" repeatCount="indefinite" />
    </circle>

    <!-- Floating Group Wrapper -->
    <g>
      <animateTransform 
        attributeName="transform" 
        type="translate" 
        values="0,0; 0,-6; 0,0" 
        dur="6s" 
        repeatCount="indefinite" 
      />
  `;
  
  if (!clean.includes('<defs>')) {
    clean = clean.replace(/(<svg[^>]*>)/, `$1${premiumDefs}`);
    clean = clean.replace(/<\/svg>$/, `</g></svg>`);
  }
  
  return clean;
}
