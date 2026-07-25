import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../types/github.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { HeroDataResolver } from '../../hero/resolver.js';
import { DesignSeedEngine } from '../../hero/seed.js';
import { AccentBar, GlowAura, TechFrame, GridPatternOverlay } from '../../hero/decorations.js';
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
        padding: '28px 36px',
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.widthNormal} solid ${theme.colors.border}`,
        boxShadow: theme.glow.primary,
        fontFamily: theme.typography.fontFamilyHeading,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <GridPatternOverlay theme={theme} />
      <AccentBar theme={theme} accentOffset={seedParams.accentOffset} />
      <GlowAura theme={theme} />
      <TechFrame theme={theme} />

      {/* Left Column: Character Card / Avatar Showcase */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '200px',
          marginRight: '32px',
          zIndex: 2
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '144px',
            height: '144px',
            borderRadius: theme.borders.radiusFull,
            padding: '4px',
            backgroundImage: `linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`,
            boxShadow: `0 0 ${seedParams.glowBlurRadius}px ${theme.colors.accentPrimary}66`
          }}
        >
          <img
            src={heroData.avatarUrl}
            alt={heroData.name}
            style={{
              width: '136px',
              height: '136px',
              borderRadius: theme.borders.radiusFull,
              objectFit: 'cover'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
            marginTop: '14px',
            backgroundColor: `${theme.colors.badgeBg}EE`,
            color: theme.colors.badgeText,
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            border: `${theme.borders.widthThin} solid ${theme.colors.accentPrimary}44`
          }}
        >
          <span>@{heroData.username}</span>
        </div>
      </div>

      {/* Right Column: Editorial Showcase & Key Performance Indicators */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: theme.colors.accentPrimary,
            fontWeight: 800,
            marginBottom: '6px'
          }}
        >
          {heroData.role}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '32px',
            fontWeight: 800,
            color: theme.colors.textPrimary,
            marginBottom: '8px',
            lineHeight: 1.1,
            letterSpacing: '-0.5px'
          }}
        >
          {heroData.name}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '13px',
            color: theme.colors.textSecondary,
            lineHeight: 1.5,
            marginBottom: '18px',
            maxHeight: '44px',
            overflow: 'hidden'
          }}
        >
          {heroData.about}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            backgroundColor: `${theme.colors.cardBackground}DD`,
            padding: '12px 20px',
            borderRadius: theme.borders.radiusMd,
            border: `${theme.borders.widthThin} solid ${theme.colors.border}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Repositories</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.accentSecondary }}>{heroData.publicRepos}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Stars</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.accentPrimary }}>{heroData.stars}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Followers</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.textPrimary }}>{heroData.followers}</span>
          </div>
          {heroData.location ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Location</span>
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
