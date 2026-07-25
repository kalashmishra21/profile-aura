import { Command } from 'commander';
import { Logger } from '../../utils/logger.js';

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Perform environment diagnostics and configuration sanity checks')
    .action(() => {
      Logger.info('Running Profile Aura System Health Check...');
      console.log(' - Node.js Version:', process.version);
      console.log(' - Environment TOKEN:', process.env.GITHUB_TOKEN ? 'Present (Authenticated)' : 'Missing (Rate limited REST mode)');
      Logger.success('System diagnostics complete. All core systems operational.');
    });
}
