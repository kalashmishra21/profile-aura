import { WidgetDefinition } from '../../types/widget.js';
import { RenderContext } from '../../plugins/contract.js';

/**
 * github-stats widget — retained for registry compatibility.
 * The Metrics section is now rendered as a Satori SVG by the CoreEngine.
 * This widget is intentionally a no-op; it renders nothing.
 */
export const githubStatsWidget: WidgetDefinition = {
  id: 'github-stats',
  name: 'GitHub Stats (SVG)',
  description: 'Metrics are rendered as a Satori SVG. This widget is a registry placeholder.',
  category: 'stats',
  render: async (_context: RenderContext) => {
    // Metrics are emitted as metrics.svg by the CoreEngine.
    // No markdown duplication here.
    return '';
  }
};
