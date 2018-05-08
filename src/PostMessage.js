const postMessage = (receiver, eventName, data) =>
  receiver.postMessage({ eventName, data }, "*");

export default class PostMessage {
  constructor(iframe) {
    this.loaded = false;
    this.iframe = iframe;

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

      this.iframe.src = 'https://embed.acast.com/';
      this.iframe.addEventListener("load", handleIframeLoad);
    }
  }

  publish(eventName, data) {
    this.load(() => {
      postMessage(this.iframe.contentWindow, eventName, data);
    });
  }
}
