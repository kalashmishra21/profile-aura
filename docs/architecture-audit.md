# Profile Aura v2 — Sprint 1 Architecture & Engineering Audit

**Document Path**: `docs/architecture-audit.md`  
**Role**: Lead Architect & Principal Systems Engineer  
**Scope**: Full Codebase Audit, Execution Flow Analysis, Dependency Mapping & Technical Debt Identification.  

---

## 1. Complete Folder Tree

```
profile-aura/
├── .github/
│   ├── assets/
│   │   └── generated/
│   │       └── hero.svg
│   └── workflows/
│       └── ci.yml
├── docs/
│   └── architecture-audit.md
├── src/
│   ├── ai/
│   │   ├── assistant.ts
│   │   ├── index.ts
│   │   └── provider.ts
│   ├── cli/
│   │   ├── commands/
│   │   │   ├── ai.ts
│   │   │   ├── build.ts
│   │   │   ├── cache.ts
│   │   │   ├── doctor.ts
│   │   │   ├── init.ts
│   │   │   ├── plugins.ts
│   │   │   ├── preview.ts
│   │   │   ├── studio.ts
│   │   │   ├── templates.ts
│   │   │   ├── themes.ts
│   │   │   ├── update.ts
│   │   │   ├── validate.ts
│   │   │   └── version.ts
│   │   └── index.ts
│   ├── components/            [DEPRECATED / UNUSED]
│   ├── config/
│   │   ├── index.ts
│   │   ├── loader.ts
│   │   └── schema.ts
│   ├── configuration/         [DUPLICATE / DEPRECATED]
│   │   ├── defaults.ts
│   │   ├── index.ts
│   │   └── loader.ts
│   ├── constants/             [EMPTY / UNUSED]
│   ├── core/
│   │   ├── context.ts
│   │   ├── engine.ts
│   │   ├── events.ts
│   │   └── index.ts
│   ├── engine/                [EMPTY DIRECTORY]
│   ├── fetchers/
│   │   ├── github.ts
│   │   ├── index.ts
│   │   ├── normalization.ts
│   │   ├── providers/
│   │   ├── skill-detector.ts
│   │   └── types.ts
│   ├── hero/
│   │   ├── decorations.tsx
│   │   ├── index.ts
│   │   ├── resolver.ts
│   │   └── seed.ts
│   ├── mcp/
│   │   ├── index.ts
│   │   └── registry.ts
│   ├── plugins/
│   │   ├── contract.ts
│   │   ├── index.ts
│   │   └── runner.ts
│   ├── renderers/
│   │   ├── index.ts
│   │   ├── markdown/
│   │   │   └── readme-renderer.ts
│   │   └── satori/
│   │       └── hero-renderer.tsx
│   ├── services/
│   │   ├── cache.ts
│   │   └── index.ts
│   ├── studio/
│   │   ├── history.ts
│   │   ├── server.ts
│   │   └── ui/
│   │       └── template.ts
│   ├── templates/
│   │   ├── definitions.ts
│   │   ├── index.ts
│   │   └── registry.ts
│   ├── themes/
│   │   ├── index.ts
│   │   ├── presets/
│   │   ├── registry.ts
│   │   ├── resolver.ts
│   │   └── tokens.ts
│   ├── types/
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── theme.ts
│   │   └── widget.ts
│   ├── utilities/            [DUPLICATE / DEPRECATED]
│   │   ├── fs.ts
│   │   ├── logger.ts
│   │   └── svg.ts
│   ├── utils/
│   │   ├── fs.ts
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   └── svg.ts
│   ├── widgets/
│   │   ├── activity/
│   │   ├── contract.ts
│   │   ├── implementations/
│   │   │   ├── blog-posts.ts
│   │   │   ├── github-stats.ts
│   │   │   ├── hero-banner.ts
│   │   │   ├── leetcode-stats.ts
│   │   │   ├── social-links.ts
│   │   │   ├── streak-counter.ts
│   │   │   ├── tech-stack.ts
│   │   │   ├── top-repositories.ts
│   │   │   └── wakatime-stats.ts
│   │   ├── index.ts
│   │   ├── integrations/
│   │   ├── registry.ts
│   │   └── skills/
│   └── index.ts
├── ARCHITECTURE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── profile-aura.config.json
├── ROADMAP.md
├── SECURITY.md
└── tsconfig.json
```

---

## 2. Entry Point of the CLI

- **Primary Executable Entry Point**: [`src/cli/index.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/cli/index.ts)
- **Compiled Output**: `dist/cli/index.js`
- **Bin Declaration**: Configured in [`package.json`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/package.json) via `"bin": { "profile-aura": "dist/cli/index.js" }`.
- **Command Framework**: Built using `commander` (`Command` instance).
- **Registered Commands**:
  - `profile-aura build [--dry-run]` $\rightarrow$ Executes [`src/cli/commands/build.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/cli/commands/build.ts)
  - `profile-aura init` $\rightarrow$ Executes [`src/cli/commands/init.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/cli/commands/init.ts)
  - `profile-aura studio` $\rightarrow$ Executes [`src/cli/commands/studio.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/cli/commands/studio.ts)
  - `profile-aura ai` $\rightarrow$ Executes [`src/cli/commands/ai.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/cli/commands/ai.ts)
  - `profile-aura doctor`, `validate`, `themes`, `templates`, `plugins`, `cache`, `update`, `version`.

---

## 3. Execution Flow (Command → README Generation)

```
[User invokes: npx profile-aura build]
                  │
                  ▼
         [src/cli/index.ts]
                  │
                  ▼
     [src/cli/commands/build.ts]
                  │
                  ▼
         [src/core/engine.ts] ──► CoreEngine.run(options)
                  │
                  ├──► 1. ConfigLoader.loadConfig()
                  ├──► 2. GitHubFetcher.fetchUserProfile(username, token)
                  ├──► 3. DataNormalizer.normalize(rawData)
                  ├──► 4. ThemeResolver.resolveTheme(themeId)
                  ├──► 5. PluginRunner.executePreRenderHooks()
                  ├──► 6. renderReadme(context)
                  │          ├──► renderSatoriHeroSvg()
                  │          └──► WidgetRegistry.renderAllWidgets()
                  ├──► 7. PluginRunner.executePostRenderHooks()
                  └──► 8. Write outputs:
                             ├──► .github/assets/generated/hero.svg
                             └──► README.md
```

---

## 4. Rendering Pipeline

The rendering pipeline is orchestrated by [`renderReadme()`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/markdown/readme-renderer.ts):

1. **Context Initialization**: `RenderContext` holds validated `config`, normalized `data`, resolved `theme`, and active `template`.
2. **Hero SVG Stage**: If `sections.hero.enabled !== false`, delegates to [`renderSatoriHeroSvg()`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/satori/hero-renderer.tsx).
3. **Widget Execution Stage**: Iterates through enabled section configuration keys (`stats`, `streak`, `techStack`, `topRepositories`, `socials`). Retrieves corresponding `WidgetDefinition` from [`WidgetRegistry`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/widgets/registry.ts) and executes `widget.render(context)`.
4. **Markdown Assembly**: Concatenates section outputs using double-newline separation (`\n\n---\n\n`).
5. **Footer Injection**: Appends standard Profile Aura footer metadata link.

---

## 5. Widget Pipeline

- **Contract Interface**: Defined in [`src/types/widget.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/types/widget.ts) (`WidgetDefinition`).
- **Registry**: Managed by singleton [`WidgetRegistry`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/widgets/registry.ts).
- **Active Implementations**:
  - `hero-banner`: Embeds `.github/assets/generated/hero.svg`.
  - `github-stats`: Formats contributions, commits, PRs, issues, and followers in GFM tables.
  - `streak-counter`: Integrates streak stats badge URL.
  - `tech-stack`: Organizes skill categories into code pill lists.
  - `top-repositories`: Renders pinned/top repositories with star counts.
  - `social-links`: Renders Shields.io social badges.
  - `leetcode-stats`, `wakatime-stats`, `blog-posts` (Integration widgets).

---

## 6. Theme Pipeline

- **Token Standard**: Defined in [`src/themes/tokens.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/themes/tokens.ts) (`ThemeTokens`).
- **Presets**: 20 production presets registered in [`src/themes/registry.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/themes/registry.ts) (`black-obsidian`, `cyberpunk-2099`, `tokyo-night`, `dracula`, `emerald-matrix`, etc.).
- **Resolver**: [`ThemeResolver.resolveTheme(themeId)`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/themes/resolver.ts) returns the target preset or falls back to `black-obsidian` if unknown.

---

## 7. Asset Generation Flow

```
[CoreEngine.run()]
       │
       ▼
[renderReadme()]
       │
       ▼
[renderSatoriHeroSvg()] ──► React JSX Layout ──► Satori Compiler ──► Raw SVG string
       │
       ▼
[writeGeneratedFiles()]
       ├──► Ensures directory exists: .github/assets/generated/
       └──► Writes file: .github/assets/generated/hero.svg (UTF-8 encoded)
```

---

## 8. SVG Generation Flow

- **Compiler**: Uses `@resvg/resvg-js` / `satori` vector engine.
- **Component Layout**: Defined in [`src/renderers/satori/hero-renderer.tsx`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/satori/hero-renderer.tsx).
- **Decorations & Overlay**: Sub-components imported from [`src/hero/decorations.tsx`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/hero/decorations.tsx) (`GlowAura`, `AccentBar`, `GridPatternOverlay`, `TechFrame`).
- **PRNG Seed Engine**: Custom seed generator in [`src/hero/seed.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/hero/seed.ts) computes deterministic gradient angles based on the user's username string.

---

## 9. Configuration Loading Flow

```
[ConfigLoader.loadConfig(customPath)]
       │
       ├──► 1. Searches for customPath or default profile-aura.config.json
       ├──► 2. Reads file content from disk using Node.js fs/promises
       ├──► 3. Parses JSON string into raw JavaScript object
       ├──► 4. Validates object against Zod schema in src/config/schema.ts
       └──► 5. Merges missing properties with default fallback object
```

---

## 10. GitHub API Usage

- **Fetcher Service**: Implemented in [`src/fetchers/github.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/fetchers/github.ts).
- **Endpoints**:
  - `GET /users/{username}` (Public user profile metadata)
  - `GET /users/{username}/repos?sort=updated&per_page=100` (Repository listing)
  - GraphQL API `https://api.github.com/graphql` (For contribution counts if token available)
- **Cache Layer**: Intercepted by [`CacheService`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/services/cache.ts) (24-hour disk cache stored in `.cache/profile-aura/`).

---

## 11. Authentication Flow

```
[GitHub Token Resolution Order]
       │
       ├──► 1. Provided via options (--token flag)
       ├──► 2. Process Environment variable: process.env.GITHUB_TOKEN
       ├──► 3. Process Environment variable: process.env.GH_TOKEN
       └──► 4. Unauthenticated Fallback (Rate Limited)
```

---

## 12. Where Tokens are Required and Why

1. **GitHub GraphQL API**: Requires `Bearer <GITHUB_TOKEN>` to query `user.contributionsCollection`.
2. **Private Repositories**: Requires token with `repo` scope if configuration sets `includePrivate: true`.
3. **High-Volume Rate Limits**: Unauthenticated REST requests are capped at **60 requests/hour/IP**. Authenticated requests raise limit to **5,000 requests/hour**.

---

## 13. Which Parts Work Without Authentication

- **Config Validation & CLI Commands**: `init`, `validate`, `themes`, `templates`, `version`, `doctor`.
- **Public GitHub REST API Fetching**: Basic profile name, public repo count, followers, following, and top public repository lists (subject to 60 req/hr rate limit).
- **Studio Dev Server**: UI editor operates locally without requiring an API key.

---

## 14. Dead Code

1. `src/engine/`: Empty directory without any implementation files.
2. `src/constants/`: Empty directory.
3. `src/components/`: Unused legacy component stubs.
4. `src/widgets/activity/`, `src/widgets/integrations/`, `src/widgets/skills/`: Empty subdirectories inside `src/widgets/`.

---

## 15. Duplicate Code

1. **Configuration Loader**: `src/config/loader.ts` AND `src/configuration/loader.ts` exist concurrently.
2. **Utility Modules**: `src/utils/` (`fs.ts`, `logger.ts`, `svg.ts`) AND `src/utilities/` (`fs.ts`, `logger.ts`, `svg.ts`) duplicate identical filesystem and logging functions.

---

## 16. Legacy Renderer Analysis

- **Previous Legacy State**: Early iterations injected raw HTML string templates with custom `style="..."` attributes and 4 leading spaces (`    <div style="...">`), causing GitHub GFM to render unparsed code block frames.
- **Current State**: The active renderer in [`src/renderers/markdown/readme-renderer.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/markdown/readme-renderer.ts) outputs clean GFM markdown without leading 4-space indentations. Legacy HTML string generators in `src/configuration/` remain unreferenced.

---

## 17. Technical Debt

1. **Module Import Paths**: Mixed imports between `.js` extensions (required by ESM NodeNext) and missing extensions in unused legacy files.
2. **Duplicate Directories**: Co-existence of `src/config/` vs `src/configuration/` and `src/utils/` vs `src/utilities/`.
3. **Zod Validation Warnings**: Soft warnings logged during partial config object parsing.

---

## 18. Missing Tests

1. **Unit Tests**:
   - `ThemeResolver`: Missing unit tests validating fallback behavior for malformed theme IDs.
   - `DataNormalizer`: Missing edge-case unit tests for zero-repository GitHub accounts.
2. **Integration Tests**:
   - CLI execution tests verifying exit codes for missing config files.
   - Satori SVG compilation tests verifying valid XML tag closure.

---

## 19. High-Risk Files

1. [`src/core/engine.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/core/engine.ts): Master orchestrator file. Modifying it can break the entire build pipeline.
2. [`src/renderers/markdown/readme-renderer.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/markdown/readme-renderer.ts): Core markdown generator. Invalid indentation breaks GFM parsing.
3. [`src/fetchers/github.ts`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/fetchers/github.ts): Direct integration point with GitHub API. Rate-limit failures cascade to empty data models.

---

## 20. Suggestions for Simplification

1. **Delete Duplicate Folders**: Remove `src/configuration/`, `src/utilities/`, `src/engine/`, `src/constants/`, and `src/components/`.
2. **Consolidate Types**: Unify `src/types/config.ts`, `theme.ts`, `widget.ts` into a single exports barrel `src/types/index.ts`.
3. **Clean Up Empty Widget Subdirectories**: Remove unused empty folders in `src/widgets/` (`activity/`, `integrations/`, `skills/`).

---

**Audit Completed — `docs/architecture-audit.md` Generated.**
