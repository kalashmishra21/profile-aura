export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIChatOptions {
  messages: AIChatMessage[];
  temperature?: number;
}

export interface AIChatResponse {
  message: string;
  toolCalls?: { toolName: string; params: any }[];
}

export interface AIProvider {
  id: string;
  name: string;
  chat: (options: AIChatOptions) => Promise<AIChatResponse>;
}

export class FallbackAiProvider implements AIProvider {
  id = 'fallback';
  name = 'Built-in Profile Aura AI Engine';

  async chat(options: AIChatOptions): Promise<AIChatResponse> {
    const lastUserMsg = options.messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || '';

    let recommendedTheme = 'black-obsidian';
    let explanation = 'Analyzed prompt. Suggesting Black Obsidian (Vercel Style) theme for maximum contrast.';

    if (lastUserMsg.includes('cyber') || lastUserMsg.includes('neon')) {
      recommendedTheme = 'cyberpunk-neon';
      explanation = 'Detected cyberpunk preference. Switching to Cyberpunk 2099 high-voltage neon cyan/magenta palette.';
    } else if (lastUserMsg.includes('tokyo')) {
      recommendedTheme = 'tokyo-night';
      explanation = 'Detected Tokyo Night request. Applying deep indigo and soft lavender accents.';
    } else if (lastUserMsg.includes('minimal') || lastUserMsg.includes('apple')) {
      recommendedTheme = 'monochrome-pro';
      explanation = 'Detected minimal request. Applying Apple-inspired stark monochrome magazine palette.';
    }

    return {
      message: explanation,
      toolCalls: [
        {
          toolName: 'suggest_theme_preset',
          params: { styleKeyword: lastUserMsg }
        },
        {
          toolName: 'update_configuration',
          params: { theme: recommendedTheme }
        }
      ]
    };
  }
}
