import { Command } from 'commander';
import { ProfileAuraAiAssistant } from '../../ai/assistant.js';
import { Logger } from '../../utils/logger.js';

export function registerAiCommand(program: Command): void {
  program
    .command('ai')
    .description('Run AI-powered design assistant for profile optimization')
    .requiredOption('-p, --prompt <text>', 'Natural language design prompt')
    .action(async (options) => {
      const assistant = new ProfileAuraAiAssistant();
      const output = await assistant.processRequest(options.prompt);

      console.log('\n🤖 \x1b[1m\x1b[35mProfile Aura AI Design Assistant:\x1b[0m\n');
      console.log(`\x1b[36m${output.explanation}\x1b[0m\n`);

      output.results.forEach((r, i) => {
        console.log(` \x1b[32m[Tool ${i + 1}]\x1b[0m Executed '${r.toolName}':`, JSON.stringify(r.result.data, null, 2));
      });
      console.log();
    });
}
