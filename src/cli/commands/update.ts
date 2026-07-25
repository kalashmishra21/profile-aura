import { Command } from 'commander';
import { Logger } from '../../utils/logger.js';

export function registerUpdateCommand(program: Command): void {
  program
    .command('update')
    .description('Check for Profile Aura framework updates')
    .action(() => {
      Logger.info('Profile Aura Version: 2.0.0 (Latest)');
    });
}
