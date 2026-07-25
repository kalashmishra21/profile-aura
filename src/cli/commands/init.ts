import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { defaultConfigValues } from '../../config/defaults.js';
import { Logger } from '../../utils/logger.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new profile-aura.config.json file')
    .action(() => {
      const configPath = path.join(process.cwd(), 'profile-aura.config.json');
      if (fs.existsSync(configPath)) {
        Logger.warn('profile-aura.config.json already exists in current directory.');
        return;
      }

      fs.writeFileSync(configPath, JSON.stringify(defaultConfigValues, null, 2), 'utf-8');
      Logger.info('Created profile-aura.config.json with default settings!');
    });
}
