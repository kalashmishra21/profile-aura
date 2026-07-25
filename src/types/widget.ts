import { PluginExecutionContext } from './plugin.js';

export interface WidgetRenderOptions {
  enabled?: boolean;
  title?: string;
  [key: string]: any;
}

export interface WidgetDefinition {
  id: string;
  name: string;
  description: string;
  category: 'hero' | 'stats' | 'stack' | 'projects' | 'socials' | 'custom';
  render: (context: PluginExecutionContext, options?: WidgetRenderOptions) => Promise<string> | string;
}
