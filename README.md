# Embed SDK
A library that simplifies communication with the Embed Player via postMessage API.

## API
The Embed SDK script exposes a method: `AcastEmbed.of` which takes one argument and accepts a reference to an iframe or any other `HTMLElement` instance. If the argument passed is not an iframe, the Embed SDK will create and append an iframe to the element referenced.

Examples:
```html
<iframe id="player"></iframe>
<script type="text/javascript">
  const iframeElement = document.getElementById('player');
  const player = AcastEmbed.of(iframeElement);
</script>
```

```html
<div id="player-container"></div>
<script type="text/javascript">
  const divElement = document.getElementById('player-container');
  const player = AcastEmbed.of(divElement);
</script>
```

Passing the same element twice will return the same instance of AcastEmbed:
```html
<iframe id="player"></iframe>
<script type="text/javascript">
  const iframeElement = document.getElementById('player');
  const player1 = AcastEmbed.of(iframeElement);
  const player2 = AcastEmbed.of(iframeElement);

  player1 === player2 // true
</script>
```

## Methods

When you get the widget object with the help of the AcastEmbed.of method, you'll have access to the following public methods:
* `load(options: { rss: string, guid: string })` - Load episode metadata without starting playback. Useful for preloading.
* `play(options?: { rss: string, guid: string })` - Play audio.
* `pause()` - Pause audio.
* `toggle(play: boolean)` - Toggle between playing and pausing audio.
* `seek(seconds: number)` - Seek audio.
* `subscribe(eventType: string, listener: () => void)` - Adds a listener method for the specified eventName. See below for the list of possible event types.
* `unsubscribe(eventType: string, listener?: () => void)` - If only one argument is passed, all listeners for that event will be removed.

### Getters
The following methods are grouped as "Getters" because they return a value and does not modify the state of the player. All getters are asynchronous which means you'll have to pass a callback method or if your environment supports it the getter will return a `Promise`.
* `isPlaying(callback?: (playing: boolean) => void)?: Promise`
* `getProgress(callback?: (progress: number) => void)?: Promise`
* `getDuration(callback?: (duration: number) => void)?: Promise`
* `getCurrent(callback?: (options: { rss: string, guid: string }) => void)?: Promise`

### Event Types
The embed player can notify you when state changes by emitting events. Use the `on` method to subscribe to events. The following events can be subscribed to:
* `AcastEmbed.LOAD` - Emitted when new metadata has been loaded.
* `AcastEmbed.PAUSE` - Emitted when audio changes from playing to paused.
* `AcastEmbed.PLAY` - Emitted when audio changes from paused to playing.
* `AcastEmbed.SEEKED` - Emitted when audio has seeked to a new position.
