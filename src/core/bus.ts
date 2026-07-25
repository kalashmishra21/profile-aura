type EventCallback = (payload?: any) => Promise<void> | void;

export class EventBus {
  private listeners: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  async emit(event: string, payload?: any): Promise<void> {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      for (const cb of callbacks) {
        await cb(payload);
      }
    }
  }
}

export const globalEventBus = new EventBus();
