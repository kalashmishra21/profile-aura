import path from 'path';
import { loadAndValidateConfig } from '../config/loader.js';
import { fetchGitHubData } from '../fetchers/github.js';
import { ThemeRegistry } from '../themes/registry.js';
import { ThemeResolver } from '../themes/resolver.js';
import { TemplateRegistry } from '../templates/registry.js';
import { WidgetRegistry } from '../widgets/registry.js';
import { renderSatoriHeroSvg } from '../renderers/satori/hero-renderer.js';
import { renderSatoriOverviewSvg } from '../renderers/satori/overview-renderer.js';
import { renderSatoriMetricsSvg } from '../renderers/satori/metrics-renderer.js';
import { renderSatoriTechStackSvg } from '../renderers/satori/techstack-renderer.js';
import { renderSatoriReposSvg } from '../renderers/satori/repos-renderer.js';
import { renderReadme } from '../renderers/markdown/readme-renderer.js';
import { createExecutionContext } from './context.js';
import { PluginRegistry } from '../plugins/registry.js';
import { writeTextFile } from '../utils/fs.js';
import { Logger } from '../utils/logger.js';
import { RenderPipelineResult } from '../types/renderer.js';

export interface EngineRunOptions {
  configPath?: string;
  dryRun?: boolean;
  verbose?: boolean;
}

export class CoreEngine {
  async run(options: EngineRunOptions = {}): Promise<RenderPipelineResult> {
    if (options.verbose) {
      Logger.setVerbose(true);
    }

    Logger.info('Initializing Profile Aura Framework Engine...');

    // 1. Initialize Registries
    ThemeRegistry.initialize();
    TemplateRegistry.initialize();
    WidgetRegistry.initialize();

    // 2. Load and Validate Configuration via Zod
    let config = loadAndValidateConfig(options.configPath);
    config = await PluginRegistry.runOnConfigResolved(config);

    // 3. Fetch Remote Profile & Activity Data
    let data = await fetchGitHubData(config);
    data = await PluginRegistry.runOnDataFetched(data);

    // 4. Resolve Theme Design Tokens
    const themePreset = ThemeRegistry.getTheme(config.theme);
    const resolvedTheme = ThemeResolver.resolveTheme(themePreset, config.customTokens);
    Logger.info(`Resolved Active Theme: '${themePreset.name}' (${themePreset.id})`);

    // 5. Build Immutable Execution Context
    const context = createExecutionContext(config, data, resolvedTheme);

    // 6. Before Render Plugin Hooks
    await PluginRegistry.runOnBeforeRender(context);

    // 7. Render Satori SVG Components (Hero, Overview, Metrics)
    let heroSvg: string | undefined;
    let overviewSvg: string | undefined;
    let metricsSvg: string | undefined;
    let techStackSvg: string | undefined;
    let reposSvg: string | undefined;

    if (config.sections.hero?.enabled !== false) {
      try {
        heroSvg = await renderSatoriHeroSvg({
          config,
          data,
          theme: resolvedTheme,
          seed: config.github.username
        });
      } catch (err: any) {
        Logger.error(`Hero rendering failed: ${err.message}`);
      }
    }

    if (config.sections.overview?.enabled !== false) {
      try {
        overviewSvg = await renderSatoriOverviewSvg({
          config,
          data,
          theme: resolvedTheme
        });
      } catch (err: any) {
        Logger.error(`Overview SVG rendering failed: ${err.message}`);
      }
    }

    if (config.sections.stats?.enabled !== false) {
      try {
        metricsSvg = await renderSatoriMetricsSvg({
          config,
          data,
          theme: resolvedTheme
        });
      } catch (err: any) {
        Logger.error(`Metrics SVG rendering failed: ${err.message}`);
      }
    }

    if (config.sections.techStack?.enabled !== false && (config.sections.techStack?.categories?.length ?? 0) > 0) {
      try {
        techStackSvg = await renderSatoriTechStackSvg({
          config,
          theme: resolvedTheme
        });
      } catch (err: any) {
        Logger.error(`Tech Stack SVG rendering failed: ${err.message}`);
      }
    }

    if (config.sections.repos?.enabled !== false) {
      try {
        reposSvg = await renderSatoriReposSvg({ config, data, theme: resolvedTheme });
      } catch (err: any) {
        Logger.error(`Repos SVG rendering failed: ${err.message}`);
      }
    }

    // 8. Render README Markdown Portfolio via Template & Widgets
    let renderResult = await renderReadme(context);
    renderResult.heroSvg = heroSvg;

    // 9. After Render Plugin Hooks
    renderResult = await PluginRegistry.runOnAfterRender(renderResult);

    // 10. Write Output Files if not Dry Run
    if (options.dryRun) {
      Logger.info('[DRY RUN] Dry run requested. Output files will not be written to disk.');
      Logger.info(`Previewing generated README snippet (${renderResult.markdownContent.length} bytes):\n`);
      console.log(renderResult.markdownContent.slice(0, 500) + '\n...\n');
      return renderResult;
    }

    const assetsDir = path.resolve(process.cwd(), config.output.assetsDir || '.github/assets/generated');

    // Write Hero SVG
    if (renderResult.heroSvg) {
      const heroFilePath = path.join(assetsDir, config.output.heroSvgFilename || 'hero.svg');
      writeTextFile(heroFilePath, renderResult.heroSvg);
      Logger.success(`Wrote Satori Hero SVG to ${heroFilePath}`);
    }

    // Write Overview SVG
    if (overviewSvg) {
      const overviewFilePath = path.join(assetsDir, 'overview.svg');
      writeTextFile(overviewFilePath, overviewSvg);
      Logger.success(`Wrote Satori Overview SVG to ${overviewFilePath}`);
    }

    // Write Metrics SVG
    if (metricsSvg) {
      const metricsFilePath = path.join(assetsDir, 'metrics.svg');
      writeTextFile(metricsFilePath, metricsSvg);
      Logger.success(`Wrote Satori Metrics SVG to ${metricsFilePath}`);
    }

    // Write Tech Stack SVG
    if (techStackSvg) {
      const techFilePath = path.join(assetsDir, 'techstack.svg');
      writeTextFile(techFilePath, techStackSvg);
      Logger.success(`Wrote Satori Tech Stack SVG to ${techFilePath}`);
    }

    // Write Repos SVG
    if (reposSvg) {
      const reposFilePath = path.join(assetsDir, 'repos.svg');
      writeTextFile(reposFilePath, reposSvg);
      Logger.success(`Wrote Satori Repos SVG to ${reposFilePath}`);
    }

    // Write README.md
    const readmeFilePath = path.resolve(process.cwd(), config.output.readmePath || 'README.md');
    writeTextFile(readmeFilePath, renderResult.markdownContent);
    Logger.success(`Wrote Portfolio README to ${readmeFilePath}`);

    Logger.success('✨ Profile Aura 2.0 SVG-First portfolio generation complete!');
    return renderResult;
  }
}
