import { ProfileAuraConfig } from '../types/config.js';
import { StudioHistoryStack } from './types.js';

export class StudioHistoryManager {
  private stack: StudioHistoryStack;
  private maxHistory: number = 50;

  constructor(initialConfig: ProfileAuraConfig) {
    this.stack = {
      past: [],
      present: JSON.parse(JSON.stringify(initialConfig)),
      future: []
    };
  }

  pushState(newConfig: ProfileAuraConfig): void {
    const serializedNew = JSON.stringify(newConfig);
    const serializedCurrent = JSON.stringify(this.stack.present);

    if (serializedNew === serializedCurrent) return;

    this.stack.past.push(JSON.parse(serializedCurrent));
    if (this.stack.past.length > this.maxHistory) {
      this.stack.past.shift();
    }

    this.stack.present = JSON.parse(serializedNew);
    this.stack.future = [];
  }

  undo(): ProfileAuraConfig | null {
    if (this.stack.past.length === 0) return null;

    const previous = this.stack.past.pop()!;
    this.stack.future.unshift(this.stack.present);
    this.stack.present = previous;

    return this.stack.present;
  }

  redo(): ProfileAuraConfig | null {
    if (this.stack.future.length === 0) return null;

    const next = this.stack.future.shift()!;
    this.stack.past.push(this.stack.present);
    this.stack.present = next;

    return this.stack.present;
  }

  getCurrentState(): ProfileAuraConfig {
    return this.stack.present;
  }

  canUndo(): boolean {
    return this.stack.past.length > 0;
  }

  canRedo(): boolean {
    return this.stack.future.length > 0;
  }
}
