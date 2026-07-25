import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'Bento Metrics Dashboard',
  description: 'Displays developer metrics in linear/vercel bento grid cards.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers, following } = context.data;
    const accent = context.theme.colors.accentPrimary;

    return `<div align="center">

### ⚡ Developer Activity & Performance

</div>

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="25%" align="center" valign="top">

#### ⚡ CONTRIBUTIONS
# \`${stats.totalContributions.toLocaleString()}\`
<sub>Total Activity</sub>

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

#### 📦 PUBLIC REPOS
# \`${publicRepos}\`
<sub>Repositories</sub>

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
