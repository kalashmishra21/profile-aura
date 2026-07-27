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

  const cacheBuster = `?v=${Math.floor(Date.now() / 1000)}`;

  const markdownParts: string[] = [];
  const profileAuraUrl = 'https://github.com/kalashmishra21/profile-aura';
  const hoverTitle = '✨ made by profile-aura';

  // ── 1. HERO SVG ──────────────────────────────────────────────────────────
  if (sections.hero?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/hero.svg${cacheBuster}" alt="${context.data.name || context.data.username} — Profile Hero" width="100%" title="${hoverTitle}" />\n</div>`
    );
  }

  // ── 2. OVERVIEW SVG ──────────────────────────────────────────────────────
  if (sections.overview?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/overview.svg${cacheBuster}" alt="Profile Overview" width="100%" title="${hoverTitle}" />\n</div>`
    );
  }

  // ── 3. METRICS SVG ───────────────────────────────────────────────────────
  //    Real data only (no estimations, Unavailable for unauthenticated stats)
  if (sections.stats?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/metrics.svg${cacheBuster}" alt="Profile Metrics" width="100%" title="${hoverTitle}" />\n</div>`
    );
  }

  // ── 4. TECH STACK SVG ────────────────────────────────────────────────────
  //    Satori SVG card matching Hero/Overview/Metrics visual system
  if (sections.techStack?.enabled !== false) {
    markdownParts.push(
      `<div align="center">\n  <img src="${assetsDir}/techstack.svg${cacheBuster}" alt="Technical Ecosystem" width="100%" title="${hoverTitle}" />\n</div>`
    );
  }

  // ── 5. SOCIAL CONNECT ─────────────────────────────────────────────────────
  if (sections.socials?.enabled !== false) {
    const socialsWidget = WidgetRegistry.getWidget('social-links');
    if (socialsWidget) {
      const content = await socialsWidget.render(context);
      if (content) markdownParts.push(content);
    }
  }

  // ── 6. FOOTER ─────────────────────────────────────────────────────────────
  markdownParts.push(
    `<div align="center">\n  <sub>Designed with <a href="${profileAuraUrl}">Profile Aura 2.0</a></sub>\n</div>\n`
  );

  const fullMarkdown = markdownParts.join('\n\n---\n\n');

  return { heroSvg, markdownContent: fullMarkdown };
}
