import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Featured Projects Showcase',
  description: 'Displays top projects in clean GFM showcase lists.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const repos = context.data.repositories;
    if (!repos || repos.length === 0) return '';

    const items = repos.slice(0, 6);
    let repoList = '';

    items.forEach((repo) => {
      const lang = repo.primaryLanguage ? `\`${repo.primaryLanguage.name}\`` : '';
      const desc = repo.description ? `_${repo.description}_` : '_Open source repository project._';
      repoList += `- **[${repo.name}](${repo.url})** ${lang} ⭐ \`${repo.stargazerCount}\`\n  ${desc}\n\n`;
    });

    return `<div align="center">

### 🌟 Featured Open Source Repositories

</div>

${repoList}`;
  }
};
