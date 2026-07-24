/**
 * CLI command implementations
 */

import { ReadmeBuilder } from '../engine/builder.js';
import { loadConfig, validateConfig } from '../utils/config.js';
import { Logger } from '../utils/logger.js';
import { fileExists } from '../utils/helpers.js';
import type { CLIOptions } from '../types/index.js';

// Import the smart init command
export { initCommand } from './init.js';

const logger = new Logger();

/**
 * Build README from source
 */
export async function buildCommand(options: CLIOptions): Promise<void> {
  const startTime = Date.now();
  
  logger.info('🎨 Building README with Profile Aura...\n');

  try {
    // Load configuration
    const config = await loadConfig(options.config);

    // Validate configuration
    const errors = validateConfig(config);
    if (errors.length > 0) {
      logger.error('Configuration errors:');
      errors.forEach(err => logger.error(`  - ${err}`));
      process.exit(1);
    }

    if (options.verbose) {
      logger.debug(`Loaded config for user: ${config.github.username}`);
    }

    // Determine paths
    const sourcePath = options.source || 'readme.source.md';
    const outputPath = options.output || config.output.readmePath;

    if (!await fileExists(sourcePath)) {
      logger.error(`Source file not found: ${sourcePath}`);
      logger.info('Run "profile-aura init" to create a template.');
      process.exit(1);
    }

    // Build README
    const builder = new ReadmeBuilder(config, options.verbose);
    
    await builder.build({
      sourcePath,
      outputPath,
      config,
      verbose: options.verbose,
      dryRun: options.dryRun,
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.success(`\n✨ Build completed in ${duration}s`);

    if (!options.dryRun) {
      logger.info(`\nYour README has been generated at: ${outputPath}`);
      logger.info('Generated SVG assets are in: .github/assets/generated/');
    }

  } catch (error) {
    logger.error(`\n❌ Build failed: ${error}`);
    if (options.verbose) {
      console.error(error);
    }
    process.exit(1);
  }
}
