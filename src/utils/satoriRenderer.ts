/**
 * Satori-based JSX to SVG renderer
 * Converts React JSX components to static SVG with CSS animations
 */

import satori from 'satori';
import { transform } from 'sucrase';
import type { FontConfig } from './fonts.js';

interface SatoriElement {
  type: string;
  props: Record<string, unknown> & {
    children?: SatoriElement | SatoriElement[] | string;
  };
}

/**
 * React.createElement replacement for JSX transpilation
 */
export function createElement(
  type: unknown,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): unknown {
  const flat = children
    .flat()
    .filter((c) => c != null && c !== false && c !== true);

  return {
    type,
    props: {
      ...(props ?? {}),
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

/**
 * Transpile JSX string to executable element using Sucrase
 */
export function transpileJsx(
  jsxString: string,
  context?: Record<string, unknown>
): unknown {
  // Wrap JSX in a return statement
  const wrapped = `return (${jsxString.trim()});`;

  // Transform JSX to createElement calls
  const { code } = transform(wrapped, {
    transforms: ['jsx'],
    jsxRuntime: 'classic',
    production: true,
  });

  // Create function with React and context variables
  const argNames = ['React', ...(context ? Object.keys(context) : [])];
  const argValues = [{ createElement }, ...(context ? Object.values(context) : [])];

  // Execute transpiled code
  const fn = new Function(...argNames, code);
  const element = fn(...argValues);

  if (!element || typeof element !== 'object' || !('type' in element)) {
    throw new Error(
      'JSX did not produce a valid element. Make sure your code returns a single root element.'
    );
  }

  return element;
}

/**
 * Extract <style> tags from JSX tree and collect their content
 */
function extractStyles(node: unknown, styles: string[]): unknown {
  if (!node || typeof node !== 'object') return node;

  const el = node as SatoriElement;

  // If this is a <style> tag, collect its content and remove it from tree
  if (el.type === 'style') {
    if (el.props?.children) {
      styles.push(String(el.props.children));
    }
    return null;
  }

  // Recursively process children
  if (el.props?.children) {
    if (Array.isArray(el.props.children)) {
      el.props.children = el.props.children
        .map((c) => extractStyles(c, styles))
        .filter((c): c is SatoriElement => c !== null) as SatoriElement[];
    } else {
      const processed = extractStyles(el.props.children, styles);
      if (processed === null) {
        delete el.props.children;
      } else {
        el.props.children = processed as SatoriElement;
      }
    }
  }

  return el;
}

/**
 * Render JSX element to SVG using Satori
 */
export async function renderJsxToSvg(
  jsxString: string,
  options: {
    width: number;
    height: number;
    fonts: FontConfig[];
    context?: Record<string, unknown>;
  }
): Promise<string> {
  const { width, height, fonts, context } = options;

  // Transpile JSX to element
  let element: unknown;
  try {
    element = transpileJsx(jsxString, context);
  } catch (err) {
    throw new Error(`Failed to transpile JSX: ${(err as Error).message}`, {
      cause: err,
    });
  }

  // Extract CSS styles from <style> tags
  const extractedStyles: string[] = [];
  element = extractStyles(element, extractedStyles);

  // Render to SVG using Satori
  try {
    let svg = await satori(element as Parameters<typeof satori>[0], {
      width,
      height,
      fonts,
      loadAdditionalAsset: async (code: string, segment: string) => {
        // Load emoji from CDN
        if (code === 'emoji') {
          const codepoint = [...segment]
            .map((c) => (c.codePointAt(0) ?? 0).toString(16))
            .join('-');
          const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoint}.svg`;
          
          try {
            const res = await fetch(url);
            const svgText = await res.text();
            return `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`;
          } catch {
            return '';
          }
        }
        return '';
      },
    });

    // Unpack nested SVGs encoded by Satori as data:image/svg+xml
    svg = svg.replace(
      /<image\s+([^>]*?)href="data:image\/svg\+xml;utf8,([^"]+)"([^>]*?)\/>/g,
      (match, before, encoded, after) => {
        try {
          const decoded = decodeURIComponent(encoded);
          const contentMatch = decoded.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
          const content = contentMatch ? contentMatch[1] : decoded;
          return `<svg ${before.trim()} ${after.trim()}>${content}</svg>`;
        } catch {
          return match;
        }
      }
    );

    // Inject collected CSS styles into SVG
    if (extractedStyles.length > 0) {
      const combinedStyles = extractedStyles.join('\n');
      svg = svg.replace('</svg>', `<style>\n${combinedStyles}\n</style>\n</svg>`);
    }

    // Add generator comment
    svg = '<!-- Generated by Profile Aura with Satori -->\n' + svg;

    return svg;
  } catch (err) {
    throw new Error(`Failed to render SVG: ${(err as Error).message}`, {
      cause: err,
    });
  }
}
