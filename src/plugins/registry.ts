import { ProfileAuraPlugin, RenderContext, RenderResult } from './contract.js';
import { ProfileAuraConfig } from '../configuration/types.js';
import { AggregatedProfileData } from '../fetchers/types.js';
import { logger } from '../utilities/logger.js';

export class PluginRegistry {
  private static plugins: ProfileAuraPlugin[] = [];

  static register(plugin: ProfileAuraPlugin): void {
    this.plugins.push(plugin);
    logger.info(`Registered plugin: ${plugin.name} v${plugin.version}`);
  }

  static getPlugins(): ProfileAuraPlugin[] {
    return this.plugins;
  }

  static async runOnConfigResolved(config: ProfileAuraConfig): Promise<ProfileAuraConfig> {
    let currentConfig = { ...config };
    for (const plugin of this.plugins) {
      if (plugin.hooks.onConfigResolved) {
        try {
          currentConfig = await plugin.hooks.onConfigResolved(currentConfig);
        } catch (err: any) {
          logger.error(`Plugin ${plugin.id} error on config resolved: ${err.message}`);
        }
      }
    }
    return currentConfig;
  }

  static async runOnDataFetched(data: AggregatedProfileData): Promise<AggregatedProfileData> {
    let currentData = { ...data };
    for (const plugin of this.plugins) {
      if (plugin.hooks.onDataFetched) {
        try {
          currentData = await plugin.hooks.onDataFetched(currentData);
        } catch (err: any) {
          logger.error(`Plugin ${plugin.id} error on data fetched: ${err.message}`);
        }
      }
    }
    return currentData;
  }

  static async runOnBeforeRender(context: RenderContext): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.hooks.onBeforeRender) {
        try {
          await plugin.hooks.onBeforeRender(context);
        } catch (err: any) {
          logger.error(`Plugin ${plugin.id} error on before render: ${err.message}`);
        }
      }
    }
  }

  static async runOnAfterRender(result: RenderResult): Promise<RenderResult> {
    let currentResult = { ...result };
    for (const plugin of this.plugins) {
      if (plugin.hooks.onAfterRender) {
        try {
          currentResult = await plugin.hooks.onAfterRender(currentResult);
        } catch (err: any) {
          logger.error(`Plugin ${plugin.id} error on after render: ${err.message}`);
        }
      }
    }
    return currentResult;
  }
}
