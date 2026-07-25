# Changelog

All notable changes to the Profile Aura project will be documented in this file.

## [2.0.0] - 2026-07-25

### Added
- **Phase 1-3 Core Framework Foundation**: Implemented micro-kernel architecture, centralized type system (`src/types/`), and Zod-validated configuration engine (`src/config/`).
- **Phase 4 Design System**: Added 20 production-quality visual theme presets (`black-obsidian`, `cyberpunk-neon`, `tokyo-night`, etc.) and 16 layout templates (`editorial-hero`, `bento-grid`, `minimalist-compact`, etc.).
- **Phase 5 Satori Hero Engine**: Added Satori vector SVG hero generator with data priority resolver (`HeroDataResolver`), PRNG design seed engine (`DesignSeedEngine`), and modular visual decoration components.
- **Phase 6 Data Platform & Plugin SDK**: Added 24h persistent file & memory cache (`CacheService`), multi-provider data aggregator, auto skill detector, 9 dashboard widgets, and Plugin SDK (`@profile-aura/sdk`).
- **Phase 7 CLI & Connected Build System**: Connected all systems in `CoreEngine`, added CLI subcommands (`build`, `init`, `themes`, `templates`, `plugins`, `preview`, `doctor`, `validate`, `cache`, `update`, `version`), and verified zero-error build pipeline.
