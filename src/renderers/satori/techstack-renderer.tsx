import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { ProfileAuraConfig, TechStackCategoryConfig } from '../../types/config.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriTechStackEngineOptions {
  config: ProfileAuraConfig;
  theme: ThemeTokens;
}

export async function renderSatoriTechStackSvg(options: SatoriTechStackEngineOptions): Promise<string> {
  const { config, theme } = options;

  const categories: TechStackCategoryConfig[] =
    config.sections.techStack?.categories || [];

  if (categories.length === 0) return '';

  const fontData = await loadFont();
  const fontConfig = fontData.byteLength > 0 ? [
    { name: 'Inter', data: fontData, weight: 400 as const, style: 'normal' as const }
  ] : [];

  // ── Layout maths ────────────────────────────────────────────────────────
  // SVG width: 800px, padding: 28px each side → inner width: 744px
  // Categories are laid out in a 2-column grid (2 per row).
  // Each category block: label + wrapping pill row.
  const PILL_H = 26;           // pill height px
  const PILL_PAD_V = 6;        // pill vertical padding
  const CAT_LABEL_H = 18;      // category label height
  const CAT_GAP = 14;          // gap between label and pills
  const BLOCK_GAP = 20;        // gap between category blocks
  const HEADER_H = 44;         // section header + margin
  const CANVAS_PAD_V = 28;

  // Estimate rows needed per category (avg pill width ~80px, max 4 per row)
  const avgPillsPerRow = 4;
  const categoryBlockH = (cat: TechStackCategoryConfig) => {
    const rows = Math.ceil(cat.skills.length / avgPillsPerRow);
    return CAT_LABEL_H + CAT_GAP + rows * (PILL_H + 6);
  };

  // Split into 2 columns, interleave
  const col1: TechStackCategoryConfig[] = [];
  const col2: TechStackCategoryConfig[] = [];
  categories.forEach((cat, i) => {
    if (i % 2 === 0) col1.push(cat);
    else col2.push(cat);
  });

  const col1H = col1.reduce((s, c) => s + categoryBlockH(c) + BLOCK_GAP, 0);
  const col2H = col2.reduce((s, c) => s + categoryBlockH(c) + BLOCK_GAP, 0);
  const contentH = Math.max(col1H, col2H);
  const totalH = CANVAS_PAD_V * 2 + HEADER_H + contentH;
  const svgHeight = Math.max(200, totalH);

  // ── Pill component ────────────────────────────────────────────────────────
  const Pill = ({ label, accent }: { label: string; accent: string }) => (
    <div
      style={{
        display: 'flex',
        padding: `${PILL_PAD_V}px 12px`,
        backgroundColor: `${accent}18`,
        border: `1px solid ${accent}40`,
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 700,
        color: theme.colors.textPrimary,
        letterSpacing: '0.3px',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </div>
  );

  // ── Category block component ──────────────────────────────────────────────
  const CategoryBlock = ({ cat, accent }: { cat: TechStackCategoryConfig; accent: string }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: `${BLOCK_GAP}px`,
      backgroundColor: `${theme.colors.cardBackground || '#000000'}EE`,
      border: `${theme.borders.widthThin || '1px'} solid ${theme.colors.border}`,
      borderTop: `2px solid ${accent}`,
      borderRadius: theme.borders.radiusMd,
      padding: '14px 16px',
      boxSizing: 'border-box'
    }}>
      <span
        style={{
          fontSize: '9px',
          fontWeight: 800,
          color: theme.colors.textMuted || accent,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: `${CAT_GAP}px`
        }}
      >
        {cat.category.toUpperCase()}
      </span>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' }}>
        {cat.skills.map((skill, si) => (
          <Pill key={si} label={skill} accent={accent} />
        ))}
      </div>
    </div>
  );

  // Alternate accent colors for visual variety between category groups
  const accentPalette = [
    theme.colors.accentPrimary,   // purple
    theme.colors.accentSecondary, // cyan
    '#3B82F6',                    // blue
    '#EAB308',                    // amber
    theme.colors.accentPrimary,
    theme.colors.accentSecondary,
    '#3B82F6'
  ];

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
        padding: `${CANVAS_PAD_V}px 28px`,
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.widthNormal} solid ${theme.colors.border}`,
        fontFamily: theme.typography.fontFamilyHeading,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: theme.colors.accentPrimary,
          fontWeight: 800,
          marginBottom: '20px'
        }}
      >
        // TECHNICAL ECOSYSTEM & STACK MATRIX
      </div>

      {/* Two-column category grid */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', width: '100%' }}>
        {/* Column 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {col1.map((cat, i) => (
            <CategoryBlock key={i} cat={cat} accent={accentPalette[i * 2] || theme.colors.accentPrimary} />
          ))}
        </div>
        {/* Column 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {col2.map((cat, i) => (
            <CategoryBlock key={i} cat={cat} accent={accentPalette[i * 2 + 1] || theme.colors.accentSecondary} />
          ))}
        </div>
      </div>
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: svgHeight,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg);
}
