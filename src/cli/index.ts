#!/usr/bin/env node

import { Command } from 'commander';
import { registerBuildCommand } from './commands/build.js';
import { registerInitCommand } from './commands/init.js';
import { registerThemesCommand } from './commands/themes.js';
import { registerPreviewCommand } from './commands/preview.js';

const program = new Command();

program
  .name('profile-aura')
  .description('Premium Dark & Editorial GitHub Profile README Generator')
  .version('2.0.0');

registerBuildCommand(program);
registerInitCommand(program);
registerThemesCommand(program);
registerPreviewCommand(program);

// Default to build if no command specified
if (process.argv.length === 2) {
  process.argv.push('build');
}

program.parse(process.argv);
