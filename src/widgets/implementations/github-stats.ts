import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'GitHub Performance & Metrics Overview',
  description: 'Displays user stats in clean GFM tables and metrics.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers, following } = context.data;

    return `<div align="center">

### ⚡ Developer Activity & Key Performance

</div>

<table width="100%">
<tr>
<td width="50%" valign="top">

#### 📊 Performance & Contributions
- **Total Contributions:** \`${stats.totalContributions.toLocaleString()}\`
- **Total Commits:** \`${stats.totalCommits.toLocaleString()}\`
- **Pull Requests:** \`${stats.totalPRs}\`
- **Issues Opened:** \`${stats.totalIssues}\`

</td>
<td width="50%" valign="top">

#### ⭐ Community Reach & Repositories
- **Public Repositories:** \`${publicRepos}\`
- **Stars Earned:** \`${stats.totalStars}\`
- **Followers:** \`${followers.toLocaleString()}\`
- **Following:** \`${following.toLocaleString()}\`

</td>
</tr>
</table>
`;
  }
};
