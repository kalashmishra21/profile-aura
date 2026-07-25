/**
 * Configuration management
 */

import { Config, ThemeConfig } from '../types/index.js';
import { readFile, fileExists } from './helpers.js';
import path from 'path';

/**
 * Generate a unique theme based on username
 * Each user gets a different color scheme automatically
 */
export function generateUserTheme(username: string): ThemeConfig {
  // Create hash from username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Ensure positive number
  hash = Math.abs(hash);
  
  // Define theme variations
  const themes = [
    // Purple Dreams
    {
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      accentColor: '#f093fb',
      name: 'Purple Dreams'
    },
    // Ocean Blue
    {
      primaryColor: '#4facfe',
      secondaryColor: '#00f2fe',
      accentColor: '#43e97b',
      name: 'Ocean Blue'
    },
    // Sunset Orange
    {
      primaryColor: '#fa709a',
      secondaryColor: '#fee140',
      accentColor: '#30cfd0',
      name: 'Sunset Orange'
    },
    // Neon Green
    {
      primaryColor: '#a8edea',
      secondaryColor: '#fed6e3',
      accentColor: '#ff6b6b',
      name: 'Neon Green'
    },
    // Cyberpunk
    {
      primaryColor: '#ff0080',
      secondaryColor: '#7928ca',
      accentColor: '#ff4d4d',
      name: 'Cyberpunk'
    },
    // Forest Theme
    {
      primaryColor: '#56ab2f',
      secondaryColor: '#a8e6cf',
      accentColor: '#88d8b0',
      name: 'Forest'
    },
    // Royal Blue
    {
      primaryColor: '#2196f3',
      secondaryColor: '#21cbf3',
      accentColor: '#ffc107',
      name: 'Royal Blue'
    },
    // Fire Red
    {
      primaryColor: '#ff416c',
      secondaryColor: '#ff4b2b',
      accentColor: '#ffcc70',
      name: 'Fire Red'
    },
    // Galaxy Purple
    {
      primaryColor: '#8e2de2',
      secondaryColor: '#4a00e0',
      accentColor: '#ff6ec7',
      name: 'Galaxy Purple'
    },
    // Mint Fresh
    {
      primaryColor: '#00b4db',
      secondaryColor: '#0083b0',
      accentColor: '#00e676',
      name: 'Mint Fresh'
    }
  ];
  
  // Select theme based on username hash
  const selectedTheme = themes[hash % themes.length];
  
  return {
    mode: 'dark',
    primaryColor: selectedTheme.primaryColor,
    secondaryColor: selectedTheme.secondaryColor,
    accentColor: selectedTheme.accentColor,
    backgroundColor: '#0d1117', // GitHub dark background
    textColor: '#c9d1d9',       // GitHub text color
    borderRadius: 15,
    glowEffect: true,
    animation: true,
  };
}

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
  profile: {
    roles: [],
  },
  output: {
    readmePath: 'README.md',
    assetsPath: '.github/assets/generated',
  },
  theme: DEFAULT_THEME,
};

export async function loadConfig(configPath?: string): Promise<Config> {
  const config = { ...DEFAULT_CONFIG };
  let foundCustomTheme = false;

  // Try to load from config file
  const possiblePaths = [
    configPath,
    'profile-aura.config.json',
    '.profile-aura.json',
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
        
        // Check if custom theme was provided
        if (configData.theme) {
          foundCustomTheme = true;
        }
        
        break;
      } catch (error) {
        console.warn(`Failed to parse config from ${filepath}`);
      }
    }
  }

  // Use dynamic theme based on username if no custom theme in config
  if (!foundCustomTheme && config.github?.username) {
    config.theme = generateUserTheme(config.github.username);
    console.log(`🎨 Generated unique theme for ${config.github.username}: ${(config.theme as any).name || 'Custom'}`);
  } else if (!config.theme) {
    config.theme = DEFAULT_THEME;
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
