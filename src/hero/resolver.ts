import { ProfileAuraConfig } from '../types/config.js';
import { AggregatedProfileData } from '../types/github.js';
import { ResolvedHeroData } from './types.js';

export class HeroDataResolver {
  static resolve(config: ProfileAuraConfig, data: AggregatedProfileData): ResolvedHeroData {
    const name = data.name || config.profile.name || data.username || 'Developer Profile';
    const username = data.username || config.profile.username || 'developer';

    const about = config.profile.bio || data.bio || 'Building high-performance tools and web experiences.';
    const rolesList = config.profile.roles || data.roles || [];
    const role = rolesList.length > 0 ? rolesList.join('  •  ') : 'Software Engineer';

    const website = config.profile.website || data.website || '';
    const company = config.profile.company || data.company || '';
    const location = config.profile.location || data.location || '';
    const avatarUrl = config.profile.avatarUrl || data.avatarUrl || `https://github.com/${username}.png`;

    return {
      name,
      username,
      role,
      about,
      avatarUrl,
      website,
      company,
      location,
      publicRepos: data.publicRepos || 0,
      followers: data.followers || 0,
      following: data.following || 0,
      stars: data.stats?.totalStars || 0,
      socials: config.profile.socials || data.socials || {}
    };
  }
}
