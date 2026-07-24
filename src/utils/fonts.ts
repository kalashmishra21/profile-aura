/**
 * Font loading utilities for Satori rendering
 */

import { readFile, readdir } from 'fs/promises';
import { resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface FontConfig {
  name: string;
  data: ArrayBuffer;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: 'normal' | 'italic';
}

/**
 * Load default Inter fonts bundled with the package
 */
export async function loadDefaultFonts(): Promise<FontConfig[]> {
  try {
    // Try loading Inter from @fontsource/inter
    const interPath = resolve(
      process.cwd(),
      'node_modules/@fontsource/inter/files'
    );

    const fonts: FontConfig[] = [];

    // Load regular weights
    const weights: Array<{ weight: FontConfig['weight']; file: string }> = [
      { weight: 400, file: 'inter-latin-400-normal.woff' },
      { weight: 600, file: 'inter-latin-600-normal.woff' },
      { weight: 700, file: 'inter-latin-700-normal.woff' },
    ];

    for (const { weight, file } of weights) {
      try {
        const fontPath = resolve(interPath, file);
        const data = await readFile(fontPath);
        fonts.push({
          name: 'Inter',
          data: data.buffer,
          weight,
          style: 'normal',
        });
      } catch (err) {
        // Fallback: try without latin suffix
        const altFile = file.replace('-latin', '');
        try {
          const fontPath = resolve(interPath, altFile);
          const data = await readFile(fontPath);
          fonts.push({
            name: 'Inter',
            data: data.buffer,
            weight,
            style: 'normal',
          });
        } catch {
          // Skip this font weight
          console.warn(`Warning: Could not load font ${file}`);
        }
      }
    }

    if (fonts.length === 0) {
      throw new Error('No fonts loaded from @fontsource/inter');
    }

    return fonts;
  } catch (error) {
    console.error('Error loading default fonts:', error);
    throw new Error(
      'Failed to load default fonts. Please ensure @fontsource/inter is installed.'
    );
  }
}

/**
 * Load custom fonts from a directory
 */
export async function loadFontsFromDir(
  dirPath: string
): Promise<FontConfig[]> {
  const fonts: FontConfig[] = [];
  const fontExtensions = ['.ttf', '.otf', '.woff', '.woff2'];

  try {
    const files = await readdir(dirPath);

    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (fontExtensions.includes(ext)) {
        const fontPath = resolve(dirPath, file);
        const data = await readFile(fontPath);

        // Extract font name from filename (remove extension and weight indicators)
        const baseName = file
          .replace(/\.(ttf|otf|woff2?|ttc)$/i, '')
          .replace(/[-_](regular|bold|italic|light|medium|semibold|black)/gi, '');

        // Detect weight from filename
        let weight: FontConfig['weight'] = 400;
        const lowerFile = file.toLowerCase();
        if (lowerFile.includes('thin')) weight = 100;
        else if (lowerFile.includes('extralight')) weight = 200;
        else if (lowerFile.includes('light')) weight = 300;
        else if (lowerFile.includes('medium')) weight = 500;
        else if (lowerFile.includes('semibold')) weight = 600;
        else if (lowerFile.includes('bold')) weight = 700;
        else if (lowerFile.includes('extrabold')) weight = 800;
        else if (lowerFile.includes('black')) weight = 900;

        // Detect style from filename
        const style = lowerFile.includes('italic') ? 'italic' : 'normal';

        fonts.push({
          name: baseName.trim(),
          data: data.buffer,
          weight,
          style,
        });
      }
    }

    if (fonts.length === 0) {
      console.warn(`No fonts found in directory: ${dirPath}`);
    }

    return fonts;
  } catch (error) {
    console.error(`Error loading fonts from ${dirPath}:`, error);
    return [];
  }
}
