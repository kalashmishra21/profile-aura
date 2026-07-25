import { Command } from 'commander';

export function registerVersionCommand(program: Command): void {
  program
    .command('version')
    .description('Print Profile Aura framework version')
    .action(() => {
      console.log('Profile Aura v2.0.0 (Editorial Portfolio Generator)');
    });
}
