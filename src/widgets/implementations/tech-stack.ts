import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const techStackWidget: WidgetDefinition = {
  id: 'tech-stack',
  name: 'Bento Tech Stack Matrix',
  description: 'Displays tech stack in Bento Box category containers.',
  category: 'stack',
  render: async (context: RenderContext) => {
    const categories = context.config.sections.techStack?.categories || [];
    if (categories.length === 0) return '';

    const accent = context.theme.colors.accentPrimary;

    let bentoCells = '';
    categories.forEach((cat) => {
      const skillsHtml = cat.skills
        .map(s => `<span style="display: inline-block; background: #18181b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 4px 10px; font-size: 12px; color: #f4f4f5; margin: 3px; font-weight: 500;">${s}</span>`)
        .join(' ');

      bentoCells += `
    <div style="background-color: #0e0e11; border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid ${accent}66; border-radius: 12px; padding: 16px; margin-bottom: 12px; text-align: left; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: ${accent}; font-weight: 700; margin-bottom: 8px;">// ${cat.category}</div>
      <div>${skillsHtml}</div>
    </div>`;
    });

    return `
<!-- BENTO TECH MATRIX (ISSUE 1: ELEVATED SURFACE CONTRAST) -->
<div align="center" style="max-width: 800px; margin: 0 auto;">
  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #a1a1aa; font-weight: 700; margin-bottom: 12px;">⚡ TECH STACK & ECOSYSTEM</div>
  ${bentoCells}
</div>
`;
  }
};
