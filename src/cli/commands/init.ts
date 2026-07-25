import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from '../../configuration/defaults.js';
import { logger } from '../../utilities/logger.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new profile-aura.config.json file')
    .action(() => {
      const configPath = path.join(process.cwd(), 'profile-aura.config.json');
      if (fs.existsSync(configPath)) {
        logger.warn('profile-aura.config.json already exists in current directory.');
        return;
      }

      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
      logger.success('Created profile-aura.config.json with default settings!');
    });
}
