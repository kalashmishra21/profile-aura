import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Portfolio Case Studies',
  description: 'Displays top repositories as portfolio case study cards.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const repos = context.data.repositories;
    if (!repos || repos.length === 0) return '';

    const items = repos.slice(0, 6);
    let caseStudies = '';

    items.forEach((repo) => {
      const lang = repo.primaryLanguage ? `\`${repo.primaryLanguage.name}\`` : '';
      const stars = repo.stargazerCount > 0 ? `⭐ \`${repo.stargazerCount}\`` : '';
      const summary = repo.description || 'Open source software repository and architecture.';

      caseStudies += `#### 📦 [${repo.name}](${repo.url})  ${lang} ${stars}\n${summary}\n\n`;
    });

    return `<div align="center">

### // FEATURED PORTFOLIO & CASE STUDIES

</div>

${caseStudies.trim()}`;
  }
};
