import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'GitHub Metrics & Activity Dashboard',
  description: 'Displays user stats in high-contrast editorial tables and metrics.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers, following } = context.data;

    return `### ⚡ Profile Overview & Key Metrics

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h4>📊 Performance & Contributions</h4>
      <ul>
        <li><b>Total Contributions:</b> ${stats.totalContributions.toLocaleString()}</li>
        <li><b>Total Commits:</b> ${stats.totalCommits.toLocaleString()}</li>
        <li><b>Pull Requests:</b> ${stats.totalPRs}</li>
        <li><b>Issues Opened:</b> ${stats.totalIssues}</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h4>⭐ Community Reach & Stats</h4>
      <ul>
        <li><b>Public Repositories:</b> ${publicRepos}</li>
        <li><b>Stars Earned:</b> ${stats.totalStars}</li>
        <li><b>Followers:</b> ${followers.toLocaleString()}</li>
        <li><b>Following:</b> ${following.toLocaleString()}</li>
      </ul>
    </td>
  </tr>
</table>
`;
  }
};
