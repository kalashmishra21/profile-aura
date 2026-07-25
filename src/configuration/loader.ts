import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { ProfileAuraConfig } from '../types/config.js';
import { defaultConfig } from './defaults.js';
import { Logger } from '../utils/logger.js';

dotenv.config();

export function loadConfig(configPath?: string): ProfileAuraConfig {
  const targetPath = configPath || path.join(process.cwd(), 'profile-aura.config.json');
  
  let userConfig: Partial<ProfileAuraConfig> = {};
  
  if (fs.existsSync(targetPath)) {
    try {
      const fileContent = fs.readFileSync(targetPath, 'utf-8');
      userConfig = JSON.parse(fileContent);
      Logger.info(`Loaded configuration from ${targetPath}`);
    } catch (err: any) {
      Logger.warn(`Failed to parse ${targetPath}: ${err.message}. Falling back to default settings.`);
    }
  } else {
    Logger.info(`No config file found at ${targetPath}. Using default configuration.`);
  }

  const mergedConfig: ProfileAuraConfig = {
    ...defaultConfig,
    ...userConfig,
    github: {
      ...defaultConfig.github,
      ...(userConfig.github || {}),
      token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN || userConfig.github?.token
    },
    profile: {
      ...defaultConfig.profile,
      ...(userConfig.profile || {}),
      socials: {
        ...defaultConfig.profile.socials,
        ...(userConfig.profile?.socials || {})
      }
    },
    sections: {
      ...defaultConfig.sections,
      ...(userConfig.sections || {})
    },
    output: {
      ...defaultConfig.output,
      ...(userConfig.output || {})
    }
  };

  return mergedConfig;
}
