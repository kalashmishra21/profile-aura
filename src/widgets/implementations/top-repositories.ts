import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Featured Portfolio',
  description: 'Displays only explicitly configured repositories. Hidden if none are configured.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const sectionConfig = context.config.sections.topRepositories;

    // Only show repositories explicitly listed in config.
    // If featuredRepositories is not set or is empty, hide the section entirely.
    const featuredNames: string[] | undefined = sectionConfig?.featuredRepositories;
    if (!featuredNames || featuredNames.length === 0) {
      return '';
    }

    // Match configured repo names against fetched repository data
    const allRepos = context.data.repositories || [];
    const featured = featuredNames
      .map(name => allRepos.find(r => r.name.toLowerCase() === name.toLowerCase()))
      .filter((r): r is NonNullable<typeof r> => !!r);

    // If none of the configured names matched, hide the section
    if (featured.length === 0) {
      return '';
    }

    let markdown = `<div align="center">\n\n### // FEATURED PORTFOLIO\n\n</div>\n\n`;

    featured.forEach((repo) => {
      const lang = repo.primaryLanguage ? `\`${repo.primaryLanguage.name}\`` : '';
      const stars = repo.stargazerCount > 0 ? `⭐ ${repo.stargazerCount}` : '';
      const forks = repo.forkCount > 0 ? `🍴 ${repo.forkCount}` : '';
      const meta = [lang, stars, forks].filter(Boolean).join('  ');

      // Use only the real GitHub description — never generate or fabricate text
      const description = repo.description ? repo.description.trim() : null;

      markdown += `**[${repo.name}](${repo.url})**`;
      if (meta) markdown += `  ${meta}`;
      markdown += '\n';
      if (description) markdown += `${description}\n`;
      markdown += '\n';
    });

    return markdown.trim();
  }
};
