import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const techStackWidget: WidgetDefinition = {
  id: 'tech-stack',
  name: 'Categorized Tech Matrix',
  description: 'Displays tech stack in domain categories.',
  category: 'stack',
  render: async (context: RenderContext) => {
    const categories = context.config.sections.techStack?.categories || [];
    if (categories.length === 0) return '';

    let sectionsMarkdown = '';
    categories.forEach((cat) => {
      const skillsList = cat.skills.map(s => `\`${s}\``).join('  ');
      sectionsMarkdown += `#### 🛠️ ${cat.category.toUpperCase()}\n${skillsList}\n\n`;
    });

    return `<div align="center">

### // TECHNICAL ECOSYSTEM & MATRIX

</div>

${sectionsMarkdown.trim()}`;
  }
};
