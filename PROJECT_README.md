# Profile Aura ✨

> **Zero-clone NPX tool for generating beautiful, animated GitHub profile READMEs**

[![npm version](https://img.shields.io/npm/v/profile-aura.svg)](https://www.npmjs.com/package/profile-aura)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎬 Live Demo

See the animations in action! All cards feature live SVG animations:

<div align="center">

### 🌌 Profile Header Card
![Profile Header](.github/assets/generated/aura-0.svg)

*Features: Aurora borealis effect, floating particles, sparkles, border glow*

---

### 🛠️ Tech Stack
![Tech Stack](.github/assets/generated/tech-stack-1.svg)

*Features: Hexagon pattern, matrix code rain, icon pulse effects*

---

### 📊 GitHub Statistics
![GitHub Stats](.github/assets/generated/github-stats-2.svg)

*Features: Pulsing stat boxes, floating orbs, counter animations*

---

### 🔥 Contribution Streak
![Streak](.github/assets/generated/streak-3.svg)

*Features: Animated fire emoji, ripple effects, glowing numbers*

---

### 💻 Most Used Languages
![Languages](.github/assets/generated/languages-4.svg)

*Features: Animated progress bars, shimmer effects, floating bubbles*

</div>

> **All animations are pure SVG!** No JavaScript, fully GitHub-compatible, lightweight.

---

## 🌟 Features

- ✨ **Live Animations** - Wallpaper-style SVG animations (aurora, particles, sparkles, code rain)
- 🚀 **Zero-Clone Setup** - Just `npx profile-aura init` and you're ready
- 🎨 **Interactive Editor** - Add/remove tech stack without touching files
- 🤖 **Auto-Detection** - Detects GitHub username and tech stack from your repo
- 📊 **Rich Stats** - Commits, PRs, issues, stars, forks, languages, streak
- 🔄 **Auto-Updates** - Optional GitHub Actions workflow for daily updates
- 🎯 **No AI/Gemini** - Pure data-driven, no AI dependencies

## 🚀 Quick Start

```bash
# Initialize in your repo
npx profile-aura init

# Edit tech stack interactively
npx profile-aura edit

# Build your README
npx profile-aura build
```

That's it! Your animated README is ready 🎉

## 📖 Documentation

See [USAGE.md](./USAGE.md) for complete documentation including:
- Detailed command reference
- Customization guide
- Animation effects list
- GitHub Actions setup
- Troubleshooting

## 🛠️ Commands

### `init` - Initialize Profile

```bash
npx profile-aura init
```

Auto-detects username and tech stack, creates template files.

### `edit` - Edit Tech Stack

```bash
npx profile-aura edit
```

Interactive editor with 70+ technologies across 7 categories.

### `build` - Generate README

```bash
npx profile-aura build
```

Generates animated SVG cards and final README.

## 🎯 Example Output

Check out these repos using Profile Aura:
- [@kalashmishra21](https://github.com/kalashmishra21/kalashmishra21) - Main profile

## 🔧 Tech Stack

Built with modern tools:
- TypeScript - Type-safe development
- Satori - SVG rendering from JSX
- Inquirer - Interactive CLI prompts
- Simple Icons - Tech stack icons
- GitHub API - Stats and data fetching

## 📦 What Gets Generated

```
your-repo/
├── .github/
│   ├── workflows/
│   │   └── profile-aura.yml    # Auto-update workflow
│   └── assets/
│       └── generated/           # Animated SVG cards
│           ├── aura-0.svg      # Profile header
│           ├── github-stats-1.svg
│           ├── tech-stack-2.svg
│           └── languages-3.svg
├── readme.source.md             # Template (you edit this)
├── readme-aura.config.json      # Config
└── README.md                    # Generated output
```

## 🆚 Comparison

| Feature | Profile Aura | readme-aura | github-readme-stats |
|---------|-------------|-------------|---------------------|
| Zero-clone | ✅ | ❌ | ✅ |
| Live animations | ✅ | ❌ | ❌ |
| Interactive editor | ✅ | ❌ | ❌ |
| Auto-detection | ✅ | ❌ | ❌ |
| No AI dependencies | ✅ | ❌ | ✅ |
| Customizable themes | ✅ | ✅ | ✅ |

## 🎨 Customization

Customize via `readme-aura.config.json`:

```json
{
  "theme": {
    "mode": "dark",
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2",
    "accentColor": "#f093fb",
    "animation": true,
    "glowEffect": true
  }
}
```

Or edit `readme.source.md` to add custom sections, links, and content.

## 🤝 Contributing

Contributions welcome! Please check out:
- [Issues](https://github.com/kalashmishra21/profile-aura/issues)
- [Pull Requests](https://github.com/kalashmishra21/profile-aura/pulls)

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by [@collectioneur/readme-aura](https://github.com/collectioneur/readme-aura)

Special thanks to:
- GitHub API for stats data
- Simple Icons for tech icons
- Satori for SVG rendering

## 📞 Support

- 🐛 [Report a bug](https://github.com/kalashmishra21/profile-aura/issues/new?template=bug_report.md)
- ✨ [Request a feature](https://github.com/kalashmishra21/profile-aura/issues/new?template=feature_request.md)
- ❓ [Ask a question](https://github.com/kalashmishra21/profile-aura/issues/new?template=question.md)

---

<div align="center">

**Made with ❤️ by [@kalashmishra21](https://github.com/kalashmishra21)**

⭐ Star this repo if you like it!

</div>
