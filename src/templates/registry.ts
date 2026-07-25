import { TemplateLayout } from './interface.js';

export const editorialHeroTemplate: TemplateLayout = {
  id: 'editorial-hero',
  name: 'Editorial Magazine Hero',
  description: 'Full-width Satori anime character card at top, followed by structured dashboard sections.',
  sectionOrder: ['hero', 'stats', 'streak', 'techStack', 'topRepositories', 'socials']
};

export const executiveSplitTemplate: TemplateLayout = {
  id: 'executive-split',
  name: 'Executive Balanced Split',
  description: 'Split layout presenting stats and repositories in balanced grid format.',
  sectionOrder: ['hero', 'techStack', 'stats', 'topRepositories', 'streak', 'socials']
};

export const minimalistGridTemplate: TemplateLayout = {
  id: 'minimalist-grid',
  name: 'Minimalist Compact Grid',
  description: 'Clean compact card-like structure for ultra-fast scanning.',
  sectionOrder: ['hero', 'stats', 'topRepositories', 'socials']
};

export class TemplateRegistry {
  private static templates: Map<string, TemplateLayout> = new Map();

  static initialize(): void {
    [editorialHeroTemplate, executiveSplitTemplate, minimalistGridTemplate].forEach((t) => {
      this.templates.set(t.id, t);
    });
  }

  static getTemplate(id: string): TemplateLayout {
    if (this.templates.size === 0) {
      this.initialize();
    }
    return this.templates.get(id) || editorialHeroTemplate;
  }

  static listTemplates(): TemplateLayout[] {
    if (this.templates.size === 0) {
      this.initialize();
    }
    return Array.from(this.templates.values());
  }
}
