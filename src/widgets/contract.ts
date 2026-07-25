import { RenderContext } from '../plugins/contract.js';

export interface WidgetRenderOptions {
  [key: string]: any;
}

export interface WidgetDefinition {
  id: string;
  name: string;
  description: string;
  render: (context: RenderContext, options?: WidgetRenderOptions) => Promise<string> | string;
}
