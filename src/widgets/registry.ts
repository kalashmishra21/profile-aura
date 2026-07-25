import { WidgetDefinition } from './contract.js';
import { heroBannerWidget } from './implementations/hero-banner.js';
import { githubStatsWidget } from './implementations/github-stats.js';
import { streakCounterWidget } from './implementations/streak-counter.js';
import { techStackWidget } from './implementations/tech-stack.js';
import { topRepositoriesWidget } from './implementations/top-repositories.js';
import { socialLinksWidget } from './implementations/social-links.js';

export class WidgetRegistry {
  private static widgets: Map<string, WidgetDefinition> = new Map();

  static initialize(): void {
    const defaultWidgets = [
      heroBannerWidget,
      githubStatsWidget,
      streakCounterWidget,
      techStackWidget,
      topRepositoriesWidget,
      socialLinksWidget
    ];

    defaultWidgets.forEach((w) => this.widgets.set(w.id, w));
  }

  static getWidget(id: string): WidgetDefinition | undefined {
    if (this.widgets.size === 0) {
      this.initialize();
    }
    return this.widgets.get(id);
  }

  static register(widget: WidgetDefinition): void {
    this.widgets.set(widget.id, widget);
  }

  static listWidgets(): WidgetDefinition[] {
    if (this.widgets.size === 0) {
      this.initialize();
    }
    return Array.from(this.widgets.values());
  }
}
