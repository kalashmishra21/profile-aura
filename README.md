# 🚀 Repository Overview

<div align="center">
  <img src=".github/assets/generated/hero.svg" alt="Profile Aura 2.0 Hero Banner" width="100%" />
</div>

<br />

<div align="center">
  <h1>✨ Profile Aura 2.0</h1>
  <p><b>The Ultimate Editorial Portfolio Platform & GitHub Profile Generator</b></p>

  <p>
    <a href="https://github.com/kalashmishra21/profile-aura/actions"><img src="https://img.shields.io/github/actions/workflow/status/kalashmishra21/profile-aura/ci.yml?branch=main&style=for-the-badge&logo=github" alt="CI Status" /></a>
    <a href="https://github.com/kalashmishra21/profile-aura/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kalashmishra21/profile-aura?style=for-the-badge&color=A855F7" alt="License" /></a>
    <a href="https://npmjs.com/package/profile-aura"><img src="https://img.shields.io/npm/v/profile-aura?style=for-the-badge&color=06B6D4" alt="NPM Version" /></a>
  </p>
</div>

---

## 📖 Project Description

**Profile Aura 2.0** transforms generic GitHub profile READMEs into **luxury portfolio landing pages**. Powered by **Satori vector SVG hero cards**, token-driven themes, 16+ bento-grid templates, and a developer data platform, Profile Aura delivers high-end editorial aesthetics without fake anime lore or code bloat.

```
[CLI / GitHub Action] ──► [Config & Zod Schema] ──► [Satori Vector SVG Hero] ──► [Editorial Portfolio README]
```

---

## ⚡ Key Features

- 🎨 **20+ Production Visual Themes**: Vercel Obsidian Dark, Cyberpunk 2099, Tokyo Night, Dracula, Emerald Matrix, Rose Gold, Gojo Limitless, and more.
- 📐 **16+ Bento-Grid Layout Templates**: Editorial Hero, Bento Grid, Minimalist Compact, Magazine Cover, Split Column, Developer ID Pass, Apple Minimal.
- 🖼️ **Satori Vector SVG Hero Engine**: Crisp resolution vector character hero banners generated in memory via React & Satori.
- 🧩 **Modular Widget Engine**: GitHub Metrics, Streak Counter, Categorized Tech Stack, Pinned Projects, LeetCode, WakaTime, Dev.to Articles, Social Badges.
- ⚡ **24-Hour Disk & Memory Cache**: Prevents GitHub API rate limits with automatic 24-hour response caching.
- 🎨 **Profile Aura Studio**: Browser-based visual editor and live dashboard (`npx profile-aura studio`).
- 🤖 **AI Design Assistant & MCP Tools**: Model Context Protocol (MCP) tool integration (`npx profile-aura ai --prompt "Make my profile cyberpunk"`).

---

## 🏗️ Architecture Preview

```
                  ┌──────────────────────────────────────────────┐
                  │       CLI Binary / GitHub Action CI          │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │   Zod Config Loader & Environment Merge      │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │ Data Aggregator Platform & 24h File Cache    │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │  Theme Engine & Layout Template Resolvers     │
                  └──────────────────────┬───────────────────────┘
                                         │
                  ┌──────────────────────┴──────────────────────┐
                  ▼                                             ▼
  ┌───────────────────────────────┐           ┌───────────────────────────────────┐
  │  Satori Vector SVG Hero Engine│           │   Widget Engine & Portfolio Markdown  │
  └───────────────┬───────────────┘           └─────────────────┬─────────────────┘
                  │                                             │
                  ▼                                             ▼
  ┌───────────────────────────────┐           ┌───────────────────────────────────┐
  │ .github/assets/generated/hero │           │             README.md             │
  └───────────────────────────────┘           └───────────────────────────────────┘
```

---

## 📁 Folder Structure Preview

```
profile-aura/
├── src/
│   ├── ai/            # Multi-provider AI Design Assistant
│   ├── cli/           # Commander.js CLI subcommands (build, init, studio, ai)
│   ├── config/        # Zod runtime schema validation & configuration loader
│   ├── core/          # Framework execution engine kernel & context
│   ├── fetchers/      # GitHub REST/GraphQL & third-party data providers
│   ├── hero/          # Data priority resolver, PRNG seed engine & decorations
│   ├── mcp/           # Model Context Protocol (MCP) tools registry
│   ├── plugins/       # Plugin SDK & lifecycle hook runner
│   ├── renderers/     # Satori vector SVG hero compiler & markdown renderer
│   ├── services/      # 24-hour persistent file & memory cache engine
│   ├── studio/        # Profile Aura Studio HTTP dev server & visual builder UI
│   ├── templates/     # 16+ Portfolio layout template definitions & registry
│   ├── themes/        # 20+ Production visual theme presets & token resolver
│   ├── types/         # Centralized TypeScript interface contracts
│   └── widgets/       # Modular widget implementations & registry
├── .github/
│   ├── assets/        # Generated hero vector SVG assets
│   └── workflows/     # GitHub Actions CI workflow
├── profile-aura.config.json
├── package.json
└── README.md
```

---

## 🛠️ Technology Stack

- **Core & Runtime**: TypeScript 5.3+, Node.js (v18+), ES Modules (NodeNext)
- **Vector Graphics Compiler**: React 18, Satori (SVG vector engine)
- **CLI & Validation**: Commander.js, Zod
- **API Data Providers**: Octokit (GitHub GraphQL v4 & REST v3), LeetCode, WakaTime, Dev.to
- **Visual Studio**: Native Node.js HTTP server, HTML5/CSS3 live preview engine

---

## 🚀 Quick Start

### 1. Initialize Configuration
```bash
npx profile-aura init
```

### 2. Generate Your Profile Portfolio
```bash
npx profile-aura build
```

### 3. Launch Visual Studio Designer
```bash
npx profile-aura studio
```

### 4. Run AI Design Assistant
```bash
npx profile-aura ai --prompt "Make my profile cyberpunk and neon"
```

---

## 📚 Documentation Links

- 📖 [Architecture Overview](ARCHITECTURE.md)
- 🚀 [Feature Roadmap](ROADMAP.md)
- 🤝 [Contributing Guidelines](CONTRIBUTING.md)
- 🛡️ [Security Policy](SECURITY.md)
- 📄 [MIT License](LICENSE)

---

## 📄 License

MIT © [Kalash Mishra](https://github.com/kalashmishra21)
