import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const socialLinksWidget: WidgetDefinition = {
  id: 'social-links',
  name: 'Social Links & Badges',
  description: 'Displays social badges in clean GFM center align.',
  category: 'socials',
  render: async (context: RenderContext) => {
    const socials = context.data.socials || {};
    const keys = Object.keys(socials).filter(k => !!socials[k]);
    if (keys.length === 0) return '';

    const accentHex = context.theme.colors.accentPrimary.replace('#', '');

    let badges = '';
    keys.forEach((platform) => {
      const url = socials[platform];
      badges += `<a href="${url}"><img src="https://img.shields.io/badge/${platform.toUpperCase()}-${accentHex}?style=for-the-badge&logo=${platform}&logoColor=white" alt="${platform}" /></a> `;
    });

    return `<div align="center">

### 🤝 Connect & Social Links

<p align="center">
${badges.trim()}
</p>

</div>`;
  }
};
