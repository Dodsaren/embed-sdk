export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  off(eventName, listener) {
    if (!listener) {
      this.events[eventName] = undefined;
    } else {
      const eventListeners = this.events[eventName] || [];
      const indexOfListener = eventListeners.indexOf(listener);
      if (indexOfListener > -1) {
        eventListeners.splice(indexOfListener, 1);
      }

      if (!eventListeners.length) {
        this.events[eventName] = undefined;
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
      eventListeners.forEach(listener => {
        listener(eventData);
      });
    }
  }
}
