import EventEmitter from "./EventEmitter";
import PostMessage from "./PostMessage";
import { createIframeFromElement, createMessageListener } from "./utils";

const canPromise = !! window.Promise;

export default class AcastEmbed {
  constructor(element, options) {
    const iframe = createIframeFromElement(element, options);
    if (element !== iframe) {
      element.appendChild(iframe);
    }

    this.eventEmitter = new EventEmitter();
    this.postMessage = new PostMessage(iframe, this.eventEmitter);

    const removeEventListener = createMessageListener(this.eventEmitter);
    this.destroy = () => {
      removeEventListener();
      if (element !== iframe) {
        element.removeChild(iframe);
      }
    };
  }

  load(identifier) {
    this.postMessage.publish('postmessage:do:load', identifier);
  }

  play(identifier) {
    this.postMessage.publish('postmessage:do:play', identifier);
  }

  pause() {
    this.postMessage.publish('postmessage:do:pause');
  }

  toggle(play) {
    this.postMessage.publish(play ? 'postmessage:do:play' : 'postmessage:do:toggle');
  }

  seek(seconds) {}

  promiseOrCallback(messageName, callback) {
    this.postMessage.publish(messageName);
    if (canPromise) {
      return new Promise(resolve => {
        this.eventEmitter.once("postmessage:get:isplaying", resolve);
      });
    }

    this.eventEmitter.once("postmessage:get:isplaying", callback);

    return undefined;
  }

  isPlaying(callback) {
    return this.promiseOrCallback('postmessage:get:isplaying', callback);
  }

  getProgress(callback) {
    return this.promiseOrCallback('postmessage:get:progress', callback);
  }

  getDuration(callback) {
    return this.promiseOrCallback('postmessage:get:duration', callback);
  }

  getCurrent(callback) {
    return this.promiseOrCallback('postmessage:get:current', callback);
  }

  subscribe(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }
}
