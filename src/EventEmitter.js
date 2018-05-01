export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  off(eventName, listener) {
    if (!listener) {
      this.events[listener] = undefined;
    } else {
      const eventListeners = this.events[eventName];
      if (eventListeners) {
        const indexOfListener = eventListeners.indexOf(listener);
        eventListeners.splice(indexOfListener, 1);
      }
    }
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const eventHandler = eventData => {
      this.off(eventName, eventHandler);
      listener(eventData);
    };
    this.on(eventName, eventHandler);
  }

  trigger(eventName, eventData) {
    const eventListeners = this.events[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        listener(eventData);
      });
    }
  }
}