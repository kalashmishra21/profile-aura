/**
 * Main entry point for programmatic usage
 */

export { ReadmeBuilder } from './engine/builder.js';
export { SVGRenderer } from './engine/renderer.js';
export { parseMarkdown, replaceAuraBlocks } from './engine/parser.js';
export { GitHubService } from './services/github.js';
export { IconService } from './services/icons.js';
export { loadConfig, DEFAULT_CONFIG, DEFAULT_THEME } from './utils/config.js';
export * from './types/index.js';
export * from './components/index.js';
