export function sanitizeSvgString(svg: string): string {
  let clean = svg.trim();
  if (!clean.includes('xmlns="http://www.w3.org/2000/svg"')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Extract the SVG width/height for proper background sizing
  const widthMatch = clean.match(/width="(\d+)"/);
  const heightMatch = clean.match(/height="(\d+)"/);
  const svgWidth = widthMatch ? parseInt(widthMatch[1]) : 800;
  const svgHeight = heightMatch ? parseInt(heightMatch[1]) : 300;

  // SMIL Animations — GitHub Camo compatible (no CSS keyframes)
  const premiumDefs = `
    <defs>
      <!-- Deep Space Radial Gradient Background -->
      <radialGradient id="spaceBg" cx="50%" cy="50%" r="80%">
        <stop offset="0%" stop-color="#1a0533" />
        <stop offset="60%" stop-color="#0a0118" />
        <stop offset="100%" stop-color="#030108" />
      </radialGradient>
      
      <!-- Animated Neon Border Gradient -->
      <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8">
          <animate attributeName="stop-color" values="#38bdf8;#a855f7;#ec4899;#38bdf8" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="#a855f7">
          <animate attributeName="stop-color" values="#a855f7;#ec4899;#38bdf8;#a855f7" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#ec4899">
          <animate attributeName="stop-color" values="#ec4899;#38bdf8;#a855f7;#ec4899" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>

      <!-- Glassmorphism subtle drop shadow -->
      <filter id="glassShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
      </filter>

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
    </defs>
    
    <!-- Full Background -->
    <rect width="${svgWidth}" height="${svgHeight}" fill="url(#spaceBg)" rx="12" />
    
    <!-- Animated Top Border Glow Line -->
    <rect x="0" y="0" width="${svgWidth}" height="2" fill="url(#borderGlow)" rx="1">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
    </rect>

    <!-- Pulsing Glow Orb Top-Right -->
    <circle cx="${Math.round(svgWidth * 0.85)}" cy="0" r="180" fill="#a855f7" opacity="0.08">
      <animate attributeName="opacity" values="0.05;0.15;0.05" dur="5s" repeatCount="indefinite" />
      <animate attributeName="r" values="160;200;160" dur="6s" repeatCount="indefinite" />
    </circle>

    <!-- Pulsing Glow Orb Bottom-Left -->
    <circle cx="${Math.round(svgWidth * 0.15)}" cy="${svgHeight}" r="150" fill="#38bdf8" opacity="0.06">
      <animate attributeName="opacity" values="0.04;0.12;0.04" dur="7s" repeatCount="indefinite" />
      <animate attributeName="r" values="130;170;130" dur="8s" repeatCount="indefinite" />
    </circle>

    <!-- Floating Content Group -->
    <g>
      <animateTransform 
        attributeName="transform" 
        type="translate" 
        values="0,0; 0,-4; 0,0" 
        dur="6s" 
        repeatCount="indefinite" 
      />
  `;

  // Split premiumDefs into the defs content and the post-defs animated elements
  const defsContent = premiumDefs.match(/<defs>([\s\S]*?)<\/defs>/)?.[1] || '';
  const afterDefs = premiumDefs.replace(/<defs>[\s\S]*?<\/defs>/, '').trim();

  if (clean.includes('<defs>')) {
    // Satori already has <defs> — merge our gradients/filters INTO existing defs
    clean = clean.replace('<defs>', `<defs>${defsContent}`);
    // Insert animated background elements + floating group wrapper after the last </defs>
    const lastDefsClose = clean.lastIndexOf('</defs>');
    if (lastDefsClose !== -1) {
      const insertPos = lastDefsClose + '</defs>'.length;
      clean = clean.slice(0, insertPos) + afterDefs + '<g><animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="6s" repeatCount="indefinite" />' + clean.slice(insertPos);
      clean = clean.replace(/<\/svg>$/, `</g></svg>`);
    }
  } else {
    // No existing defs — inject everything at the start
    clean = clean.replace(/(<svg[^>]*>)/, `$1${premiumDefs}`);
    clean = clean.replace(/<\/svg>$/, `</g></svg>`);
  }
  
  return clean;
}
