import { ThemeTokens } from '../types/theme.js';

export function sanitizeSvgString(svg: string, theme?: ThemeTokens): string {
  let clean = svg.trim();
  if (!clean.includes('xmlns="http://www.w3.org/2000/svg"')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Extract the SVG width/height for proper background sizing
  const widthMatch = clean.match(/width="(\d+)"/);
  const heightMatch = clean.match(/height="(\d+)"/);
  const svgWidth = widthMatch ? parseInt(widthMatch[1]) : 800;
  const svgHeight = heightMatch ? parseInt(heightMatch[1]) : 300;

  const accentPrimary = theme?.colors?.accentPrimary || '#a855f7';
  const accentSecondary = theme?.colors?.accentSecondary || '#38bdf8';
  const bgDark = theme?.colors?.background || '#030108';
  const bgMid = theme?.colors?.backgroundSecondary || '#0a0118';
  const bgLight = theme?.colors?.surface || '#1a0533';

  const defsContent = `
    <!-- Dynamic Radial Gradient Background -->
    <radialGradient id="spaceBg" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stop-color="${bgLight}" />
      <stop offset="60%" stop-color="${bgMid}" />
      <stop offset="100%" stop-color="${bgDark}" />
    </radialGradient>
    
    <!-- Static Neon Border Gradient -->
    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentSecondary}" />
      <stop offset="50%" stop-color="${accentPrimary}" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>

    <!-- Orb Gradients -->
    <radialGradient id="orbGlow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentPrimary}88" />
      <stop offset="100%" stop-color="${accentPrimary}00" />
    </radialGradient>
    <radialGradient id="orbGlow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentSecondary}88" />
      <stop offset="100%" stop-color="${accentSecondary}00" />
    </radialGradient>
    <radialGradient id="orbGlow3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ec489988" />
      <stop offset="100%" stop-color="#ec489900" />
    </radialGradient>
  `;

  const styleContent = `
    <style>
      @keyframes float-slow {
        0%, 100% { transform: translateX(0px); opacity: 0.15; }
        50% { transform: translateX(350px); opacity: 0.35; }
      }
      @keyframes float-medium {
        0%, 100% { transform: translateX(0px); opacity: 0.15; }
        50% { transform: translateX(-250px); opacity: 0.3; }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateX(0px); opacity: 0.2; }
        50% { transform: translateX(200px); opacity: 0.15; }
      }
      .orb-1 { animation: float-slow 8s ease-in-out infinite; }
      .orb-2 { animation: float-medium 12s ease-in-out infinite; }
      .orb-3 { animation: float-fast 9s ease-in-out infinite; }
      
      @keyframes border-pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .border-glow { animation: border-pulse 4s ease-in-out infinite; }
    </style>
  `;

  const backgroundElements = `
    <!-- Full Background -->
    <rect width="${svgWidth}" height="${svgHeight}" fill="url(#spaceBg)" rx="12" />
    
    <!-- Static Top Border Glow Line -->
    <rect class="border-glow" x="0" y="0" width="${svgWidth}" height="2" fill="url(#borderGlow)" rx="1" />

    <!-- Animated Glowing Orbs -->
    <ellipse class="orb-1" cx="20%" cy="100%" rx="350" ry="250" fill="url(#orbGlow1)" />
    <ellipse class="orb-2" cx="80%" cy="0%" rx="400" ry="300" fill="url(#orbGlow2)" />
    <ellipse class="orb-3" cx="50%" cy="50%" rx="250" ry="200" fill="url(#orbGlow3)" />

    <!-- Floating Content Group -->
    <g>
  `;

  // Extract the opening <svg ...> tag
  const svgTagMatch = clean.match(/<svg[^>]*>/);
  const svgTag = svgTagMatch ? svgTagMatch[0] : '<svg xmlns="http://www.w3.org/2000/svg">';
  
  // Extract inner content (everything between <svg...> and </svg>)
  let innerContent = clean.replace(svgTag, '').replace(/<\/svg>$/, '').trim();
  
  // Build the <defs> section, merging with any existing defs from Satori
  let finalDefs = `<defs>\n${defsContent}\n</defs>`;
  const existingDefsMatch = innerContent.match(/<defs>([\s\S]*?)<\/defs>/);
  if (existingDefsMatch) {
    finalDefs = `<defs>\n${defsContent}\n${existingDefsMatch[1]}\n</defs>`;
    innerContent = innerContent.replace(existingDefsMatch[0], '').trim();
  }
  
  // Assemble the final SVG with proper structure:
  // <svg> → <defs> → <style> (direct child of svg) → background elements → <g> → inner content → </g> → </svg>
  return `${svgTag}
${finalDefs}
${styleContent}
${backgroundElements}
${innerContent}
</g>
</svg>`;
}
