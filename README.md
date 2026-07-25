<div align="center">
  <h1>✨ Profile Aura 2.0</h1>
  <p><b>The Ultimate Editorial Portfolio Generator for GitHub Profiles</b></p>

  <p>
    <a href="https://github.com/kalashmishra21/profile-aura/actions"><img src="https://img.shields.io/github/actions/workflow/status/kalashmishra21/profile-aura/ci.yml?branch=main&style=for-the-badge&logo=github" alt="CI Status" /></a>
    <a href="https://github.com/kalashmishra21/profile-aura/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kalashmishra21/profile-aura?style=for-the-badge&color=A855F7" alt="License" /></a>
    <a href="https://npmjs.com/package/profile-aura"><img src="https://img.shields.io/npm/v/profile-aura?style=for-the-badge&color=06B6D4" alt="NPM Version" /></a>
  </p>
</div>

---

## 🌟 What is Profile Aura v2?

**Profile Aura v2** transforms generic GitHub profile READMEs into **luxury portfolio landing pages**. Powered by **Satori vector SVG hero cards**, token-driven themes, 16+ bento-grid templates, and a developer data platform, Profile Aura delivers high-end editorial aesthetics without fake anime lore or code bloat.

```
[CLI / GitHub Action] ──► [Config & Zod Schema] ──► [Satori Vector SVG Hero] ──► [Editorial Portfolio README]
```

---

## 🔥 Key Features

- 🎨 **20+ Production Visual Themes**: Vercel Obsidian Dark, Cyberpunk 2099, Tokyo Night, Dracula, Emerald Matrix, Rose Gold, Gojo Limitless, and more.
- 📐 **16+ Bento-Grid Layout Templates**: Editorial Hero, Bento Grid, Minimalist Compact, Magazine Cover, Split Column, Developer ID Pass, Apple Minimal.
- 🖼️ **Satori Vector SVG Hero Engine**: Crisp resolution vector character hero banners generated in memory via React & Satori.
- 🧩 **Modular Widget Engine**: GitHub Metrics, Streak Counter, Categorized Tech Stack, Pinned Projects, LeetCode, WakaTime, Dev.to Articles, Social Badges.
- ⚡ **24-Hour Disk & Memory Cache**: Prevents GitHub API rate limits with automatic 24-hour response caching.
- 🔌 **Plugin SDK (`@profile-aura/sdk`)**: Extend data sources, custom widgets, and lifecycle hooks seamlessly.

---

## 🚀 Quick Start

### 1. Initialize Configuration
```bash
npx profile-aura init
```

### 2. Generate Your Profile
```bash
npx profile-aura build
```

### 3. Explore Themes & Templates
```bash
npx profile-aura themes
npx profile-aura templates
```

---

## ⚙️ Example Configuration (`profile-aura.config.json`)

```json
{
  "github": {
    "username": "kalashmishra21"
  },
  "theme": "black-obsidian",
  "template": "bento-grid",
  "profile": {
    "name": "Kalash Mishra",
    "roles": ["Principal Architect", "Open Source Developer"],
    "bio": "Building high-performance tools, AI applications, and elegant web experiences.",
    "socials": {
      "github": "https://github.com/kalashmishra21",
      "twitter": "https://twitter.com/kalashmishra",
      "linkedin": "https://linkedin.com/in/kalashmishra"
    }
  }
}
```

---

## 🛠️ CLI Commands Reference

| Command | Description |
| :--- | :--- |
| `profile-aura build` | Build portfolio `README.md` and `hero.svg` banner (`--dry-run` available). |
| `profile-aura init` | Generate `profile-aura.config.json` configuration file. |
| `profile-aura preview` | Preview portfolio rendering in memory without touching disk. |
| `profile-aura doctor` | Diagnose environment, Node version, token presence, and system health. |
| `profile-aura validate` | Validate configuration against Zod runtime schema. |
| `profile-aura themes` | List all 20 production themes. |
| `profile-aura templates` | List all 16 portfolio layout templates. |
| `profile-aura cache` | Clear or inspect local response cache (`--clear`). |
| `profile-aura version` | Print framework version (`v2.0.0`). |

---

## 📄 License

MIT © [Kalash Mishra](https://github.com/kalashmishra21)
