import { WidgetDefinition } from '../../types/widget.js';
import { PluginExecutionContext } from '../../types/plugin.js';
import { DevToProvider } from '../../fetchers/providers/devto.js';

export const blogPostsWidget: WidgetDefinition = {
  id: 'blog-posts',
  name: 'Latest Blog Articles',
  description: 'Displays latest published tech blog articles.',
  category: 'custom',
  render: async (context: PluginExecutionContext) => {
    const username = context.config.profile.username;
    const provider = new DevToProvider();
    const articles = await provider.fetch(username);

    if (!articles || articles.length === 0) return '';

    let markdown = `### 📝 Latest Articles & Publications\n\n`;
    articles.forEach((a) => {
      markdown += `- **[${a.title}](${a.url})** _(${a.platform})_\n`;
    });

    return markdown;
  }
};
