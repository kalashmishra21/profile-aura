import { z } from 'zod';

export const configSchema = z.object({
  github: z.object({
    username: z.string().min(1, 'GitHub username is required'),
    token: z.string().optional(),
    includePrivate: z.boolean().default(false)
  }),
  profile: z.object({
    name: z.string(),
    username: z.string(),
    roles: z.array(z.string()),
    bio: z.string(),
    company: z.string().optional(),
    location: z.string().optional(),
    website: z.string().optional(),
    avatarUrl: z.string().optional(),
    socials: z.record(z.string().optional())
  }),
  theme: z.string().default('black-obsidian'),
  template: z.string().default('editorial-hero'),
  sections: z.record(z.any()),
  output: z.object({
    readmePath: z.string().default('README.md'),
    assetsDir: z.string().default('.github/assets/generated'),
    heroSvgFilename: z.string().default('hero.svg'),
    statsSvgFilename: z.string().default('stats.svg')
  }),
  project: z.object({
    showCurrentProject: z.boolean().default(true),
    showPreview: z.boolean().default(true),
    featuredRepositories: z.array(z.string())
      .max(4, 'Maximum 4 featured repositories allowed')
      .refine(items => new Set(items).size === items.length, {
        message: 'Duplicate repository names are not allowed'
      })
      .default([])
  }).optional(),
  plugins: z.array(z.string()).optional(),
  customTokens: z.record(z.any()).optional()
});
