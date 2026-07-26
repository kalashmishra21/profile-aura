export function sanitizeSvgString(svg: string): string {
  let clean = svg.trim();
  if (!clean.includes('xmlns="http://www.w3.org/2000/svg"')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Ultimate Readme-Aura Style Injector (Bypasses GitHub className stripping)
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
    </defs>
    <style>
      /* ID-based animations (Preserved by GitHub Camo) */
      @keyframes floatAnim {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulseAnim {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
      }
      #floating-element {
        animation: floatAnim 4s ease-in-out infinite;
      }
      #pulsing-glow {
        animation: pulseAnim 3s ease-in-out infinite;
      }
      #glass-card {
        background-color: rgba(25, 25, 35, 0.4);
        backdrop-filter: blur(12px);
      }
    </style>
  `;
  
  if (!clean.includes('<defs>')) {
    clean = clean.replace(/(<svg[^>]*>)/, `$1${premiumDefs}`);
  }
  
  return clean;
}
