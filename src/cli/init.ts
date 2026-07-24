/**
 * Smart initialization command with auto-detection
 */

import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, fileExists, ensureDir, readFile } from '../utils/helpers.js';
import { Logger } from '../utils/logger.js';
import { DEFAULT_THEME } from '../utils/config.js';
import path from 'path';

const execAsync = promisify(exec);
const logger = new Logger();

interface InitAnswers {
  username: string;
  token: string;
  setupWorkflow: boolean;
  techStack: string;
}

/**
 * Auto-detect GitHub username from git config
 */
async function detectGitHubUsername(): Promise<string | null> {
  try {
    // Try getting GitHub username from git remote
    const { stdout: remoteUrl } = await execAsync('git config --get remote.origin.url');
    const match = remoteUrl.match(/github\.com[:/]([^/]+)/);
    if (match) return match[1];

    // Fallback to git user.name
    const { stdout: userName } = await execAsync('git config --get user.name');
    return userName.trim() || null;
  } catch {
    return null;
  }
}

/**
 * Detect tech stack from package.json
 */
async function detectTechStack(): Promise<string[]> {
  try {
    if (await fileExists('package.json')) {
      const content = await readFile('package.json');
      const pkg = JSON.parse(content);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      
      const techMap: Record<string, string> = {
        'react': 'react',
        'vue': 'vue',
        'angular': 'angular',
        'next': 'nextjs',
        'typescript': 'typescript',
        'javascript': 'javascript',
        'node': 'nodejs',
        'express': 'express',
        'nestjs': 'nestjs',
        'python': 'python',
        'django': 'django',
        'flask': 'flask',
        'docker': 'docker',
        'kubernetes': 'kubernetes',
        'aws': 'aws',
        'mongodb': 'mongodb',
        'postgresql': 'postgresql',
        'mysql': 'mysql',
        'redis': 'redis',
        'graphql': 'graphql',
        'tailwind': 'tailwindcss',
      };

      const detected = new Set<string>();
      Object.keys(deps).forEach(dep => {
        Object.entries(techMap).forEach(([key, value]) => {
          if (dep.toLowerCase().includes(key)) {
            detected.add(value);
          }
        });
      });

      return Array.from(detected);
    }
  } catch {}
  return [];
}

/**
 * Create GitHub Actions workflow file
 */
async function createWorkflow(username: string): Promise<void> {
  const workflowDir = '.github/workflows';
  await ensureDir(workflowDir);

  const workflowContent = `name: Generate README

on:
  push:
    branches: [ main, master ]
  schedule:
    # Run every day at midnight
    - cron: '0 0 * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install Profile Aura
        run: npm install -g profile-aura
        
      - name: Generate README
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          GITHUB_USERNAME: ${username}
        run: profile-aura build
        
      - name: Commit and push if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add README.md .github/assets/generated/
          git diff --quiet && git diff --staged --quiet || (git commit -m "docs: Update README with latest stats [skip ci]" && git push)
`;

  await writeFile(path.join(workflowDir, 'profile-aura.yml'), workflowContent);
  logger.success('Created .github/workflows/profile-aura.yml');
}

/**
 * Create source template with auto-detected tech stack
 */
async function createSourceTemplate(username: string, techStack: string[]): Promise<void> {
  const stackStr = techStack.length > 0 ? techStack.join(',') : 'react,typescript,nodejs,python';
  
  const template = `# Hi, I'm ${username}! 👋

\`\`\`aura width="800" height="250"
# Beautiful animated profile card
\`\`\`

## 💻 Tech Stack

\`\`\`tech-stack width="800" height="300" stack="${stackStr}"
# Technologies I work with
\`\`\`

## 📊 GitHub Statistics

\`\`\`github-stats width="800" height="400"
# My GitHub statistics
\`\`\`

## 📫 Connect with Me

- GitHub: [@${username}](https://github.com/${username})
- Email: your.email@example.com

---

<div align="center">

**Powered by [Profile Aura](https://github.com/kalashmishra21/profile-aura)** ✨

</div>
`;

  await writeFile('readme.source.md', template);
  logger.success('Created readme.source.md');
}

/**
 * Create config file
 */
async function createConfig(username: string): Promise<void> {
  const config = {
    github: {
      username,
    },
    output: {
      readmePath: 'README.md',
      assetsPath: '.github/assets/generated',
    },
    theme: DEFAULT_THEME,
  };

  await writeFile('readme-aura.config.json', JSON.stringify(config, null, 2));
  logger.success('Created readme-aura.config.json');
}

/**
 * Create .gitignore
 */
async function createGitignore(): Promise<void> {
  if (await fileExists('.gitignore')) {
    const content = await readFile('.gitignore');
    if (!content.includes('node_modules')) {
      await writeFile('.gitignore', content + '\nnode_modules/\n.env\n');
    }
  } else {
    await writeFile('.gitignore', 'node_modules/\n.env\n');
  }
  logger.success('Updated .gitignore');
}

/**
 * Main init command
 */
export async function initCommand(_options?: any): Promise<void> {
  logger.info('🚀 Initializing Profile Aura...\n');

  // Check if already initialized
  if (await fileExists('readme-aura.config.json')) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Config file already exists. Overwrite?',
        default: false,
      },
    ]);

    if (!overwrite) {
      logger.info('Initialization cancelled.');
      return;
    }
  }

  // Auto-detect username
  const detectedUsername = await detectGitHubUsername();
  const detectedTech = await detectTechStack();

  logger.info('🔍 Auto-detection:');
  if (detectedUsername) {
    logger.success(`  Username: ${detectedUsername}`);
  }
  if (detectedTech.length > 0) {
    logger.success(`  Tech stack: ${detectedTech.join(', ')}`);
  }
  console.log();

  // Interactive prompts
  const answers = await inquirer.prompt<InitAnswers>([
    {
      type: 'input',
      name: 'username',
      message: 'GitHub username:',
      default: detectedUsername || undefined,
      validate: (input: string) => input.length > 0 || 'Username is required',
    },
    {
      type: 'password',
      name: 'token',
      message: 'GitHub token (optional, press Enter to skip):',
      mask: '*',
    },
    {
      type: 'input',
      name: 'techStack',
      message: 'Tech stack (comma-separated):',
      default: detectedTech.join(',') || 'react,typescript,nodejs',
    },
    {
      type: 'confirm',
      name: 'setupWorkflow',
      message: 'Setup GitHub Actions auto-update workflow?',
      default: true,
    },
  ]);

  // Create files
  logger.info('\n📝 Creating files...\n');

  await createConfig(answers.username);
  await createSourceTemplate(answers.username, answers.techStack.split(',').map(s => s.trim()));
  await createGitignore();

  if (answers.setupWorkflow) {
    await createWorkflow(answers.username);
  }

  // Create .env if token provided
  if (answers.token) {
    await writeFile('.env', `GITHUB_TOKEN=${answers.token}\nGITHUB_USERNAME=${answers.username}\n`);
    logger.success('Created .env file');
  }

  // Success message
  logger.info('\n✅ Profile Aura initialized successfully!\n');
  logger.info('📝 Next steps:\n');
  logger.info('  1. Customize readme.source.md');
  logger.info('  2. Run: npx profile-aura build');
  
  if (answers.setupWorkflow) {
    logger.info('  3. Push to GitHub - Actions will auto-update your README!\n');
  } else {
    logger.info('');
  }

  logger.info('💡 Tip: Your README will auto-update with latest stats!\n');
}
