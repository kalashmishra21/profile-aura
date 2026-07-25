import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering Concept C+B Bento Portfolio with theme '${context.theme.id}'...`);

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

  // 2. Assemble Bento Sections
  const sections = context.config.sections;
  let bentoBlocks: string[] = [];

  // Hero Banner Widget
  if (sections.hero?.enabled !== false) {
    const heroWidget = WidgetRegistry.getWidget('hero-banner');
    if (heroWidget) {
      bentoBlocks.push(await heroWidget.render(context));
    }
  }

  // Bento Metrics Widget
  if (sections.stats?.enabled !== false) {
    const statsWidget = WidgetRegistry.getWidget('github-stats');
    if (statsWidget) {
      bentoBlocks.push(await statsWidget.render(context));
    }
  }

  // Streak Widget
  if (sections.streak?.enabled !== false) {
    const streakWidget = WidgetRegistry.getWidget('streak-counter');
    if (streakWidget) {
      bentoBlocks.push(await streakWidget.render(context));
    }
  }

  // Bento Tech Stack Matrix Widget
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      bentoBlocks.push(await techWidget.render(context));
    }
  }

  // Bento Project Showcase Widget
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      bentoBlocks.push(await reposWidget.render(context));
    }
  }

  // Tactical Social HUD Widget
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      bentoBlocks.push(await socialsWidget.render(context));
    }
  }

  // Luxury Publication Footer Credit
  const footer = `\n<br />\n<div align="center">\n  <sub>Generated with <a href="https://github.com/kalashmishra21/profile-aura">Profile Aura 2.0</a> • Flagship Editorial Portfolio Generator</sub>\n</div>\n`;
  bentoBlocks.push(footer);

  const fullBentoMarkdown = bentoBlocks.join('\n\n');

  return {
    heroSvg,
    markdownContent: fullBentoMarkdown
  };
}
