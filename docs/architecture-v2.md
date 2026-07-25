# Profile Aura v2 — Architecture V2 Specification

**Document Path**: `docs/architecture-v2.md`  
**Role**: Principal Software Architect  
**Scope**: Core Engine Refactor, Provider Pattern, Domain Models, Architectural Layer Boundaries & Extension Strategy.  

---

## 1. System Overview & Layer Boundaries

Profile Aura v2 enforces strict unidirectional dependency layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLI / EXECUTABLE LAYER                          │
│         (src/cli/index.ts & src/cli/commands/* - zero business logic)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         CORE ENGINE LAYER                              │
│         (src/core/engine.ts - orchestrates pipeline execution)         │
└───────┬───────────────────────────┬────────────────────────────┬───────┘
        │                           │                            │
        ▼                           ▼                            ▼
┌───────────────┐           ┌───────────────┐           ┌────────────────┐
│ CONFIG LAYER  │           │PROVIDER LAYER │           │ THEME LAYER    │
│(src/config/*) │           │(src/fetchers) │           │ (src/themes/*) │
└───────────────┘           └───────┬───────┘           └────────────────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │ DOMAIN MODELS │
                            │ (src/types/*) │
                            └───────┬───────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │RENDERER LAYER │
                            │(src/renderers)│
                            └───────┬───────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │ DISK WRITERS  │
                            │ (src/utils/fs)│
                            └───────────────┘
```

---

## 2. Execution Flow

```
[CLI Command] ──► [loadAndValidateConfig] ──► [GitHubProviderFactory]
                                                      │
                                                      ├──► AnonymousGitHubProvider (No Token)
                                                      ├──► AuthenticatedGitHubProvider (Token Present)
                                                      └──► PrivateGitHubProvider (includePrivate=true)
                                                              │
                                                              ▼
                                                   [ProfileMetrics Domain Model]
                                                              │
                                                              ▼
                                                   [renderReadme(context)]
                                                              │
                                                              ├──► renderSatoriHeroSvg()
                                                              └──► WidgetRegistry.renderAll()
                                                              │
                                                              ▼
                                                    [Write SVG & README.md]
```

---

## 3. Provider Architecture

All GitHub data fetchers implement the `GitHubProvider` interface:

```typescript
export interface GitHubProvider {
  fetchMetrics(config: ProfileAuraConfig): Promise<ProfileMetrics>;
}
```

### Concrete Implementations
- **`AnonymousGitHubProvider`**: Uses unauthenticated REST Octokit calls (`GET /users/{username}` & `GET /users/{username}/repos`). Zero token required.
- **`AuthenticatedGitHubProvider`**: Uses token-authenticated Octokit calls. Increases rate limits to 5,000 req/hr.
- **`PrivateGitHubProvider`**: Executed strictly when `includePrivate: true`. Requires token or throws explicit `PRIVATE MODE FAILURE` error.
- **`GitHubProviderFactory`**: Factory singleton that evaluates `config.github.token` and `config.github.includePrivate` to instantiate the correct provider.

---

## 4. Domain Models Diagram

```
                       ┌─────────────────────────┐
                       │     ProfileMetrics      │
                       └────────────┬────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
   │   GitHubUser    │     │ContributionStats│     │   Repository    │
   ├─────────────────┤     ├─────────────────┤     ├─────────────────┤
   │ name: string    │     │ totalContribs   │     │ name: string    │
   │ username: string│     │ totalCommits    │     │ url: string     │
   │ avatarUrl: str  │     │ totalPRs        │     │ stargazerCount  │
   │ publicRepos: num│     │ totalIssues     │     │ primaryLanguage │
   └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 5. Renderer Architecture

- **Formatting Ownership**: Widgets return domain data structures or GFM templates; [`renderReadme()`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/markdown/readme-renderer.ts) owns section joining, rule lines, and SVG asset referencing.
- **Hero Renderer**: [`renderSatoriHeroSvg()`](file:///c:/Users/kalas/OneDrive/Desktop/Readme%20generator/src/renderers/satori/hero-renderer.tsx) compiles React JSX layouts into resolution-independent SVG vector graphics using Satori.

---

## 6. Folder Responsibilities

| Folder | Responsibility |
| :--- | :--- |
| **`src/cli/`** | Command-line parsing, options validation, user output. Zero business logic. |
| **`src/config/`** | Zod schema validation, default merging, JSON config file loading. |
| **`src/core/`** | Engine orchestration kernel and event execution bus. |
| **`src/fetchers/`** | GitHub API providers, caching, and data normalization. |
| **`src/renderers/`** | Satori SVG compiler and Markdown document assembly. |
| **`src/themes/`** | Visual theme token definitions and 20 production presets. |
| **`src/types/`** | Domain models, configuration types, and widget contracts. |
| **`src/widgets/`** | Modular portfolio section widget definitions and registry. |
| **`src/utils/`** | Filesystem helpers, SVG sanitization, and structured logger. |

---

## 7. Extension Points

1. **Adding a New Provider**: Create a new class implementing `GitHubProvider` in `src/fetchers/providers/` and register in `GitHubProviderFactory`.
2. **Adding a New Theme**: Add a new `ThemeTokens` object preset in `src/themes/presets/` and register in `ThemeRegistry`.
3. **Adding a New Widget**: Implement `WidgetDefinition` in `src/widgets/implementations/` and call `WidgetRegistry.register()`.

---

**Architecture V2 Refactor Complete — `docs/architecture-v2.md` Generated.**
