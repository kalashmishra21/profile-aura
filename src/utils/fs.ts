import fs from 'fs';
import path from 'path';
import { AuraError } from '../types/error.js';

export function ensureDirectoryExists(dirPath: string): void {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err: any) {
    throw new AuraError(`Failed to create directory at ${dirPath}`, 'CLI_ERROR', { originalError: err });
  }
}

export function writeTextFile(filePath: string, content: string): void {
  try {
    const dir = path.dirname(filePath);
    ensureDirectoryExists(dir);
    fs.writeFileSync(filePath, content, 'utf-8');
  } catch (err: any) {
    throw new AuraError(`Failed to write file at ${filePath}`, 'CLI_ERROR', { originalError: err });
  }
}
