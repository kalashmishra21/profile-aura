# Usage Guide

Complete guide to using Profile Aura for creating animated GitHub profile READMEs.

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Commands](#commands)
- [Configuration](#configuration)
- [Aura Blocks](#aura-blocks)
- [GitHub Actions](#github-actions)
- [Troubleshooting](#troubleshooting)

## Quick Start

**1. Initialize your project:**
```bash
npx profile-aura init
```

This will:
- Detect your GitHub username from git config
- Auto-detect tech stack from `package.json`
- Create `readme.source.md` template
- Create `profile-aura.config.json` config file
- Optionally setup GitHub Actions workflow

**2. Build your README:**
```bash
npx profile-aura build
```

**3. Commit and push:**
```bash
git add .
git commit -m "feat: add animated profile"
git push
```

Done! Your animated README is live.

## Installation

### Option 1: NPX (No Installation)
```bash
npx profile-aura init
npx profile-aura build
```

**Pros:** No installation, always latest version
**Cons:** Slightly slower (downloads on each run)

### Option 2: Global Install
```bash
npm install -g profile-aura
profile-aura init
profile-aura build
```

**Pros:** Faster execution, shorter commands
**Cons:** Need to update manually (`npm update -g profile-aura`)

### Option 3: Project Dependency
```bash
npm install profile-aura
npx profile-aura init
npx profile-aura build
```

**Pros:** Locked version in package.json
**Cons:** Takes up node_modules space

## Commands

### `init` - Initialize Project

```bash
npx profile-aura init
```

**What it does:**
- Detects username from `.git/config`
- Scans `package.json` for technologies
- Creates `readme.source.md` with example blocks
- Creates `profile-aura.config.json` with defaults
- Optionally creates GitHub Actions workflow

**Interactive prompts:**
1. GitHub username (auto-detected)
2. Select technologies (auto-detected + manual selection)
3. Setup GitHub Actions? (yes/no)

### `build` - Generate README

```bash
npx profile-aura build [options]
```

**Options:**
- `--config <path>` - Custom config file (default: `profile-aura.config.json`)
- `--dry-run` - Preview without writing files
- `--verbose` - Show detailed logs
- `--help` - Show help

**Examples:**
```bash
# Basic build
npx profile-aura build

# Custom config
npx profile-aura build --config my-config.json

# Dry run (preview only)
npx profile-aura build --dry-run

# Verbose output
npx profile-aura build --verbose
```

**What it generates:**
- `README.md` - Final README
- `.github/assets/generated/*.svg` - SVG card files

## Configuration

### Config File: `profile-aura.config.json`

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

### GitHub Token (Optional)

**Why:** Increase API rate limit from 60 to 5000 requests/hour

**How to create:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Profile Aura")
4. **No scopes needed** for public data
5. Copy token and add to `.env`:

```env
GITHUB_TOKEN=ghp_your_token_here
```

Or add directly to config:
```json
{
  "github": {
    "token": "ghp_your_token_here"
  }
}
```

### Theme Customization

**Preset Themes:**

```json
// Purple Gradient (default)
{
  "primaryColor": "#667eea",
  "secondaryColor": "#764ba2",
  "accentColor": "#f093fb"
}

// Ocean Blue
{
  "primaryColor": "#4facfe",
  "secondaryColor": "#00f2fe",
  "accentColor": "#43e97b"
}

// Sunset
{
  "primaryColor": "#fa709a",
  "secondaryColor": "#fee140",
  "accentColor": "#30cfd0"
}

// Neon
{
  "primaryColor": "#ff0080",
  "secondaryColor": "#7928ca",
  "accentColor": "#ff4d4d"
}
```

## Aura Blocks

Aura blocks are special code blocks in `readme.source.md` that get replaced with SVG cards.

### 1. Profile/Header Card

Shows avatar, name, username, and basic stats.

```markdown
\`\`\`aura width="800" height="250"
\`\`\`
```

**Props:**
- `width` - Card width (default: 800)
- `height` - Card height (default: 250)

**Shows:**
- Profile picture
- Name
- Username
- Repos count
- Followers
- Stars

### 2. Tech Stack Card

Shows your technologies with colorful icons.

```markdown
\`\`\`tech-stack width="800" height="300"
react, typescript, nodejs, python, javascript, html, css, git
\`\`\`
```

**Props:**
- `width` - Card width (default: 800)
- `height` - Card height (default: 300)
- Content: Comma-separated list of technologies

**Supported Technologies (70+):**
- react, vue, angular, svelte, nextjs
- nodejs, python, java, go, rust, php
- typescript, javascript
- mongodb, postgresql, mysql, redis
- docker, kubernetes, aws, azure, gcp
- git, github, gitlab, bitbucket
- html, css, sass, tailwind
- And many more...

### 3. GitHub Statistics Card

Shows commits, PRs, issues, and contributions (lifetime data).

```markdown
\`\`\`github-stats width="800" height="400"
\`\`\`
```

**Props:**
- `width` - Card width (default: 800)
- `height` - Card height (default: 400)

**Shows:**
- Total commits (all-time)
- Pull requests
- Issues
- Total contributions
- Stars
- Forks

### 4. Contribution Streak Card

Shows current and longest contribution streaks.

```markdown
\`\`\`streak width="700" height="350"
\`\`\`
```

**Props:**
- `width` - Card width (default: 700)
- `height` - Card height (default: 350)

**Shows:**
- Current streak (days)
- Longest streak (all-time)
- Total contributions
- Motivational message

### 5. Most Used Languages Card

Shows top 5 programming languages with percentages.

```markdown
\`\`\`languages width="800" height="450"
\`\`\`
```

**Props:**
- `width` - Card width (default: 800)
- `height` - Card height (default: 450)

**Shows:**
- Top 5 languages by repository analysis
- Percentage for each
- Colored progress bars
- Animated effects

### Complete Example

`readme.source.md`:
```markdown
# Hi, I'm John! 👋

\`\`\`aura width="800" height="250"
\`\`\`

## About Me
Software developer passionate about open source.

## Tech Stack
\`\`\`tech-stack width="800" height="300"
react, typescript, nodejs, python, docker, kubernetes, aws, postgresql
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

## Contact
- Twitter: @john
- Email: john@example.com
```

## GitHub Actions

Auto-update your README on every push or daily.

### Setup

Create `.github/workflows/profile-update.yml`:

```yaml
name: Update Profile README

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:     # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Generate README
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npx profile-aura build
      
      - name: Commit and Push
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git diff --quiet && git diff --staged --quiet || (
            git commit -m "chore: update profile README [skip ci]"
            git push
          )
```

### Triggers

**On Push:**
```yaml
on:
  push:
    branches: [ main ]
```

**Daily at Midnight:**
```yaml
on:
  schedule:
    - cron: '0 0 * * *'
```

**Manual Trigger:**
```yaml
on:
  workflow_dispatch:
```

### Prevent Infinite Loops

Add `[skip ci]` to commit message:
```yaml
git commit -m "chore: update profile README [skip ci]"
```

## Troubleshooting

### Issue: Rate Limit Error

**Error:**
```
API rate limit exceeded for user
```

**Solution:**
Add GitHub token to `.env` or config:
```env
GITHUB_TOKEN=ghp_your_token_here
```

Create token: https://github.com/settings/tokens (no scopes needed)

### Issue: SVG Not Showing

**Problem:** Cards not visible on GitHub

**Solution:**
1. Ensure SVG files are committed:
   ```bash
   git add .github/assets/generated/
   git commit -m "add SVG assets"
   git push
   ```
2. Wait 1-2 minutes for GitHub CDN to update
3. Hard refresh page (Ctrl+Shift+R)

### Issue: Tech Stack Icons Missing

**Error:**
```
Failed to load Simple Icons data, using fallback
```

**Solution:**
This is normal! Fallback uses colored circles with letters. Icons are decorative only.

### Issue: Build Errors

**Error:**
```
Error: GitHub stats not loaded
```

**Solution:**
1. Check username in config is correct
2. Check GitHub API is reachable:
   ```bash
   curl https://api.github.com/users/your-username
   ```
3. Add GitHub token if rate limited

### Issue: Longest Streak Wrong

**Problem:** Longest streak shows wrong value

**Explanation:** Profile Aura fetches **lifetime data** (all years since account creation). Other tools only show current year.

**Verify:**
Check your GitHub contribution graph for past years.

### Issue: GitHub Actions Not Working

**Problem:** Workflow not running

**Solution:**
1. Check workflow file is in `.github/workflows/`
2. Check YAML syntax is valid
3. Check Actions are enabled in repo settings
4. Manually trigger from Actions tab

### Issue: `npx` Command Not Found

**Solution:**
Update npm:
```bash
npm install -g npm@latest
```

Or use full path:
```bash
npm exec profile-aura init
```

## Advanced Usage

### Custom Config Path

```bash
npx profile-aura build --config custom-config.json
```

### Multiple Profiles

Create multiple configs for different styles:

```bash
npx profile-aura build --config dark-theme.json
npx profile-aura build --config light-theme.json
```

### Dry Run

Preview without writing files:
```bash
npx profile-aura build --dry-run
```

### Verbose Logging

See detailed logs:
```bash
npx profile-aura build --verbose
```

## Tips & Best Practices

1. **Commit `.env` to `.gitignore`** - Never commit tokens
2. **Use GitHub Actions** - Keep stats always fresh
3. **Customize colors** - Match your personal brand
4. **Keep tech stack current** - Update when you learn new tools
5. **Card dimensions** - Standard: 800×250, 800×300, 800×400
6. **Wait for CDN** - After pushing, wait 1-2 min for GitHub cache

## Need Help?

- **Bug Reports:** https://github.com/kalashmishra21/profile-aura/issues
- **Questions:** Start a [Discussion](https://github.com/kalashmishra21/profile-aura/discussions)
- **Feature Requests:** Open an [Issue](https://github.com/kalashmishra21/profile-aura/issues)

---

**Happy coding!** ✨
