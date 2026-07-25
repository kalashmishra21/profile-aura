import { Command } from 'commander';
import { ThemeRegistry } from '../../themes/registry.js';

export function registerThemesCommand(program: Command): void {
  program
    .command('themes')
    .description('List all 11+ available dark editorial visual themes')
    .action(() => {
      ThemeRegistry.initialize();
      const themes = ThemeRegistry.listThemes();

      console.log('\n🎨 \x1b[1m\x1b[36mAvailable Profile-Aura 2.0 Editorial Themes:\x1b[0m\n');

      themes.forEach((t, i) => {
        console.log(` \x1b[32m${(i + 1).toString().padStart(2, '0')}.\x1b[0m \x1b[1m${t.id.padEnd(20)}\x1b[0m - ${t.name}`);
        console.log(`     \x1b[90m${t.description}\x1b[0m`);
        console.log(`     \x1b[90mPrimary Accent:\x1b[0m ${t.colors.accentPrimary} | \x1b[90mSecondary:\x1b[0m ${t.colors.accentSecondary}\n`);
      });
    });
}
