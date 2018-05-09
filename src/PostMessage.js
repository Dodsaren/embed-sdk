const postMessage = (receiver, eventName, data) => receiver.postMessage({ eventName, data }, '*');

const maybeRunCallback = callback => typeof callback === 'function' && callback();

export default class PostMessage {
  constructor(iframe) {
    this.loaded = false;
    this.iframe = iframe;

    this.load();
  }

  load(callback) {
    if (this.loaded) {
      maybeRunCallback(callback);
    } else {
      const handleIframeLoad = () => {
        this.loaded = true;
        maybeRunCallback(callback);
        this.iframe.removeEventListener('load', handleIframeLoad);
      };

      this.iframe.src = 'https://embed.acast.com/';
      this.iframe.addEventListener('load', handleIframeLoad);
    }
  }

  publish(eventName, data) {
    this.load(() => {
      postMessage(this.iframe.contentWindow, eventName, data);
    });
  }
}
