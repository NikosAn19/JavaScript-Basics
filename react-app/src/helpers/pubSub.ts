type Callback<T = any> = (data: T) => void;

class PubSub<Events extends Record<string, any>> {
  private events: Partial<Record<keyof Events, Callback[]>> = {};

  subscribe<Event extends keyof Events>(
    event: Event,
    callback: Callback<Events[Event]>
  ): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(callback);
    console.log(`Subscribed to event: `, event);
  }

  unsubscribe<Event extends keyof Events>(
    event: Event,
    callback: Callback<Events[Event]>
  ): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event]!.filter((cb) => cb !== callback);
  }

  publish<Event extends keyof Events>(event: Event, data: Events[Event]): void {
    if (!this.events[event]) {
      console.log("No subscribers for this event", event);
      return;
    }
    console.log(`Publishing event:`, event);
    this.events[event]!.forEach((callback) => {
      console.log("Calling subscriber with data", data);
      callback(data);
    });
  }
}

export default PubSub;
