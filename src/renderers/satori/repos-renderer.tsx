import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../fetchers/types.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriReposEngineOptions {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export async function renderSatoriReposSvg(options: SatoriReposEngineOptions): Promise<string> {
  const { data, theme } = options;
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    { name: 'Inter', data: fontData, weight: 400 as const, style: 'normal' as const }
  ] : [];

  const topRepos = [...data.repositories]
    .filter(r => !r.isFork)
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 4);

  const cardStyle = (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    height: '110px',
    backgroundColor: 'rgba(15, 15, 25, 0.5)',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borders.radiusMd,
    padding: '16px',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    position: 'relative'
  });

  const element = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(15, 15, 20, 0.2)',
        color: theme.colors.textPrimary,
        padding: '24px 28px',
        borderRadius: theme.borders.radiusLg,
        border: `1px solid ${theme.colors.border}`,
        fontFamily: theme.typography.fontFamilyHeading,
        boxSizing: 'border-box',
        overflow: 'hidden'
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
          marginBottom: '20px'
        }}
      >
        // TOP REPOSITORIES
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '16px',
          width: '100%',
          alignItems: 'center'
        }}
      >
        {topRepos.map((repo, idx) => (
          <div key={idx} style={cardStyle()}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.accentPrimary, marginBottom: '6px' }}>
                {repo.name}
              </span>
              <span style={{ fontSize: '10px', color: theme.colors.textSecondary, display: 'flex', height: '30px', overflow: 'hidden' }}>
                {repo.description ? (repo.description.length > 70 ? repo.description.substring(0, 67) + '...' : repo.description) : 'No description provided'}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: repo.primaryLanguage?.color || theme.colors.textMuted }}></div>
                 <span style={{ fontSize: '10px', color: theme.colors.textMuted }}>
                   {repo.primaryLanguage?.name || 'Unknown'}
                 </span>
               </div>
               <div style={{ display: 'flex', gap: '12px' }}>
                 <span style={{ fontSize: '10px', color: theme.colors.textMuted }}>★ {repo.stargazerCount}</span>
                 <span style={{ fontSize: '10px', color: theme.colors.textMuted }}>⑂ {repo.forkCount}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 320,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg, theme);
}
