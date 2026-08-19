import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { defaultConfigValues } from '../../config/defaults.js';
import { Logger } from '../../utils/logger.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new profile-aura.config.json and GitHub Actions workflow')
    .action(() => {
      const configPath = path.join(process.cwd(), 'profile-aura.config.json');
      let createdConfig = false;

      if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfigValues, null, 2), 'utf-8');
        Logger.info('Created profile-aura.config.json with default settings!');
        createdConfig = true;
      } else {
        Logger.warn('profile-aura.config.json already exists in current directory.');
      }

      // Scaffold GitHub Actions workflow
      const workflowDir = path.join(process.cwd(), '.github', 'workflows');
      const workflowPath = path.join(workflowDir, 'profile-aura.yml');
      let createdWorkflow = false;

      if (!fs.existsSync(workflowPath)) {
        fs.mkdirSync(workflowDir, { recursive: true });
        
        const workflowContent = `name: Generate Profile Aura

on:
  schedule:
    - cron: "0 */12 * * *" # Runs every 12 hours
  workflow_dispatch:
  push:
    branches:
      - main
      - master
    paths:
      - profile-aura.config.json

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Generate Profile Aura
        run: npx --yes profile-aura@latest build
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          WORKFLOW_TOKEN: \${{ secrets.WORKFLOW_TOKEN }}
          GH_TOKEN: \${{ secrets.GH_TOKEN }}

      - name: Generate Snake Animation
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            .github/assets/generated/snake.svg?color_snake=#A855F7&color_dots=#16192B,#2E3553,#5B21B6,#7C3AED,#A855F7
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Wrap Snake Game in Profile Aura Theme
        run: npx --yes profile-aura@latest wrap-snake .github/assets/generated/snake.svg

      - name: Commit & Push Changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add .
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore: auto-update profile aura and snake graph" && git push)
`;
        fs.writeFileSync(workflowPath, workflowContent, 'utf-8');
        Logger.info('Created .github/workflows/profile-aura.yml workflow!');
        createdWorkflow = true;
      } else {
        Logger.warn('.github/workflows/profile-aura.yml already exists.');
      }

      if (createdConfig || createdWorkflow) {
        Logger.info('Initialization complete. You can now run `npx profile-aura build`.');
      }
    });
}
