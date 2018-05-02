import EventEmitter from "./EventEmitter";
import PostMessage from "./PostMessage";
import {
  createIframeFromElement,
  createMessageListener,
  promiseOrCallback
} from "./utils";

export default class AcastEmbed {
  constructor(element, options) {
    const iframe = createIframeFromElement(element, options);
    if (element !== iframe) {
      element.appendChild(iframe);
    }

    this.eventEmitter = new EventEmitter();
    this.postMessage = new PostMessage(iframe, this.eventEmitter);

    const removeMessageListener = createMessageListener(this.eventEmitter);
    this.destroy = () => {
      removeMessageListener();
      if (element !== iframe) {
        element.removeChild(iframe);
      }
    };
  }

  load(identifier) {
    this.postMessage.publish("postmessage:do:load", identifier);
  }

  play(identifier) {
    this.postMessage.publish("postmessage:do:play", identifier);
  }

  pause() {
    this.postMessage.publish("postmessage:do:pause");
  }

  toggle(play) {
    if (play) {
      this.postMessage.publish("postmessage:do:play")
    } else if (play === false) {
      this.postMessage.publish("postmessage:do:pause")
    } else {
      this.postMessage.publish("postmessage:do:toggle");
    }
  }

  seek(seconds) {
    this.postMessage.publish("postmessage:do:seek", seconds);
  }

  isPlaying(callback) {
    return promiseOrCallback(
      this.eventEmitter,
      this.postMessage,
      "postmessage:get:isplaying",
      callback
    );
  }

  getProgress(callback) {
    return promiseOrCallback(
      this.eventEmitter,
      this.postMessage,
      "postmessage:get:progress",
      callback
    );
  }

  getDuration(callback) {
    return promiseOrCallback(
      this.eventEmitter,
      this.postMessage,
      "postmessage:get:duration",
      callback
    );
  }

  getCurrent(callback) {
    return promiseOrCallback(
      this.eventEmitter,
      this.postMessage,
      "postmessage:get:current",
      callback
    );
  }

  subscribe(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  unsubscribe(eventName, listener) {
    this.eventEmitter.off(eventName, listener);
  }
}
