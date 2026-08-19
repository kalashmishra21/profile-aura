import React from 'react';
import satori from 'satori';
import { ThemeTokens } from '../../types/theme.js';
import { AggregatedProfileData } from '../../fetchers/types.js';
import { ProfileAuraConfig } from '../../types/config.js';
import { loadFont } from './fonts.js';
import { sanitizeSvgString } from '../../utils/svg.js';

export interface SatoriGraphEngineOptions {
  config: ProfileAuraConfig;
  data: AggregatedProfileData;
  theme: ThemeTokens;
}

export async function renderSatoriGraphSvg(options: SatoriGraphEngineOptions): Promise<string> {
  const { data, theme } = options;
  const fontData = await loadFont();

  const fontConfig = fontData.byteLength > 0 ? [
    { name: 'Inter', data: fontData, weight: 400 as const, style: 'normal' as const }
  ] : [];

  const calendar = data.stats.contributionCalendar;

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
        // CONTRIBUTIONS GRAPH
      </div>
      
      {!calendar ? (
        <div style={{ display: 'flex', color: theme.colors.textMuted, fontSize: '14px', marginTop: '40px' }}>
          Contributions data requires a GitHub Token (Authenticated Mode).
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
            {/* Draw a simplified grid of the last 150 days to fit well in SVG width 800 */}
            {(() => {
              // Get the last 150 days (approx 21 weeks)
              const recentDays = calendar.slice(-150);
              const weeks: { date: string, count: number }[][] = [];
              let currentWeek: { date: string, count: number }[] = [];
              
              recentDays.forEach((day, index) => {
                currentWeek.push(day);
                // GitHub weeks start on Sunday, but for simplicity we just chunk by 7
                if (currentWeek.length === 7 || index === recentDays.length - 1) {
                  weeks.push(currentWeek);
                  currentWeek = [];
                }
              });

              return weeks.map((week, wIdx) => (
                <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {week.map((day, dIdx) => {
                    let bg = theme.colors.surface;
                    if (day.count > 0 && day.count < 3) bg = `${theme.colors.success}40`; // 25% opacity
                    else if (day.count >= 3 && day.count < 6) bg = `${theme.colors.success}80`; // 50% opacity
                    else if (day.count >= 6 && day.count < 10) bg = `${theme.colors.success}C0`; // 75% opacity
                    else if (day.count >= 10) bg = theme.colors.success; // 100% opacity

                    return (
                      <div
                        key={dIdx}
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: bg,
                          borderRadius: '2px',
                          border: `1px solid ${theme.colors.border}`
                        }}
                      />
                    );
                  })}
                </div>
              ));
            })()}
          </div>
          <div style={{ display: 'flex', fontSize: '10px', color: theme.colors.textMuted, marginTop: '16px' }}>
            Showing last 150 days of activity
          </div>
        </div>
      )}
    </div>
  );

  const rawSvg = await satori(element, {
    width: 800,
    height: 240,
    fonts: fontConfig
  });

  return sanitizeSvgString(rawSvg, theme);
}
