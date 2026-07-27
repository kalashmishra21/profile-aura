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

  const defsContent = `
    <!-- Deep Space Radial Gradient Background -->
    <radialGradient id="spaceBg" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#1a0533" />
      <stop offset="60%" stop-color="#0a0118" />
      <stop offset="100%" stop-color="#030108" />
    </radialGradient>
    
    <!-- Static Neon Border Gradient -->
    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  `;

  const styleContent = `
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      .float-content {
        animation: float 6s ease-in-out infinite;
      }
    </style>
  `;

  const backgroundElements = `
    <!-- Full Background -->
    <rect width="${svgWidth}" height="${svgHeight}" fill="url(#spaceBg)" rx="12" />
    
    <!-- Static Top Border Glow Line -->
    <rect x="0" y="0" width="${svgWidth}" height="2" fill="url(#borderGlow)" rx="1" />

    <!-- Static Decorative Orb Top-Right -->
    <circle cx="${Math.round(svgWidth * 0.85)}" cy="0" r="180" fill="#a855f7" opacity="0.08" />

    <!-- Static Decorative Orb Bottom-Left -->
    <circle cx="${Math.round(svgWidth * 0.15)}" cy="${svgHeight}" r="150" fill="#38bdf8" opacity="0.06" />

    <!-- Floating Content Group -->
    <g class="float-content">
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
  // <svg> → <defs> → <style> (direct child of svg) → background elements → <g class="float-content"> → inner content → </g> → </svg>
  return `${svgTag}
${finalDefs}
${styleContent}
${backgroundElements}
${innerContent}
</g>
</svg>`;
}
