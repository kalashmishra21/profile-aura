import { AIProvider, FallbackAiProvider } from './provider.js';
import { McpToolRegistry } from '../mcp/registry.js';
import { Logger } from '../utils/logger.js';

export class ProfileAuraAiAssistant {
  private provider: AIProvider;

  constructor(provider?: AIProvider) {
    this.provider = provider || new FallbackAiProvider();
    McpToolRegistry.initialize();
  }

  async processRequest(userPrompt: string): Promise<{ explanation: string; results: any[] }> {
    Logger.info(`AI Design Assistant processing request: "${userPrompt}"...`);

    const chatResponse = await this.provider.chat({
      messages: [
        { role: 'system', content: 'You are the Principal AI Design Assistant for Profile Aura v2.' },
        { role: 'user', content: userPrompt }
      ]
    });

    const executionResults: any[] = [];

    if (chatResponse.toolCalls && chatResponse.toolCalls.length > 0) {
      for (const call of chatResponse.toolCalls) {
        const tool = McpToolRegistry.getTool(call.toolName);
        if (tool) {
          Logger.info(`AI invoking MCP Tool: '${call.toolName}'...`);
          const res = await tool.execute(call.params);
          executionResults.push({ toolName: call.toolName, result: res });
        } else {
          Logger.warn(`MCP Tool '${call.toolName}' not found in registry.`);
        }
      }
    }

    return {
      explanation: chatResponse.message,
      results: executionResults
    };
  }
}
