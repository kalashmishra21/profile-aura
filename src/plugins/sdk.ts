import { ProfileAuraPlugin, PluginMetadata, PluginHooks, PluginExecutionContext } from '../types/plugin.js';
import { ProfileAuraConfig } from '../types/config.js';
import { WidgetDefinition } from '../types/widget.js';
import { Logger } from '../utils/logger.js';

export abstract class ProfileAuraPluginBase implements ProfileAuraPlugin {
  public abstract metadata: PluginMetadata;
  public hooks: PluginHooks = {};

  setup(context: PluginExecutionContext): Promise<void> | void {}
  validate(config: ProfileAuraConfig): Promise<boolean> | boolean { return true; }
  render(context: PluginExecutionContext): Promise<string | void> | string | void {}
  cleanup(): Promise<void> | void {}
}

export function definePlugin(plugin: ProfileAuraPlugin): ProfileAuraPlugin {
  Logger.debug(`Defined custom Profile Aura plugin: ${plugin.metadata.name} v${plugin.metadata.version}`);
  return plugin;
}

export function defineWidget(widget: WidgetDefinition): WidgetDefinition {
  Logger.debug(`Defined custom Profile Aura widget: ${widget.name} (${widget.id})`);
  return widget;
}
