import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { runProfileAuraEngine } from '../../core/engine.js';
import { logger } from '../../utilities/logger.js';

export function registerPreviewCommand(program: Command): void {
  program
    .command('preview')
    .description('Generate profile and open HTML visual preview in browser')
    .action(async () => {
      logger.info('Building preview...');
      await runProfileAuraEngine();

      const readmePath = path.join(process.cwd(), 'README.md');
      if (fs.existsSync(readmePath)) {
        logger.success('Preview successfully generated! View README.md and .github/assets/generated/hero.svg to inspect your portfolio.');
      }
    });
}
