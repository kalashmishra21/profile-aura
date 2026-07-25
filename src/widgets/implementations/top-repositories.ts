import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

export const topRepositoriesWidget: WidgetDefinition = {
  id: 'top-repositories',
  name: 'Featured Portfolio',
  description: 'Displays premium repository cards for explicitly configured repositories.',
  category: 'projects',
  render: async (context: RenderContext) => {
    const sectionConfig = context.config.sections.topRepositories;

    // Only show repositories explicitly listed in config.
    // If featuredRepositories is not set or is empty, hide the section entirely.
    const featuredNames: string[] | undefined = sectionConfig?.featuredRepositories;
    if (!featuredNames || featuredNames.length === 0) {
      return '';
    }

    // Match configured repo names against fetched repository data (max 4)
    const allRepos = context.data.repositories || [];
    const featured = featuredNames
      .map(name => allRepos.find(r => r.name.toLowerCase() === name.toLowerCase()))
      .filter((r): r is NonNullable<typeof r> => !!r)
      .slice(0, 4);

    // If none of the configured names matched, hide the section
    if (featured.length === 0) {
      return '';
    }

    let markdown = `<div align="center">\n\n### // FEATURED PORTFOLIO\n\n</div>\n\n`;

    // Render as a 2-column grid of HTML cards for GitHub Markdown
    markdown += `<table width="100%">\n`;

    for (let i = 0; i < featured.length; i += 2) {
      markdown += `  <tr>\n`;
      const repo1 = featured[i];
      const repo2 = featured[i + 1];

      // Card 1
      const desc1 = repo1.description && repo1.description.trim() ? repo1.description.trim() : null;
      const lang1 = repo1.primaryLanguage ? `<code>${repo1.primaryLanguage.name}</code>` : '';
      const stars1 = `⭐ <b>${repo1.stargazerCount}</b>`;

      markdown += `    <td width="50%" align="left" valign="top">\n`;
      markdown += `      <a href="${repo1.url}"><b>${repo1.name}</b></a>\n`;
      if (desc1) {
        markdown += `      <br/><sub>${desc1}</sub>\n`;
      }
      markdown += `      <br/><br/>\n`;
      markdown += `      ${[lang1, stars1, `<a href="${repo1.url}">View Repository →</a>`].filter(Boolean).join(' &nbsp;•&nbsp; ')}\n`;
      markdown += `    </td>\n`;

      // Card 2 (if exists)
      if (repo2) {
        const desc2 = repo2.description && repo2.description.trim() ? repo2.description.trim() : null;
        const lang2 = repo2.primaryLanguage ? `<code>${repo2.primaryLanguage.name}</code>` : '';
        const stars2 = `⭐ <b>${repo2.stargazerCount}</b>`;

        markdown += `    <td width="50%" align="left" valign="top">\n`;
        markdown += `      <a href="${repo2.url}"><b>${repo2.name}</b></a>\n`;
        if (desc2) {
          markdown += `      <br/><sub>${desc2}</sub>\n`;
        }
        markdown += `      <br/><br/>\n`;
        markdown += `      ${[lang2, stars2, `<a href="${repo2.url}">View Repository →</a>`].filter(Boolean).join(' &nbsp;•&nbsp; ')}\n`;
        markdown += `    </td>\n`;
      } else {
        markdown += `    <td width="50%" align="left" valign="top">&nbsp;</td>\n`;
      }

      markdown += `  </tr>\n`;
    }

    markdown += `</table>\n`;

    return markdown.trim();
  }
};
