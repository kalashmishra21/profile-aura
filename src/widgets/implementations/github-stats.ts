import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'Bento Grid Metrics Showcase',
  description: 'Displays user stats in Bento Box grid cards.',
  category: 'stats',
  render: async (context: RenderContext) => {
    const { stats, publicRepos, followers } = context.data;
    const accent = context.theme.colors.accentPrimary;

    return `
<!-- BENTO METRICS GRID (ISSUE 1: ELEVATED SURFACE CONTRAST) -->
<div align="center">
  <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: separate; border-spacing: 12px; border: none; background: transparent;">
    <tr>
      <td width="33%" align="center" style="background-color: #0e0e11; border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid ${accent}; border-radius: 12px; padding: 18px 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; font-weight: 700;">CONTRIBUTIONS</div>
        <div style="font-size: 28px; font-weight: 800; color: ${accent}; margin-top: 4px;">${stats.totalContributions.toLocaleString()}</div>
        <div style="font-size: 11px; color: #71717a; margin-top: 2px;">Total Activity Year</div>
      </td>
      <td width="33%" align="center" style="background-color: #0e0e11; border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 18px 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; font-weight: 700;">PUBLIC REPOS</div>
        <div style="font-size: 28px; font-weight: 800; color: #f4f4f5; margin-top: 4px;">${publicRepos}</div>
        <div style="font-size: 11px; color: #71717a; margin-top: 2px;">Open Source Repositories</div>
      </td>
      <td width="33%" align="center" style="background-color: #0e0e11; border: 1px solid rgba(255, 255, 255, 0.1); border-top: 1px solid rgba(6, 182, 212, 0.5); border-radius: 12px; padding: 18px 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
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
