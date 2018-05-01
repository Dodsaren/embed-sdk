import { LOAD, PAUSE, PLAY, SEEK, LOAD_META_DATA } from "./constants";

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
  "postmessage:on:loadmetadata": LOAD_META_DATA,
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

  return () => window.removeEventListener('message', handleMessageEvent);
}