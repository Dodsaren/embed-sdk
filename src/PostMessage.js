import EventEmitter from "./EventEmitter";
import { createMessageFromEvent } from "./utils";

const postMessage = (receiver, eventName, data) =>
  receiver.postMessage({ eventName, data }, "*");

export default class PostMessage {
  constructor(iframe, eventEmitter) {
    this.loaded = false;
    this.iframe = iframe;
    this.eventEmitter = eventEmitter;

    this.load();
  }

  load(callback) {
    if (this.loaded) {
      callback && callback();
    } else {
      const handleIframeLoad = () => {
        this.loaded = true;
        callback && callback();
        this.iframe.removeEventListener("load", handleIframeLoad);
      };

      this.iframe.src = 'https://embed.acast.com/varvet/-247-rachel-yogagirl-brathen';
      this.iframe.addEventListener("load", handleIframeLoad);
    }
  }

  publish(eventName, data) {
    postMessage(this.iframe.contentWindow, eventName, data);
  }
}
