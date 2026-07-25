# 🎨 Themes and Layouts Guide

Profile Aura supports **multiple themes** and **layouts** to create a unique, anime-inspired premium portfolio README.

---

## 🎭 Available Themes

### Built-in Theme Presets

Simply set `"theme": "theme-name"` in your `profile-aura.config.json`:

#### 1. **Blue Minimal** (`blue-minimal`)
- Clean, professional blue gradient
- Perfect for tech portfolios
- Colors: `#3b82f6`, `#60a5fa`, `#93c5fd`

#### 2. **Black Premium** (`black-premium`)
- Elegant black and white
- Minimalist and premium feel
- Colors: `#ffffff`, `#e5e5e5`, `#a3a3a3`

#### 3. **White Clean** (`white-clean`)
- Light mode theme
- Clean and modern
- Colors: `#1f2937`, `#4b5563`, `#6b7280`

#### 4. **Purple Cyber** (`purple-cyber`)
- Cyberpunk vibes
- Futuristic purple gradient
- Colors: `#a855f7`, `#c084fc`, `#e879f9`

#### 5. **Red Akatsuki** (`red-akatsuki`)
- Bold red anime-inspired
- Dramatic and powerful
- Colors: `#ef4444`, `#f87171`, `#fca5a5`

#### 6. **Ocean** (`ocean`)
- Calming ocean blue
- Professional with personality
- Colors: `#06b6d4`, `#22d3ee`, `#67e8f9`

#### 7. **Sunset** (`sunset`)
- Warm orange gradient
- Energetic and creative
- Colors: `#f97316`, `#fb923c`, `#fdba74`

#### 8. **Glassmorphism** (`glassmorphism`)
- Modern frosted glass effect
- Trendy and elegant
- Semi-transparent design

#### 9. **Neon** (`neon`)
- Vibrant neon colors
- Eye-catching and modern
- Colors: `#22d3ee`, `#a855f7`, `#ec4899`

---

## 📐 Available Layouts

Set `"layout": "layout-name"` in your config:

### 1. **Hero** (`hero`) ⭐ Recommended
- Large hero section with avatar
- Best for premium portfolio feel
- Dimensions: 1600x800

### 2. **Character Left** (`character-left`)
- Avatar on left, content on right
- Traditional layout
- Dimensions: 1200x600

### 3. **Character Right** (`character-right`)
- Avatar on right, content on left
- Balanced asymmetry
- Dimensions: 1200x600

### 4. **Centered** (`centered`)
- Everything centered
- Clean and focused
- Dimensions: 1000x650

### 5. **Split** (`split`)
- 50/50 split design
- Modern magazine style
- Dimensions: 1400x700

### 6. **Magazine** (`magazine`)
- Editorial layout
- Compact and stylish
- Dimensions: 1200x550

### 7. **Profile** (`profile`)
- Compact profile card
- Quick overview style
- Dimensions: 1000x500

### 8. **Landing** (`landing`)
- Full landing page style
- Maximum impact
- Dimensions: 1800x900

### 9. **Poster** (`poster`)
- Vertical poster design
- Anime character showcase
- Dimensions: 900x1200

---

## 🛠️ Usage Examples

### Using a Theme Preset

```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": "purple-cyber",
  "layout": "hero"
}
```

### Custom Theme

Create your own color scheme:

```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": {
    "mode": "dark",
    "primaryColor": "#ff6b6b",
    "secondaryColor": "#4ecdc4",
    "accentColor": "#ffe66d",
    "backgroundColor": "#1a1a2e",
    "backgroundGradient": "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    "textColor": "#eaeaea",
    "secondaryTextColor": "#a8a8a8",
    "borderRadius": 20,
    "glowEffect": true,
    "animation": true,
    "shadow": "0 20px 60px rgba(255, 107, 107, 0.3)"
  }
}
```

### Custom Layout

Fine-tune layout settings:

```json
{
  "layout": {
    "template": "hero",
    "characterPosition": "right",
    "headerAlign": "left",
    "spacing": "spacious",
    "width": 1800,
    "height": 900
  }
}
```

---

## 🎨 Profile Customization

### Override Display Information

```json
{
  "profile": {
    "name": "Kalash Mishra",
    "about": "Passionate developer building AI tools and beautiful experiences.",
    "roles": [
      "Software Engineer",
      "Open Source Contributor",
      "ML Engineer"
    ],
    "location": "India",
    "company": "Your Company",
    "website": "https://yourwebsite.com",
    "email": "your@email.com",
    "socials": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "twitter": "https://twitter.com/yourhandle"
    }
  }
}
```

**Priority System:**

- **Name**: config.profile.name > GitHub display name > username
- **About**: config.profile.about > GitHub bio > placeholder
- **Roles**: Always from config (no auto-detection)
- **Location/Company/Website**: config overrides GitHub data

---

## 📝 Section Configuration

Control what appears in your README:

```json
{
  "sections": {
    "header": {
      "enabled": true,
      "showAvatar": true,
      "showBio": true,
      "showRoles": true,
      "showStats": true,
      "showSocials": true
    },
    "techStack": {
      "enabled": true,
      "autoDetect": true
    },
    "stats": {
      "enabled": true,
      "show": ["contributions", "commits", "prs", "issues", "stars", "streak"]
    },
    "languages": {
      "enabled": true,
      "limit": 8,
      "showPercentage": true
    }
  }
}
```

---

## 🎯 Quick Start Examples

### Minimal Setup

```json
{
  "github": {
    "username": "yourusername"
  }
}
```
Auto-generates a unique theme based on your username!

### Professional Blue

```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": "blue-minimal",
  "layout": "hero"
}
```

### Anime-Inspired Red

```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": "red-akatsuki",
  "layout": "poster"
}
```

### Modern Glassmorphism

```json
{
  "github": {
    "username": "yourusername"
  },
  "theme": "glassmorphism",
  "layout": "centered"
}
```

---

## 🚀 Pro Tips

1. **Match Theme to Brand**: Choose colors that match your personal brand
2. **Layout for Purpose**: Use `hero` for portfolios, `profile` for quick overviews
3. **Custom About**: Write a compelling custom about text instead of using GitHub bio
4. **Roles Matter**: Add 2-3 clear role titles that represent you best
5. **Social Links**: Add all relevant platforms for maximum discoverability

---

## 🎨 Theme Combinations

### Best Pairings

| Theme | Best Layout | Use Case |
|-------|-------------|----------|
| `blue-minimal` | `hero` | Professional portfolio |
| `black-premium` | `magazine` | Minimalist showcase |
| `purple-cyber` | `split` | Tech/gaming profile |
| `red-akatsuki` | `poster` | Anime-inspired |
| `ocean` | `centered` | Calming, focused |
| `neon` | `landing` | Bold statement |
| `glassmorphism` | `character-right` | Modern trendy |

---

## 📚 Full Configuration Reference

See `config.examples.json` for complete examples of all configuration options.

---

## 🆘 Need Help?

- Check `config.examples.json` for working examples
- Visit [GitHub Issues](https://github.com/kalashmishra21/profile-aura/issues)
- Read the main [USAGE.md](./USAGE.md) for general documentation

---

**Made with ❤️ by Profile Aura**
