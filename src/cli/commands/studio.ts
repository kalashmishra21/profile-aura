import { Command } from 'commander';
import { StudioServer } from '../../studio/server.js';
import { Logger } from '../../utils/logger.js';

export function registerStudioCommand(program: Command): void {
  program
    .command('studio')
    .description('Launch Profile Aura Studio visual browser editor')
    .option('-p, --port <number>', 'Port to run Studio server on', '3000')
    .action(async (options) => {
      const port = parseInt(options.port, 10) || 3000;
      Logger.info(`Launching Profile Aura Studio visual designer on port ${port}...`);

      const server = new StudioServer(port);
      await server.start();
    });
}
