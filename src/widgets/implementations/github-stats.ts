import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'Bento Metrics Dashboard',
  description: 'Displays developer metrics in a premium dashboard layout.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers, following } = context.data;

    return `<div align="center">

### // DEVELOPER PERFORMANCE & ACTIVITY

</div>

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="25%" align="center" valign="top">

#### ⚡ ACTIVITY
# \`${stats.totalContributions.toLocaleString()}\`
<sub>Total Contributions</sub>

</td>
<td width="25%" align="center" valign="top">

#### 💻 COMMITS
# \`${stats.totalCommits.toLocaleString()}\`
<sub>Code Commits</sub>

</td>
<td width="25%" align="center" valign="top">

#### 🔀 PULL REQUESTS
# \`${stats.totalPRs.toLocaleString()}\`
<sub>Merged PRs</sub>

</td>
<td width="25%" align="center" valign="top">

#### 🎯 ISSUES
# \`${stats.totalIssues.toLocaleString()}\`
<sub>Resolved Issues</sub>

</td>
</tr>
<tr>
<td width="25%" align="center" valign="top">

#### 📦 REPOSITORIES
# \`${publicRepos}\`
<sub>Public Projects</sub>

</td>
<td width="25%" align="center" valign="top">

#### ⭐ TOTAL STARS
# \`${stats.totalStars.toLocaleString()}\`
<sub>Stars Earned</sub>

</td>
<td width="25%" align="center" valign="top">

#### 👥 FOLLOWERS
# \`${followers.toLocaleString()}\`
<sub>Community</sub>

</td>
<td width="25%" align="center" valign="top">

#### 🔄 FOLLOWING
# \`${following.toLocaleString()}\`
<sub>Following</sub>

</td>
</tr>
</table>
`;
  }
};
