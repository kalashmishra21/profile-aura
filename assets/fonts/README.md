# Fonts Directory

This directory should contain the font files used for rendering SVG cards.

## Required Fonts

### Inter Font Family

Download from: [https://rsms.me/inter/](https://rsms.me/inter/)

**Required files:**
- `Inter-Regular.ttf` (400 weight)
- `Inter-SemiBold.ttf` (600 weight)
- `Inter-Bold.ttf` (700 weight)

### Alternative Download Sources

1. **Google Fonts:**
   - [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
   - Click "Download family" → Extract TTF files

2. **GitHub Releases:**
   - [Inter Releases](https://github.com/rsms/inter/releases)
   - Download latest version → Find TTF files in archive

## Installation

1. Download the font files
2. Place them in this directory:

```
assets/fonts/
├── Inter-Regular.ttf
├── Inter-SemiBold.ttf
└── Inter-Bold.ttf
```

3. Verify the files are named exactly as shown above

## Optional Fonts

### JetBrains Mono (for code/monospace text)

Download from: [https://www.jetbrains.com/lp/mono/](https://www.jetbrains.com/lp/mono/)

Files:
- `JetBrainsMono-Regular.ttf`
- `JetBrainsMono-Bold.ttf`

## Fallback Behavior

If fonts are not found:
- The engine will use system fonts as fallback
- SVGs will still be generated (without custom fonts)
- A warning will be displayed during build

## Troubleshooting

**Fonts not loading?**
- Check file names are correct (case-sensitive)
- Ensure files are in TTF format (not OTF or WOFF)
- Verify file paths are relative to project root

**Different font preference?**
- Edit `src/engine/renderer.ts`
- Update font loading configuration
- Add your custom font files to this directory
