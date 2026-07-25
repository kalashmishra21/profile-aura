import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Bento Project Showcase Grid',
  description: 'Displays top projects in multi-column Bento cards.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const repos = context.data.repositories;
    if (!repos || repos.length === 0) return '';

    const accent = context.theme.colors.accentPrimary;
    const items = repos.slice(0, 6);

    let rows = '';
    for (let i = 0; i < items.length; i += 2) {
      const repoA = items[i];
      const repoB = items[i + 1];

      const cardA = `
        <td width="50%" valign="top" style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 16px; text-align: left;">
          <div style="font-size: 14px; font-weight: 700; color: ${accent};">
            <a href="${repoA.url}" style="color: ${accent}; text-decoration: none;">📦 ${repoA.name}</a>
          </div>
          <div style="font-size: 12px; color: #a1a1aa; margin: 6px 0 10px 0; min-height: 36px; line-height: 1.4;">
            ${repoA.description || 'Open source repository project.'}
          </div>
          <div style="display: flex; gap: 8px; font-size: 11px; color: #71717a;">
            ${repoA.primaryLanguage ? `<span style="background: #1c1c21; border-radius: 4px; padding: 2px 6px; color: #f4f4f5;">${repoA.primaryLanguage.name}</span>` : ''}
            <span style="background: #1c1c21; border-radius: 4px; padding: 2px 6px; color: #eab308;">⭐ ${repoA.stargazerCount}</span>
          </div>
        </td>`;

      const cardB = repoB ? `
        <td width="50%" valign="top" style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 16px; text-align: left;">
          <div style="font-size: 14px; font-weight: 700; color: ${accent};">
            <a href="${repoB.url}" style="color: ${accent}; text-decoration: none;">📦 ${repoB.name}</a>
          </div>
          <div style="font-size: 12px; color: #a1a1aa; margin: 6px 0 10px 0; min-height: 36px; line-height: 1.4;">
            ${repoB.description || 'Open source repository project.'}
          </div>
          <div style="display: flex; gap: 8px; font-size: 11px; color: #71717a;">
            ${repoB.primaryLanguage ? `<span style="background: #1c1c21; border-radius: 4px; padding: 2px 6px; color: #f4f4f5;">${repoB.primaryLanguage.name}</span>` : ''}
            <span style="background: #1c1c21; border-radius: 4px; padding: 2px 6px; color: #eab308;">⭐ ${repoB.stargazerCount}</span>
          </div>
        </td>` : `<td width="50%"></td>`;

      rows += `<tr>${cardA}${cardB}</tr>`;
    }

    return `
<!-- BENTO PROJECT SHOWCASE -->
<div align="center">
  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #a1a1aa; font-weight: 700; margin-bottom: 12px;">🌟 FEATURED REPOSITORIES & PROJECTS</div>
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 12px; border: none; background: transparent;">
    ${rows}
  </table>
</div>
`;
  }
};
