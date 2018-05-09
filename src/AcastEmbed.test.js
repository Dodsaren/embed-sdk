import AcastEmbed from './AcastEmbed';
import PostMessage from './PostMessage';

jest.mock('./PostMessage');

function MockPostMessage() {}
MockPostMessage.prototype.publish = jest.fn();

PostMessage.mockImplementation(() => new MockPostMessage());

describe('AcastEmbed', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('div');
  });

  it('should create and append iframe if passing an element that is not an iframe', () => {
    element.appendChild = jest.fn();
    // eslint-disable-next-line no-new
    new AcastEmbed(element);

    expect(element.appendChild).toHaveBeenCalledTimes(1);
    expect(element.appendChild).toHaveBeenCalledWith(expect.any(HTMLIFrameElement));
  });

  it('should remove iframe when destroying if passing an element that is not an iframe', () => {
    element.removeChild = jest.fn();

    const acastEmbed = new AcastEmbed(element);
    acastEmbed.destroy();

    expect(element.removeChild).toHaveBeenCalledTimes(1);
    expect(element.removeChild).toHaveBeenCalledWith(expect.any(HTMLIFrameElement));
  });

  it('should remove event listener on window when destroying', () => {
    window.removeEventListener = jest.fn();

    const acastEmbed = new AcastEmbed(element);
    acastEmbed.destroy();

    expect(window.removeEventListener).toHaveBeenCalledWith('message', expect.any(Function));
  });
});
