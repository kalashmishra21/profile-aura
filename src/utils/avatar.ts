import { Logger } from './logger.js';

export async function fetchAvatarAsBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch avatar: ${response.status} ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/png';
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    Logger.warn(`Failed to fetch avatar from ${url}, using fallback. Error: ${error instanceof Error ? error.message : String(error)}`);
    // Return a fallback SVG data URI with a gradient circle placeholder
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136">
      <defs>
        <linearGradient id="fallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="68" cy="68" r="68" fill="url(#fallbackGrad)" />
    </svg>`;
    const fallbackBase64 = Buffer.from(fallbackSvg).toString('base64');
    return `data:image/svg+xml;base64,${fallbackBase64}`;
  }
}
