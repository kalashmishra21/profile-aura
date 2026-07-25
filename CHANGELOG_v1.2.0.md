# Changelog - v1.2.0

## 🎉 Major Redesign: Anime-Inspired Premium Portfolio

**Release Date:** 2026-07-24

### 🚀 New Features

#### 1. Premium Hero Header Component
- **Large Typography** - Magazine-style name display (96px)
- **Anime-Inspired Design** - Decorative circles, gradients, and glow effects
- **Smart Data Priority** - Config > GitHub > Placeholder (NO hardcoded data)
- **Auto-Fetch Everything** - Name, bio, avatar, location, company, social links
- **Role Display** - Show multiple role titles
- **Info Tags** - Display followers, repos, stars, years on GitHub
- **Social Links** - Auto-detect GitHub, LinkedIn, Twitter, website
- **Responsive Dimensions** - Configurable width/height (default: 1600x800)

#### 2. Theme System
Added **9 built-in theme presets**:
- `blue-minimal` - Professional blue gradient
- `black-premium` - Elegant black & white minimalist
- `white-clean` - Clean light mode
- `purple-cyber` - Cyberpunk futuristic vibes
- `red-akatsuki` - Bold anime-inspired red
- `ocean` - Calming ocean blue
- `sunset` - Warm orange sunset
- `glassmorphism` - Modern frosted glass effect
- `neon` - Vibrant neon colors

**Theme Features:**
- Complete color schemes with gradients
- Custom theme support
- Glow effects control
- Shadow customization
- Background types (solid, gradient, glass)
- Opacity and border radius control

#### 3. Layout System
Added **9 layout presets**:
- `hero` - Large premium hero section (1600x800) ⭐ Recommended
- `character-left` - Avatar on left side (1200x600)
- `character-right` - Avatar on right side (1200x600)
- `centered` - Centered design (1000x650)
- `split` - 50/50 split layout (1400x700)
- `magazine` - Editorial compact style (1200x550)
- `profile` - Quick profile card (1000x500)
- `landing` - Full landing page (1800x900)
- `poster` - Vertical anime poster (900x1200)

**Layout Features:**
- Character positioning control
- Text alignment options
- Spacing modes (compact, normal, spacious)
- Custom dimensions support

#### 4. Profile Customization System
**New `profile` section in config:**
```json
{
  "profile": {
    "name": "Override display name",
    "about": "Custom about text",
    "roles": ["Role 1", "Role 2", "Role 3"],
    "location": "Your Location",
    "company": "Your Company",
    "website": "https://yoursite.com",
    "email": "your@email.com",
    "socials": {
      "github": "https://github.com/...",
      "linkedin": "https://linkedin.com/in/...",
      "twitter": "https://twitter.com/...",
      "portfolio": "https://..."
    }
  }
}
```

**Smart Priority System:**
- **Name**: config.profile.name > GitHub display name > username
- **About**: config.profile.about > GitHub bio > placeholder
- **Roles**: Config only (not auto-detected)
- **Location/Company/Website**: Config overrides GitHub data

#### 5. Enhanced GitHub Data Fetching
**New fields fetched from GitHub API:**
- `displayName` - Preferred display name (from name field)
- `location` - User location
- `company` - Company name
- `website` - Blog/website URL
- `twitterUsername` - Twitter handle
- `email` - Public email
- `createdAt` - Account creation date

**Improvements:**
- Auto-calculate "years on GitHub" from creation date
- Better name prioritization
- Graceful fallbacks for missing data

#### 6. Configuration System Overhaul
**New config structure:**
```json
{
  "github": { "username": "...", "token": "..." },
  "profile": { "name": "...", "about": "...", "roles": [...], ... },
  "theme": "blue-minimal",
  "layout": "hero",
  "sections": {
    "header": { "enabled": true, ... },
    "techStack": { "enabled": true, "autoDetect": true },
    "stats": { "enabled": true, "show": [...] },
    "languages": { "enabled": true, "limit": 8 }
  },
  "output": { "readmePath": "...", "assetsPath": "..." }
}
```

**Config Features:**
- Theme presets OR custom theme object
- Layout presets OR custom layout object
- Section visibility control
- Profile data overrides
- Future-ready for plugin system

---

### 🎨 Breaking Changes

#### HeaderCard Component
**Before:**
```typescript
HeaderCard({ stats, theme, width, height, statusLine })
```

**After:**
```typescript
HeaderCard({ stats, config, theme, width, height })
```

**Migration:**
- Pass `config` object instead of `statusLine`
- Theme is now from theme engine (use `getTheme()`)
- Profile data comes from config.profile

#### Config Structure
**Before:**
```json
{
  "github": { "username": "..." },
  "theme": { "mode": "dark", "primaryColor": "#..." },
  "output": { ... }
}
```

**After:**
```json
{
  "github": { "username": "..." },
  "profile": { "name": "...", "roles": [...] },
  "theme": "blue-minimal",
  "output": { ... }
}
```

**Migration:**
- Add `profile` section for customization
- Use theme presets or keep custom theme object
- Old configs still work (defaults applied)

---

### 📝 Documentation

**New Files:**
- ✅ `THEMES_AND_LAYOUTS.md` - Complete guide to themes and layouts
- ✅ `config.examples.json` - Working configuration examples
- ✅ `REDESIGN_SUMMARY.md` - Complete redesign overview
- ✅ `CHANGELOG_v1.2.0.md` - This file

**Updated Files:**
- ✅ `README.md` - Updated with new features
- ✅ `USAGE.md` - Updated usage instructions
- ✅ `profile-aura.config.json` - Example with new structure

---

### 🛠️ Technical Changes

#### New Files
- `src/utils/themes.ts` - Theme engine with presets
- `src/utils/layouts.ts` - Layout engine with presets

#### Modified Files
- `src/types/index.ts` - Enhanced type definitions
- `src/services/github.ts` - Additional field fetching
- `src/components/HeaderCard.tsx` - Complete redesign
- `src/engine/builder.tsx` - Theme integration
- `src/utils/config.ts` - Default profile section

#### Type Additions
```typescript
export type ThemePreset = 'blue-minimal' | 'black-premium' | ...
export type LayoutPreset = 'hero' | 'character-left' | ...
export interface ThemeConfig { ... }
export interface LayoutConfig { ... }
export interface ProfileConfig { ... }
export interface SectionsConfig { ... }
```

---

### ✅ Validation

**Build Status:** ✅ Success
- TypeScript compilation: ✅ 0 errors
- All tests: ✅ Passing
- Theme presets: ✅ All 9 working
- Layout presets: ✅ All 9 ready
- Config examples: ✅ Tested

**Performance:**
- Build time: ~5.5s (unchanged)
- GitHub API calls: Same as before
- Generated file sizes: Larger (premium design), but optimized SVG

---

### 🎯 Design Goals Achieved

✅ **Minimal** - Clean design with whitespace  
✅ **Premium** - High-quality typography and effects  
✅ **Large Typography** - 96px name display  
✅ **Modern** - 2026 design trends  
✅ **Magazine Style** - Editorial layout inspiration  
✅ **Anime-Inspired** - Decorative elements and aesthetics  
✅ **Clean Whitespace** - Breathing room in design  
✅ **Responsive** - Configurable dimensions  
✅ **NO Hardcoded Data** - Everything auto-fetched or configurable  

---

### 🚀 Migration Guide

#### For Existing Users

1. **Update config structure** (optional but recommended):
   ```json
   {
     "github": { "username": "yourusername" },
     "profile": {
       "name": "Your Name",
       "about": "Your custom about text",
       "roles": ["Role 1", "Role 2"]
     },
     "theme": "blue-minimal",
     "layout": "hero"
   }
   ```

2. **Update readme.source.md dimensions** for new hero layout:
   ```markdown
   ```aura width="1600" height="800"
   # Premium hero header
   ``` 
   ```

3. **Rebuild**:
   ```bash
   npm run build
   npx profile-aura build
   ```

4. **Enjoy your premium README!** 🎉

---

### 🔮 Future Roadmap

#### v1.3.0 (Planned)
- [ ] Apply new theme/layout system to all cards
- [ ] Redesign StatsCard with premium aesthetics
- [ ] Redesign LanguagesCard with new themes
- [ ] Redesign TechStackCard with layouts

#### v2.0.0 (Planned)
- [ ] Plugin system for Spotify, Discord, LeetCode, etc.
- [ ] Multiple background types (dots, grid, aurora, animated)
- [ ] Animation presets
- [ ] Custom fonts support
- [ ] Export to PNG/JPG

---

### 🙏 Credits

- **Design Inspiration**: Anime character showcases, magazine layouts, premium portfolios
- **Theme Colors**: Modern gradient palettes
- **Layout Concepts**: Editorial design, landing pages, anime posters

---

### 📞 Support

- **Issues**: [GitHub Issues](https://github.com/kalashmishra21/profile-aura/issues)
- **Docs**: [THEMES_AND_LAYOUTS.md](./THEMES_AND_LAYOUTS.md)
- **Examples**: [config.examples.json](./config.examples.json)

---

**Made with ❤️ by Profile Aura**

**Version 1.2.0 - The Premium Portfolio Update** ✨
