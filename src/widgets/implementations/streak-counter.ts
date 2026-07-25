import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const streakCounterWidget: WidgetDefinition = {
  id: 'streak-counter',
  name: 'Contribution Streak Counter',
  description: 'Displays current active coding streak and longest streak.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const themeId = context.theme.id;

    return `<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${context.data.username}&theme=${themeId}&hide_border=true" alt="${context.data.username}'s GitHub Streak" />
</div>\n`;
  }
};
