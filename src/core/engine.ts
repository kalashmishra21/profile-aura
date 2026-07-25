import path from 'path';
import { loadConfig } from '../configuration/loader.js';
import { ProfileAuraConfig } from '../configuration/types.js';
import { fetchGitHubData } from '../fetchers/github.js';
import { ThemeRegistry } from '../themes/registry.js';
import { PluginRegistry } from '../plugins/registry.js';
import { WidgetRegistry } from '../widgets/registry.js';
import { createRenderContext } from './context.js';
import { renderReadme } from '../renderers/markdown/readme-renderer.js';
import { writeOutputFile } from '../utilities/fs.js';
import { logger } from '../utilities/logger.js';

export interface BuildOptions {
  configPath?: string;
  dryRun?: boolean;
}

export async function runProfileAuraEngine(options: BuildOptions = {}): Promise<void> {
  logger.info('Initializing Profile-Aura 2.0 Pipeline...');

  // Initialize registries
  ThemeRegistry.initialize();
  WidgetRegistry.initialize();

  // Step 1: Load and resolve configuration
  let config = loadConfig(options.configPath);
  config = await PluginRegistry.runOnConfigResolved(config);

  // Step 2: Fetch and aggregate profile data
  let data = await fetchGitHubData(config);
  data = await PluginRegistry.runOnDataFetched(data);

  // Step 3: Resolve Theme
  const theme = ThemeRegistry.getTheme(config.theme);
  logger.info(`Using active theme token preset: '${theme.name}' (${theme.id})`);

  // Step 4: Build Render Context
  const context = createRenderContext(config, data, theme);

  // Step 5: Before Render Hooks
  await PluginRegistry.runOnBeforeRender(context);

  // Step 6: Execute Renderer
  let renderResult = await renderReadme(context);

  // Step 7: After Render Hooks
  renderResult = await PluginRegistry.runOnAfterRender(renderResult);

  // Step 8: Output Execution
  if (options.dryRun) {
    logger.info('[DRY RUN] Dry run requested. Output files will not be written.');
    logger.info(`Previewing generated README snippet (${renderResult.markdownContent.length} bytes):\n`);
    console.log(renderResult.markdownContent.slice(0, 500) + '\n...\n');
    return;
  }

  // Write Hero SVG if generated
  if (renderResult.heroSvg) {
    const assetsDir = path.resolve(process.cwd(), config.output.assetsDir || '.github/assets/generated');
    const heroFilePath = path.join(assetsDir, config.output.heroSvgFilename || 'hero.svg');
    writeOutputFile(heroFilePath, renderResult.heroSvg);
    logger.success(`Wrote Satori Hero SVG to ${heroFilePath}`);
  }

  // Write README.md
  const readmeFilePath = path.resolve(process.cwd(), config.output.readmePath || 'README.md');
  writeOutputFile(readmeFilePath, renderResult.markdownContent);
  logger.success(`Wrote Portfolio README to ${readmeFilePath}`);

  logger.success('✨ Profile-Aura 2.0 generation complete!');
}
