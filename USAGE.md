# Profile Aura - Usage Guide

## 🚀 Quick Start

Profile Aura is a zero-clone NPX tool that generates beautiful, animated GitHub profile READMEs.

### Installation

No installation needed! Just use NPX:

```bash
npx profile-aura init
npx profile-aura build
```

### Commands

#### 1. Initialize Your Profile

```bash
npx profile-aura init
```

This command will:
- ✅ Auto-detect your GitHub username from git config
- ✅ Auto-detect tech stack from package.json
- ✅ Create `readme.source.md` template
- ✅ Create `readme-aura.config.json` config file
- ✅ Optionally setup GitHub Actions workflow for auto-updates

**Interactive Prompts:**
- GitHub username (auto-detected)
- GitHub token (optional, for higher API rate limits)
- Tech stack (auto-detected from dependencies)
- Setup GitHub Actions workflow (yes/no)

#### 2. Edit Your Tech Stack

```bash
npx profile-aura edit
```

Interactive tech stack editor with:
- 📝 Add from 70+ predefined technologies
- ✏️ Add custom technologies
- 🗑️ Remove technologies
- 📋 View current stack
- 7 Categories: Frontend, Backend, Database, Cloud & DevOps, Mobile, Languages, Tools

**No manual file editing required!**

#### 3. Build Your README

```bash
npx profile-aura build
```

Generates:
- ✨ Animated SVG cards with live wallpaper-style effects
- 📊 GitHub statistics (commits, PRs, issues, stars, forks)
- 🛠️ Tech stack visualization
- 💻 Language breakdown with animated progress bars
- 🔥 Contribution streak
- ⚡ Recent activity

## 📁 File Structure

After initialization:

```
your-repo/
├── .github/
│   ├── workflows/
│   │   └── profile-aura.yml    # Auto-update workflow
│   └── assets/
│       └── generated/           # Generated SVG cards
├── readme.source.md             # Your template (edit this!)
├── readme-aura.config.json      # Configuration
├── README.md                    # Generated output
└── .env                         # GitHub token (optional)
```

## 🎨 Customization

### Edit readme.source.md

Add Aura blocks using code blocks:

#### Profile Header Card
```markdown
```aura width="800" height="250"
# Your tagline here
\```
```

#### Tech Stack Card
```markdown
```tech-stack width="800" height="300" stack="react,typescript,nodejs"
# Technologies I work with
\```
```

#### GitHub Stats Card
```markdown
```github-stats width="800" height="400"
# My GitHub statistics
\```
```

#### Languages Card
```markdown
```languages width="600" height="400"
# Language breakdown
\```
```

#### Streak Card
```markdown
```streak width="500" height="300"
# My contribution streak
\```
```

#### Activity Card
```markdown
```activity width="800" height="400"
# Latest repository updates
\```
```

### Config File (readme-aura.config.json)

```json
{
  "github": {
    "username": "your-username"
  },
  "output": {
    "readmePath": "README.md",
    "assetsPath": ".github/assets/generated"
  },
  "theme": {
    "mode": "dark",
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2",
    "accentColor": "#f093fb",
    "backgroundColor": "#0d1117",
    "textColor": "#c9d1d9",
    "borderRadius": 10,
    "glowEffect": true,
    "animation": true
  }
}
```

## 🎬 Animation Effects

Profile Aura includes 10+ live animation effects:

### Header Card Animations
- 🌌 Aurora borealis effect
- ✨ Particle system
- 💫 Floating orbs
- ⭐ Sparkle effects
- 🌊 Border glow pulse

### Stats Card Animations
- 📊 Pulsing stat boxes
- 💫 Counter animations
- ✨ Icon glow effects
- 🎨 Floating orbs background

### Tech Stack Card Animations
- 🔷 Hexagon pattern background
- 💻 Matrix-style code rain
- ⚡ Icon pulse effects
- ✨ Badge hover animations

### Languages Card Animations
- 📈 Animated progress bars
- ✨ Shimmer effect on bars
- 🎯 Pulsing color dots with glow
- 🎈 Floating language bubbles

All animations are:
- ✅ Pure SVG (no JavaScript required)
- ✅ GitHub-compatible
- ✅ Lightweight and performant
- ✅ Live wallpaper-style effects

## 🔄 GitHub Actions Auto-Update

If you enabled GitHub Actions during init, your README will automatically update:

- ⏰ Every day at midnight
- 🔄 On every push to main/master
- 🎯 Manual trigger via Actions tab

The workflow:
1. Fetches latest GitHub stats
2. Regenerates SVG cards with animations
3. Updates README.md
4. Commits changes back to repo

**No maintenance required!**

## 🎯 Example Workflow

```bash
# 1. Initialize in your repo
cd your-profile-repo
npx profile-aura init

# 2. Edit tech stack interactively (optional)
npx profile-aura edit

# 3. Customize readme.source.md (optional)
# Edit the file manually to add/remove sections

# 4. Build your README
npx profile-aura build

# 5. Push to GitHub
git add .
git commit -m "feat: Add Profile Aura README"
git push

# 6. Done! Your README auto-updates daily via GitHub Actions
```

## 🔑 GitHub Token (Optional)

For higher API rate limits and private repo stats:

1. Create token at: https://github.com/settings/tokens
2. Required scopes: `read:user`, `repo`
3. Add to `.env`:
   ```
   GITHUB_TOKEN=your_token_here
   GITHUB_USERNAME=your_username
   ```

## 🆚 vs Other Tools

| Feature | Profile Aura | readme-aura | GitHub Stats |
|---------|-------------|-------------|--------------|
| **Zero-clone setup** | ✅ | ❌ | ✅ |
| **Live animations** | ✅ | ❌ | ❌ |
| **Interactive editor** | ✅ | ❌ | ❌ |
| **Auto-detection** | ✅ | ❌ | ❌ |
| **No AI/Gemini** | ✅ | ❌ | ✅ |
| **NPX ready** | ✅ | ✅ | ✅ |

## 🐛 Troubleshooting

### API Rate Limit
- **Solution**: Add GitHub token to `.env` file

### Animations not showing
- **Cause**: SVGs may not be cached yet
- **Solution**: Wait a few minutes or hard refresh (Ctrl+F5)

### Build fails
- **Check**: `readme.source.md` exists
- **Check**: Valid Aura block syntax
- **Run**: `npx profile-aura init` if missing config

## 📝 License

MIT License - See LICENSE file

## 🙏 Credits

Inspired by the awesome readme-aura project by @collectioneur

Built with:
- TypeScript
- Satori (for JSX cards)
- Inquirer (for CLI prompts)
- Simple Icons (for tech stack icons)

---

<div align="center">

**Powered by [Profile Aura](https://github.com/kalashmishra21/profile-aura)** ✨

Made with ❤️ by [@kalashmishra21](https://github.com/kalashmishra21)

</div>
