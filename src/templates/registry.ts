import { TemplateDefinition } from '../types/template.js';
import { productionTemplates, editorialHeroTemplate } from './layouts/index.js';

export class TemplateRegistry {
  private static templates: Map<string, TemplateDefinition> = new Map();

  static initialize(): void {
    Object.values(productionTemplates).forEach((template) => {
      this.templates.set(template.id, template);
    });
  }

  static getTemplate(id: string): TemplateDefinition {
    if (this.templates.size === 0) {
      this.initialize();
    }
    return this.templates.get(id) || editorialHeroTemplate;
  }

  static listTemplates(): TemplateDefinition[] {
    if (this.templates.size === 0) {
      this.initialize();
    }
    return Array.from(this.templates.values());
  }

  static registerTemplate(template: TemplateDefinition): void {
    this.templates.set(template.id, template);
  }
}
