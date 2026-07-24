/**
 * Interactive tech stack editor
 */

import inquirer from 'inquirer';
import { readFile, writeFile, fileExists } from '../utils/helpers.js';
import { Logger } from '../utils/logger.js';

const logger = new Logger();

// Popular tech stack options
const TECH_CATEGORIES = {
  'Frontend': [
    'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxtjs', 
    'html5', 'css3', 'sass', 'tailwindcss', 'bootstrap'
  ],
  'Backend': [
    'nodejs', 'express', 'nestjs', 'fastify', 'python', 
    'django', 'flask', 'fastapi', 'php', 'laravel', 'ruby', 
    'rails', 'java', 'spring', 'go', 'rust'
  ],
  'Database': [
    'mongodb', 'postgresql', 'mysql', 'redis', 'sqlite', 
    'dynamodb', 'cassandra', 'elasticsearch'
  ],
  'Cloud & DevOps': [
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 
    'githubactions', 'gitlab', 'terraform', 'ansible'
  ],
  'Mobile': [
    'reactnative', 'flutter', 'swift', 'kotlin', 'ionic'
  ],
  'Languages': [
    'javascript', 'typescript', 'python', 'java', 'go', 
    'rust', 'cpp', 'csharp', 'php', 'ruby'
  ],
  'Tools': [
    'git', 'vscode', 'postman', 'figma', 'webpack', 'vite', 
    'babel', 'eslint', 'prettier', 'jest', 'cypress'
  ],
};

/**
 * Extract tech stack from readme.source.md
 */
async function extractTechStack(): Promise<string[]> {
  try {
    const content = await readFile('readme.source.md');
    const match = content.match(/```tech-stack[^`]*stack="([^"]+)"/);
    if (match) {
      return match[1].split(',').map(s => s.trim());
    }
  } catch {}
  return [];
}

/**
 * Update tech stack in readme.source.md
 */
async function updateTechStack(stack: string[]): Promise<void> {
  const content = await readFile('readme.source.md');
  const stackStr = stack.join(',');
  
  // Replace existing tech-stack block
  const updated = content.replace(
    /```tech-stack([^`]*)stack="[^"]+"/,
    `\`\`\`tech-stack$1stack="${stackStr}"`
  );
  
  await writeFile('readme.source.md', updated);
}

/**
 * Interactive tech stack editor
 */
export async function editCommand(): Promise<void> {
  logger.info('✏️  Tech Stack Editor\n');

  // Check if readme.source.md exists
  if (!await fileExists('readme.source.md')) {
    logger.error('readme.source.md not found!');
    logger.info('Run "profile-aura init" first to create the file.');
    process.exit(1);
  }

  // Extract current tech stack
  const currentStack = await extractTechStack();
  logger.info(`Current tech stack: ${currentStack.length > 0 ? currentStack.join(', ') : 'None'}\n`);

  // Main menu
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '📝 Add from categories', value: 'add' },
        { name: '✏️  Add custom technology', value: 'custom' },
        { name: '🗑️  Remove technologies', value: 'remove' },
        { name: '📋 View current stack', value: 'view' },
        { name: '💾 Save and exit', value: 'save' },
      ],
    },
  ]);

  let stack = [...currentStack];

  if (action === 'view') {
    logger.info('\n📋 Current Tech Stack:\n');
    if (stack.length === 0) {
      logger.warn('No technologies added yet.');
    } else {
      stack.forEach((tech, i) => {
        logger.info(`  ${i + 1}. ${tech}`);
      });
    }
    logger.info('');
    return editCommand(); // Back to menu
  }

  if (action === 'add') {
    // Select category
    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a category:',
        choices: Object.keys(TECH_CATEGORIES),
      },
    ]);

    // Select technologies
    const availableTech = TECH_CATEGORIES[category as keyof typeof TECH_CATEGORIES]
      .filter(tech => !stack.includes(tech));

    if (availableTech.length === 0) {
      logger.warn(`\nAll ${category} technologies are already added!`);
      return editCommand(); // Back to menu
    }

    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: `Select ${category} technologies:`,
        choices: availableTech,
      },
    ]);

    stack.push(...selected);
    logger.success(`\nAdded ${selected.length} technology(ies)!`);
    
    // Continue editing?
    const { continueEdit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueEdit',
        message: 'Continue editing?',
        default: true,
      },
    ]);

    if (continueEdit) {
      return editCommand(); // Back to menu
    }
  }

  if (action === 'custom') {
    const { customTech } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customTech',
        message: 'Enter custom technology names (comma-separated):',
        validate: (input: string) => input.length > 0 || 'Please enter at least one technology',
      },
    ]);

    const newTech = customTech.split(',').map((s: string) => s.trim().toLowerCase());
    stack.push(...newTech);
    logger.success(`\nAdded ${newTech.length} custom technology(ies)!`);

    const { continueEdit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueEdit',
        message: 'Continue editing?',
        default: true,
      },
    ]);

    if (continueEdit) {
      return editCommand(); // Back to menu
    }
  }

  if (action === 'remove') {
    if (stack.length === 0) {
      logger.warn('\nNo technologies to remove!');
      return editCommand(); // Back to menu
    }

    const { toRemove } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'toRemove',
        message: 'Select technologies to remove:',
        choices: stack,
      },
    ]);

    stack = stack.filter(tech => !toRemove.includes(tech));
    logger.success(`\nRemoved ${toRemove.length} technology(ies)!`);

    const { continueEdit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueEdit',
        message: 'Continue editing?',
        default: true,
      },
    ]);

    if (continueEdit) {
      return editCommand(); // Back to menu
    }
  }

  // Save changes
  await updateTechStack(stack);
  logger.success('\n✅ Tech stack updated successfully!');
  logger.info(`\nFinal stack (${stack.length}): ${stack.join(', ')}\n`);
  logger.info('Run "profile-aura build" to generate your updated README.\n');
}
