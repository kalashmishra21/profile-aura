import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const socialLinksWidget: WidgetDefinition = {
  id: 'social-links',
  name: 'Social Links & Contact',
  description: 'Displays interactive social badges and contact links.',
  category: 'socials',
  render: async (context: RenderContext) => {
    const socials = context.data.socials || {};
    const keys = Object.keys(socials).filter(k => !!socials[k]);
    if (keys.length === 0) return '';

    let markdown = `### 🤝 Connect & Socials\n\n<p align="center">\n`;

    keys.forEach((platform) => {
      const url = socials[platform];
      markdown += `  <a href="${url}"><img src="https://img.shields.io/badge/${platform.toUpperCase()}-${context.theme.colors.accentPrimary.replace('#', '')}?style=for-the-badge&logo=${platform}&logoColor=white" alt="${platform}" /></a>\n`;
    });

    markdown += `</p>\n`;
    return markdown;
  }
};
