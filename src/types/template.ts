import { CardStyleVariant, BackgroundStyleVariant } from './theme.js';

export type TemplateLayoutMode = 
  | 'editorial' 
  | 'bento' 
  | 'compact' 
  | 'split' 
  | 'portfolio' 
  | 'dashboard' 
  | 'landing' 
  | 'glass' 
  | 'magazine' 
  | 'developer-card' 
  | 'centered' 
  | 'sidebar' 
  | 'hero-left' 
  | 'hero-right' 
  | 'apple-minimal' 
  | 'cyber-tactical';

export interface TemplateSlot {
  id: string;
  name: string;
  allowedWidgets: string[];
  required?: boolean;
}

export interface TemplateResponsiveRules {
  mobileColumns: number;
  tabletColumns: number;
  desktopColumns: number;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  mode: TemplateLayoutMode;
  slots: TemplateSlot[];
  defaultSectionOrder: string[];
  responsiveRules: TemplateResponsiveRules;
  cardStyle: CardStyleVariant;
  backgroundStyle: BackgroundStyleVariant;
  illustrationPosition?: 'left' | 'right' | 'top' | 'background';
  supportedThemes?: string[];
}
