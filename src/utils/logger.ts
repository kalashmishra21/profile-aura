/**
 * Simple colored logger utility
 */

export class Logger {
  private verbose: boolean;

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  info(message: string, ...args: any[]) {
    console.log(`ℹ️  ${message}`, ...args);
  }

  success(message: string, ...args: any[]) {
    console.log(`✅ ${message}`, ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(`❌ ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(`⚠️  ${message}`, ...args);
  }

  debug(message: string, ...args: any[]) {
    if (this.verbose) {
      console.log(`🔍 ${message}`, ...args);
    }
  }

  step(step: number, total: number, message: string) {
    console.log(`[${step}/${total}] ${message}`);
  }
}

export const logger = new Logger();
