# Profile Aura v2 — The North Star Prototype Specification

**Document Path**: `docs/north-star-readme.md`  
**Role**: Award-Winning Lead Product Designer (Vercel, Linear, Stripe, Framer, Raycast & Arc Browser Design Veteran)  
**Scope**: The Definitive Visual Vision & Architectural Prototype for Profile Aura.  

---

## 🌟 Executive Design Vision

The **North Star Prototype** represents the absolute pinnacle of GitHub profile design. It transcends traditional markdown documents to create an **editorial luxury portfolio** that feels like a live SaaS landing page directly inside GitHub.

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   P R O F I L E   A U R A   v 2 . 0   •   N O R T H   S T A R      │
│                                                                        │
│   [ SATORI 3.0 VECTOR HERO CARD: CINEMATIC RADIANT OBSIDIAN DISPLAY ]   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│   01 / EXECUTIVE BIOGRAPHY & METADATA                                  │
│   Full Stack Software Engineer & Systems Architect crafting high-      │
│   performance web platforms, compiler toolchains, and visual UI.       │
│   📍 India  •  🏢 Open Source Lead  •  🌐 https://kalashmishra.dev    │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   02 / PERFORMANCE & COMMUNITY METRICS                                 │
│   ┌──────────────────────────┐ ┌──────────────────────────┐             │
│   │ 📊 334 Total Activity    │ │ ⭐ 1,240 Total Stars     │             │
│   │ 280 Commits | 45 PRs     │ │ 16 Repos | 1,420 Followers│             │
│   └──────────────────────────┘ └──────────────────────────┘             │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   03 / FEATURED ARTIFACTS & REPOSITORIES                               │
│   ┌──────────────────────────────────┐ ┌───────────────────────────┐  │
│   │ 📦 profile-aura                  │ │ 📦 ecommerce-automation   │  │
│   │ TypeScript • ⭐ 142 • 🍴 24      │ │ Python • ⭐ 89 • 🍴 12      │  │
│   │ Editorial Profile Engine         │ │ Automation Workflow Hub   │  │
│   └──────────────────────────────────┘ └───────────────────────────┘  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   04 / TECH MATRIX & ECOSYSTEM                                         │
│   // LANGUAGES:   TypeScript • Go • Rust • Python • C++                │
│   // FRAMEWORKS:  React • Next.js • Node.js • TailwindCSS • Docker     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   05 / CONNECT & SOCIAL HUD                                            │
│   [ GITHUB ]      [ LINKEDIN ]      [ TWITTER ]      [ EMAIL ]         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📐 Section-by-Section Architectural Rationale

### 1. Satori 3.0 Vector Hero Card
- **Why it exists**: The Hero Card is the single most critical element of the portfolio. Visitors form an impression within **3 seconds**. The North Star Hero combines an HSL gradient avatar ring, high-contrast display typography (`32px` ultra-bold), status indicators (`● AVAILABLE FOR OPPORTUNITIES`), and radiant ambient lighting to establish instant authority.
- **Pixel Rationale**: The `800x280` aspect ratio ensures full-bleed container filling without pushing the first section off-screen on laptop viewports.

---

### 2. Executive Biography & Metadata Block
- **Why it exists**: Provides an immediate textual narrative of *who* the developer is, *what* they specialize in, and *where* they are located. Eliminates fluff by grouping location, company, and portfolio links into an editorial inline badge row.
- **Pixel Rationale**: Uses `14px` body text with `1.6` line-height to maximize readability against the `#09090b` canvas.

---

### 3. Performance & Community Metrics Grid
- **Why it exists**: Quantifies developer velocity and community reach. By displaying total contributions, commits, pull requests, stargazers, and followers in a 50/50 split Bento table, it proves technical capability with concrete data.
- **Pixel Rationale**: `28px` numerical display text commands visual attention, while `11px` monospace captions provide clear context.

---

### 4. Featured Artifacts (Bento Project Grid)
- **Why it exists**: Direct proof of work. Demonstrates code quality and popular open-source projects. Each card highlights the primary language tag, star count, fork count, and a 1-line project summary.
- **Pixel Rationale**: 2-Column responsive Bento grid (`50%` cell width) ensures balanced visual weight across screens.

---

### 5. Tech Matrix & Ecosystem Grid
- **Why it exists**: Communicates the developer's tech stack categorized by domain (Languages, Frameworks, Cloud, Tooling). Uses high-contrast monospace code pills to organize skills cleanly without unstyled text walls.
- **Pixel Rationale**: Categorized headings with uppercase tracked subtitles (`// LANGUAGES`) create distinct visual anchor points down the page.

---

### 6. Tactical Social Connection HUD & Editorial Footer
- **Why it exists**: Provides friction-free communication channels for recruiters, collaborators, and open-source sponsors, anchored by Profile Aura's signature publication attribution footer.
- **Pixel Rationale**: Shields.io badges styled in HSL theme primary colors (`#A855F7`) harmonize with the top hero card.

---

## 🎨 Visual System Specifications

### Typography Hierarchy Scale
- **Hero Title**: `32px` / Weight `800` / Tracking `-0.8px`
- **Section Heading**: `18px` / Weight `700` / Tracking `-0.4px`
- **Body Paragraph**: `14px` / Weight `400` / Line Height `1.6`
- **Monospace Code Pill**: `11px` / Weight `600` / Font Family `JetBrains Mono`

### Spacing Token Annotations
- **Section Separation**: `32px` vertical margin between major blocks (`---`).
- **Inner Card Padding**: `16px` inner cell padding.
- **Grid Gaps**: `12px` border-spacing between Bento cells.

### Color Palette (Obsidian Luxury)
- **Canvas Base**: `#09090b`
- **Card Surface**: `#0e0e11`
- **Top Border Highlight**: `1px solid rgba(255, 255, 255, 0.1)`
- **Accent Primary**: `#A855F7` (Electric Purple)
- **Accent Secondary**: `#06B6D4` (Neon Cyan)
- **Text Primary**: `#f4f4f5`
- **Text Muted**: `#a1a1aa`

---

**North Star Prototype Specification Complete — `docs/north-star-readme.md` Generated.**
