import { ProfileAuraConfig } from '../types/config.js';

export type StudioTab = 'project' | 'hero' | 'themes' | 'templates' | 'widgets' | 'settings' | 'export';
export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface StudioState {
  config: ProfileAuraConfig;
  activeTab: StudioTab;
  viewportMode: ViewportMode;
  zoomLevel: number;
  showGrid: boolean;
  isDirty: boolean;
}

export interface StudioHistoryStack {
  past: ProfileAuraConfig[];
  present: ProfileAuraConfig;
  future: ProfileAuraConfig[];
}
