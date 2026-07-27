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

## ⚡ How to Setup Your Own Profile README

If you want to generate a stunning SVG-based README for your own GitHub profile, follow these exact steps. We use a **fixed version (`v2.0.12`)** to ensure your profile always renders perfectly without breaking from future updates.

### Step 1: Create a Special Repository
1. Create a new repository on GitHub with the **exact same name as your GitHub username** (e.g., `username/username`).
2. Make sure it is **Public** and check the **"Add a README file"** box.
3. Clone this repository to your local computer.

### Step 2: Initialize Profile Aura
Open your terminal inside the cloned repository and run:
```bash
npx --yes profile-aura@latest init
```
*This command creates the necessary configuration files and the GitHub Action workflow (`.github/workflows/profile-aura.yml`) automatically.*

### Step 3: Configure Your Details
Open the newly generated `profile-aura.config.json` file and edit it to customize your theme, colors, bio, tech stack, and layout.

### Step 4: Add Your GitHub Token (Crucial for Private Data)
To fetch your total all-time contributions, private commits, PRs, and issues accurately, you must provide a GitHub Personal Access Token.

1. Go to GitHub **Developer Settings** > **Personal access tokens** > **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Set the expiration to **No expiration**.
4. Tick the following **3 scopes**:
   - ✅ **`repo`** (Required to read your private commits and PRs)
   - ✅ **`workflow`** (Required to allow the action to update workflows)
   - ✅ **`read:user`** (Required to fetch your real profile info and avatar)
5. Copy the generated token.
6. Go to your repository's **Settings > Secrets and variables > Actions**.
7. Create a New repository secret named **`WORKFLOW_TOKEN`** and paste your token.

### Step 5: Push and Generate!
Commit and push the configuration files to GitHub:
```bash
git add .
git commit -m "chore: setup profile-aura"
git push
```
That's it! The GitHub Action will automatically trigger, fetch your all-time metrics, generate the SVG files, and update your `README.md`. It will continue to run every 12 hours automatically using the stable `v2.0.12` release.

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