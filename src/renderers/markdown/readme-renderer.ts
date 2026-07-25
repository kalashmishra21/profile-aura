import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering SVG-First Portfolio with theme '${context.theme.id}'...`);

  // 1. Render Satori Vector Hero SVG
  let heroSvg: string | undefined;
  if (context.config.sections.hero?.enabled !== false) {
    try {
      heroSvg = await renderSatoriHeroSvg({
        config: context.config,
        data: context.data,
        theme: context.theme,
        seed: context.config.github.username
      });
    } catch (err: any) {
      Logger.error(`Failed to generate Satori Hero SVG: ${err.message}`);
    }
  }

  // 2. Assemble SVG-First Portfolio Layout
  const sections = context.config.sections;
  let markdownParts: string[] = [];

  // Hero SVG Component
  if (sections.hero?.enabled !== false) {
    markdownParts.push(`<div align="center">\n  <img src=".github/assets/generated/hero.svg" alt="Profile Hero" width="100%" />\n</div>`);
  }

  // Overview SVG Component
  if (sections.overview?.enabled !== false) {
    markdownParts.push(`<div align="center">\n  <img src=".github/assets/generated/overview.svg" alt="Profile Overview" width="100%" />\n</div>`);
  }

  // Metrics SVG Component
  if (sections.stats?.enabled !== false) {
    markdownParts.push(`<div align="center">\n  <img src=".github/assets/generated/metrics.svg" alt="Developer Performance Metrics" width="100%" />\n</div>`);
  }

  // Projects Component (Markdown Case Studies)
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      markdownParts.push(await reposWidget.render(context));
    }
  }

  // Skills Component (Categorized Tech Matrix)
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      markdownParts.push(await techWidget.render(context));
    }
  }

  // Achievements Component (Streak Counter)
  if (sections.streak?.enabled !== false) {
    const streakWidget = WidgetRegistry.getWidget('streak-counter');
    if (streakWidget) {
      markdownParts.push(await streakWidget.render(context));
    }
  }

  // Connect Component (Social Links)
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      markdownParts.push(await socialsWidget.render(context));
    }
  }

  // Footer Component
  const footer = `<div align="center">\n  <sub>Designed with Profile Aura 2.0 • SVG-First Portfolio Engine</sub>\n</div>\n`;
  markdownParts.push(footer);

  const fullMarkdown = markdownParts.join('\n\n---\n\n');

  return {
    heroSvg,
    markdownContent: fullMarkdown
  };
}
