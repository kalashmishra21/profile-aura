import { ProfileAuraConfig } from './types.js';

export const defaultConfig: ProfileAuraConfig = {
  github: {
    username: ''
  },
  profile: {
    name: 'Developer Profile',
    username: 'developer',
    roles: ['Software Engineer', 'Open Source Contributor', 'Architect'],
    bio: 'Building high-performance software, AI tools, and elegant web experiences.',
    company: 'Independent',
    location: 'Global',
    website: 'https://github.com',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  theme: 'void-dark',
  template: 'editorial-hero',
  sections: {
    hero: {
      enabled: true,
      style: 'magazine'
    },
    stats: {
      enabled: true,
      show: ['contributions', 'commits', 'prs', 'issues', 'stars', 'streak']
    },
    streak: {
      enabled: true
    },
    techStack: {
      enabled: true,
      categories: [
        {
          category: 'Frontend & UI',
          skills: ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'HTML5/CSS3']
        },
        {
          category: 'Backend & Systems',
          skills: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'GraphQL', 'Docker']
        },
        {
          category: 'Tools & DevOps',
          skills: ['Git', 'Linux', 'AWS', 'Vercel', 'GitHub Actions']
        }
      ]
    },
    topRepositories: {
      enabled: true,
      limit: 6
    },
    socials: {
      enabled: true
    }
  },
  output: {
    readmePath: 'README.md',
    assetsDir: '.github/assets/generated',
    heroSvgFilename: 'hero.svg',
    statsSvgFilename: 'stats.svg'
  },
  plugins: []
};
