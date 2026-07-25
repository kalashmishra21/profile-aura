import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'GitHub Metrics & Activity Dashboard',
  description: 'Displays user stats in high-contrast editorial tables and metrics.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers, following } = context.data;
    const accent = context.theme.colors.accentPrimary;
    const accent2 = context.theme.colors.accentSecondary;

    return `
<div align="center">
  <h3>⚡ Key Metrics & Developer Activity</h3>
</div>

<table width="100%" style="border-collapse: collapse; border: none;">
  <tr>
    <td width="50%" valign="top" style="padding: 12px;">
      <h4>📊 Performance & Contributions</h4>
      <ul>
        <li><b>Total Contributions:</b> <code>${stats.totalContributions.toLocaleString()}</code></li>
        <li><b>Total Commits:</b> <code>${stats.totalCommits.toLocaleString()}</code></li>
        <li><b>Pull Requests:</b> <code>${stats.totalPRs}</code></li>
        <li><b>Issues Opened:</b> <code>${stats.totalIssues}</code></li>
      </ul>
    </td>
    <td width="50%" valign="top" style="padding: 12px;">
      <h4>⭐ Community Reach & Reach</h4>
      <ul>
        <li><b>Public Repositories:</b> <code>${publicRepos}</code></li>
        <li><b>Stars Earned:</b> <code>${stats.totalStars}</code></li>
        <li><b>Followers:</b> <code>${followers.toLocaleString()}</code></li>
        <li><b>Following:</b> <code>${following.toLocaleString()}</code></li>
      </ul>
    </td>
  </tr>
</table>
`;
  }
};
