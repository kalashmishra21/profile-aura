import React from 'react';
import satori from 'satori';
import { RenderContext } from '../../plugins/contract.js';
import { loadFont } from './fonts.js';
import { sanitizeSvg } from '../../utilities/svg.js';

export async function generateHeroSvg(context: RenderContext): Promise<string> {
  const { data, theme } = context;
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    {
      name: 'Inter',
      data: fontData,
      weight: 400 as const,
      style: 'normal' as const
    }
  ] : [];

  const rolesText = data.roles && data.roles.length > 0 ? data.roles.join('  •  ') : 'Developer';

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
        padding: '36px 44px',
        borderRadius: theme.borders.radiusLg,
        border: `${theme.borders.width} solid ${theme.colors.border}`,
        boxShadow: theme.glow.primary,
        fontFamily: theme.typography.fontFamilyHeading,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Decorative Tech Grid & Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          backgroundColor: theme.colors.accentPrimary,
          borderTopLeftRadius: theme.borders.radiusLg,
          borderBottomLeftRadius: theme.borders.radiusLg
        }}
      />

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
            borderRadius: '50%',
            padding: '4px',
            backgroundColor: theme.colors.accentPrimary,
            boxShadow: `0 0 20px ${theme.colors.accentPrimary}`
          }}
        >
          <img
            src={data.avatarUrl}
            alt={data.name}
            style={{
              width: '142px',
              height: '142px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Small Profile Information Badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '16px',
            backgroundColor: theme.colors.badgeBg,
            color: theme.colors.badgeText,
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            border: `1px solid ${theme.colors.border}`
          }}
        >
          @{data.username}
        </div>
      </div>

      {/* Right Column: Editorial Typography, Bio, & Quick Metrics */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        {/* Editorial Role Tag */}
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: theme.colors.accentPrimary,
            fontWeight: 700,
            marginBottom: '6px'
          }}
        >
          {rolesText}
        </div>

        {/* Character / Developer Name */}
        <div
          style={{
            display: 'flex',
            fontSize: '34px',
            fontWeight: 800,
            color: theme.colors.textPrimary,
            marginBottom: '10px',
            lineHeight: 1.1
          }}
        >
          {data.name}
        </div>

        {/* About Me / Bio */}
        <div
          style={{
            display: 'flex',
            fontSize: '14px',
            color: theme.colors.textSecondary,
            lineHeight: 1.5,
            marginBottom: '20px',
            maxHeight: '60px',
            overflow: 'hidden'
          }}
        >
          {data.bio}
        </div>

        {/* Profile Metrics Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            backgroundColor: theme.colors.cardBackground,
            padding: '12px 20px',
            borderRadius: theme.borders.radiusMd,
            border: `1px solid ${theme.colors.border}`
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Repos</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.accentSecondary }}>{data.publicRepos}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Stars</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.accentPrimary }}>{data.stats.totalStars}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Followers</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.textPrimary }}>{data.followers}</span>
          </div>
          {data.location ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Location</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: theme.colors.textSecondary }}>{data.location}</span>
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

  return sanitizeSvg(rawSvg);
}
