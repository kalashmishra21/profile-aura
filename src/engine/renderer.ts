/**
 * SVG rendering engine using Satori and Resvg
 */

import satori from 'satori';
import type { SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { SvgRenderOptions, CardConfig } from '../types/index.js';
import { readFile, fileExists } from '../utils/helpers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class SVGRenderer {
  private fonts: SatoriOptions['fonts'] = [];
  private fontsLoaded = false;

  /**
   * Load fonts for Satori
   */
  async loadFonts(): Promise<void> {
    if (this.fontsLoaded) return;

    // Multiple CDN sources for TTF fonts (Satori requires TTF, not WOFF/WOFF2)
    const fontConfigs = [
      { 
        name: 'Roboto', 
        weight: 400 as const, 
        urls: [
          'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Regular.ttf',
          'https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Regular.ttf',
        ]
      },
      { 
        name: 'Roboto', 
        weight: 600 as const, 
        urls: [
          'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Medium.ttf',
          'https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Medium.ttf',
        ]
      },
      { 
        name: 'Roboto', 
        weight: 700 as const, 
        urls: [
          'https://cdn.jsdelivr.net/gh/google/fonts@main/apache/roboto/static/Roboto-Bold.ttf',
          'https://raw.githubusercontent.com/google/fonts/main/apache/roboto/static/Roboto-Bold.ttf',
        ]
      },
    ];

    console.log('Loading fonts from CDN...');
    
    for (const fontConfig of fontConfigs) {
      let loaded = false;
      
      for (const url of fontConfig.urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const fontBuffer = await response.arrayBuffer();
            this.fonts.push({
              name: fontConfig.name,
              data: fontBuffer,
              weight: fontConfig.weight,
              style: 'normal',
            });
            loaded = true;
            break;
          }
        } catch (error) {
          // Try next URL
          continue;
        }
      }
      
      if (!loaded) {
        console.warn(`Failed to load font weight ${fontConfig.weight} from all sources`);
      }
    }

    if (this.fonts.length > 0) {
      console.log(`✅ Loaded ${this.fonts.length} font(s)`);
    } else {
      console.error('❌ Failed to load any fonts. SVG generation will fail.');
      throw new Error('No fonts loaded. Cannot generate SVG cards.');
    }

    this.fontsLoaded = true;
  }

  /**
   * Render JSX component to SVG string
   */
  async renderToSVG(
    component: any,
    options: SvgRenderOptions
  ): Promise<string> {
    await this.loadFonts();

    try {
      const svg = await satori(component, {
        width: options.width,
        height: options.height,
        fonts: this.fonts.length > 0 ? this.fonts : [],
        debug: options.debug || false,
      });

      return svg;
    } catch (error) {
      console.error('Failed to render SVG:', error);
      throw new Error(`SVG rendering failed: ${error}`);
    }
  }

  /**
   * Render JSX component to PNG using Resvg
   */
  async renderToPNG(
    component: any,
    options: SvgRenderOptions
  ): Promise<Buffer> {
    const svg = await this.renderToSVG(component, options);
    
    try {
      const resvg = new Resvg(svg, {
        fitTo: {
          mode: 'width',
          value: options.width,
        },
      });

      const pngData = resvg.render();
      return pngData.asPng();
    } catch (error) {
      console.error('Failed to convert SVG to PNG:', error);
      throw new Error(`PNG conversion failed: ${error}`);
    }
  }

  /**
   * Optimize SVG output
   */
  optimizeSVG(svg: string): string {
    // Remove unnecessary whitespace
    let optimized = svg.replace(/\s+/g, ' ');
    
    // Remove comments
    optimized = optimized.replace(/<!--.*?-->/g, '');
    
    // Trim
    optimized = optimized.trim();
    
    return optimized;
  }

  /**
   * Add animation CSS to SVG
   */
  addAnimations(svg: string, animations: string[]): string {
    const styleTag = `
      <style>
        ${animations.join('\n')}
      </style>
    `;

    return svg.replace('</svg>', `${styleTag}</svg>`);
  }

  /**
   * Embed external images as base64
   */
  async embedImages(svg: string): Promise<string> {
    // This is a placeholder for image embedding logic
    // In production, you'd fetch images and convert to base64
    return svg;
  }
}

/**
 * Create a simple h function for JSX (required by Satori)
 */
export function h(type: any, props: any, ...children: any[]): any {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children,
    },
  };
}

export const Fragment = 'fragment';
