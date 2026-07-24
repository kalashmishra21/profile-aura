#!/usr/bin/env node

/**
 * CLI entry point for README Aura Engine
 */

import 'dotenv/config';
import { Command } from 'commander';
import { initCommand, buildCommand } from './cli/commands.js';
import { readFile } from './utils/helpers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load package.json for version
let version = '1.0.0';
try {
  const packagePath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(await readFile(packagePath));
  version = packageJson.version;
} catch {
  // Use default version if package.json can't be read
}

const program = new Command();

program
  .name('profile-aura')
  .description('🎨 Advanced AI-powered GitHub README generator with animated SVG cards')
  .version(version);

// Init command
program
  .command('init')
  .description('Initialize a new README Aura project')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (options) => {
    await initCommand(options);
  });

// Build command
program
  .command('build')
  .description('Build README from source file')
  .option('-c, --config <path>', 'Path to config file')
  .option('-s, --source <path>', 'Path to source markdown file (default: readme.source.md)')
  .option('-o, --output <path>', 'Path to output README file (default: README.md)')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-d, --dry-run', 'Run without writing files')
  .action(async (options) => {
    await buildCommand(options);
  });

// Default command (build)
program
  .command('generate', { isDefault: false })
  .description('Alias for build command')
  .option('-c, --config <path>', 'Path to config file')
  .option('-s, --source <path>', 'Path to source markdown file')
  .option('-o, --output <path>', 'Path to output README file')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-d, --dry-run', 'Run without writing files')
  .action(async (options) => {
    await buildCommand(options);
  });

// Help text
program.addHelpText('after', `
Examples:
  $ profile-aura init                    # Initialize new project
  $ profile-aura build                   # Build README from readme.source.md
  $ profile-aura build --verbose         # Build with detailed logging
  $ profile-aura build --dry-run         # Preview without writing files
  $ profile-aura build -s custom.md      # Build from custom source file

Environment Variables:
  GITHUB_TOKEN        GitHub Personal Access Token
  GITHUB_USERNAME     Your GitHub username

Documentation: https://github.com/kalashmishra21/profile-aura
`);

// Parse arguments
program.parse();
