import { Command } from 'commander';
import { CoreEngine } from '../../core/engine.js';
import { Logger } from '../../utils/logger.js';
import { exec } from 'child_process';
import path from 'path';

export function registerPreviewCommand(program: Command): void {
  program
    .command('preview')
    .description('Generate portfolio and open visual preview in browser')
    .action(async () => {
      Logger.info('Building preview...');
      const engine = new CoreEngine();
      await engine.run(); // generate files
      
      const readmePath = path.resolve(process.cwd(), 'README.md');
      Logger.info(`Opening preview...`);
      
      let cmd = 'xdg-open';
      if (process.platform === 'win32') cmd = 'start';
      else if (process.platform === 'darwin') cmd = 'open';
      
      exec(`${cmd} "" "${readmePath}"`, (err) => {
        if (err && cmd !== 'start') {
           exec(`${cmd} "${readmePath}"`); // fallback for non-windows
        }
      });
      Logger.success('Preview generation complete.');
    });
}
