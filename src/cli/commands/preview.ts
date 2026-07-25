import { Command } from 'commander';
import { CoreEngine } from '../../core/engine.js';
import { Logger } from '../../utils/logger.js';

export function registerPreviewCommand(program: Command): void {
  program
    .command('preview')
    .description('Generate portfolio and open visual preview in browser')
    .action(async () => {
      Logger.info('Building preview...');
      const engine = new CoreEngine();
      await engine.run({ dryRun: true });
      Logger.success('Preview generation complete.');
    });
}
