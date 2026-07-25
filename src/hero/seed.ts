export interface DeterministicSeedParameters {
  gradientAngle: number;
  accentOffset: number;
  blobScale: number;
  patternIndex: number;
  glowBlurRadius: number;
}

export class DesignSeedEngine {
  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  static generateParameters(seed: string): DeterministicSeedParameters {
    const hash = this.hashString(seed || 'profile-aura');

    const gradientAngle = hash % 360;
    const accentOffset = ((hash % 40) - 20); // -20 to +20
    const blobScale = 0.8 + ((hash % 60) / 100); // 0.8 to 1.4
    const patternIndex = hash % 4;
    const glowBlurRadius = 15 + (hash % 20); // 15 to 35 px

    return {
      gradientAngle,
      accentOffset,
      blobScale,
      patternIndex,
      glowBlurRadius
    };
  }
}
