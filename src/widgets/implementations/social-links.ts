import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const socialLinksWidget: WidgetDefinition = {
  id: 'social-links',
  name: 'Sleek Tactical Social Links',
  description: 'Displays interactive social buttons in clean tactical layout.',
  category: 'socials',
  render: async (context: RenderContext) => {
    const socials = context.data.socials || {};
    const keys = Object.keys(socials).filter(k => !!socials[k]);
    if (keys.length === 0) return '';

    const accentHex = context.theme.colors.accentPrimary.replace('#', '');

    let badges = '';
    keys.forEach((platform) => {
      const url = socials[platform];
      badges += `  <a href="${url}"><img src="https://img.shields.io/badge/${platform.toUpperCase()}-${accentHex}?style=for-the-badge&logo=${platform}&logoColor=white" alt="${platform}" /></a>\n`;
    });

    return `
<!-- TACTICAL SOCIAL HUD -->
<div align="center" style="margin-top: 24px;">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a1a1aa; font-weight: 700; margin-bottom: 10px;">// CONNECT & SOCIAL HUD</div>
  <p align="center">
  ${badges.trim()}
  </p>
</div>
`;
  }
};
