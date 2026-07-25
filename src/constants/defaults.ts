import { ProfileAuraConfig } from '../types/config.js';

export const DEFAULT_CONFIG_FILENAME = 'profile-aura.config.json';
export const DEFAULT_THEME_ID = 'void-dark';
export const DEFAULT_TEMPLATE_ID = 'editorial-hero';
export const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

export const defaultConfigValues: ProfileAuraConfig = {
  github: {
    username: ''
  },
  profile: {
    name: 'Developer Profile',
    username: 'developer',
    roles: ['Software Engineer', 'Open Source Contributor'],
    bio: 'Building high-performance software and elegant web experiences.',
    company: 'Independent',
    location: 'Global',
    website: 'https://github.com',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  theme: DEFAULT_THEME_ID,
  template: DEFAULT_TEMPLATE_ID,
  sections: {
    hero: { enabled: true, style: 'magazine' },
    stats: { enabled: true, show: ['contributions', 'commits', 'prs', 'issues', 'stars', 'streak'] },
    streak: { enabled: true },
    techStack: {
      enabled: true,
      categories: [
        { category: 'Frontend & UI', skills: ['TypeScript', 'React', 'Next.js', 'TailwindCSS'] },
        { category: 'Backend & Systems', skills: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Docker'] }
      ]
    },
    topRepositories: { enabled: true, limit: 6 },
    socials: { enabled: true }
  },
  output: {
    readmePath: 'README.md',
    assetsDir: '.github/assets/generated',
    heroSvgFilename: 'hero.svg',
    statsSvgFilename: 'stats.svg'
  },
  plugins: []
};
