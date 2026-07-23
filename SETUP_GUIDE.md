# 🚀 Complete Setup Guide

## ✅ Build Successful!

Your README Aura Engine is now built and ready to use. Follow these steps to get started.

---

## 📦 Step 1: Install React (if not already done)

The project uses React for JSX components. Make sure it's installed:

```bash
npm install react @types/react
```

---

## 🔑 Step 2: Get Your GitHub Token

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ `read:user`
   - ✅ `repo` (for private repo stats)
4. Generate and copy the token

---

## ⚙️ Step 3: Configure Environment

Create `.env` file:

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your-username

# Optional: For AI features
OPENAI_API_KEY=sk-proj-your_key_here
```

---

## 🎨 Step 4: Initialize Your Project

```bash
# Run initialization (creates config and template files)
node dist/cli.js init
```

This creates:
- `readme-aura.config.json` - Configuration file
- `readme.source.md` - Your README template  
- `.env.example` - Environment template

---

## 📝 Step 5: Customize Your README

Edit `readme.source.md` and add aura blocks:

```markdown
# Hi, I'm Your Name! 👋

\`\`\`aura width="800" height="250"
# Beautiful profile card
\`\`\`

## Tech Stack

\`\`\`tech-stack width="800" height="300" stack="react,typescript,nodejs,python,docker,aws"
\`\`\`

## GitHub Stats

\`\`\`github-stats width="800" height="400"
\`\`\`

## Contribution Streak

\`\`\`streak width="500" height="300"
\`\`\`
```

---

## 🖼️ Step 6: Download Fonts (Optional but Recommended)

For best quality, download Inter fonts:

1. Visit: https://rsms.me/inter/
2. Download the font family
3. Extract these files to `assets/fonts/`:
   - `Inter-Regular.ttf`
   - `Inter-SemiBold.ttf`
   - `Inter-Bold.ttf`

**Note:** The engine works without fonts but will use system fallback.

---

## 🚀 Step 7: Generate Your README!

```bash
# Generate README with SVG cards
node dist/cli.js build

# Or use npm script
npm run generate

# With verbose output
node dist/cli.js build --verbose

# Preview without writing files
node dist/cli.js build --dry-run
```

---

## 📂 Step 8: Check Your Output

After generation, you'll have:

```
project/
├── README.md                      # ← Your new README!
└── .github/assets/generated/      # ← SVG card images
    ├── aura-0.svg
    ├── github-stats-1.svg
    ├── tech-stack-2.svg
    └── ...
```

---

## 🤖 Step 9: Setup GitHub Actions (Optional)

For automatic README updates:

### A. Enable Workflow

The workflow file is already created at `.github/workflows/generate-readme.yml`

### B. Add Repository Secret

1. Go to: `Your Repo → Settings → Secrets and variables → Actions`
2. Click "New repository secret"
3. Name: `GITHUB_TOKEN`
4. Value: Your GitHub Personal Access Token
5. Add (for AI features - optional):
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

### C. Enable Permissions

1. Go to: `Settings → Actions → General`
2. Under "Workflow permissions":
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
3. Save

### D. Push to GitHub

```bash
git add .
git commit -m "Add README Aura Engine"
git push origin main
```

The workflow will:
- Run daily at midnight UTC
- Trigger on push to main
- Auto-commit updated README

---

## 🎯 Available Commands

```bash
# Initialize project
node dist/cli.js init

# Generate README
node dist/cli.js build

# Generate with options
node dist/cli.js build --source custom.md --output OUT.md

# Verbose mode
node dist/cli.js build --verbose

# Dry run (preview)
node dist/cli.js build --dry-run

# Show help
node dist/cli.js --help
```

---

## 🎨 Customization Options

### Theme Colors

Edit `readme-aura.config.json`:

```json
{
  "theme": {
    "primaryColor": "#ff6b6b",      // Main accent color
    "secondaryColor": "#4ecdc4",    // Secondary accent
    "accentColor": "#45b7d1",       // Highlights
    "backgroundColor": "#1a1a2e",   // Card background
    "textColor": "#f1f5f9",         // Text color
    "borderRadius": 12,             // Corner roundness
    "glowEffect": true,             // Glow on cards
    "animation": true               // Enable animations
  }
}
```

### Card Dimensions

```markdown
\`\`\`aura width="1000" height="300"
# Wider card
\`\`\`

\`\`\`streak width="400" height="250"
# Smaller card
\`\`\`
```

### Tech Stack Layout

```markdown
\`\`\`tech-stack stack="react,vue,python" layout="grid"
# Grid layout
\`\`\`

\`\`\`tech-stack stack="react,vue,python" layout="rows"
# Row layout
\`\`\`
```

### Enable AI Features

Edit `readme-aura.config.json`:

```json
{
  "ai": {
    "enabled": true,
    "provider": "openai",
    "model": "gpt-4-turbo-preview"
  }
}
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run build
```

### "GitHub API rate limit"
- Ensure `GITHUB_TOKEN` is set in `.env`
- Token needs `read:user` scope

### "Failed to load fonts"
- Download fonts to `assets/fonts/` (optional)
- Engine will use system fonts as fallback

### "AI features not working"
- Check `OPENAI_API_KEY` in `.env`
- Verify you have API credits
- Set `ai.enabled: false` to disable

### Build fails
```bash
npm run clean
npm install
npm run build
```

---

## 📚 Documentation

- **README.md** - Main documentation
- **REQUIREMENTS.md** - Detailed setup requirements
- **QUICKSTART.md** - 5-minute quick start
- **CONTRIBUTING.md** - Development guidelines
- **PROJECT_SUMMARY.md** - Complete project overview

---

## 💡 Tips

1. **Start Simple** - Use basic cards first, add AI later
2. **Test Locally** - Run `build --dry-run` to preview
3. **Version Control** - Commit your `readme.source.md`
4. **Cache Friendly** - Icons are cached after first fetch
5. **Rate Limits** - GitHub API: 5,000 requests/hour with token

---

## 🎉 You're All Set!

Your README Aura Engine is ready to create stunning GitHub profiles!

```bash
# Generate your amazing README now!
npm run generate
```

---

## 📞 Need Help?

- 📖 [Full Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/yourusername/readme-aura-engine/issues)
- 💬 [Discussions](https://github.com/yourusername/readme-aura-engine/discussions)

**Happy README building! ✨**
