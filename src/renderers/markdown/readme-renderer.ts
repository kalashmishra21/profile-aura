import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering Sprint 8 Portfolio with theme '${context.theme.id}'...`);

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

  // 2. Assemble Portfolio Components
  const sections = context.config.sections;
  let markdownParts: string[] = [];

  // Hero Banner Widget
  if (sections.hero?.enabled !== false) {
    const heroWidget = WidgetRegistry.getWidget('hero-banner');
    if (heroWidget) {
      markdownParts.push(await heroWidget.render(context));
    }
  }

  // 1. ABOUT: Editorial Introduction (Max 4 lines, Developer, AI, Open Source, Problem Solver)
  if (sections.overview?.enabled !== false) {
    const bio = context.data.bio || 'Full Stack Engineer & Open Source Developer building scalable systems, AI toolchains, and high-impact web software.';
    const location = context.data.location ? `📍 ${context.data.location}` : '';
    const company = context.data.company ? `🏢 ${context.data.company}` : '';
    const website = context.data.website ? `🌐 [${context.data.website}](${context.data.website})` : '';

    const metadataRow = [location, company, website].filter(Boolean).join('   •   ');

    const aboutBlock = `<div align="center">

### // EDITORIAL INTRODUCTION

${bio}

${metadataRow ? `<sub>${metadataRow}</sub>` : ''}

</div>`;
    markdownParts.push(aboutBlock);
  }

  // 2. METRICS: Bento Dashboard Widget
  if (sections.stats?.enabled !== false) {
    const statsWidget = WidgetRegistry.getWidget('github-stats');
    if (statsWidget) {
      markdownParts.push(await statsWidget.render(context));
    }
  }

  // 3. PROJECTS: Portfolio Case Studies Widget
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      markdownParts.push(await reposWidget.render(context));
    }
  }

  // 4. SKILLS: Categorized Tech Matrix Widget
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      markdownParts.push(await techWidget.render(context));
    }
  }

  // 5. ACHIEVEMENTS: Streak Counter Widget
  if (sections.streak?.enabled !== false) {
    const streakWidget = WidgetRegistry.getWidget('streak-counter');
    if (streakWidget) {
      markdownParts.push(await streakWidget.render(context));
    }
  }

  // 6. CONNECT: Tactical Social HUD Widget
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      markdownParts.push(await socialsWidget.render(context));
    }
  }

  // 7. FOOTER: Minimal Signature
  const footer = `<div align="center">
  <sub>Designed with Profile Aura 2.0</sub>
</div>\n`;
  markdownParts.push(footer);

  const fullMarkdown = markdownParts.join('\n\n---\n\n');

  return {
    heroSvg,
    markdownContent: fullMarkdown
  };
}
