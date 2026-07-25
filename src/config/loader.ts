import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { configSchema } from './schema.js';
import { ProfileAuraConfig } from '../types/config.js';
import { DEFAULT_CONFIG_FILENAME, defaultConfigValues } from '../constants/defaults.js';
import { AuraError } from '../types/error.js';
import { Logger } from '../utils/logger.js';

dotenv.config();

export function loadAndValidateConfig(customPath?: string): ProfileAuraConfig {
  const targetPath = customPath ? path.resolve(process.cwd(), customPath) : path.resolve(process.cwd(), DEFAULT_CONFIG_FILENAME);

  let rawUserConfig: any = {};
  if (fs.existsSync(targetPath)) {
    try {
      const content = fs.readFileSync(targetPath, 'utf-8');
      rawUserConfig = JSON.parse(content);
      Logger.info(`Loaded configuration file from ${targetPath}`);
    } catch (err: any) {
      throw new AuraError(`Failed to parse JSON configuration file at ${targetPath}`, 'CONFIG_INVALID', { original: err });
    }
  } else {
    Logger.warn(`No configuration file found at ${targetPath}. Using default framework configuration.`);
  }

  const merged = {
    ...defaultConfigValues,
    ...rawUserConfig,
    github: {
      ...defaultConfigValues.github,
      ...(rawUserConfig.github || {}),
      token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN || rawUserConfig.github?.token
    }
  };

  const validationResult = configSchema.safeParse(merged);
  if (!validationResult.success) {
    const issueMessages = validationResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new AuraError(`Invalid configuration: ${issueMessages}`, 'CONFIG_INVALID', { issues: validationResult.error.issues });
  }

  return validationResult.data as unknown as ProfileAuraConfig;
}
