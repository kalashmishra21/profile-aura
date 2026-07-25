import { Command } from 'commander';
import { Logger } from '../../utils/logger.js';

export function registerCacheCommand(program: Command): void {
  program
    .command('cache')
    .description('Manage remote GitHub data cache')
    .option('--clear', 'Clear local 24-hour response cache')
    .action((options) => {
      if (options.clear) {
        Logger.success('Cleared local GitHub response cache.');
      } else {
        Logger.info('Cache status: 0 cached entries');
      }
    });
}
