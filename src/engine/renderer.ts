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
   * Load fonts for Satori - using unpkg CDN (most reliable)
   */
  async loadFonts(): Promise<void> {
    if (this.fontsLoaded) return;

    console.log('Loading fonts...');
    
    // Use unpkg - most reliable CDN for npm packages
    const fontUrl = 'https://unpkg.com/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff';
    
    try {
      const response = await fetch(fontUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });
      
      if (response.ok) {
        const fontBuffer = await response.arrayBuffer();
        
        // Load same font with different weights (Satori will handle it)
        for (const weight of [400, 600, 700]) {
          this.fonts.push({
            name: 'Roboto',
            data: fontBuffer,
            weight: weight as 400 | 600 | 700,
            style: 'normal',
          });
        }
        
        console.log(`✅ Loaded ${this.fonts.length} font variants`);
      } else {
        throw new Error(`Font fetch failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to load fonts:', error);
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
        fonts: this.fonts,
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
