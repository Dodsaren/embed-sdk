import PostMessage from './PostMessage';

describe('PostMessage', () => {
  let iframe;

  beforeEach(() => {
    iframe = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      contentWindow: {
        postMessage: jest.fn(),
      },
    };
  });

  it('should load iframe on initiation', () => {
    // eslint-disable-next-line no-new
    new PostMessage(iframe);

    expect(iframe.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
  });

  it('should remove iframe listener when loaded', () => {
    iframe.addEventListener = jest.fn((eventName, callback) => {
      callback();

      expect(eventName).toBe('load');
      expect(iframe.removeEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    });

    // eslint-disable-next-line no-new
    new PostMessage(iframe);
  });

  it('should load iframe before publishing events', () => {
    const postMessage = new PostMessage(iframe);
    const event = { eventName: 'some event name', data: 'some event data' };
    iframe.addEventListener = jest.fn((eventName, callback) => {
      expect(eventName).toBe('load');
      callback();

      expect(iframe.contentWindow.postMessage).toHaveBeenCalledWith(event, '*');
    });
    postMessage.publish(event.eventName, event.data);
  });
});
