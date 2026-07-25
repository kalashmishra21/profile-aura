import { Command } from 'commander';
import { runProfileAuraEngine } from '../../core/engine.js';
import { logger } from '../../utilities/logger.js';

export function registerBuildCommand(program: Command): void {
  program
    .command('build')
    .description('Generate Profile-Aura README and Satori Hero card')
    .option('-c, --config <path>', 'Path to custom profile-aura.config.json')
    .option('-d, --dry-run', 'Perform a dry run without writing files to disk')
    .action(async (options) => {
      try {
        await runProfileAuraEngine({
          configPath: options.config,
          dryRun: options.dryRun
        });
      } catch (err: any) {
        logger.error(`Build failed: ${err.message}`);
        process.exit(1);
      }
    });
}
