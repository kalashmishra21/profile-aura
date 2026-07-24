/**
 * Configuration management
 */

import { Config, ThemeConfig } from '../types/index.js';
import { readFile, fileExists } from './helpers.js';
import path from 'path';

export const DEFAULT_THEME: ThemeConfig = {
  mode: 'dark',
  primaryColor: '#8b5cf6',
  secondaryColor: '#3b82f6',
  accentColor: '#06b6d4',
  backgroundColor: '#0f172a',
  textColor: '#f1f5f9',
  borderRadius: 12,
  glowEffect: true,
  animation: true,
};

export const DEFAULT_CONFIG: Config = {
  github: {
    username: '',
    token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
  },
  output: {
    readmePath: 'README.md',
    assetsPath: '.github/assets/generated',
  },
  theme: DEFAULT_THEME,
};

export async function loadConfig(configPath?: string): Promise<Config> {
  const config = { ...DEFAULT_CONFIG };

  // Try to load from config file
  const possiblePaths = [
    configPath,
    'readme-aura.config.json',
    '.readme-aura.json',
    'package.json',
  ].filter(Boolean) as string[];

  for (const filepath of possiblePaths) {
    if (await fileExists(filepath)) {
      try {
        const content = await readFile(filepath);
        const parsed = JSON.parse(content);
        
        // If it's package.json, look for readmeAura key
        const configData = filepath.endsWith('package.json')
          ? parsed.readmeAura || {}
          : parsed;

        // Merge configurations
        Object.assign(config, configData);
        break;
      } catch (error) {
        console.warn(`Failed to parse config from ${filepath}`);
      }
    }
  }

  // Override with environment variables
  if (process.env.GITHUB_USERNAME) {
    config.github.username = process.env.GITHUB_USERNAME;
  }
  if (process.env.GITHUB_TOKEN || process.env.GH_TOKEN) {
    config.github.token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  }

  return config;
}

export function validateConfig(config: Config): string[] {
  const errors: string[] = [];

  if (!config.github.username) {
    errors.push('GitHub username is required');
  }

  return errors;
}
