export const DEFAULT_CONFIG_FILENAME = 'profile-aura.config.json';
export const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const defaultConfigValues = {
  github: {
    username: 'octocat',
    includePrivate: false
  },
  profile: {
    name: '',
    username: '',
    roles: [
      'Open Source Developer',
      'Full Stack Engineer'
    ],
    bio: '',
    company: '',
    location: '',
    website: '',
    avatarUrl: '',
    socials: {}
  },
  theme: 'black-obsidian',
  template: 'editorial-hero',
  sections: {
    hero: { enabled: true, style: 'magazine' },
    stats: { enabled: true, show: ['contributions', 'commits', 'prs', 'issues', 'stars'] },
    streak: { enabled: true },
    techStack: {
      enabled: true,
      categories: [
        { category: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Go'] },
        { category: 'Frameworks', skills: ['React', 'Next.js', 'Node.js', 'TailwindCSS'] }
      ]
    },
    socials: { enabled: true }
  },
  output: {
    readmePath: 'README.md',
    assetsDir: '.github/assets/generated',
    heroSvgFilename: 'hero.svg',
    statsSvgFilename: 'stats.svg'
  }
};
