# Profile Aura 2.0 — Architecture Overview

Profile Aura is engineered as an extensible, decoupled **Developer Portfolio Platform**:

```
[CLI Binary]
      │
      ▼
[Config Loader (Zod Schema)]
      │
      ▼
[Data Platform & 24h Cache Engine] ──► [GitHub GraphQL/REST & Third-Party APIs]
      │
      ▼
[Theme Resolver] ──► [20+ Theme Presets]
      │
      ▼
[Template Resolver] ──► [16+ Layout Templates]
      │
      ▼
[Satori Vector SVG Hero Engine] ──► `.github/assets/generated/hero.svg`
      │
      ▼
[Widget Engine & Markdown Assembler] ──► `README.md`
```

## Core Modules

1. **`src/core/`**: Orchestration kernel, Event Bus, and Execution Context.
2. **`src/hero/`**: Satori SVG Hero card renderer, priority enforcer (`HeroDataResolver`), and PRNG seed engine (`DesignSeedEngine`).
3. **`src/themes/`**: Token-based design engine with 20 production presets.
4. **`src/templates/`**: Grid rules, slot definitions, and 16 layout templates.
5. **`src/widgets/`**: Reusable markdown widget implementations.
6. **`src/services/`**: Persistent file and memory caching.
7. **`src/plugins/`**: Plugin SDK and lifecycle hook runner.
