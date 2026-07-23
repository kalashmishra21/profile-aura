# 📋 Requirements & Setup Guide

This document lists all the tokens, APIs, and fonts you need to collect manually to use the README Aura Engine.

---

## 🔑 Required API Tokens

### 1. GitHub Personal Access Token (PAT)

**Required for:** Fetching your GitHub profile data, repositories, contributions, and statistics.

**How to get it:**
1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name (e.g., "README Aura Engine")
4. Select the following scopes:
   - ✅ `read:user` - Read user profile data
   - ✅ `repo` - Read repository data (only needed if you want private repo stats)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

**Where to use it:**
- Set as `GITHUB_TOKEN` in your `.env` file
- Or set as `GH_TOKEN` environment variable
- Or add to GitHub Actions secrets as `GITHUB_TOKEN` (automatically available)

**Example:**
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🌐 API Resources for Tech Stack Icons

### 2. Simple Icons API

**Required for:** Fetching brand icons for technologies.

**How to use:**
- No API key required! ✨
- Public CDN: `https://unpkg.com/simple-icons@latest/icons.json`
- Website: [https://simpleicons.org/](https://simpleicons.org/)
- Browse available icons: [https://simpleicons.org/](https://simpleicons.org/)

**Supported Technologies:**
- 2,900+ brand icons
- Includes: React, Vue, Node.js, Python, Docker, AWS, and more

---

### 3. SVGL (Next-gen Icon Library)

**Required for:** Alternative/additional tech stack icons.

**How to use:**
- No API key required! ✨
- Public API: `https://svgl.app/api/svgs`
- Website: [https://svgl.app/](https://svgl.app/)

**Features:**
- Modern, high-quality SVG icons
- Complementary to Simple Icons
- Automatic fallback if Simple Icons doesn't have an icon

---

## 📊 GitHub APIs

### 4. GitHub GraphQL API

**Required for:** Advanced statistics (contributions, streak data).

**Endpoint:** `https://api.github.com/graphql`

**How to use:**
- Uses the same `GITHUB_TOKEN` from step 1
- No additional setup required
- Automatically used by the engine

**Documentation:**
- [GitHub GraphQL API Docs](https://docs.github.com/en/graphql)
- [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)

---

## 🤖 AI Features (Optional)

### 5. OpenAI API Token

**Required for:** AI-powered commit summaries and project insights.

**How to get it:**
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key immediately

**Where to use it:**
```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Pricing:**
- GPT-4 Turbo: ~$0.01-0.03 per API call
- Usually costs less than $0.10/day for README generation

**Alternative:**
- Set `ai.enabled: false` in config to skip AI features

**Supported Models:**
- `gpt-4-turbo-preview` (default)
- `gpt-4`
- `gpt-3.5-turbo`

---

### 6. Anthropic Claude API (Alternative to OpenAI)

**Required for:** AI features using Claude instead of GPT.

**How to get it:**
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up for API access
3. Generate an API key

**Where to use it:**
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Config:**
```json
{
  "ai": {
    "enabled": true,
    "provider": "anthropic",
    "apiKey": "sk-ant-..."
  }
}
```

**Note:** Currently, the engine is optimized for OpenAI. Anthropic support requires minor adjustments.

---

## 🔤 Fonts

### 7. Inter Font Family

**Required for:** Rendering text in SVG cards.

**Download:**
- Official site: [https://rsms.me/inter/](https://rsms.me/inter/)
- Direct download: [https://github.com/rsms/inter/releases](https://github.com/rsms/inter/releases)

**Files needed:**
- `Inter-Regular.ttf` (400 weight)
- `Inter-SemiBold.ttf` (600 weight)
- `Inter-Bold.ttf` (700 weight)

**Where to place:**
```
assets/fonts/
  ├── Inter-Regular.ttf
  ├── Inter-SemiBold.ttf
  └── Inter-Bold.ttf
```

**Alternative Download (Google Fonts):**
1. Go to [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
2. Click "Download family"
3. Extract and copy the TTF files

---

### 8. JetBrains Mono (Optional)

**Required for:** Code/monospace text in SVG cards (optional enhancement).

**Download:**
- Official site: [https://www.jetbrains.com/lp/mono/](https://www.jetbrains.com/lp/mono/)
- Direct download: [https://github.com/JetBrains/JetBrainsMono/releases](https://github.com/JetBrains/JetBrainsMono/releases)

**Files needed:**
- `JetBrainsMono-Regular.ttf`
- `JetBrainsMono-Bold.ttf`

---

## 🔐 GitHub Actions Setup

### 9. Repository Secrets

If using GitHub Actions to auto-generate your README:

**Go to:** `Your Repo → Settings → Secrets and variables → Actions`

**Add these secrets:**

| Secret Name | Value | Required? |
|------------|-------|-----------|
| `GITHUB_TOKEN` | GitHub PAT from step 1 | ✅ Yes (or use default) |
| `OPENAI_API_KEY` | OpenAI key from step 5 | ⭕ Optional |

**Note:** `GITHUB_TOKEN` is automatically provided by GitHub Actions, but with limited permissions. For full stats, use a custom PAT.

---

## 📦 Installation Checklist

- [ ] Node.js 18+ installed
- [ ] GitHub Personal Access Token created
- [ ] Fonts downloaded and placed in `assets/fonts/`
- [ ] `.env` file created with tokens
- [ ] `readme-aura.config.json` configured with your username
- [ ] Dependencies installed (`npm install`)
- [ ] Built TypeScript (`npm run build`)

---

## 🚀 Quick Start

```bash
# Clone or initialize project
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your tokens
nano .env

# Download fonts to assets/fonts/
# (See section 7 above)

# Initialize project
npm run init

# Generate README
npm run generate
```

---

## 🔧 Troubleshooting

**"GitHub API rate limit exceeded"**
- Make sure you're using a valid `GITHUB_TOKEN`
- Authenticated requests have 5,000 requests/hour vs 60 for unauthenticated

**"Failed to load fonts"**
- Ensure fonts are in `assets/fonts/` directory
- Check file names match exactly (case-sensitive)
- The engine will use system fonts as fallback

**"No tech stack icons found"**
- Check your internet connection
- Simple Icons and SVGL are fetched from public CDNs
- The engine generates text badges as fallback

**"AI features not working"**
- Verify `OPENAI_API_KEY` is set correctly
- Check you have API credits
- Set `ai.enabled: false` to disable if not needed

---

## 📚 Additional Resources

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [GitHub GraphQL API Docs](https://docs.github.com/en/graphql)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Satori Documentation](https://github.com/vercel/satori)
- [Simple Icons](https://simpleicons.org/)

---

## 💡 Tips

1. **Start Simple:** Begin without AI features, add them later
2. **Test Locally:** Run `npm run generate` locally before setting up GitHub Actions
3. **Use Dry Run:** Test with `--dry-run` flag to preview without writing files
4. **Cache Icons:** Icons are cached after first fetch for better performance
5. **Rate Limits:** The engine respects GitHub API rate limits automatically

---

Need help? Check the [main README](./README.md) or open an issue on GitHub!
