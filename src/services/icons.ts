/**
 * Tech stack icon service - fetches icons from Simple Icons and SVGL
 */

import type { IconData } from '../types/index.js';

interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  source: string;
  path: string;
}

interface SVGLIcon {
  title: string;
  category: string;
  route: string;
  url: string;
}

export class IconService {
  private cache: Map<string, IconData> = new Map();
  private simpleIconsData: Map<string, SimpleIcon> | null = null;

  /**
   * Fetch icon data for a technology
   */
  async fetchIcon(techName: string): Promise<IconData | null> {
    const normalized = this.normalizeName(techName);

    // Check cache first
    if (this.cache.has(normalized)) {
      return this.cache.get(normalized)!;
    }

    // Try Simple Icons first
    let icon = await this.fetchFromSimpleIcons(normalized);
    
    // Fallback to SVGL if not found
    if (!icon) {
      icon = await this.fetchFromSVGL(normalized);
    }

    // Fallback to generating a text badge
    if (!icon) {
      icon = this.generateTextBadge(techName);
    }

    // Cache the result
    this.cache.set(normalized, icon);
    
    return icon;
  }

  /**
   * Fetch multiple icons in parallel
   */
  async fetchIcons(techNames: string[]): Promise<IconData[]> {
    const promises = techNames.map(name => this.fetchIcon(name));
    const results = await Promise.all(promises);
    return results.filter((icon): icon is IconData => icon !== null);
  }

  /**
   * Fetch icon from Simple Icons
   */
  private async fetchFromSimpleIcons(techName: string): Promise<IconData | null> {
    try {
      // Load Simple Icons data if not already loaded
      if (!this.simpleIconsData) {
        await this.loadSimpleIconsData();
      }

      const icon = this.simpleIconsData?.get(techName);
      if (!icon) return null;

      const svg = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;

      return {
        name: icon.title,
        svg,
        color: `#${icon.hex}`,
      };
    } catch (error) {
      console.warn(`Failed to fetch icon from Simple Icons: ${techName}`);
      return null;
    }
  }

  /**
   * Load Simple Icons data from CDN
   */
  private async loadSimpleIconsData(): Promise<void> {
    try {
      const response = await fetch('https://unpkg.com/simple-icons@latest/icons.json');
      if (!response.ok) throw new Error('Failed to fetch Simple Icons data');
      
      const data = await response.json() as any;
      this.simpleIconsData = new Map();

      for (const icon of data.icons as any[]) {
        // Store by slug and variations
        this.simpleIconsData.set(icon.slug, icon);
        this.simpleIconsData.set(icon.title.toLowerCase(), icon);
        
        // Add common aliases
        const aliases = this.getAliases(icon.title);
        for (const alias of aliases) {
          this.simpleIconsData.set(alias, icon);
        }
      }
    } catch (error) {
      console.warn('Failed to load Simple Icons data, using fallback');
      this.simpleIconsData = new Map();
    }
  }

  /**
   * Fetch icon from SVGL API
   */
  private async fetchFromSVGL(techName: string): Promise<IconData | null> {
    try {
      const response = await fetch('https://svgl.app/api/svgs');
      if (!response.ok) return null;

      const icons = await response.json() as any[];
      const icon = icons.find(
        i => i.title.toLowerCase() === techName || 
             i.route.toLowerCase() === techName
      );

      if (!icon) return null;

      // Fetch the actual SVG content
      const svgResponse = await fetch(icon.url);
      if (!svgResponse.ok) return null;

      const svg = await svgResponse.text();

      return {
        name: icon.title,
        svg,
        color: this.extractColorFromSVG(svg),
      };
    } catch (error) {
      console.warn(`Failed to fetch icon from SVGL: ${techName}`);
      return null;
    }
  }

  /**
   * Generate a simple text-based badge as fallback
   */
  private generateTextBadge(techName: string): IconData {
    const color = this.generateColorFromString(techName);
    
    const svg = `
      <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="80" rx="12" fill="${color}" opacity="0.2"/>
        <text x="40" y="45" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="bold" fill="${color}">
          ${techName.charAt(0).toUpperCase()}
        </text>
      </svg>
    `.trim();

    return {
      name: techName,
      svg,
      color,
    };
  }

  /**
   * Normalize technology name for lookup
   */
  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[.\s]/g, '')
      .replace(/js$/, 'javascript')
      .replace(/ts$/, 'typescript');
  }

  /**
   * Get common aliases for technology names
   */
  private getAliases(name: string): string[] {
    const aliases: Record<string, string[]> = {
      'JavaScript': ['js', 'javascript', 'node'],
      'TypeScript': ['ts', 'typescript'],
      'React': ['react', 'reactjs'],
      'Vue.js': ['vue', 'vuejs'],
      'Next.js': ['next', 'nextjs'],
      'Node.js': ['node', 'nodejs'],
      'Python': ['python', 'py'],
      'Amazon Web Services': ['aws', 'amazon'],
      'Google Cloud': ['gcp', 'googlecloud'],
      'Microsoft Azure': ['azure'],
      'PostgreSQL': ['postgres', 'postgresql'],
      'MongoDB': ['mongo', 'mongodb'],
      'Docker': ['docker'],
      'Kubernetes': ['k8s', 'kubernetes'],
      'C++': ['cpp', 'cplusplus'],
      'C#': ['csharp', 'dotnet'],
    };

    return aliases[name] || [];
  }

  /**
   * Extract dominant color from SVG content
   */
  private extractColorFromSVG(svg: string): string {
    const fillMatch = svg.match(/fill="(#[0-9a-fA-F]{6})"/);
    if (fillMatch) return fillMatch[1];

    const strokeMatch = svg.match(/stroke="(#[0-9a-fA-F]{6})"/);
    if (strokeMatch) return strokeMatch[1];

    return '#6366f1'; // Default indigo color
  }

  /**
   * Generate a consistent color from a string
   */
  private generateColorFromString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate vibrant colors
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 55%)`;
  }

  /**
   * Clear icon cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Popular tech stack presets
export const TECH_STACK_PRESETS = {
  frontend: ['react', 'vue', 'angular', 'svelte', 'nextjs', 'typescript', 'tailwindcss'],
  backend: ['nodejs', 'python', 'java', 'go', 'rust', 'express', 'fastapi', 'spring'],
  database: ['postgresql', 'mongodb', 'mysql', 'redis', 'sqlite'],
  cloud: ['aws', 'gcp', 'azure', 'vercel', 'netlify', 'docker', 'kubernetes'],
  tools: ['git', 'github', 'vscode', 'figma', 'postman', 'jest', 'webpack'],
  mobile: ['react-native', 'flutter', 'swift', 'kotlin', 'android', 'ios'],
  fullstack: ['react', 'nodejs', 'typescript', 'postgresql', 'docker', 'aws', 'tailwindcss'],
};
