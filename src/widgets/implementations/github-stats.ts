import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'Bento Grid Metrics Showcase',
  description: 'Displays user stats in Bento Box grid cards.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers } = context.data;
    const theme = context.theme;
    const accent = theme.colors.accentPrimary;

    return `
<!-- BENTO METRICS GRID -->
<div align="center">
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 12px; border: none; background: transparent;">
    <tr>
      <td width="33%" align="center" style="background-color: #121215; border: 1px solid ${accent}44; border-radius: 12px; padding: 18px 12px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; font-weight: 700;">CONTRIBUTIONS</div>
        <div style="font-size: 28px; font-weight: 800; color: ${accent}; margin-top: 4px;">${stats.totalContributions.toLocaleString()}</div>
        <div style="font-size: 11px; color: #71717a; margin-top: 2px;">Total Activity Year</div>
      </td>
      <td width="33%" align="center" style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 18px 12px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; font-weight: 700;">PUBLIC REPOS</div>
        <div style="font-size: 28px; font-weight: 800; color: #f4f4f5; margin-top: 4px;">${publicRepos}</div>
        <div style="font-size: 11px; color: #71717a; margin-top: 2px;">Open Source Repositories</div>
      </td>
      <td width="33%" align="center" style="background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 18px 12px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; font-weight: 700;">COMMUNITY</div>
        <div style="font-size: 28px; font-weight: 800; color: #06b6d4; margin-top: 4px;">${followers.toLocaleString()}</div>
        <div style="font-size: 11px; color: #71717a; margin-top: 2px;">GitHub Followers</div>
      </td>
    </tr>
  </table>
</div>
`;
  }
};
