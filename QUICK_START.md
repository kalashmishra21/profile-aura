# 🚀 Quick Start Guide

Get your premium anime-inspired GitHub profile README in **3 steps**!

---

## Step 1: Install

```bash
npm install -g profile-aura
```

Or use directly with npx:
```bash
npx profile-aura init
```

---

## Step 2: Configure

Create `profile-aura.config.json`:

### Minimal (Auto-generates theme):
```json
{
  "github": {
    "username": "yourusername"
  }
}
```

### With Theme Preset:
```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": "purple-cyber",
  "layout": "hero"
}
```

### With Profile Customization:
```json
{
  "github": {
    "username": "yourusername"
  },
  "profile": {
    "name": "Your Name",
    "about": "Passionate developer building amazing things!",
    "roles": [
      "Software Engineer",
      "Open Source Contributor"
    ]
  },
  "theme": "blue-minimal",
  "layout": "hero"
}
```

---

## Step 3: Create Source Markdown

Create `readme.source.md`:

```markdown
# Hi, I'm Your Name! 👋

```aura width="1600" height="800"
# Premium hero header
` ``

## 👨‍💻 About Me
Your introduction here...

## 🛠️ Tech Stack

```auto-tech-stack width="800" height="350"
# Auto-detected from your repos
` ``

## 📊 GitHub Statistics

```github-stats width="800" height="500"
# Stats with streak data
` ``

## 💻 Most Used Languages

```languages width="800" height="450"
# Language breakdown
` ``
```

---

## Step 4: Build!

```bash
npx profile-aura build
```

**Done!** 🎉 Your `README.md` is generated with premium anime-inspired design!

---

## 🎨 Try Different Themes

### Professional Blue
```json
{
  "theme": "blue-minimal",
  "layout": "hero"
}
```

### Elegant Black
```json
{
  "theme": "black-premium",
  "layout": "magazine"
}
```

### Cyberpunk Purple
```json
{
  "theme": "purple-cyber",
  "layout": "split"
}
```

### Bold Red Anime
```json
{
  "theme": "red-akatsuki",
  "layout": "poster"
}
```

### Modern Glass
```json
{
  "theme": "glassmorphism",
  "layout": "centered"
}
```

### Vibrant Neon
```json
{
  "theme": "neon",
  "layout": "landing"
}
```

---

## 🎯 Pro Tips

1. **Use GitHub Token** for higher API rate limits:
   ```json
   {
     "github": {
       "username": "yourusername",
       "token": "ghp_your_token_here"
     }
   }
   ```
   Or set environment variable:
   ```bash
   export GITHUB_TOKEN=ghp_your_token_here
   ```

2. **Large Hero Dimensions** for premium feel:
   ```markdown
   ```aura width="1600" height="800"
   # Large hero header
   ` ``
   ```

3. **Customize Your Profile** to stand out:
   ```json
   {
     "profile": {
       "name": "Your Display Name",
       "about": "Write a compelling custom bio here",
       "roles": ["Role 1", "Role 2", "Role 3"]
     }
   }
   ```

4. **Match Theme to Brand** - Choose colors that represent you

5. **Rebuild Regularly** to keep stats updated:
   ```bash
   npx profile-aura build
   ```

---

## 📚 Learn More

- **All Themes**: See [THEMES_AND_LAYOUTS.md](./THEMES_AND_LAYOUTS.md)
- **Config Examples**: Check [config.examples.json](./config.examples.json)
- **Full Documentation**: Read [USAGE.md](./USAGE.md)
- **Changelog**: See [CHANGELOG_v1.2.0.md](./CHANGELOG_v1.2.0.md)

---

## 🆘 Troubleshooting

### Build Errors?
```bash
# Clear and rebuild
rm -rf dist
npm run build
npx profile-aura build
```

### API Rate Limit?
Add a GitHub token to your config or environment variables.

### Theme Not Applying?
Make sure theme name is spelled correctly (case-sensitive):
- ✅ `"theme": "purple-cyber"`
- ❌ `"theme": "purplecyber"`

---

## 🎉 That's It!

You now have a **premium anime-inspired GitHub profile README** that:

✅ Auto-fetches all data from GitHub  
✅ NO hardcoded content  
✅ Fully customizable themes  
✅ Magazine-style layouts  
✅ Large typography  
✅ Professional and unique  

**Share your profile and star the repo!** ⭐

---

**Made with ❤️ by Profile Aura**
