import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  it('should subscribe to events when using `on`', () => {
    const eventEmitter = new EventEmitter();
    const eventName = 'some-event';
    const listenerSpy = jest.fn();

    eventEmitter.on('some-event', listenerSpy);
    eventEmitter.trigger(eventName, 'called');
    eventEmitter.trigger(eventName, 'called a second time');

    expect(listenerSpy).toHaveBeenCalledTimes(2);
    expect(listenerSpy).toHaveBeenCalledWith('called');
    expect(listenerSpy).toHaveBeenLastCalledWith('called a second time');
  });

  it('should trigger listener and then remove it when using `once`', () => {
    const eventEmitter = new EventEmitter();
    const eventName = 'some-event';
    const listenerSpy = jest.fn();

    eventEmitter.once(eventName, listenerSpy);
    eventEmitter.trigger(eventName, 'called');
    eventEmitter.trigger(eventName, 'not called');

    expect(listenerSpy).toHaveBeenCalledTimes(1);
    expect(listenerSpy).toHaveBeenLastCalledWith('called');
  });

  it('should remove event listener when using `off`', () => {
    const eventEmitter = new EventEmitter();
    const eventName = 'some-event';
    const listenerSpy = jest.fn();

    eventEmitter.on(eventName, listenerSpy);
    eventEmitter.off(eventName, listenerSpy);
    eventEmitter.trigger(eventName, 'not called');

    expect(listenerSpy).toHaveBeenCalledTimes(0);
  });

  it('should remove all listeners for an event when only passing one argument to `off`', () => {
    const eventEmitter = new EventEmitter();
    const eventName = 'some-event';
    const firstListenerSpy = jest.fn();
    const secondListenerSpy = jest.fn();

    eventEmitter.on(eventName, firstListenerSpy);
    eventEmitter.on(eventName, secondListenerSpy);
    eventEmitter.off(eventName);
    eventEmitter.on(eventName, 'not called');

    expect(firstListenerSpy).toHaveBeenCalledTimes(0);
    expect(secondListenerSpy).toHaveBeenCalledTimes(0);
  });
});
