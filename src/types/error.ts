export type AuraErrorCode = 
  | 'CONFIG_NOT_FOUND'
  | 'CONFIG_INVALID'
  | 'THEME_NOT_FOUND'
  | 'TEMPLATE_NOT_FOUND'
  | 'PLUGIN_ERROR'
  | 'WIDGET_ERROR'
  | 'FETCH_ERROR'
  | 'RENDER_ERROR'
  | 'CACHE_ERROR'
  | 'CLI_ERROR';

export class AuraError extends Error {
  public readonly code: AuraErrorCode;
  public readonly details?: Record<string, any>;

  constructor(message: string, code: AuraErrorCode, details?: Record<string, any>) {
    super(message);
    this.name = 'AuraError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AuraError.prototype);
  }
}
