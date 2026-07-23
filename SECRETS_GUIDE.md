# 🔐 GitHub Secrets Setup Guide

## 📌 Overview

GitHub Secrets store karein to Actions mein safely use kar sako.

---

## ⚙️ Setup Steps

### Step 1: Go to Secrets Settings

```
1. Repository pe jao: https://github.com/kalashmishra21/profile-aura
2. Click: Settings (top right)
3. Left sidebar: Secrets and variables → Actions
4. Click: "New repository secret"
```

---

## 🔑 Required Secret: WORKFLOW_TOKEN

### Why "WORKFLOW_TOKEN" and not "GITHUB_TOKEN"?

**`GITHUB_TOKEN` naam reserved hai GitHub ke liye.** Isliye hum custom naam use karte hain.

### Create WORKFLOW_TOKEN:

```
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Name: "Profile Aura Workflow"
4. Expiration: No expiration (or 1 year)
5. Scopes:
   ✅ repo (full control)
   ✅ workflow (update workflows)
   ✅ read:user (read profile)
6. Generate token
7. COPY immediately! (format: ghp_...)
```

### Add to GitHub Secrets:

```
Repository → Settings → Secrets → Actions
- Name: WORKFLOW_TOKEN
- Value: ghp_your_token_here
- Click "Add secret"
```

---

## 🤖 Optional: GEMINI_API_KEY

### Free Google Gemini AI

```
1. Go to: https://aistudio.google.com/app/apikey
2. Create API key
3. Copy key (format: AIza...)
```

### Add to GitHub Secrets:

```
- Name: GEMINI_API_KEY
- Value: AIza_your_key_here
- Click "Add secret"
```

---

## 🔄 How Workflow Uses Secrets

```yaml
# .github/workflows/generate-readme.yml

- name: Generate README
  env:
    GITHUB_TOKEN: ${{ secrets.WORKFLOW_TOKEN }}  # ← Uses WORKFLOW_TOKEN
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
    GITHUB_USERNAME: ${{ github.repository_owner }}
  run: npm run generate
```

**Magic:** `${{ secrets.WORKFLOW_TOKEN }}` automatically injects your token safely!

---

## 📋 Complete Secrets Checklist

| Secret Name | Required? | Value Format | Where to Get |
|-------------|-----------|--------------|--------------|
| `WORKFLOW_TOKEN` | ✅ Mandatory | `ghp_...` | [GitHub Settings](https://github.com/settings/tokens) |
| `GEMINI_API_KEY` | ⭕ Optional | `AIza...` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `OPENAI_API_KEY` | ⭕ Optional | `sk-proj-...` | [OpenAI Platform](https://platform.openai.com/api-keys) |

---

## 🔍 Verify Secrets

### Check if added correctly:

```
1. Settings → Secrets and variables → Actions
2. You should see:
   - WORKFLOW_TOKEN (Updated X ago)
   - GEMINI_API_KEY (if added)
```

### Security Features:

- ✅ **Encrypted** - GitHub encrypts secrets
- ✅ **Masked** - Logs show `***` instead of value
- ✅ **Private** - Only repo admin can view/edit
- ✅ **Secure** - Not accessible in forks

---

## ⚠️ Troubleshooting

### "Secret name GITHUB_TOKEN is not allowed"

**Solution:** Use `WORKFLOW_TOKEN` instead!

### "Error: Authentication failed"

**Reasons:**
1. Token not added to secrets
2. Wrong secret name (check spelling)
3. Token expired
4. Token lacks permissions

**Fix:**
1. Verify secret exists: Settings → Secrets
2. Check secret name matches workflow file
3. Regenerate token if expired
4. Ensure correct scopes selected

### "Resource not accessible by integration"

**Fix:** Enable workflow permissions:
```
Settings → Actions → General
→ Workflow permissions
→ Select "Read and write permissions" ✅
```

---

## 🎯 Quick Commands

### Local (.env file):
```bash
GITHUB_TOKEN=ghp_your_token
GITHUB_USERNAME=kalashmishra21
GEMINI_API_KEY=AIza_your_key
```

### GitHub Secrets:
```
WORKFLOW_TOKEN → ghp_your_token
GEMINI_API_KEY → AIza_your_key
```

---

## 📚 Related Docs

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)

---

## ✅ Success Checklist

- [ ] `WORKFLOW_TOKEN` created and added
- [ ] Workflow permissions enabled
- [ ] Optional AI key added (if using AI)
- [ ] Workflow runs successfully

---

**Need help?** Open an issue: https://github.com/kalashmishra21/profile-aura/issues
