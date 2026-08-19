import { Command } from 'commander';
import { Logger } from '../../utils/logger.js';
import { loadAndValidateConfig } from '../../config/loader.js';
import fs from 'fs';
import path from 'path';

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Perform environment diagnostics and configuration sanity checks')
    .action(async () => {
      Logger.info('Running Profile Aura System Health Check...\n');
      
      console.log('--- Environment ---');
      console.log(`[✔] Node.js Version: ${process.version}`);
      console.log(`[✔] Operating System: ${process.platform} (${process.arch})`);
      
      console.log('\n--- Configuration ---');
      try {
        const config = loadAndValidateConfig();
        console.log(`[✔] Config File: Valid`);
        console.log(`[✔] Active Theme: ${config.theme}`);
      } catch (err: any) {
        console.log(`[✖] Config File: Error - ${err.message}`);
      }

      console.log('\n--- Integrations ---');
      const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
      console.log(`[${token ? '✔' : '⚠'}] GitHub Token: ${token ? 'Configured (Authenticated limits)' : 'Missing (Subject to 60 req/hr rate limits)'}`);
      
      const wakaToken = process.env.WAKATIME_API_KEY;
      console.log(`[${wakaToken ? '✔' : '⚠'}] WakaTime API: ${wakaToken ? 'Configured' : 'Missing (WakaTime stats will be skipped)'}`);
      
      console.log('\n--- Network & Dependencies ---');
      try {
        const res = await fetch('https://api.github.com/zen');
        if (res.ok) console.log(`[✔] GitHub API: Reachable (${await res.text()})`);
        else console.log(`[✖] GitHub API: Error ${res.status}`);
      } catch(e) {
        console.log(`[✖] GitHub API: Unreachable (Network Error)`);
      }
      
      const fontPath = path.join(process.cwd(), 'assets', 'fonts', 'Inter-Regular.ttf');
      if (fs.existsSync(fontPath)) {
        console.log(`[✔] Satori Fonts: Local Inter font found`);
      } else {
        console.log(`[⚠] Satori Fonts: Missing locally, will fallback to CDN`);
      }

      Logger.success('\nSystem diagnostics complete.');
    });
}
