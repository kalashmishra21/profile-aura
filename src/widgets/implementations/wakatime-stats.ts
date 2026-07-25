import { WidgetDefinition } from '../../types/widget.js';
import { PluginExecutionContext } from '../../types/plugin.js';
import { WakaTimeProvider } from '../../fetchers/providers/wakatime.js';

export const wakatimeStatsWidget: WidgetDefinition = {
  id: 'wakatime-stats',
  name: 'WakaTime Weekly Coding Hours',
  description: 'Displays weekly coding duration and top language metric.',
  category: 'custom',
  render: async (context: PluginExecutionContext) => {
    const username = context.config.profile.username;
    const provider = new WakaTimeProvider();
    const stats = await provider.fetch(username);

    if (!stats) return '';

    return `### ⏱️ Weekly Coding Activity (WakaTime)\n\n- **Total Hours This Week:** ${stats.totalHoursThisWeek}\n- **Daily Average:** ${stats.dailyAverageHours}\n- **Top Focus Language:** \`${stats.topLanguage}\`\n`;
  }
};
