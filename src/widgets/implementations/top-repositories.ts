import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Featured Portfolio',
  description: 'Displays top repositories with real GitHub metadata only.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const repos = context.data.repositories;
    if (!repos || repos.length === 0) return '';

    // Cap at 4 — quality over quantity
    const featured = repos
      .filter(r => !r.isFork) // prefer original repos
      .slice(0, 4);

    // If all are forks, just take the first 4
    const items = featured.length > 0 ? featured : repos.slice(0, 4);

    let markdown = `<div align="center">\n\n### // FEATURED PORTFOLIO\n\n</div>\n\n`;

    items.forEach((repo) => {
      const lang = repo.primaryLanguage ? `\`${repo.primaryLanguage.name}\`` : '';
      const stars = repo.stargazerCount > 0 ? `⭐ ${repo.stargazerCount}` : '';
      const forks = repo.forkCount > 0 ? `🍴 ${repo.forkCount}` : '';
      // Use real description only — never generate fake summaries
      const description = repo.description
        ? repo.description.trim()
        : 'No repository description available.';

      const meta = [lang, stars, forks].filter(Boolean).join('  ');

      markdown += `**[${repo.name}](${repo.url})**`;
      if (meta) markdown += `  ${meta}`;
      markdown += `\n${description}\n\n`;
    });

    return markdown.trim();
  }
};
