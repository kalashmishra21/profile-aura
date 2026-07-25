import { Command } from 'commander';
import { Logger } from '../../utils/logger.js';

export function registerPluginsCommand(program: Command): void {
  program
    .command('plugins')
    .description('Manage and inspect registered Profile Aura plugins')
    .action(() => {
      Logger.info('Registered Plugins: None (0 active plugins)');
    });
}
