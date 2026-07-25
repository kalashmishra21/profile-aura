import { WidgetDefinition } from '../../types/widget.js';
import { PluginExecutionContext } from '../../types/plugin.js';
import { LeetCodeProvider } from '../../fetchers/providers/leetcode.js';

export const leetcodeStatsWidget: WidgetDefinition = {
  id: 'leetcode-stats',
  name: 'LeetCode Problem Solving Card',
  description: 'Displays LeetCode ranking, problems solved, and badge tier.',
  category: 'custom',
  render: async (context: PluginExecutionContext) => {
    const username = context.config.profile.username;
    const provider = new LeetCodeProvider();
    const stats = await provider.fetch(username);

    if (!stats) return '';

    return `### 🧩 LeetCode Coding Performance\n\n- **Problems Solved:** ${stats.problemsSolved}\n- **Global Ranking:** #${stats.ranking?.toLocaleString()}\n- **Tier Badge:** \`${stats.badge}\`\n`;
  }
};
