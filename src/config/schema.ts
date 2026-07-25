import { z } from 'zod';

export const configSchema = z.object({
  github: z.object({
    username: z.string().min(1, 'GitHub username is required'),
    token: z.string().optional()
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
  theme: z.string().default('void-dark'),
  template: z.string().default('editorial-hero'),
  sections: z.record(z.any()),
  output: z.object({
    readmePath: z.string().default('README.md'),
    assetsDir: z.string().default('.github/assets/generated'),
    heroSvgFilename: z.string().default('hero.svg'),
    statsSvgFilename: z.string().default('stats.svg')
  }),
  plugins: z.array(z.string()).optional(),
  customTokens: z.record(z.any()).optional()
});
