# Profile Aura v2 — Design Language 3.0 Specification

**Document Path**: `docs/design-language-v3.md`  
**Role**: Creative Director, Lead Product Designer & Senior UX Engineer  
**Scope**: Visual System Design, Component Blueprint, Editorial Typography & GitHub-Compatible UX Architecture.  

---

## 🎨 Part 1: Design Language Foundations

### 1. Visual Philosophy: "Handcrafted Digital Portfolio"
Profile Aura v2.0 rejects the generic "markdown statistics dump" aesthetic. The design philosophy is rooted in **Quiet Luxury, High-Contrast Precision, and Editorial Rhythm**. A Profile Aura portfolio should make visitors stop scrolling and think: *"Is this even GitHub?"* It presents developers not as raw data objects, but as high-caliber software craftsmen and open-source architects.

---

### 2. Spacing System
Built on a strict **8px Geometric Scale** to ensure visual harmony down the page:

| Token | Size | Application |
| :--- | :--- | :--- |
| `space-1` | `4px` | Micro-padding inside badges and inline code pills |
| `space-2` | `8px` | Gap between icon badges and inline text |
| `space-3` | `16px` | Inner card padding and column gutters |
| `space-4` | `24px` | Margin between section headings and card grids |
| `space-5` | `32px` | Vertical separation between major portfolio blocks (`---`) |
| `space-6` | `48px` | Hero banner top/bottom visual whitespace offset |

---

### 3. Typography Hierarchy

```
Display Header (32px / 800 weight)  ──► Hero Display Name
  ├── Sub-Header (18px / 600 weight) ──► Section Titles (### ⚡ Developer Activity)
  ├── Body Lead (14px / 400 weight)  ──► Biography & Project Descriptions
  └── Mono Caption (11px / 700 weight)──► Technical Badges & Role Pills
```

- **Primary Typeface**: Inter / SF Pro Display / System Sans-Serif
- **Monospace Typeface**: JetBrains Mono / Fira Code (Used for data metrics and skill pills)
- **Tracking**: Tight `-0.8px` letter-spacing on display headers; Wide `+2.0px` tracking on uppercase section subtitles (`// TECH MATRIX`).

---

### 4. Section Rhythm & Composition Flow
Every portfolio layout follows a **3-Act Visual Narrative**:

1. **Act 1: The Hook (Hero Banner & Status HUD)**: Instantly communicates identity, role, and current status using a Satori vector hero card.
2. **Act 2: The Proof (Metrics & Featured Artifacts)**: Demonstrates technical capability through high-impact Bento project cards and categorized skill matrices.
3. **Act 3: The Connection (Tactical Social HUD & Footer)**: Provides clear contact channels and editorial publication credits.

---

### 5. Color System

#### A. Obsidian Dark (Default Vercel Style)
- **Canvas Base**: `#09090b` (Deep Pitch Black)
- **Card Surface**: `#0e0e11` (Obsidian Layer)
- **Highlight Border**: `#27272a` (Zinc Hairline)
- **Accent Primary**: `#A855F7` (Electric Purple)
- **Accent Secondary**: `#06B6D4` (Neon Cyan)
- **Text Primary**: `#f4f4f5` (High-Contrast White)
- **Text Muted**: `#a1a1aa` (Cool Silver)

#### B. Cyberpunk 2099
- **Canvas Base**: `#050508`
- **Accent Primary**: `#ff0055` (Cyber Magenta)
- **Accent Secondary**: `#00f0ff` (High Voltage Cyan)

---

### 6. Iconography Rules
- **Style**: Line icons only (`2px` stroke width).
- **Scale**: `16px` for inline text badges; `24px` for section header icons.
- **Consistency**: High-contrast SVG line icons for platforms (GitHub, LinkedIn, Twitter, Email).

---

### 7. SVG Usage Rules
- **Engine**: Satori Vector Compiler.
- **Format**: Scalable Vector Graphics (SVG) with embedded vector paths and gradients.
- **Resolution**: Fluid `100%` width with fixed aspect ratios (`800x280` Hero card).
- **Raster Prohibition**: No PNG/JPG assets allowed except for GitHub avatar images.

---

### 8. Animation Strategy (GitHub Compatible Only)
Because GitHub strips `<style>` keyframe animations and JavaScript execution in `README.md`, animation effects must rely strictly on:
1. **Satori Radial Ambient Lighting**: Pre-rendered multi-layered gradient aura spheres (`feGaussianBlur` blur radius 30px).
2. **CSS Hover Transitions on Badges**: Shields.io interactive badge state changes on user cursor hover.

---

### 9. Card System
- **Surface Elevation**: All content blocks use isolated `#0e0e11` dark surface containers.
- **Hairline Border**: `1px solid rgba(255, 255, 255, 0.1)` with a highlighted top border (`border-top: 1px solid ${accentPrimary}`).
- **Border Radius**: Unified `12px` rounded corners across all cards.

---

### 10. Project Showcase Layout
- **Grid Structure**: 2-Column Bento Grid (`<table width="100%">` with `50%` equal-width cells).
- **Content Hierarchy**: 1. Repository Name (Bold Accent Link) $\rightarrow$ 2. Project Description $\rightarrow$ 3. Language & Star Pills.

---

### 11. Skill Visualization
- **Categorized Matrix**: Skills are grouped under bold category headers (`Frontend`, `Backend`, `DevOps`).
- **Pill Styling**: Monospace code pills (`<code>React</code>`) separated by clean inline whitespace.

---

### 12. Metrics Presentation
- **High-Impact Numbers**: Large `28px` bold numerical values for total contributions, commits, PRs, and stars.
- **Data Density**: Multi-column split tables eliminating unstyled bullet lists.

---

### 13. Responsive Behaviour
- **Fluid Layout**: All tables set to `width="100%"`.
- **Mobile Stack**: Responsive HTML table cells (`<td width="50%" valign="top">`) stack cleanly on mobile viewports without horizontal scrollbars.

---

### 14. Empty State Design
- When a user has 0 stars or 0 pinned repositories, the card renders a sleek fallback pill (`⭐ 0` or `Open source repository project.`) rather than empty whitespace.

---

### 15. Loading Strategy
- Static pre-rendering ensures instantaneous page loads. Zero client-side JavaScript execution required when visiting the profile.

---

### 16. Accessibility Rules (a11y)
- **Contrast Ratio**: Minimum `7:1` contrast ratio between body text (`#f4f4f5`) and card background (`#0e0e11`).
- **Alt Text**: All generated images specify descriptive `alt` tags (`alt="Profile Hero Banner"`).

---

### 17. Brand Voice
- **Tone**: Professional, Authoritative, Minimalist, High-Tech.
- **Tagline**: *"Profile Aura 2.0 • Flagship Editorial Portfolio Platform"*

---

### 18. Component Library Architecture

```
                               ┌─────────────────────────┐
                               │    Component Library    │
                               └────────────┬────────────┘
                                            │
   ┌──────────┬──────────┬──────────┬───────┴──┬──────────┬──────────┬──────────┐
   ▼          ▼          ▼          ▼          ▼          ▼          ▼          ▼
[Hero]   [Overview]  [Metrics]  [Projects]  [Skills]  [Timeline][Achieve.]  [Footer]
```

---

## 📐 Part 2: Reusable Component Specifications

---

### Component 1: Hero Card (`HeroComponent`)

#### Purpose
Establishes developer identity, display name, status indicator, and brand aesthetic within 3 seconds of page load.

#### Visual Hierarchy
1. Character Avatar Frame (Left)
2. Display Name & Role Label (Top Right)
3. Bio Paragraph & Key Metrics Pill Bar (Bottom Right)

#### Layout & Wireframe
```
┌────────────────────────────────────────────────────────────────────────┐
│  [ SATORI HERO CARD: 800x280 FLUID VECTOR ]                            │
│  ┌──────────┐  ROLE: FULL STACK ENGINEER & OPEN SOURCE DEVELOPER       │
│  │ AVATAR   │  NAME: NANDINI YADAV                                     │
│  │ RING     │  BIO:  Building high-performance web applications        │
│  └──────────┘  STATS: 16 REPOS | 334 COMMITS | 1 FOLLOWER              │
└────────────────────────────────────────────────────────────────────────┘
```

#### SVG Usage
Rendered via Satori as a standalone vector card `.github/assets/generated/hero.svg`.

#### Markdown Usage
```html
<div align="center">
  <img src=".github/assets/generated/hero.svg" alt="Profile Hero" width="100%" />
</div>
```

#### Reusable API Definition
```typescript
export interface HeroComponentProps {
  displayName: string;
  roles: string[];
  bio: string;
  avatarUrl: string;
  metrics: { label: string; value: string | number }[];
}
```

---

### Component 2: Overview Card (`OverviewComponent`)

#### Purpose
Summarizes location, company, website, and personal bio in a clean editorial header block.

#### Visual Hierarchy
1. Section Subtitle (`// ABOUT & BIOGRAPHY`)
2. Editorial Paragraph Text
3. Metadata Badge List (Location, Company, Website)

#### Layout & Wireframe
```
┌────────────────────────────────────────────────────────────────────────┐
│  // ABOUT & BIOGRAPHY                                                  │
│  Full Stack Software Engineer specializing in TypeScript, React, Go.   │
│  📍 India   •   🏢 Open Source Contributor   •   🌐 https://github.com │
└────────────────────────────────────────────────────────────────────────┘
```

#### Reusable API Definition
```typescript
export interface OverviewComponentProps {
  bio: string;
  location?: string;
  company?: string;
  website?: string;
}
```

---

### Component 3: Metrics Grid (`MetricsComponent`)

#### Purpose
Displays contribution totals, commit volume, PRs, issues, and star counts in structured GFM metric cards.

#### Visual Hierarchy
1. Section Title (`### ⚡ Developer Activity & Key Performance`)
2. Left Column: Performance & Contributions
3. Right Column: Community Reach & Repositories

#### Layout & Wireframe
```
<table width="100%">
<tr>
<td width="50%" valign="top">
  <h4>📊 Performance & Contributions</h4>
  - Total Contributions: `334`
  - Total Commits: `280`
  - Pull Requests: `45`
</td>
<td width="50%" valign="top">
  <h4>⭐ Community Reach & Repositories</h4>
  - Public Repositories: `16`
  - Stars Earned: `0`
  - Followers: `1`
</td>
</tr>
</table>
```

#### Reusable API Definition
```typescript
export interface MetricsComponentProps {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  publicRepos: number;
  followers: number;
}
```

---

### Component 4: Project Showcase Grid (`ProjectsComponent`)

#### Purpose
Showcases featured open-source repositories with star badges, primary language tags, and project descriptions.

#### Visual Hierarchy
1. Section Title (`### 🌟 Featured Open Source Repositories`)
2. Repository Link & Primary Language Tag
3. Italic Project Description & Star Indicator

#### Layout & Wireframe
```
- **[nandiniyadaventer05-gif](url)** `JavaScript` ⭐ `0`
  _Profile repository and automation workflow engine._

- **[OJT-PROJECT](url)** `JavaScript` ⭐ `0`
  _Full-stack web application suite._
```

#### Reusable API Definition
```typescript
export interface ProjectsComponentProps {
  repositories: {
    name: string;
    url: string;
    description: string;
    language: string | null;
    stars: number;
  }[];
}
```

---

### Component 5: Tech Matrix (`SkillsComponent`)

#### Purpose
Categorizes core developer skills, languages, frameworks, and databases into clean monospace code pills.

#### Visual Hierarchy
1. Section Title (`### ⚡ Tech Stack & Ecosystem`)
2. Category Header (`#### 🛠️ Frontend & UI`)
3. Skill Pills (`` `TypeScript` `React` `Next.js` ``)

#### Layout & Wireframe
```
#### 🛠️ Frontend & UI
`JavaScript`  `React`  `HTML5`  `CSS3`

#### 🛠️ Backend & Languages
`Python`  `Node.js`  `Express`  `Git`
```

#### Reusable API Definition
```typescript
export interface SkillsComponentProps {
  categories: {
    category: string;
    skills: string[];
  }[];
}
```

---

### Component 6: Activity Timeline (`TimelineComponent`)

#### Purpose
Presents significant career milestones, major releases, and open-source contributions chronologically.

#### Visual Hierarchy
1. Year Header (`2026`)
2. Milestone Description & Repository Link

#### Layout & Wireframe
```
- **2026**: Released Profile Aura v2.0 Open Source Platform
- **2025**: Built Smart Business Automation Engine
```

#### Reusable API Definition
```typescript
export interface TimelineComponentProps {
  events: { year: string; title: string; description: string }[];
}
```

---

### Component 7: Achievements Badge Grid (`AchievementsComponent`)

#### Purpose
Highlights GitHub achievements, streaks, and community recognition badges.

#### Visual Hierarchy
1. Streak Badge URL Embed (`https://github-readme-streak-stats...`)
2. Achievement Status Text

#### Layout & Wireframe
```html
<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=octocat&theme=black-obsidian" alt="Streak" />
</div>
```

#### Reusable API Definition
```typescript
export interface AchievementsComponentProps {
  username: string;
  themeId: string;
}
```

---

### Component 8: Editorial Footer (`FooterComponent`)

#### Purpose
Provides brand attribution, version metadata, and social connection channels.

#### Visual Hierarchy
1. Social Connection Badges (`GITHUB`, `LINKEDIN`, `EMAIL`)
2. Rule Line (`---`)
3. Publication Metadata (`Generated with Profile Aura 2.0`)

#### Layout & Wireframe
```html
<div align="center">
  <p align="center">
    <a href="..."><img src="badge.svg" alt="github" /></a>
  </p>
  <sub>Generated with <a href="...">Profile Aura 2.0</a> • Editorial Portfolio Generator</sub>
</div>
```

#### Reusable API Definition
```typescript
export interface FooterComponentProps {
  socials: Record<string, string | undefined>;
  generatorVersion: string;
}
```

---

**Sprint 5 Design Language 3.0 Specification Complete — `docs/design-language-v3.md` Generated.**
