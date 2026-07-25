import { LanguageMetric } from '../types/github.js';
import { TechStackCategoryConfig } from '../types/config.js';

export class AutoSkillDetector {
  static detectCategoriesFromLanguages(languages: LanguageMetric[]): TechStackCategoryConfig[] {
    const frontendSkills = new Set<string>(['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Vue', 'React', 'Svelte']);
    const backendSkills = new Set<string>(['Python', 'Go', 'Rust', 'Java', 'C++', 'C#', 'PHP', 'Ruby']);
    const devopsSkills = new Set<string>(['Docker', 'Shell', 'Makefile', 'Nix']);

    const detectedFrontend: string[] = [];
    const detectedBackend: string[] = [];
    const detectedDevops: string[] = [];

    languages.forEach((lang) => {
      if (frontendSkills.has(lang.name)) detectedFrontend.push(lang.name);
      else if (backendSkills.has(lang.name)) detectedBackend.push(lang.name);
      else if (devopsSkills.has(lang.name)) detectedDevops.push(lang.name);
      else detectedBackend.push(lang.name);
    });

    const categories: TechStackCategoryConfig[] = [];

    if (detectedFrontend.length > 0) {
      categories.push({ category: 'Frontend & UI', skills: detectedFrontend });
    }
    if (detectedBackend.length > 0) {
      categories.push({ category: 'Backend & Systems', skills: detectedBackend });
    }
    if (detectedDevops.length > 0) {
      categories.push({ category: 'Cloud & DevOps', skills: detectedDevops });
    }

    // Default fallbacks if empty
    if (categories.length === 0) {
      return [
        { category: 'Frontend & UI', skills: ['TypeScript', 'React', 'Next.js', 'TailwindCSS'] },
        { category: 'Backend & Systems', skills: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Docker'] }
      ];
    }

    return categories;
  }
}
