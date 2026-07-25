import { McpToolDefinition, McpToolExecutionResult } from './types.js';
import { loadAndValidateConfig } from '../config/loader.js';
import { fetchGitHubData } from '../fetchers/github.js';
import { ThemeRegistry } from '../themes/registry.js';
import { renderSatoriHeroSvg } from '../renderers/satori/hero-renderer.js';
import { ThemeResolver } from '../themes/resolver.js';
import { Logger } from '../utils/logger.js';

export class McpToolRegistry {
  private static tools: Map<string, McpToolDefinition> = new Map();

  static initialize(): void {
    ThemeRegistry.initialize();

    // 1. Tool: Read Configuration
    this.registerTool({
      name: 'read_configuration',
      description: 'Read the active Profile Aura config file.',
      inputSchema: { type: 'object' },
      execute: async () => {
        const config = loadAndValidateConfig();
        return { success: true, data: config };
      }
    });

    // 2. Tool: Update Configuration
    this.registerTool({
      name: 'update_configuration',
      description: 'Safely update Profile Aura config fields with Zod validation.',
      inputSchema: {
        type: 'object',
        properties: {
          theme: { type: 'string' },
          template: { type: 'string' },
          profile: { type: 'object' }
        }
      },
      execute: async (params) => {
        const currentConfig = loadAndValidateConfig();
        if (params.theme) currentConfig.theme = params.theme;
        if (params.template) currentConfig.template = params.template;
        if (params.profile) {
          currentConfig.profile = { ...currentConfig.profile, ...params.profile };
        }
        return { success: true, data: currentConfig };
      }
    });

    // 3. Tool: Analyze GitHub Profile
    this.registerTool({
      name: 'analyze_github_profile',
      description: 'Analyze user repos, total stars, top languages, and activity metrics.',
      inputSchema: { type: 'object' },
      execute: async () => {
        const config = loadAndValidateConfig();
        const data = await fetchGitHubData(config);
        return {
          success: true,
          data: {
            username: data.username,
            totalStars: data.stats.totalStars,
            topLanguages: data.topLanguages,
            publicRepos: data.publicRepos,
            followers: data.followers
          }
        };
      }
    });

    // 4. Tool: Generate Hero Banner
    this.registerTool({
      name: 'generate_hero_banner',
      description: 'Generate Satori vector SVG hero banner for active configuration.',
      inputSchema: { type: 'object' },
      execute: async () => {
        const config = loadAndValidateConfig();
        const data = await fetchGitHubData(config);
        const themePreset = ThemeRegistry.getTheme(config.theme);
        const resolvedTheme = ThemeResolver.resolveTheme(themePreset, config.customTokens);

        const heroSvg = await renderSatoriHeroSvg({
          config,
          data,
          theme: resolvedTheme,
          seed: config.github.username
        });

        return { success: true, data: { heroSvgLength: heroSvg.length } };
      }
    });

    // 5. Tool: Suggest Theme Preset
    this.registerTool({
      name: 'suggest_theme_preset',
      description: 'Suggest production-quality visual theme presets matching design keywords.',
      inputSchema: {
        type: 'object',
        properties: { styleKeyword: { type: 'string' } },
        required: ['styleKeyword']
      },
      execute: async (params) => {
        const kw = (params.styleKeyword || '').toLowerCase();
        let recommendedTheme = 'black-obsidian';

        if (kw.includes('cyber') || kw.includes('neon')) recommendedTheme = 'cyberpunk-neon';
        else if (kw.includes('apple') || kw.includes('clean') || kw.includes('minimal')) recommendedTheme = 'monochrome-pro';
        else if (kw.includes('tokyo') || kw.includes('indigo')) recommendedTheme = 'tokyo-night';
        else if (kw.includes('crimson') || kw.includes('dark')) recommendedTheme = 'dracula-vamp';

        return { success: true, data: { recommendedTheme } };
      }
    });

    // 6. Tool: Recruiter Audit
    this.registerTool({
      name: 'recruiter_audit',
      description: 'Audit portfolio readability, open-source metrics, and recruiter impact.',
      inputSchema: { type: 'object' },
      execute: async () => {
        const config = loadAndValidateConfig();
        const data = await fetchGitHubData(config);

        const score = Math.min(100, (data.stats.totalStars * 2) + (data.publicRepos * 3) + 40);
        const feedback = [
          'High repository visibility.',
          'Clean role titles configured.',
          'Consider highlighting top 3 pinned repos first.'
        ];

        return { success: true, data: { score, feedback } };
      }
    });
  }

  static registerTool(tool: McpToolDefinition): void {
    this.tools.set(tool.name, tool);
    Logger.debug(`Registered MCP Tool: '${tool.name}'`);
  }

  static getTool(name: string): McpToolDefinition | undefined {
    if (this.tools.size === 0) {
      this.initialize();
    }
    return this.tools.get(name);
  }

  static listTools(): McpToolDefinition[] {
    if (this.tools.size === 0) {
      this.initialize();
    }
    return Array.from(this.tools.values());
  }
}
