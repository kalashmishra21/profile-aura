/**
 * Markdown parser for extracting Aura blocks
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import type { AuraBlock, ParsedMarkdown } from '../types/index.js';

const AURA_BLOCK_TYPES = ['aura', 'jsx-card', 'github-stats', 'tech-stack', 'profile-card'];

interface CodeNode {
  type: 'code';
  lang?: string | null;
  meta?: string | null;
  value: string;
  position?: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
}

/**
 * Parse properties from code block meta string
 * Example: ```aura title="My Card" theme="dark" width="800"
 */
function parseBlockProps(meta: string | null): Record<string, string> {
  if (!meta) return {};
  
  const props: Record<string, string> = {};
  
  // Match key="value" or key='value' or key=value
  const regex = /(\w+)=(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let match;
  
  while ((match = regex.exec(meta)) !== null) {
    const key = match[1];
    const value = match[2] || match[3] || match[4];
    props[key] = value;
  }
  
  return props;
}

/**
 * Extract Aura blocks from markdown content
 */
export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  const auraBlocks: AuraBlock[] = [];
  
  const tree = unified()
    .use(remarkParse)
    .parse(content);

  visit(tree, 'code', (node: any) => {
    const lang = node.lang?.toLowerCase();
    
    if (lang && AURA_BLOCK_TYPES.includes(lang)) {
      const props = parseBlockProps(node.meta || null);
      
      auraBlocks.push({
        type: lang,
        content: node.value,
        props,
        startLine: node.position?.start.line || 0,
        endLine: node.position?.end.line || 0,
      });
    }
  });

  return {
    content,
    auraBlocks,
  };
}

/**
 * Replace Aura blocks in markdown with generated image references
 */
export function replaceAuraBlocks(
  content: string,
  replacements: Map<number, string>
): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let i = 0;
  let inCodeBlock = false;
  let codeBlockStart = -1;
  let currentLang = '';

  while (i < lines.length) {
    const line = lines[i];
    const codeBlockMatch = line.match(/^```(\w+)?/);

    if (codeBlockMatch && !inCodeBlock) {
      // Start of code block
      inCodeBlock = true;
      codeBlockStart = i + 1; // Line numbers are 1-indexed
      currentLang = codeBlockMatch[1]?.toLowerCase() || '';
      i++;
      continue;
    } else if (line.match(/^```$/) && inCodeBlock) {
      // End of code block
      inCodeBlock = false;
      
      // Check if this is an Aura block that should be replaced
      if (AURA_BLOCK_TYPES.includes(currentLang) && replacements.has(codeBlockStart)) {
        const replacement = replacements.get(codeBlockStart);
        if (replacement) {
          result.push(replacement);
        }
      } else {
        // Not an Aura block, keep original
        for (let j = codeBlockStart - 1; j <= i; j++) {
          if (j < lines.length) {
            result.push(lines[j]);
          }
        }
      }
      
      i++;
      continue;
    } else if (inCodeBlock) {
      // Inside code block, skip (will be handled when block ends)
      i++;
      continue;
    }

    // Regular line outside code blocks
    result.push(line);
    i++;
  }

  return result.join('\n');
}

/**
 * Generate markdown image reference for SVG
 */
export function generateImageMarkdown(
  imagePath: string,
  alt: string,
  alignment: 'left' | 'center' | 'right' = 'center'
): string {
  const img = `![${alt}](${imagePath})`;
  
  if (alignment === 'center') {
    return `<div align="center">\n\n${img}\n\n</div>`;
  } else if (alignment === 'right') {
    return `<div align="right">\n\n${img}\n\n</div>`;
  }
  
  return img;
}

/**
 * Parse tech stack from comma-separated string
 */
export function parseTechStack(techStackStr: string): string[] {
  return techStackStr
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0);
}

/**
 * Parse key-value pairs from block content
 * Supports YAML-like syntax within code blocks
 */
export function parseBlockContent(content: string): Record<string, any> {
  const data: Record<string, any> = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      
      // Try to parse as JSON if it looks like an array or object
      if (value.startsWith('[') || value.startsWith('{')) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        data[key] = value.toLowerCase() === 'true';
      } else if (!isNaN(Number(value))) {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  }
  
  return data;
}

/**
 * Validate Aura block configuration
 */
export function validateAuraBlock(block: AuraBlock): string[] {
  const errors: string[] = [];
  
  // Type-specific validation
  switch (block.type) {
    case 'tech-stack':
      if (!block.props.stack && !block.content.includes('stack:')) {
        errors.push('tech-stack block requires "stack" property or content');
      }
      break;
    
    case 'github-stats':
      // GitHub stats can work without additional props
      break;
    
    case 'profile-card':
      // Profile card can work without additional props
      break;
  }
  
  // Validate dimensions if provided
  if (block.props.width) {
    const width = parseInt(block.props.width, 10);
    if (isNaN(width) || width < 100 || width > 2000) {
      errors.push('width must be between 100 and 2000');
    }
  }
  
  if (block.props.height) {
    const height = parseInt(block.props.height, 10);
    if (isNaN(height) || height < 100 || height > 2000) {
      errors.push('height must be between 100 and 2000');
    }
  }
  
  return errors;
}
