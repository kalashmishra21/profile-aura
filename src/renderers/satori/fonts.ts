import fs from 'fs';
import path from 'path';

let cachedFont: ArrayBuffer | null = null;

export async function loadFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;

  const fontPath = path.join(process.cwd(), 'assets', 'fonts', 'Inter-Regular.ttf');
  if (fs.existsSync(fontPath)) {
    const buffer = fs.readFileSync(fontPath);
    cachedFont = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    return cachedFont;
  }

  // Fetch fallback Inter font from CDN
  try {
    const res = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/inter@5.0.0/latin-400-normal.ttf');
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      cachedFont = arrayBuffer;
      return cachedFont;
    }
  } catch (err) {
    // Ignore fetch error and proceed to empty fallback
  }

  // Basic empty buffer fallback if offline
  return new ArrayBuffer(0);
}
