import { LOAD, PAUSE, PLAY, SEEK } from "./constants";

const isIframe = element => element.tagName.toLowerCase() === 'iframe';

export const createIframeFromElement = (element, { width = '100%', height = 90 } = {}) => {
  const iframe = isIframe(element) ? element : document.createElement('iframe');
  iframe.width = width;
  iframe.height = height;
  iframe.style.border = 'none';

  return iframe;
};

const EVENT_MAP = {
  "postmessage:on:load": LOAD,
  "postmessage:on:pause": PAUSE,
  "postmessage:on:play": PLAY,
  "postmessage:on:seek": SEEK,
};

const messageFromEvent = ({ data: message = {} } = {}) => ({
  name: message.eventName,
  data: message.data,
});

export const createMessageListener = eventEmitter => {
  const handleMessageEvent = event => {
    const message = messageFromEvent(event);
    const eventName = EVENT_MAP[message.name] || message.name;
    eventEmitter.trigger(eventName, message.data);
  };

  window.addEventListener('message', handleMessageEvent);
  const removeMessageEvent = () => window.removeEventListener('message', handleMessageEvent);

  return removeMessageEvent;
}

const canPromise = !!window.Promise;

export const promiseOrCallback = (eventEmitter, postMessage, messageName, callback) => {
  if (canPromise) {
    return new Promise(resolve => {
      eventEmitter.once(messageName, resolve);
      postMessage.publish(messageName);
    });
  }

  eventEmitter.once(messageName, callback);
  postMessage.publish(messageName);

  return undefined;
};
