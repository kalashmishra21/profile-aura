import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Featured Repositories Grid',
  description: 'Displays user pinned and top starred repositories.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const repos = context.data.repositories;
    if (!repos || repos.length === 0) return '';

    let markdown = `
<div align="center">
  <h3>🌟 Featured Open-Source Repositories</h3>
</div>

`;

    repos.slice(0, 6).forEach((repo) => {
      const lang = repo.primaryLanguage ? `\`${repo.primaryLanguage.name}\`` : '';
      markdown += `- **[${repo.name}](${repo.url})** ${lang} ⭐ **${repo.stargazerCount}**\n  _${repo.description || 'No description provided.'}_\n\n`;
    });

    return markdown;
  }
};
