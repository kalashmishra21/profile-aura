import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../types/github.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { HeroDataResolver } from '../../hero/resolver.js';
import { DesignSeedEngine } from '../../hero/seed.js';
import { AccentBar, GlowAura, TechFrame } from '../../hero/decorations.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriHeroEngineOptions {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
  seed?: string;
}

export async function renderSatoriHeroSvg(options: SatoriHeroEngineOptions): Promise<string> {
  const { config, data, theme } = options;
  const heroData = HeroDataResolver.resolve(config, data);
  const seedParams = DesignSeedEngine.generateParameters(options.seed || heroData.username);
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    {
      name: 'Inter',
      data: fontData,
      weight: 400 as const,
      style: 'normal' as const
    }
  ] : [];

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
        padding: theme.spacing.paddingLg,
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.widthNormal} solid ${theme.colors.border}`,
        boxShadow: theme.glow.primary,
        fontFamily: theme.typography.fontFamilyHeading,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      <AccentBar theme={theme} accentOffset={seedParams.accentOffset} />
      <GlowAura theme={theme} />
      <TechFrame theme={theme} />

      {/* Left Column: Character Card / Avatar Illustration */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '210px',
          marginRight: '36px'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '150px',
            height: '150px',
            borderRadius: theme.borders.radiusFull,
            padding: '4px',
            backgroundColor: theme.colors.accentPrimary,
            boxShadow: `0 0 ${seedParams.glowBlurRadius}px ${theme.colors.accentPrimary}`
          }}
        >
          <img
            src={heroData.avatarUrl}
            alt={heroData.name}
            style={{
              width: '142px',
              height: '142px',
              borderRadius: theme.borders.radiusFull,
              objectFit: 'cover'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '16px',
            backgroundColor: theme.colors.badgeBg,
            color: theme.colors.badgeText,
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: theme.typography.fontSizeCaption,
            fontWeight: 600,
            border: `${theme.borders.widthThin} solid ${theme.colors.border}`
          }}
        >
          @{heroData.username}
        </div>
      </div>

      {/* Right Column: Editorial Typography & Stats Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: theme.typography.fontSizeLabel,
            letterSpacing: theme.typography.letterSpacingWide,
            textTransform: 'uppercase',
            color: theme.colors.accentPrimary,
            fontWeight: 700,
            marginBottom: '6px'
          }}
        >
          {heroData.role}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: theme.typography.fontSizeHeroTitle,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            marginBottom: '10px',
            lineHeight: 1.1
          }}
        >
          {heroData.name}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: theme.typography.fontSizeBody,
            color: theme.colors.textSecondary,
            lineHeight: 1.5,
            marginBottom: '20px',
            maxHeight: '60px',
            overflow: 'hidden'
          }}
        >
          {heroData.about}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            backgroundColor: theme.colors.cardBackground,
            padding: '12px 20px',
            borderRadius: theme.borders.radiusMd,
            border: `${theme.borders.widthThin} solid ${theme.colors.border}`
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Repos</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.accentSecondary }}>{heroData.publicRepos}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Stars</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.accentPrimary }}>{heroData.stars}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Followers</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.textPrimary }}>{heroData.followers}</span>
          </div>
          {heroData.location ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Location</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: theme.colors.textSecondary }}>{heroData.location}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 280,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg);
}
