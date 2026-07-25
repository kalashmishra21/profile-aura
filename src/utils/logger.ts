export interface LoggerOptions {
  verbose?: boolean;
}

export class Logger {
  private static verboseMode = false;

  static setVerbose(enable: boolean): void {
    this.verboseMode = enable;
  }

  static info(msg: string): void {
    console.log(`\x1b[36m[PROFILE-AURA INFO]\x1b[0m ${msg}`);
  }

  static success(msg: string): void {
    console.log(`\x1b[32m[PROFILE-AURA SUCCESS]\x1b[0m ${msg}`);
  }

  static warn(msg: string): void {
    console.warn(`\x1b[33m[PROFILE-AURA WARN]\x1b[0m ${msg}`);
  }

  static error(msg: string, details?: any): void {
    console.error(`\x1b[31m[PROFILE-AURA ERROR]\x1b[0m ${msg}`);
    if (details && this.verboseMode) {
      console.error(details);
    }
  }

  static debug(msg: string): void {
    if (this.verboseMode) {
      console.log(`\x1b[90m[PROFILE-AURA DEBUG]\x1b[0m ${msg}`);
    }
  }
}
