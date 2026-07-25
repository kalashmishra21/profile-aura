import { WidgetDefinition } from '../contract.js';
import { RenderContext } from '../../plugins/contract.js';

export const techStackWidget: WidgetDefinition = {
  id: 'tech-stack',
  name: 'Categorized Tech Stack Badges',
  description: 'Displays tech stack organized by category with badges.',
  render: async (context: RenderContext) => {
    const categories = context.config.sections.techStack?.categories || [];
    if (categories.length === 0) return '';

    let markdown = `### 🛠️ Tech Stack & Ecosystem\n\n`;

    categories.forEach((cat) => {
      markdown += `#### ${cat.category}\n`;
      const badges = cat.skills.map((skill) => {
        const cleanSkill = skill.replace(/[^a-zA-Z0-9]/g, '');
        return `\`${skill}\``;
      }).join(' ');
      markdown += `${badges}\n\n`;
    });

    return markdown;
  }
};
