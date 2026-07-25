import { WidgetDefinition } from '../contract.js';
import { RenderContext } from '../../plugins/contract.js';
import path from 'path';

export const heroBannerWidget: WidgetDefinition = {
  id: 'hero-banner',
  name: 'Satori Magazine Hero Banner',
  description: 'Embeds the Satori SVG hero card generated for the profile.',
  render: async (context: RenderContext) => {
    const assetsDir = context.config.output.assetsDir || '.github/assets/generated';
    const heroFilename = context.config.output.heroSvgFilename || 'hero.svg';
    const relativePath = path.posix.join(assetsDir.replace(/\\/g, '/'), heroFilename);

    return `<div align="center">\n  <img src="${relativePath}" alt="${context.data.name} Profile Hero" width="100%" />\n</div>\n`;
  }
};
