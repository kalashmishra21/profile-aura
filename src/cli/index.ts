#!/usr/bin/env node

import { Command } from 'commander';
import { registerBuildCommand } from './commands/build.js';
import { registerInitCommand } from './commands/init.js';
import { registerThemesCommand } from './commands/themes.js';
import { registerPreviewCommand } from './commands/preview.js';
import { registerDoctorCommand } from './commands/doctor.js';
import { registerValidateCommand } from './commands/validate.js';
import { registerTemplatesCommand } from './commands/templates.js';
import { registerPluginsCommand } from './commands/plugins.js';
import { registerCacheCommand } from './commands/cache.js';
import { registerUpdateCommand } from './commands/update.js';
import { registerVersionCommand } from './commands/version.js';
import { registerStudioCommand } from './commands/studio.js';
import { registerAiCommand } from './commands/ai.js';
import { CacheService } from '../services/cache.js';

const program = new Command();
const VERSION = '4.0.2';

program
  .name('profile-aura')
  .description('Profile Aura v2 Framework — Premium Editorial Portfolio Generator for GitHub')
  .version('4.0.2');

registerBuildCommand(program);
registerInitCommand(program);
registerThemesCommand(program);
registerPreviewCommand(program);
registerDoctorCommand(program);
registerValidateCommand(program);
registerTemplatesCommand(program);
registerPluginsCommand(program);
registerCacheCommand(program);
registerUpdateCommand(program);
registerVersionCommand(program);
registerStudioCommand(program);
registerAiCommand(program);

if (process.argv.length === 2) {
  process.argv.push('build');
}

program.parse(process.argv);
