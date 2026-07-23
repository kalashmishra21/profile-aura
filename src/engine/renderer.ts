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

    const fontPaths = [
      { name: 'Inter', path: 'Inter-Regular.ttf', weight: 400 as const },
      { name: 'Inter', path: 'Inter-SemiBold.ttf', weight: 600 as const },
      { name: 'Inter', path: 'Inter-Bold.ttf', weight: 700 as const },
    ];

    for (const fontConfig of fontPaths) {
      try {
        // Try multiple paths
        const possiblePaths = [
          path.join(process.cwd(), 'assets', 'fonts', fontConfig.path),
          path.join(__dirname, '..', '..', 'assets', 'fonts', fontConfig.path),
          path.join(process.cwd(), 'node_modules', 'profile-aura', 'assets', 'fonts', fontConfig.path),
        ];

        let fontLoaded = false;
        for (const assetPath of possiblePaths) {
          if (await fileExists(assetPath)) {
            const fontData = await readFile(assetPath);
            const buffer = Buffer.from(fontData);
            this.fonts.push({
              name: fontConfig.name,
              data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer,
              weight: fontConfig.weight,
              style: 'normal',
            });
            fontLoaded = true;
            break;
          }
        }

        if (!fontLoaded) {
          console.warn(`Font not found: ${fontConfig.path}, trying online fallback`);
        }
      } catch (error) {
        console.warn(`Failed to load font ${fontConfig.path}:`, error);
      }
    }

    // If no fonts loaded, fetch from Google Fonts as fallback
    if (this.fonts.length === 0) {
      console.warn('No local fonts found, fetching from Google Fonts...');
      try {
        const response = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        const css = await response.text();
        
        // Extract font URLs from CSS
        const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
        const urls = [...css.matchAll(urlRegex)].map(match => match[1]);
        
        // Download first font (Regular 400)
        if (urls.length > 0) {
          const fontResponse = await fetch(urls[0]);
          const fontBuffer = await fontResponse.arrayBuffer();
          this.fonts.push({
            name: 'Inter',
            data: fontBuffer,
            weight: 400,
            style: 'normal',
          });
          console.log('✅ Loaded fallback font from Google Fonts');
        }
      } catch (error) {
        console.error('Failed to load fallback fonts:', error);
      }
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
