# 🎨 Profile Aura

> **AI-Powered GitHub Profile README Generator with Stunning Animated SVG Cards**

Create beautiful, dynamic GitHub profile READMEs with animated SVG cards powered by AI, GitHub APIs, and modern design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![AI](https://img.shields.io/badge/AI-Gemini%20|%20GPT--4-purple.svg)

---

## ✨ Features

### 🎭 Beautiful SVG Cards
- **Profile Header Card** - Avatar, bio, followers, and AI-generated status
- **GitHub Statistics** - Commits, PRs, issues, stars, forks
- **Contribution Streak** - Current and longest streaks with fire emoji 🔥
- **Language Breakdown** - Most used languages with colorful progress bars
- **Tech Stack Grid** - Dynamic icons from Simple Icons & SVGL
- **Recent Activity** - Latest repository updates

### 🚀 Advanced Features
- ✅ **No Limits** - Unlimited tech stack items, customizable dimensions
- ✅ **AI-Powered** - OpenAI/GPT-4 integration for smart commit summaries
- ✅ **Animated SVGs** - Glassmorphism, gradients, glowing effects
- ✅ **Auto-Update** - GitHub Actions workflow for daily regeneration
- ✅ **Fully Typed** - Complete TypeScript support
- ✅ **Customizable** - Extensive theme and layout options

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/readme-aura-engine.git
cd readme-aura-engine

# Install dependencies
npm install

# Build the project
npm run build
```

### Initialize Your Project

```bash
# Create config and example files
npm run init

# This creates:
# - readme-aura.config.json (configuration)
# - readme.source.md (your markdown template)
# - .env.example (environment variables template)
```

### Configure

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your tokens:**
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_USERNAME=your-username
   OPENAI_API_KEY=sk-your_key_here  # Optional
   ```

3. **Update `readme-aura.config.json`:**
   ```json
   {
     "github": {
       "username": "your-username"
     },
     "ai": {
       "enabled": false
     }
   }
   ```

### Generate README

```bash
# Generate your README
npm run generate

# Or with verbose logging
npm run generate -- --verbose

# Preview without writing files
npm run generate -- --dry-run
```

---

## 📖 Usage Guide

### Custom Blocks in `readme.source.md`

#### Profile Card
```markdown
\`\`\`aura width="800" height="250"
# Beautiful profile card with avatar and stats
\`\`\`
```

#### GitHub Statistics
```markdown
\`\`\`github-stats width="800" height="400"
# Comprehensive GitHub statistics
\`\`\`
```

#### Contribution Streak
```markdown
\`\`\`streak width="500" height="300"
# Contribution streak display
\`\`\`
```

#### Tech Stack
```markdown
\`\`\`tech-stack width="800" height="300" stack="react,typescript,nodejs,python,docker,aws"
# Tech stack with auto-fetched icons
\`\`\`
```

#### Languages
```markdown
\`\`\`languages width="600" height="400"
# Most used programming languages
\`\`\`
```

#### Recent Activity
```markdown
\`\`\`activity width="800" height="400"
# Latest repository updates
\`\`\`
```

### Available Options

| Option | Description | Default |
|--------|-------------|---------|
| `width` | Card width in pixels | `800` |
| `height` | Card height in pixels | `400` |
| `align` | Alignment: left, center, right | `center` |
| `stack` | Comma-separated tech list | - |
| `layout` | Tech stack layout: grid, rows | `grid` |
| `title` | Custom card title | Auto-generated |

---

## 🎨 Customization

### Theme Configuration

Edit `readme-aura.config.json`:

```json
{
  "theme": {
    "mode": "dark",
    "primaryColor": "#8b5cf6",
    "secondaryColor": "#3b82f6",
    "accentColor": "#06b6d4",
    "backgroundColor": "#0f172a",
    "textColor": "#f1f5f9",
    "borderRadius": 12,
    "glowEffect": true,
    "animation": true
  }
}
```

### AI Features

Enable AI-powered commit summaries:

```json
{
  "ai": {
    "enabled": true,
    "provider": "openai",
    "apiKey": "sk-...",
    "model": "gpt-4-turbo-preview"
  }
}
```

---

## 🤖 GitHub Actions Setup

### 1. Add Workflow File

The `.github/workflows/generate-readme.yml` is already created. It will:
- Run daily at midnight
- Trigger on push to main
- Auto-commit updated README

### 2. Add Repository Secrets

Go to `Settings → Secrets and variables → Actions`:

- `GITHUB_TOKEN` - GitHub PAT with `read:user` and `repo` scopes
- `OPENAI_API_KEY` - (Optional) For AI features

### 3. Enable Workflow Permissions

Go to `Settings → Actions → General`:
- Enable "Read and write permissions"

---

## 📦 Project Structure

```
readme-aura-engine/
├── src/
│   ├── cli/              # CLI commands (init, build)
│   ├── components/       # JSX/SVG card components
│   ├── engine/          # Core builder and renderer
│   ├── services/        # GitHub, Icons, AI services
│   ├── types/           # TypeScript definitions
│   └── utils/           # Helper functions
├── assets/
│   └── fonts/           # Custom fonts (Inter, JetBrains Mono)
├── examples/            # Example configurations
├── .github/
│   ├── workflows/       # GitHub Actions
│   └── assets/
│       └── generated/   # Generated SVG assets
├── README.md            # This file
└── REQUIREMENTS.md      # Setup guide
```

---

## 🔧 CLI Commands

```bash
# Initialize new project
readme-aura init

# Build README
readme-aura build

# Build with options
readme-aura build --source custom.md --output OUTPUT.md --verbose

# Dry run (preview)
readme-aura build --dry-run

# Show help
readme-aura --help
```

---

## 📋 Requirements

See [REQUIREMENTS.md](./REQUIREMENTS.md) for detailed setup instructions.

**Essential:**
- Node.js 18+
- GitHub Personal Access Token
- Inter font family (download and place in `assets/fonts/`)

**Optional:**
- OpenAI API key (for AI features)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+, TypeScript 5
- **JSX → SVG:** Satori, @resvg/resvg-js
- **Markdown:** Unified, Remark
- **GitHub API:** @octokit/rest, @octokit/graphql
- **AI:** OpenAI GPT-4
- **CLI:** Commander.js
- **Icons:** Simple Icons API, SVGL

---

## 🎯 Roadmap

- [ ] Support for more AI providers (Anthropic Claude, Google Gemini)
- [ ] Additional card types (GitHub Sponsors, Trophies)
- [ ] Real-time contribution heatmap
- [ ] Dark/light mode toggle in SVGs
- [ ] Video/GIF card support
- [ ] Interactive SVG elements
- [ ] Multi-language support
- [ ] VS Code extension

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Satori](https://github.com/vercel/satori) - SVG generation engine
- [Simple Icons](https://simpleicons.org/) - Brand icons
- [SVGL](https://svgl.app/) - Modern SVG icons
- [GitHub REST API](https://docs.github.com/en/rest) & [GraphQL API](https://docs.github.com/en/graphql)
- [Vercel](https://vercel.com) - Inspiration from their OG image generation

---

## 💬 Support

- 📫 Issues: [GitHub Issues](https://github.com/yourusername/readme-aura-engine/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/readme-aura-engine/discussions)
- 📧 Email: support@readme-aura.dev

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with 💜 by developers, for developers

</div>
