import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const currentProjectWidget: WidgetDefinition = {
  id: 'current-project',
  name: 'Current Project',
  description: 'Displays metadata for the current project repository using Profile Aura.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const configSection = context.config.sections.currentProject;
    if (configSection?.enabled === false) {
      return '';
    }

    const repos = context.data.repositories || [];
    if (repos.length === 0) return '';

    // Match repo by configured repoName, username, profile-aura/readme-generator, or fallback to first repo
    const targetName = configSection?.repoName || context.config.github.username || context.data.username;
    let repo = repos.find(r => r.name.toLowerCase() === targetName.toLowerCase());
    if (!repo) {
      repo = repos.find(r => r.name.toLowerCase().includes('profile-aura') || r.name.toLowerCase().includes('readme')) || repos[0];
    }

    if (!repo) return '';

    const name = repo.name;
    const url = repo.url;
    const description = repo.description && repo.description.trim() ? repo.description.trim() : null;
    const lang = repo.primaryLanguage?.name || null;
    const stars = repo.stargazerCount;
    const forks = repo.forkCount;
    const license = (repo as any).license || 'MIT';

    let metaBadgeParts: string[] = [];
    if (lang) metaBadgeParts.push(`<code>${lang}</code>`);
    metaBadgeParts.push(`⭐ <b>${stars}</b> Stars`);
    metaBadgeParts.push(`🍴 <b>${forks}</b> Forks`);
    metaBadgeParts.push(`📜 <b>${license}</b> License`);

    let markdown = `<div align="center">\n\n### // CURRENT PROJECT\n\n`;
    markdown += `**[${name}](${url})**\n\n`;
    if (description) {
      markdown += `${description}\n\n`;
    }
    markdown += `<p align="center">\n  ${metaBadgeParts.join(' &nbsp;•&nbsp; ')}\n</p>\n\n</div>`;

    return markdown.trim();
  }
};
