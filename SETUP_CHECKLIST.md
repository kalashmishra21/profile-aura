# ✅ Profile Aura Setup Checklist

## 🚨 **URGENT: If You Shared Your Token**

**If you accidentally shared your GitHub token publicly:**

1. ⚠️ **Revoke immediately:** https://github.com/settings/tokens
2. ✅ Delete the leaked token
3. ✅ Generate NEW token
4. ✅ Update `.env` with new token
5. ✅ Never share `.env` file or screenshots with tokens!

---

## 📋 Complete Setup Steps

### ✅ Step 1: Token Setup

- [ ] GitHub token created (scopes: `repo`, `workflow`, `read:user`)
- [ ] Token saved in `.env` as `GITHUB_TOKEN`
- [ ] Token added to GitHub Secrets as `WORKFLOW_TOKEN`
- [ ] `.env` file NOT committed to Git

### ✅ Step 2: Configuration

- [ ] `readme-aura.config.json` created
- [ ] Username updated
- [ ] AI provider configured (Gemini/OpenAI/Skip)

### ✅ Step 3: API Keys (Optional)

**Choose ONE (or skip AI features):**

- [ ] **Gemini** (FREE): https://aistudio.google.com/app/apikey
- [ ] **OpenAI** (Paid): https://platform.openai.com/api-keys
- [ ] **Skip AI** features for now

### ✅ Step 4: GitHub Settings

- [ ] Settings → Actions → General
- [ ] "Read and write permissions" enabled
- [ ] "Allow Actions to create PRs" checked

### ✅ Step 5: Local Test

```bash
# Build project
npm run build

# Test generation
node dist/cli.js build --dry-run

# Actual generation
node dist/cli.js build
```

### ✅ Step 6: Content

- [ ] `readme.source.md` created
- [ ] Personal info updated
- [ ] Tech stack added
- [ ] Cards configured

### ✅ Step 7: Push to GitHub

```bash
git add .
git commit -m "feat: Configure Profile Aura"
git push origin main
```

---

## 🎯 Your Current Status

### Configuration Files

| File | Status | Notes |
|------|--------|-------|
| `.env` | ✅ | Token: REPLACE with NEW token! |
| `readme-aura.config.json` | ✅ | Gemini enabled |
| `readme.source.md` | ⏳ | Create this next |
| `.gitignore` | ✅ | `.env` protected |

### API Keys

| Service | Key Format | Secret Name | Status |
|---------|------------|-------------|--------|
| GitHub | `ghp_...` | `WORKFLOW_TOKEN` | ⚠️ Update this! |
| Gemini | `AQ.Ab8...` | `GEMINI_API_KEY` (optional) | ✅ Looks good |

---

## 🚀 Next Actions

### Immediate (Security):

1. **Revoke leaked token:** https://github.com/settings/tokens
2. **Generate new token** with same scopes
3. **Update `.env`** with new token

### Then Continue:

4. Create `readme.source.md` from example
5. Test locally: `node dist/cli.js build`
6. Push changes to GitHub
7. Enable GitHub Actions workflow

---

## 📝 Quick Reference

### Useful Commands

```bash
# Initialize project
node dist/cli.js init

# Build README (preview)
node dist/cli.js build --dry-run

# Build README (actual)
node dist/cli.js build --verbose

# Help
node dist/cli.js --help
```

### Important Links

- GitHub Tokens: https://github.com/settings/tokens
- Gemini API: https://aistudio.google.com/app/apikey
- Repo Settings: https://github.com/kalashmishra21/profile-aura/settings

---

## ⚠️ Common Mistakes

| Mistake | Fix |
|---------|-----|
| Token in screenshot | Revoke immediately |
| `.env` committed | Remove from git history |
| Wrong permissions | Use `repo`, `read:user`, `workflow` only |
| Forgot to build | Run `npm run build` first |

---

## 🎉 When Complete

You'll have:

- ✅ Secure token setup
- ✅ Working local generation
- ✅ GitHub Actions ready
- ✅ Beautiful animated README
- ✅ Open for contributions

---

**Need help?** Check [REQUIREMENTS.md](./REQUIREMENTS.md) or [QUICKSTART.md](./QUICKSTART.md)
