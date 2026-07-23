# Changelog

All notable changes to the README Aura Engine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-23

### 🎉 Initial Release

#### Added
- **Core Engine**
  - Complete README generation system with markdown parsing
  - JSX to SVG rendering using Satori and Resvg
  - Custom aura block syntax for embedding dynamic cards

- **Card Components**
  - Profile/Header Card with avatar and quick stats
  - GitHub Statistics Card with comprehensive metrics
  - Contribution Streak Card with fire emoji animations
  - Languages Breakdown Card with progress bars
  - Tech Stack Card with auto-fetched icons
  - Recent Activity Card with latest repositories

- **Services & APIs**
  - GitHub REST API integration via Octokit
  - GitHub GraphQL API for advanced statistics
  - Simple Icons API integration (2,900+ brand icons)
  - SVGL API integration for modern SVG icons
  - OpenAI GPT-4 integration for AI-powered summaries

- **Features**
  - Unlimited tech stack support
  - Customizable themes (colors, borders, effects)
  - Glassmorphism and gradient effects
  - Automatic font loading (Inter family)
  - Icon caching for performance
  - Comprehensive error handling

- **CLI Tools**
  - `readme-aura init` - Project initialization
  - `readme-aura build` - README generation
  - Verbose logging mode
  - Dry-run mode for testing

- **GitHub Actions**
  - Automated README regeneration workflow
  - Daily scheduled updates
  - Auto-commit changes back to repository

- **Documentation**
  - Comprehensive README with examples
  - Detailed REQUIREMENTS.md with setup guide
  - CONTRIBUTING.md with development guidelines
  - Example configurations and templates

- **Developer Experience**
  - Full TypeScript support
  - Modular architecture
  - Extensible component system
  - Well-documented codebase

### Technical Stack
- Node.js 18+
- TypeScript 5.3
- Satori 0.10 (SVG rendering)
- Resvg (PNG conversion)
- Octokit (GitHub API)
- OpenAI API
- Commander.js (CLI)
- Unified/Remark (Markdown parsing)

---

## [Unreleased]

### Planned Features
- [ ] Anthropic Claude integration
- [ ] Google Gemini AI support
- [ ] GitHub Sponsors card
- [ ] Trophy/Achievement card
- [ ] Contribution heatmap visualization
- [ ] Real-time activity streaming
- [ ] Dark/light mode toggle in SVGs
- [ ] Multi-language support
- [ ] Video/GIF card support
- [ ] Interactive SVG elements
- [ ] VS Code extension
- [ ] Web-based configuration UI

### Under Consideration
- Additional theme presets
- Custom font support
- PNG/WebP output formats
- SVG animation customization
- Repository-specific stats cards
- Organization profile support
- Team statistics aggregation

---

## Version History

### Versioning Scheme

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features, backwards compatible
- **Patch (0.0.X)**: Bug fixes, minor improvements

### Release Notes

All releases are documented in [GitHub Releases](https://github.com/yourusername/readme-aura-engine/releases).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to this project.

## Support

For issues and feature requests, please use [GitHub Issues](https://github.com/yourusername/readme-aura-engine/issues).
