<div align="center">
  <img src="https://raw.githubusercontent.com/kalashmishra21/profile-aura/main/assets/logo.jpg" width="300" alt="Profile Aura Logo" />
  <h1>profile-aura</h1>
  <p><b>Next-Gen GitHub README Generator — Render React/JSX components to insanely beautiful SVG</b></p>

  <a href="https://www.npmjs.com/package/profile-aura"><img src="https://img.shields.io/npm/v/profile-aura?style=flat-square&color=38bdf8" alt="NPM Version" /></a>
  <a href="https://github.com/kalashmishra21/profile-aura/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/profile-aura?style=flat-square&color=a855f7" alt="License" /></a>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
</div>

<br />

## 🔥 Features

- ⚛️ **React/JSX Based** - Write familiar components with flexbox, gradients, and shadows.
- 🎨 **Pixel-Perfect SVG** - Renders beautiful vector graphics with glassmorphism and drop shadows.
- 🚀 **GitHub Actions CI** - Auto-rebuilds and pushes on a cron schedule. No Vercel deployment needed!
- 🌌 **Live Wallpapers** - Uses SVG `<defs>` and ID-targeted CSS animations for floating cards and glowing auras (Bypasses GitHub's Camo sanitizer).
- 🔒 **Anonymous & Private Mode** - Scrapes public data automatically if no token is provided, or uses `WORKFLOW_TOKEN` for deep private commit analysis.

---

## ⚡ Quick Start

### Step 1: Initialize in your `.github/` or `MY README` repository
```bash
npx profile-aura@latest init
```

### Step 2: Configure
Edit `profile-aura.config.json` to customize your theme, colors, and layout.

### Step 3: Build & Deploy
```bash
npx profile-aura@latest build
```
*(This command will automatically run in GitHub Actions every day to keep your streak and stats live!)*

### 🔑 GitHub Token Configuration

To fetch your private contributions, commits, PRs, and issues accurately, you must provide a GitHub Personal Access Token.

1. Go to **Developer Settings** > **Personal access tokens** > **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Tick the following **3 scopes**:
   - ✅ **`repo`** (Required to read your private commits and PRs)
   - ✅ **`workflow`** (Required to allow the action to update workflows)
   - ✅ **`read:user`** (Required to fetch your real profile info and avatar)
4. Copy the generated token.
5. Go to your repository's **Settings > Secrets and variables > Actions**.
6. Create a New repository secret named **`WORKFLOW_TOKEN`** and paste your token. 

---

## 💎 The Aesthetics (Glassmorphism & Neon)
`profile-aura` doesn't just generate flat SVGs. It uses advanced Satori rendering coupled with raw SVG injections:
- **Radial Gradients**: Deep space backgrounds (`<radialGradient>`)
- **Glassmorphism**: Semi-transparent backgrounds (`rgba(0,0,0,0.4)`) with backdrop shadows (`<feDropShadow>`).
- **Glows**: Intense neon filters (`<feGaussianBlur>` + `<feMerge>`).

## 🛠️ Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Satori](https://img.shields.io/badge/-Satori-FF4154?style=flat-square)

---
<div align="center">
Made with ❤️ by Kalash Mishra
</div>