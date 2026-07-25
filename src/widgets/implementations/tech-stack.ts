import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const techStackWidget: WidgetDefinition = {
  id: 'tech-stack',
  name: 'Categorized Tech Stack Badges',
  description: 'Displays tech stack organized by category with badges.',
  category: 'stack',
  render: async (context: RenderContext) => {
    const categories = context.config.sections.techStack?.categories || [];
    if (categories.length === 0) return '';

    let markdown = `### 🛠️ Tech Stack & Ecosystem\n\n`;

    categories.forEach((cat) => {
      markdown += `#### ${cat.category}\n`;
      const badges = cat.skills.map((skill) => `\`${skill}\``).join(' ');
      markdown += `${badges}\n\n`;
    });

    return markdown;
  }
};
