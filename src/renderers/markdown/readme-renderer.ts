import { RenderContext, RenderResult } from '../../plugins/contract.js';
import { renderSatoriHeroSvg } from '../satori/hero-renderer.js';
import { WidgetRegistry } from '../../widgets/registry.js';
import { Logger } from '../../utils/logger.js';

export async function renderReadme(context: RenderContext): Promise<RenderResult> {
  Logger.info(`Rendering SVG-First Portfolio with theme '${context.theme.id}'...`);

  // Render Satori Hero SVG
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

  const sections = context.config.sections;
  const assetsDir = (context.config.output?.assetsDir || '.github/assets/generated')
    .replace(/\\/g, '/');

  const markdownParts: string[] = [];

  // ── 1. HERO SVG ──────────────────────────────────────────────────────────
  if (sections.hero?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/hero.svg" alt="${context.data.name || context.data.username} — Profile Hero" width="100%" />\n</div>`
    );
  }

  // ── 2. OVERVIEW SVG ──────────────────────────────────────────────────────
  if (sections.overview?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/overview.svg" alt="Profile Overview" width="100%" />\n</div>`
    );
  }

  // ── 3. METRICS SVG ───────────────────────────────────────────────────────
  //    Real data only: Repositories, Stars, Followers, Following
  if (sections.stats?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/metrics.svg" alt="Profile Metrics" width="100%" />\n</div>`
    );
  }

  // ── 4. FEATURED PORTFOLIO ─────────────────────────────────────────────────
  //    Markdown — real repo names, real descriptions, max 4
  if (sections.topRepositories?.enabled !== false) {
    const reposWidget = WidgetRegistry.getWidget('top-repositories');
    if (reposWidget) {
      const content = await reposWidget.render(context);
      if (content) markdownParts.push(content);
    }
  }

  // ── 5. TECH MATRIX ────────────────────────────────────────────────────────
  if (sections.techStack?.enabled !== false) {
    const techWidget = WidgetRegistry.getWidget('tech-stack');
    if (techWidget) {
      const content = await techWidget.render(context);
      if (content) markdownParts.push(content);
    }
  }

  // ── 6. SOCIAL CONNECT ─────────────────────────────────────────────────────
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      const content = await socialsWidget.render(context);
      if (content) markdownParts.push(content);
    }
  }

  // ── 7. FOOTER ─────────────────────────────────────────────────────────────
  markdownParts.push(
    `<div align="center">\n  <sub>Designed with <a href="https://github.com/kalashmishra21/profile-aura">Profile Aura 2.0</a></sub>\n</div>\n`
  );

  const fullMarkdown = markdownParts.join('\n\n---\n\n');

  return { heroSvg, markdownContent: fullMarkdown };
}
