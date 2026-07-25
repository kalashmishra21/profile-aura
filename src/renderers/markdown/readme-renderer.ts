import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering North Star Portfolio with theme '${context.theme.id}'...`);

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

  // 2. Assemble North Star Components in Order
  const sections = context.config.sections;
  let markdownParts: string[] = [];

  // Component 1: Hero Banner
  if (sections.hero?.enabled !== false) {
    const heroWidget = WidgetRegistry.getWidget('hero-banner');
    if (heroWidget) {
      markdownParts.push(await heroWidget.render(context));
    }
  }

  // Component 2: Overview & Biography
  if (sections.overview?.enabled !== false) {
    const bio = context.data.bio || 'Building high-performance software systems.';
    const location = context.data.location ? `📍 ${context.data.location}` : '';
    const company = context.data.company ? `🏢 ${context.data.company}` : '';
    const website = context.data.website ? `🌐 [${context.data.website}](${context.data.website})` : '';

    const metadataRow = [location, company, website].filter(Boolean).join('   •   ');

    const overviewBlock = `<div align="center">

### // ABOUT & BIOGRAPHY

${bio}

${metadataRow ? `<sub>${metadataRow}</sub>` : ''}

</div>`;
    markdownParts.push(overviewBlock);
  }

  // Component 3: Metrics Overview
  if (sections.stats?.enabled !== false) {
    const statsWidget = WidgetRegistry.getWidget('github-stats');
    if (statsWidget) {
      markdownParts.push(await statsWidget.render(context));
    }
  }

  // Component 4: Featured Projects Showcase
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      markdownParts.push(await reposWidget.render(context));
    }
  }

  // Component 5: Tech Matrix & Skills
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      markdownParts.push(await techWidget.render(context));
    }
  }

  // Component 6: Achievements & Streak Counter
  if (sections.streak?.enabled !== false) {
    const streakWidget = WidgetRegistry.getWidget('streak-counter');
    if (streakWidget) {
      markdownParts.push(await streakWidget.render(context));
    }
  }

  // Component 7: Footer & Tactical Social HUD
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      markdownParts.push(await socialsWidget.render(context));
    }
  }

  // Publication Credit Footer
  const footer = `<div align="center">
  <sub>Generated with <a href="https://github.com/kalashmishra21/profile-aura">Profile Aura 2.0</a> • Editorial Portfolio Generator</sub>
</div>\n`;
  markdownParts.push(footer);

  const fullMarkdown = markdownParts.join('\n\n---\n\n');

  return {
    heroSvg,
    markdownContent: fullMarkdown
  };
}
