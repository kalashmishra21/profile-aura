import { Command } from 'commander';
import { TemplateRegistry } from '../../templates/registry.js';

export function registerTemplatesCommand(program: Command): void {
  program
    .command('templates')
    .description('List all 16+ available unique portfolio layout templates')
    .action(() => {
      TemplateRegistry.initialize();
      const templates = TemplateRegistry.listTemplates();

      console.log('\n📐 \x1b[1m\x1b[36mAvailable Profile Aura 2.0 Portfolio Templates:\x1b[0m\n');

      templates.forEach((t, i) => {
        console.log(` \x1b[32m${(i + 1).toString().padStart(2, '0')}.\x1b[0m \x1b[1m${t.id.padEnd(22)}\x1b[0m - ${t.name}`);
        console.log(`     \x1b[90m${t.description}\x1b[0m`);
        console.log(`     \x1b[90mLayout Mode:\x1b[0m ${t.mode} | \x1b[90mCard Variant:\x1b[0m ${t.cardStyle}\n`);
      });
    });
}
