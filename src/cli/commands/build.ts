import { Command } from 'commander';
import { CoreEngine } from '../../core/engine.js';
import { Logger } from '../../utils/logger.js';

export function registerBuildCommand(program: Command): void {
  program
    .command('build')
    .description('Generate Profile Aura README and Satori Hero card')
    .option('-c, --config <path>', 'Path to custom profile-aura.config.json')
    .option('-d, --dry-run', 'Perform a dry run without writing files to disk')
    .option('-v, --verbose', 'Enable verbose debug logging')
    .action(async (options) => {
      try {
        const engine = new CoreEngine();
        await engine.run({
          configPath: options.config,
          dryRun: options.dryRun,
          verbose: options.verbose
        });
      } catch (err: any) {
        Logger.error(`Build failed: ${err.message}`);
        process.exit(1);
      }
    });
}
