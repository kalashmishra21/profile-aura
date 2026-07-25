import { TemplateDefinition } from '../../types/template.js';

const defaultResponsiveRules = {
  mobileColumns: 1,
  tabletColumns: 2,
  desktopColumns: 3
};

export const editorialHeroTemplate: TemplateDefinition = {
  id: 'editorial-hero',
  name: 'Editorial Magazine Hero',
  description: 'Full-width Satori magazine character card top, followed by structured dashboard sections.',
  mode: 'editorial',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  illustrationPosition: 'right',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'streak', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'hero-header', name: 'Magazine Hero Header', allowedWidgets: ['hero-banner'], required: true },
    { id: 'metrics-row', name: 'Metrics Overview', allowedWidgets: ['github-stats', 'streak-counter'] },
    { id: 'tech-grid', name: 'Technology Matrix', allowedWidgets: ['tech-stack'] },
    { id: 'repos-grid', name: 'Featured Repositories', allowedWidgets: ['top-repositories'] },
    { id: 'footer-socials', name: 'Social Links', allowedWidgets: ['social-links'] }
  ]
};

export const bentoGridTemplate: TemplateDefinition = {
  id: 'bento-grid',
  name: 'Modern Bento Box Grid',
  description: 'Multi-column Bento grid arranging metrics, repos, and stack in sleek cards.',
  mode: 'bento',
  cardStyle: 'glass',
  backgroundStyle: 'aurora',
  illustrationPosition: 'top',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'techStack', 'stats', 'topRepositories', 'streak', 'socials'],
  slots: [
    { id: 'bento-main', name: 'Bento Main Slot', allowedWidgets: ['hero-banner', 'github-stats'], required: true },
    { id: 'bento-side', name: 'Bento Side Slot', allowedWidgets: ['tech-stack', 'streak-counter'] },
    { id: 'bento-footer', name: 'Bento Footer Slot', allowedWidgets: ['top-repositories', 'social-links'] }
  ]
};

export const minimalistCompactTemplate: TemplateDefinition = {
  id: 'minimalist-compact',
  name: 'Minimalist Compact Executive',
  description: 'High-density, low-whitespace executive card layout for fast scanning.',
  mode: 'compact',
  cardStyle: 'minimal',
  backgroundStyle: 'solid',
  responsiveRules: { mobileColumns: 1, tabletColumns: 1, desktopColumns: 2 },
  defaultSectionOrder: ['hero', 'stats', 'topRepositories', 'socials'],
  slots: [
    { id: 'compact-hero', name: 'Compact Banner', allowedWidgets: ['hero-banner'], required: true },
    { id: 'compact-body', name: 'Compact Stats & Projects', allowedWidgets: ['github-stats', 'top-repositories', 'social-links'] }
  ]
};

export const portfolioShowcaseTemplate: TemplateDefinition = {
  id: 'portfolio-showcase',
  name: 'Portfolio Showcase',
  description: 'Highlighting pinned projects and open source contributions first.',
  mode: 'portfolio',
  cardStyle: 'elevated',
  backgroundStyle: 'mesh',
  illustrationPosition: 'right',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'topRepositories', 'techStack', 'stats', 'socials'],
  slots: [
    { id: 'showcase-hero', name: 'Showcase Hero', allowedWidgets: ['hero-banner'], required: true },
    { id: 'showcase-projects', name: 'Project Grid', allowedWidgets: ['top-repositories'] },
    { id: 'showcase-skills', name: 'Skills & Metrics', allowedWidgets: ['tech-stack', 'github-stats', 'social-links'] }
  ]
};

export const dashboardMetricsTemplate: TemplateDefinition = {
  id: 'dashboard-metrics',
  name: 'Dashboard Analytics View',
  description: 'Data-dense analytical dashboard emphasizing stats, commit activity, and language charts.',
  mode: 'dashboard',
  cardStyle: 'outlined',
  backgroundStyle: 'grid',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'streak', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'dash-hero', name: 'Analytics Header', allowedWidgets: ['hero-banner'] },
    { id: 'dash-metrics', name: 'Key Metrics', allowedWidgets: ['github-stats', 'streak-counter'] },
    { id: 'dash-repos', name: 'Repo Metrics', allowedWidgets: ['top-repositories', 'tech-stack', 'social-links'] }
  ]
};

export const landingPageTemplate: TemplateDefinition = {
  id: 'landing-page',
  name: 'Product Landing Page',
  description: 'Styled like a SaaS marketing landing page with large hero typography and call-to-action social buttons.',
  mode: 'landing',
  cardStyle: 'glass',
  backgroundStyle: 'aurora',
  illustrationPosition: 'top',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'topRepositories', 'techStack', 'socials'],
  slots: [
    { id: 'landing-hero', name: 'Hero Callout', allowedWidgets: ['hero-banner'] },
    { id: 'landing-features', name: 'Feature Highlights', allowedWidgets: ['github-stats', 'top-repositories'] },
    { id: 'landing-cta', name: 'Call To Action', allowedWidgets: ['social-links'] }
  ]
};

export const glassmorphicCardTemplate: TemplateDefinition = {
  id: 'glassmorphic-card',
  name: 'Glassmorphic Floating Cards',
  description: 'Translucent frosted glass cards floating on ambient gradient background waves.',
  mode: 'glass',
  cardStyle: 'glass',
  backgroundStyle: 'aurora',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'techStack', 'stats', 'topRepositories', 'socials'],
  slots: [
    { id: 'glass-hero', name: 'Glass Hero', allowedWidgets: ['hero-banner'] },
    { id: 'glass-content', name: 'Glass Content Cards', allowedWidgets: ['tech-stack', 'github-stats', 'top-repositories', 'social-links'] }
  ]
};

export const magazineCoverTemplate: TemplateDefinition = {
  id: 'magazine-cover',
  name: 'Full-Width Magazine Cover',
  description: 'Editorial magazine cover layout with high-impact typography and vertical metadata sidebars.',
  mode: 'magazine',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  illustrationPosition: 'right',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'mag-cover', name: 'Magazine Cover', allowedWidgets: ['hero-banner'] },
    { id: 'mag-article', name: 'Article Sections', allowedWidgets: ['github-stats', 'tech-stack', 'top-repositories', 'social-links'] }
  ]
};

export const developerCardTemplate: TemplateDefinition = {
  id: 'developer-card',
  name: 'Developer ID Badge',
  description: 'Styled like a cyber security pass card with clear metadata tags and language pills.',
  mode: 'developer-card',
  cardStyle: 'outlined',
  backgroundStyle: 'grid',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'techStack', 'stats', 'socials'],
  slots: [
    { id: 'dev-badge', name: 'ID Badge Banner', allowedWidgets: ['hero-banner'] },
    { id: 'dev-meta', name: 'Metadata & Stack', allowedWidgets: ['tech-stack', 'github-stats', 'social-links'] }
  ]
};

export const splitColumnTemplate: TemplateDefinition = {
  id: 'split-column',
  name: '50/50 Balanced Split',
  description: 'Dual-column layout dividing profile bio & stack on the left with metrics & projects on the right.',
  mode: 'split',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  responsiveRules: { mobileColumns: 1, tabletColumns: 2, desktopColumns: 2 },
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'split-left', name: 'Left Column', allowedWidgets: ['hero-banner', 'tech-stack', 'social-links'] },
    { id: 'split-right', name: 'Right Column', allowedWidgets: ['github-stats', 'top-repositories'] }
  ]
};

export const centeredHeroTemplate: TemplateDefinition = {
  id: 'centered-hero',
  name: 'Centered Hero Focus',
  description: 'Symmetric centered presentation focusing attention directly on avatar and name banner.',
  mode: 'centered',
  cardStyle: 'minimal',
  backgroundStyle: 'dots',
  illustrationPosition: 'top',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'topRepositories', 'techStack', 'socials'],
  slots: [
    { id: 'center-hero', name: 'Centered Banner', allowedWidgets: ['hero-banner'] },
    { id: 'center-body', name: 'Centered Metrics', allowedWidgets: ['github-stats', 'top-repositories', 'social-links'] }
  ]
};

export const sidebarLayoutTemplate: TemplateDefinition = {
  id: 'sidebar-layout',
  name: 'Sidebar Metadata Layout',
  description: 'Persistent left metadata sidebar containing avatar & social links with main content area.',
  mode: 'sidebar',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  illustrationPosition: 'left',
  responsiveRules: { mobileColumns: 1, tabletColumns: 2, desktopColumns: 3 },
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'side-nav', name: 'Sidebar Slot', allowedWidgets: ['hero-banner', 'social-links'] },
    { id: 'side-main', name: 'Main Content Slot', allowedWidgets: ['github-stats', 'tech-stack', 'top-repositories'] }
  ]
};

export const heroLeftTemplate: TemplateDefinition = {
  id: 'hero-left',
  name: 'Hero Left Banner',
  description: 'Hero section with character illustration fixed on the left and typography on the right.',
  mode: 'hero-left',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  illustrationPosition: 'left',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'hero-left-slot', name: 'Hero Left Slot', allowedWidgets: ['hero-banner'] },
    { id: 'hero-left-body', name: 'Body Sections', allowedWidgets: ['github-stats', 'top-repositories', 'social-links'] }
  ]
};

export const heroRightTemplate: TemplateDefinition = {
  id: 'hero-right',
  name: 'Hero Right Banner',
  description: 'Hero section with typography on the left and character card avatar on the right.',
  mode: 'hero-right',
  cardStyle: 'solid',
  backgroundStyle: 'solid',
  illustrationPosition: 'right',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'hero-right-slot', name: 'Hero Right Slot', allowedWidgets: ['hero-banner'] },
    { id: 'hero-right-body', name: 'Body Sections', allowedWidgets: ['github-stats', 'top-repositories', 'social-links'] }
  ]
};

export const appleMinimalTemplate: TemplateDefinition = {
  id: 'apple-minimal',
  name: 'Apple Sleek Minimal',
  description: 'Ultra-refined whitespace, large clean typography, and subtle border radius inspired by Apple design.',
  mode: 'apple-minimal',
  cardStyle: 'minimal',
  backgroundStyle: 'solid',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'apple-hero', name: 'Apple Title Banner', allowedWidgets: ['hero-banner'] },
    { id: 'apple-content', name: 'Apple Content Cards', allowedWidgets: ['github-stats', 'tech-stack', 'top-repositories', 'social-links'] }
  ]
};

export const cyberTacticalTemplate: TemplateDefinition = {
  id: 'cyber-tactical',
  name: 'Cyber Tactical Grid',
  description: 'Cyberpunk HUD presentation with tactical grid lines and high-contrast status cards.',
  mode: 'cyber-tactical',
  cardStyle: 'outlined',
  backgroundStyle: 'grid',
  responsiveRules: defaultResponsiveRules,
  defaultSectionOrder: ['hero', 'stats', 'techStack', 'topRepositories', 'socials'],
  slots: [
    { id: 'cyber-hud', name: 'Tactical HUD Header', allowedWidgets: ['hero-banner'] },
    { id: 'cyber-grid', name: 'HUD Data Grid', allowedWidgets: ['github-stats', 'tech-stack', 'top-repositories', 'social-links'] }
  ]
};

export const productionTemplates: Record<string, TemplateDefinition> = {
  'editorial-hero': editorialHeroTemplate,
  'bento-grid': bentoGridTemplate,
  'minimalist-compact': minimalistCompactTemplate,
  'portfolio-showcase': portfolioShowcaseTemplate,
  'dashboard-metrics': dashboardMetricsTemplate,
  'landing-page': landingPageTemplate,
  'glassmorphic-card': glassmorphicCardTemplate,
  'magazine-cover': magazineCoverTemplate,
  'developer-card': developerCardTemplate,
  'split-column': splitColumnTemplate,
  'centered-hero': centeredHeroTemplate,
  'sidebar-layout': sidebarLayoutTemplate,
  'hero-left': heroLeftTemplate,
  'hero-right': heroRightTemplate,
  'apple-minimal': appleMinimalTemplate,
  'cyber-tactical': cyberTacticalTemplate
};
