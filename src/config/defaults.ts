export const DEFAULT_CONFIG_FILENAME = 'profile-aura.config.json';
export const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export const defaultConfigValues = {
  github: {
    username: 'octocat',
    includePrivate: false
  },
  profile: {
    name: 'Monalisa Octocat',
    username: 'octocat',
    roles: ['Open Source Developer', 'Full Stack Engineer'],
    bio: 'Building open source software for developers worldwide.',
    company: 'GitHub',
    location: 'San Francisco, CA',
    website: 'https://github.com',
    avatarUrl: 'https://github.com/octocat.png',
    socials: {
      github: 'https://github.com/octocat'
    }
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
    topRepositories: { enabled: true, limit: 6 },
    socials: { enabled: true }
  },
  output: {
    readmePath: 'README.md',
    assetsDir: '.github/assets/generated',
    heroSvgFilename: 'hero.svg',
    statsSvgFilename: 'stats.svg'
  },
  project: {
    showCurrentProject: true,
    showPreview: true,
    featuredRepositories: []
  }
};
