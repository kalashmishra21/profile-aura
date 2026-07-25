import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering README with theme '${context.theme.id}'...`);

  // Step 1: Generate Satori Hero SVG
  let heroSvg: string | undefined;
  if (context.config.sections.hero?.enabled !== false) {
    try {
      heroSvg = await renderSatoriHeroSvg({
        config: context.config,
        data: context.data,
        theme: context.theme
      });
    } catch (err: any) {
      Logger.error(`Failed to generate Satori Hero SVG: ${err.message}`);
    }
  }

  // Step 2: Render Enabled Widgets in Order
  const sections = context.config.sections;
  let markdownParts: string[] = [];

  // Hero Banner Widget
  if (sections.hero?.enabled !== false) {
    const heroWidget = WidgetRegistry.getWidget('hero-banner');
    if (heroWidget) {
      markdownParts.push(await heroWidget.render(context));
    }
  }

  // Profile Stats Widget
  if (sections.stats?.enabled !== false) {
    const statsWidget = WidgetRegistry.getWidget('github-stats');
    if (statsWidget) {
      markdownParts.push(await statsWidget.render(context));
    }
  }

  // Streak Widget
  if (sections.streak?.enabled !== false) {
    const streakWidget = WidgetRegistry.getWidget('streak-counter');
    if (streakWidget) {
      markdownParts.push(await streakWidget.render(context));
    }
  }

  // Tech Stack Widget
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      markdownParts.push(await techWidget.render(context));
    }
  }

  // Top Repositories Widget
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      markdownParts.push(await reposWidget.render(context));
    }
  }

  // Social Links Widget
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      markdownParts.push(await socialsWidget.render(context));
    }
  }

  // Footer Credit
  const footer = `\n---\n<div align="center">\n  <sub>Generated with <a href="https://github.com/kalashmishra21/profile-aura">Profile Aura 2.0</a> • Editorial Portfolio Generator</sub>\n</div>\n`;
  markdownParts.push(footer);

  const fullMarkdown = markdownParts.join('\n\n');

  return {
    heroSvg,
    markdownContent: fullMarkdown
  };
}
