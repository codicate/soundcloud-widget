# SoundCloud-Widget

[Live](https://codicate.github.io/soundcloud-widget/)

Made with React, Redux, Typescript, and SoundCloud API

## Challenges

Making the miniplayer dragable was a pain. I initally created a useDrag hook, but due to the nature of ref being possibly null, it doesn't work well with typescript. The need to use useRef to get the ref in the first place made the hook tedious to use. The final hook ended up bloated with typescript type for possible dom refs. I ended up switching to a reusable HOC that creates a draggable div.

## Todos

### Fixes:
- Search bar select text is disabled. Turn that on
- Fetch more songs than just ~10, I know in SoundCloud have way more search result with the same input


### Features:
- Add songs to playlist, and will play them in order
- Shuffle in playlist
- localStorage or Firebase to store playlist
- Multiple playlists and queue
- Fast forward and backward
- Miniplayer resizing


### End Goals:
  A floating miniplayer to add to any website. Draggable and resizable, with full music control. Right click to bring up search menu, log in, playlist, and queue. Save user info in account/localStorage. The app can be used for SPA with long dwell time, or personal SPA to play custom playlist on load for the mood. (Maybe there is a way for it to work in non-SPA and non-React website?)
