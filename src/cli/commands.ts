/**
 * CLI command implementations
 */

import { ReadmeBuilder } from '../engine/builder.js';
import { loadConfig, validateConfig, DEFAULT_CONFIG } from '../utils/config.js';
import { Logger } from '../utils/logger.js';
import { writeFile, fileExists } from '../utils/helpers.js';
import type { CLIOptions } from '../types/index.js';

const logger = new Logger();

/**
 * Initialize a new project
 */
export async function initCommand(options: CLIOptions): Promise<void> {
  logger.info('🚀 Initializing Profile Aura project...\n');

  // Create config file
  const configPath = 'readme-aura.config.json';
  
  if (await fileExists(configPath)) {
    logger.warn(`Config file already exists: ${configPath}`);
    logger.info('To reinitialize, delete the existing config file first.');
    return;
  }

  const config = {
    github: {
      username: process.env.GITHUB_USERNAME || 'your-username',
    },
    output: {
      readmePath: 'README.md',
      assetsPath: '.github/assets/generated',
    },
    ai: {
      enabled: false,
      provider: 'openai',
      model: 'gpt-4-turbo-preview',
    },
    theme: DEFAULT_CONFIG.theme,
  };

  await writeFile(configPath, JSON.stringify(config, null, 2));
  logger.success(`Created ${configPath}`);

  // Create example source file
  const sourcePath = 'readme.source.md';
  
  if (!await fileExists(sourcePath)) {
    const exampleSource = `# Hello, I'm [Your Name] 👋

\`\`\`aura width="800" height="250"
# This will render a beautiful profile card with your GitHub stats
\`\`\`

## 📊 GitHub Statistics

\`\`\`github-stats width="800" height="400"
# Displays your comprehensive GitHub statistics
\`\`\`

## 🔥 Contribution Streak

\`\`\`streak width="500" height="300"
# Shows your current and longest contribution streak
\`\`\`

## 💻 Tech Stack

\`\`\`tech-stack width="800" height="300" stack="react,typescript,nodejs,python,docker,aws"
# Renders your tech stack with beautiful icons
\`\`\`

## 📈 Most Used Languages

\`\`\`languages width="600" height="400"
# Displays a breakdown of your most used programming languages
\`\`\`

## ⚡ Recent Activity

\`\`\`activity width="800" height="400"
# Shows your latest repository updates
\`\`\`

## 📫 How to reach me

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
`;

    await writeFile(sourcePath, exampleSource);
    logger.success(`Created ${sourcePath}`);
  }

  // Create .env template
  const envPath = '.env.example';
  
  if (!await fileExists(envPath)) {
    const envContent = `# GitHub Personal Access Token
GITHUB_TOKEN=your_github_token_here

# GitHub Username (required)
GITHUB_USERNAME=your-username

# OpenAI API Key (optional, for AI features)
OPENAI_API_KEY=your_openai_key_here
`;

    await writeFile(envPath, envContent);
    logger.success(`Created ${envPath}`);
  }

  logger.info('\n✅ Project initialized successfully!\n');
  logger.info('Next steps:');
  logger.info('  1. Update readme-aura.config.json with your GitHub username');
  logger.info('  2. Copy .env.example to .env and add your GitHub token');
  logger.info('  3. Edit readme.source.md to customize your README');
  logger.info('  4. Run: npm run generate');
}

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
      logger.debug(`AI features: ${config.ai?.enabled ? 'enabled' : 'disabled'}`);
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
