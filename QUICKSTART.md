# ⚡ Quick Start Guide

Get your README Aura Engine up and running in 5 minutes!

---

## 📦 Step 1: Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/readme-aura-engine.git
cd readme-aura-engine

# Install dependencies
npm install

# Build the project
npm run build
```

**Time:** ~2 minutes

---

## 🔑 Step 2: Get Your GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Name it "README Aura Engine"
4. Select scopes: `read:user` and `repo`
5. Generate and copy the token

**Time:** ~1 minute

---

## ⚙️ Step 3: Configure

```bash
# Initialize project (creates config files)
npm run init

# Create .env file
cp .env.example .env
```

Edit `.env`:
```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your-username
```

Edit `readme-aura.config.json`:
```json
{
  "github": {
    "username": "your-username"
  }
}
```

**Time:** ~1 minute

---

## 🎨 Step 4: Customize Your README

Edit `readme.source.md` with your content. Use aura blocks:

```markdown
# Hi, I'm Your Name! 👋

\`\`\`aura width="800" height="250"
# Profile card with avatar and stats
\`\`\`

## Tech Stack

\`\`\`tech-stack width="800" height="300" stack="react,typescript,nodejs,python"
# Your technologies
\`\`\`

## GitHub Stats

\`\`\`github-stats width="800" height="400"
# Statistics card
\`\`\`
```

**Time:** ~5 minutes (or more if you're creative!)

---

## 🚀 Step 5: Generate!

```bash
npm run generate
```

Your `README.md` is now generated with beautiful SVG cards! 🎉

**Time:** ~30 seconds

---

## 📁 Where Are My Files?

```
your-project/
├── README.md                    # ← Your generated README
├── readme.source.md            # ← Your template
└── .github/assets/generated/   # ← SVG card images
    ├── aura-0.svg
    ├── github-stats-1.svg
    └── tech-stack-2.svg
```

---

## 🔄 Set Up Auto-Updates (Optional)

### Enable GitHub Actions

The workflow is already created at `.github/workflows/generate-readme.yml`

### Add Repository Secret

1. Go to your repo → Settings → Secrets → Actions
2. Add secret: `GITHUB_TOKEN` (your PAT from Step 2)

### Configure Permissions

1. Go to Settings → Actions → General
2. Enable "Read and write permissions"

Now your README auto-updates daily! 🤖

---

## 💡 Common Customizations

### Change Colors

Edit `readme-aura.config.json`:

```json
{
  "theme": {
    "primaryColor": "#ff6b6b",
    "secondaryColor": "#4ecdc4",
    "backgroundColor": "#1a1a2e"
  }
}
```

### Add More Tech Icons

```markdown
\`\`\`tech-stack stack="react,vue,angular,svelte,nextjs,typescript,nodejs,python,go,rust,docker,kubernetes,aws,gcp,azure"
\`\`\`
```

### Enable AI Features

1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add to `.env`:
   ```bash
   OPENAI_API_KEY=sk-proj-...
   ```
3. Enable in config:
   ```json
   {
     "ai": {
       "enabled": true
     }
   }
   ```

### Change Card Sizes

```markdown
\`\`\`aura width="1000" height="300"
# Wider card
\`\`\`

\`\`\`streak width="400" height="250"
# Smaller card
\`\`\`
```

---

## 🐛 Troubleshooting

### "GitHub API rate limit exceeded"
- ✅ Make sure `GITHUB_TOKEN` is set in `.env`
- ✅ Token should have `read:user` scope

### "Failed to load fonts"
- ⚠️ This is OK! System fonts will be used
- 📥 Download Inter fonts to `assets/fonts/` for better quality

### "No tech stack icons found"
- ✅ Check your internet connection
- ✅ Icons are fetched from public CDNs

### Build errors
```bash
# Clean rebuild
npm run clean
npm install
npm run build
```

---

## 📚 Next Steps

- 📖 Read the full [README.md](./README.md)
- 🔧 Check [REQUIREMENTS.md](./REQUIREMENTS.md) for advanced setup
- 💡 Explore [examples/](./examples/) for more templates
- 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

---

## 💬 Need Help?

- 🐛 [Report a bug](https://github.com/yourusername/readme-aura-engine/issues)
- 💡 [Request a feature](https://github.com/yourusername/readme-aura-engine/issues)
- 💬 [Ask in Discussions](https://github.com/yourusername/readme-aura-engine/discussions)

---

## ✅ Checklist

- [ ] Project cloned and dependencies installed
- [ ] GitHub token obtained and added to `.env`
- [ ] `readme-aura.config.json` configured with username
- [ ] `readme.source.md` customized with your content
- [ ] First README generated successfully
- [ ] GitHub Actions configured (optional)
- [ ] Fonts downloaded for better quality (optional)
- [ ] AI features enabled (optional)

---

**🎉 Congratulations! You're all set!**

Now go make your GitHub profile stand out! ⭐
