import { WidgetDefinition } from '../types/widget.js';
import { heroBannerWidget } from './implementations/hero-banner.js';
import { githubStatsWidget } from './implementations/github-stats.js';
import { streakCounterWidget } from './implementations/streak-counter.js';
import { techStackWidget } from './implementations/tech-stack.js';
import { socialLinksWidget } from './implementations/social-links.js';
import { leetcodeStatsWidget } from './implementations/leetcode-stats.js';
import { wakatimeStatsWidget } from './implementations/wakatime-stats.js';
import { blogPostsWidget } from './implementations/blog-posts.js';

export class WidgetRegistry {
  private static widgets: Map<string, WidgetDefinition> = new Map();

  static initialize(): void {
    const defaultWidgets = [
      heroBannerWidget,
      githubStatsWidget,
      streakCounterWidget,
      techStackWidget,
      socialLinksWidget,
      leetcodeStatsWidget,
      wakatimeStatsWidget,
      blogPostsWidget
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
