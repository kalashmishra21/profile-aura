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
import { fetchAvatarAsBase64 } from '../../utils/avatar.js';

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

  const avatarBase64 = await fetchAvatarAsBase64(heroData.avatarUrl);

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
        backgroundColor: 'rgba(15, 15, 20, 0.6)',
        color: theme.colors.textPrimary,
        padding: '28px 36px',
        borderRadius: theme.borders.radiusLg,
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        boxShadow: theme.glow.primary,
        fontFamily: theme.typography.fontFamilyHeading,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Background glowing orb */}
      <div id="glow-top-left" style={{ position: 'absolute', top: '-50px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(62, 178, 253, 0.2) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
      <div id="glow-bottom-right" style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />


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
          {avatarBase64 ? (
            <img
              src={avatarBase64}
              style={{
                width: '136px',
                height: '136px',
                borderRadius: theme.borders.radiusFull,
                objectFit: 'cover'
              }}
            />
          ) : (
            <div
              style={{
                width: '136px',
                height: '136px',
                borderRadius: theme.borders.radiusFull,
                backgroundColor: '#00000033',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px',
                fontWeight: 800,
                color: 'white',
                textTransform: 'uppercase'
              }}
            >
              {(heroData.name || heroData.username || 'A')[0]}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
            marginTop: '14px',
            backgroundColor: theme.colors.badgeBg,
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
          id="glass-card"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            padding: '12px 24px',
            borderRadius: '24px',
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            backgroundColor: 'rgba(15, 15, 25, 0.4)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Followers</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.accentSecondary }}>{heroData.followers}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Following</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.accentPrimary }}>{heroData.following}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Total Stars</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: theme.colors.textPrimary }}>{heroData.stars}</span>
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

  return sanitizeSvgString(rawSvg, theme);
}
