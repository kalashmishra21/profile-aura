import { Command } from 'commander';
import { loadAndValidateConfig } from '../../config/loader.js';
import { Logger } from '../../utils/logger.js';

export function registerValidateCommand(program: Command): void {
  program
    .command('validate')
    .description('Validate profile-aura.config.json against Zod runtime schema')
    .option('-c, --config <path>', 'Path to configuration file')
    .action((options) => {
      try {
        loadAndValidateConfig(options.config);
        Logger.success('Configuration file is valid against Zod schema!');
      } catch (err: any) {
        Logger.error(`Validation failed: ${err.message}`);
        process.exit(1);
      }
    });
}
