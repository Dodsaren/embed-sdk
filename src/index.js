import AcastEmbed from './AcastEmbed';
import { LOAD, PAUSE, PLAY, SEEK } from './constants';

export const Events = { LOAD, PAUSE, PLAY, SEEK };

const elements = new WeakMap();
export const create = element => {
  if (!elements.has(element)) {
    elements.set(element, new AcastEmbed(element));
  }

  return elements.get(element);
};
