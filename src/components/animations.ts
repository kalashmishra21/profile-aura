/**
 * Advanced animation effects for SVG cards
 * Live wallpaper-style animations
 */

/**
 * Particle system animation
 */
export function createParticleAnimation(width: number, height: number, particleCount = 50): string {
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 1 + Math.random() * 3;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    const opacity = 0.3 + Math.random() * 0.4;
    
    return `
      <circle cx="${x}" cy="${y}" r="${size}" fill="white" opacity="${opacity}">
        <animate
          attributeName="cy"
          from="${y}"
          to="${y - 100}"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="${opacity};0;${opacity}"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
      </circle>
    `;
  }).join('');

  return `<g class="particles">${particles}</g>`;
}

/**
 * Aurora borealis effect
 */
export function createAuroraEffect(width: number, height: number): string {
  const waves = [
    { y: height * 0.3, amplitude: 40, frequency: 0.02, color: '#667eea', opacity: 0.3, duration: 15 },
    { y: height * 0.5, amplitude: 60, frequency: 0.015, color: '#764ba2', opacity: 0.25, duration: 18 },
    { y: height * 0.7, amplitude: 50, frequency: 0.025, color: '#f093fb', opacity: 0.2, duration: 20 },
  ];

  return waves.map((wave, i) => {
    const path = Array.from({ length: 50 }, (_, j) => {
      const x = (j / 49) * width;
      const y = wave.y + Math.sin(j * wave.frequency * Math.PI) * wave.amplitude;
      return `${j === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ') + ` L ${width},${height} L 0,${height} Z`;

    return `
      <path d="${path}" fill="${wave.color}" opacity="${wave.opacity}">
        <animate
          attributeName="d"
          values="${path};${path.replace(/\d+(\.\d+)?/g, (m) => String(Number(m) + (Math.random() - 0.5) * 20))};${path}"
          dur="${wave.duration}s"
          repeatCount="indefinite"
        />
      </path>
    `;
  }).join('');
}

/**
 * Gradient wave animation
 */
export function createGradientWave(width: number, height: number): string {
  return `
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#667eea">
          <animate attributeName="stop-color" 
            values="#667eea;#764ba2;#f093fb;#667eea" 
            dur="8s" 
            repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="#764ba2">
          <animate attributeName="stop-color" 
            values="#764ba2;#f093fb;#667eea;#764ba2" 
            dur="8s" 
            repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#f093fb">
          <animate attributeName="stop-color" 
            values="#f093fb;#667eea;#764ba2;#f093fb" 
            dur="8s" 
            repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#waveGradient)" opacity="0.15" />
  `;
}

/**
 * Floating orbs/bubbles
 */
export function createFloatingOrbs(width: number, height: number, count = 8): string {
  const orbs = Array.from({ length: count }, (_, i) => {
    const x = (Math.random() * width);
    const y = height + (Math.random() * 100);
    const size = 20 + Math.random() * 60;
    const duration = 10 + Math.random() * 10;
    const delay = Math.random() * 5;
    const color = ['#667eea', '#764ba2', '#f093fb', '#4facfe'][i % 4];
    
    return `
      <circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.1">
        <animate
          attributeName="cy"
          from="${y}"
          to="${-size}"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          values="${x};${x + (Math.random() - 0.5) * 100};${x}"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="${size};${size * 1.2};${size}"
          dur="${duration / 2}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
      </circle>
    `;
  }).join('');

  return `<g class="orbs">${orbs}</g>`;
}

/**
 * Matrix-style code rain
 */
export function createCodeRain(width: number, height: number, columns = 20): string {
  const chars = '01';
  const columnWidth = width / columns;
  
  const rain = Array.from({ length: columns }, (_, col) => {
    const x = col * columnWidth + columnWidth / 2;
    const charCount = 10 + Math.floor(Math.random() * 10);
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 2;
    
    return Array.from({ length: charCount }, (_, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const y = (i / charCount) * height;
      const opacity = Math.max(0.1, 1 - (i / charCount));
      
      return `
        <text 
          x="${x}" 
          y="${y}" 
          font-family="monospace" 
          font-size="12" 
          fill="white" 
          opacity="${opacity * 0.3}"
          text-anchor="middle"
        >
          ${char}
          <animate
            attributeName="y"
            from="${y - height}"
            to="${y + height}"
            dur="${duration}s"
            begin="${delay}s"
            repeatCount="indefinite"
          />
        </text>
      `;
    }).join('');
  }).join('');

  return `<g class="code-rain">${rain}</g>`;
}

/**
 * Pulsing border glow effect
 */
export function createBorderGlow(width: number, height: number, radius = 10): string {
  return `
    <defs>
      <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#667eea" />
        <stop offset="50%" stop-color="#764ba2" />
        <stop offset="100%" stop-color="#f093fb" />
        <animate attributeName="x1" values="0%;100%;0%" dur="4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="100%;0%;100%" dur="4s" repeatCount="indefinite" />
      </linearGradient>
    </defs>
    <rect 
      x="2" 
      y="2" 
      width="${width - 4}" 
      height="${height - 4}" 
      rx="${radius}" 
      fill="none" 
      stroke="url(#borderGradient)" 
      stroke-width="3"
    >
      <animate 
        attributeName="stroke-width" 
        values="3;5;3" 
        dur="2s" 
        repeatCount="indefinite" 
      />
    </rect>
  `;
}

/**
 * Stats counter animation
 */
export function createCounterAnimation(from: number, to: number, duration = 2): string {
  return `
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.5s"
      fill="freeze"
    />
  `;
}

/**
 * Sparkle/twinkle stars
 */
export function createSparkles(width: number, height: number, count = 30): string {
  const sparkles = Array.from({ length: count }, (_, i) => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 1 + Math.random() * 2;
    const duration = 1 + Math.random() * 2;
    const delay = Math.random() * 3;
    
    return `
      <circle cx="${x}" cy="${y}" r="0" fill="white" opacity="0.8">
        <animate
          attributeName="r"
          values="0;${size};0"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;0.8;0"
          dur="${duration}s"
          begin="${delay}s"
          repeatCount="indefinite"
        />
      </circle>
    `;
  }).join('');

  return `<g class="sparkles">${sparkles}</g>`;
}

/**
 * Hexagon pattern background
 */
export function createHexPattern(width: number, height: number): string {
  const hexSize = 40;
  const rows = Math.ceil(height / (hexSize * 1.5)) + 1;
  const cols = Math.ceil(width / (hexSize * Math.sqrt(3))) + 1;
  
  let hexagons = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexSize * Math.sqrt(3) + (row % 2) * hexSize * Math.sqrt(3) / 2;
      const y = row * hexSize * 1.5;
      const delay = (row + col) * 0.1;
      
      hexagons += `
        <polygon
          points="${x},${y - hexSize} ${x + hexSize * Math.sqrt(3) / 2},${y - hexSize / 2} ${x + hexSize * Math.sqrt(3) / 2},${y + hexSize / 2} ${x},${y + hexSize} ${x - hexSize * Math.sqrt(3) / 2},${y + hexSize / 2} ${x - hexSize * Math.sqrt(3) / 2},${y - hexSize / 2}"
          fill="none"
          stroke="white"
          stroke-width="1"
          opacity="0.05"
        >
          <animate
            attributeName="opacity"
            values="0.05;0.15;0.05"
            dur="3s"
            begin="${delay}s"
            repeatCount="indefinite"
          />
        </polygon>
      `;
    }
  }
  
  return `<g class="hex-pattern">${hexagons}</g>`;
}

/**
 * Pulse ripple effect
 */
export function createRippleEffect(x: number, y: number, maxRadius = 100): string {
  return `
    <circle cx="${x}" cy="${y}" r="0" fill="none" stroke="white" stroke-width="2" opacity="0.5">
      <animate
        attributeName="r"
        from="0"
        to="${maxRadius}"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.5"
        to="0"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="${x}" cy="${y}" r="0" fill="none" stroke="white" stroke-width="2" opacity="0.5">
      <animate
        attributeName="r"
        from="0"
        to="${maxRadius}"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.5"
        to="0"
        dur="2s"
        begin="1s"
        repeatCount="indefinite"
      />
    </circle>
  `;
}
