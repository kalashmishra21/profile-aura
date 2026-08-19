import { Command } from 'commander';
import { CoreEngine } from '../../core/engine.js';
import { Logger } from '../../utils/logger.js';
import fs from 'fs';
import path from 'path';

export function registerBuildCommand(program: Command): void {
  program
    .command('build')
    .description('Generate Profile Aura README and Satori Hero card')
    .option('-c, --config <path>', 'Path to custom profile-aura.config.json')
    .option('-d, --dry-run', 'Perform a dry run without writing files to disk')
    .option('-v, --verbose', 'Enable verbose debug logging')
    .option('-w, --watch', 'Watch configuration file for changes and rebuild automatically')
    .action(async (options) => {
      try {
        const configPath = options.config ? path.resolve(process.cwd(), options.config) : path.resolve(process.cwd(), 'profile-aura.config.json');

        const runBuild = async () => {
          const engine = new CoreEngine();
          await engine.run({
            configPath: options.config,
            dryRun: options.dryRun,
            verbose: options.verbose
          });
        };

        if (options.watch) {
          Logger.info(`Watching configuration for changes...`);
          await runBuild(); // Initial run

          if (fs.existsSync(configPath)) {
            let debounceTimer: NodeJS.Timeout;
            fs.watch(configPath, (eventType) => {
              if (eventType === 'change') {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(async () => {
                  Logger.info('Change detected. Rebuilding...');
                  try {
                    await runBuild();
                    Logger.success('Rebuild complete. Watching for changes...');
                  } catch (err: any) {
                    Logger.error(`Rebuild failed: ${err.message}`);
                  }
                }, 300); // 300ms debounce
              }
            });
          } else {
             Logger.warn(`Config file not found at ${configPath}. Watch mode may not work correctly.`);
          }
        } else {
          await runBuild();
        }
      } catch (err: any) {
        Logger.error(`Build failed: ${err.message}`);
        process.exit(1);
      }
    });
}
