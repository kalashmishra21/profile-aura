# Profile Aura ✨

**Create stunning, animated GitHub profile READMEs with zero setup** - Just run `npx profile-aura init` and you're done!

<div align="center">

![Profile Aura Banner](https://img.shields.io/badge/Profile_Aura-Animated_README_Generator-blueviolet?style=for-the-badge)
[![NPM Version](https://img.shields.io/npm/v/profile-aura?style=for-the-badge)](https://www.npmjs.com/package/profile-aura)
[![License](https://img.shields.io/github/license/kalashmishra21/profile-aura?style=for-the-badge)](LICENSE)

</div>

## 🚀 Features

- **Zero Clone Required** - Run directly with `npx`, no installation needed
- **Animated SVG Cards** - Live animations: aurora effects, particles, sparkles, glowing borders
- **Auto-Detection** - Automatically detects your tech stack from `package.json`
- **Lifetime Stats** - Fetches complete GitHub history (not just current year)
- **Interactive Setup** - Beautiful CLI with tech stack editor (70+ technologies)
- **GitHub Actions Ready** - Auto-update your README on every push
- **Fully Customizable** - Colors, themes, card dimensions via config file
- **NO AI/Gemini** - Pure GitHub API, no external AI services

## 📦 Quick Start

```bash
# Initialize in your GitHub profile repo
npx profile-aura init

# Build your README
npx profile-aura build

# That's it! Your animated README is ready
```

## 🎯 What You Get

**5 Animated SVG Cards:**
1. **Profile Card** - Avatar, name, stats (repos, followers, stars)
2. **Tech Stack** - Your technologies with colorful icons
3. **GitHub Statistics** - Commits, PRs, issues, contributions (lifetime)
4. **Contribution Streak** - Current & longest streaks
5. **Languages** - Top 5 most-used programming languages

All cards feature:
- Live animations (particles, aurora, sparkles, borders)
- Responsive design
- Dark theme optimized
- No external dependencies

## 🛠️ Installation

### Option 1: NPX (Recommended)
```bash
npx profile-aura init
```

### Option 2: Global Install
```bash
npm install -g profile-aura
profile-aura init
```

### Option 3: Local Install
```bash
npm install profile-aura
npx profile-aura init
```

## 📖 Usage

### 1. Initialize
```bash
npx profile-aura init
```

This creates:
- `readme.source.md` - Your template (edit this!)
- `profile-aura.config.json` - Configuration file
- `.env` - GitHub token (optional, for higher rate limits)

### 2. Edit Your Template

Edit `readme.source.md` and add Aura blocks:

```markdown
## Profile
\`\`\`aura width="800" height="250"
\`\`\`

## Tech Stack
\`\`\`tech-stack width="800" height="300"
react, typescript, nodejs, python, javascript, html, css, git
\`\`\`

## Stats
\`\`\`github-stats width="800" height="400"
\`\`\`

## Streak
\`\`\`streak width="700" height="350"
\`\`\`

## Languages
\`\`\`languages width="800" height="450"
\`\`\`
```

### 3. Build
```bash
npx profile-aura build
```

Generates:
- `README.md` - Your final README
- `.github/assets/generated/*.svg` - SVG cards

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add animated profile README"
git push
```

## ⚙️ Configuration

Edit `profile-aura.config.json`:

```json
{
  "github": {
    "username": "your-username",
    "token": ""
  },
  "theme": {
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2",
    "accentColor": "#f093fb",
    "backgroundColor": "#0d1117",
    "textColor": "#c9d1d9",
    "borderRadius": "15",
    "glowEffect": true
  },
  "output": {
    "sourcePath": "readme.source.md",
    "outputPath": "README.md",
    "assetsPath": ".github/assets/generated"
  }
}
```

## 🔄 Auto-Update with GitHub Actions

Create `.github/workflows/profile-update.yml`:

```yaml
name: Update Profile README

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Generate README
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npx profile-aura build
      
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git diff --quiet && git diff --staged --quiet || git commit -m "chore: update profile README"
          git push
```

## 🎨 Customization

### Tech Stack

Edit the tech stack in your `readme.source.md`:

```markdown
\`\`\`tech-stack width="800" height="300"
react, vue, angular, nodejs, python, java, go, rust
\`\`\`
```

**Supported Technologies (70+):**
- **Frontend:** React, Vue, Angular, Svelte, Next.js
- **Backend:** Node.js, Python, Java, Go, Rust, PHP
- **Databases:** MongoDB, PostgreSQL, MySQL, Redis
- **DevOps:** Docker, Kubernetes, AWS, Azure, GCP
- **And many more...**

### Themes

Customize colors in `profile-aura.config.json`:

```json
{
  "theme": {
    "primaryColor": "#your-color",
    "secondaryColor": "#your-color",
    "accentColor": "#your-color"
  }
}
```

## 📚 Commands

```bash
# Initialize new project
npx profile-aura init

# Build README
npx profile-aura build

# Build with custom config
npx profile-aura build --config custom-config.json

# Dry run (preview without writing)
npx profile-aura build --dry-run

# Verbose output
npx profile-aura build --verbose

# Show version
npx profile-aura --version

# Show help
npx profile-aura --help
```

## 🆚 Comparison

| Feature | Profile Aura | github-readme-stats | readme-so |
|---------|-------------|---------------------|-----------|
| **Zero-clone** | ✅ NPX | ✅ URL-based | ✅ Web-based |
| **Animations** | ✅ Advanced | ❌ Static | ❌ Static |
| **Lifetime Stats** | ✅ All years | ❌ Current year | N/A |
| **Customizable** | ✅ Full control | ⚠️ Limited | ✅ GUI |
| **Self-hosted** | ✅ Your repo | ❌ External | ❌ External |
| **No AI** | ✅ Pure API | ✅ Pure API | N/A |
| **Tech Stack** | ✅ 70+ icons | ❌ | ✅ |

## 🔧 Troubleshooting

### Rate Limit Errors

**Problem:** GitHub API rate limit (60 requests/hour)

**Solution:** Add GitHub token to `.env`:
```env
GITHUB_TOKEN=your_github_personal_access_token
```

Create token: https://github.com/settings/tokens (no scopes needed for public data)

### SVG Not Showing

**Problem:** SVG cards not visible on GitHub

**Solution:** 
1. Commit and push all files in `.github/assets/generated/`
2. Wait 1-2 minutes for GitHub CDN to update
3. Hard refresh your profile page (Ctrl+Shift+R)

### Build Errors

**Problem:** TypeScript/build errors

**Solution:**
```bash
npm run build
node dist/cli.js build
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT © [Kalash Mishra](https://github.com/kalashmishra21)

## 🙏 Credits

Built with:
- [Octokit](https://github.com/octokit/rest.js) - GitHub API client
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - Interactive CLI
- [Simple Icons](https://simpleicons.org/) - Tech stack icons

---

<div align="center">

**Made with ❤️ by developers, for developers**

[Report Bug](https://github.com/kalashmishra21/profile-aura/issues) • [Request Feature](https://github.com/kalashmishra21/profile-aura/issues)

</div>
