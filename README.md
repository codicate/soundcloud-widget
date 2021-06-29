# SoundCloud-Widget

[Live](https://codicate.github.io/soundcloud-widget/)

Made with React, Redux, Typescript, and SoundCloud API

## Challenges

Making the miniplayer dragable was a pain. I initally created a useDrag hook, but due to the nature of ref being possibly null, it doesn't work well with typescript. The need to use useRef to get the ref in the first place made the hook tedious to use. The final hook ended up bloated with typescript type for possible dom refs. I ended up switching to a reusable container component that creates a draggable div.

## Features:
- Fetch tracks from SoundCloud as user scroll using pagination
- Draftable miniplayer with play/pause, fast forward/rewind, skip next/previous, clickable progress bar

## Todos
- Add songs to playlist, and will play them in order
- Shuffle in playlist
- localStorage or Firebase to store playlist
- Multiple playlists and queue


## End Goals:
  A floating miniplayer to add to any website. Draggable and resizable, with full music control. Right click to bring up search menu, log in, playlist, and queue. Save user info in account/localStorage. The app can be used for SPA with long dwell time, or personal SPA to play custom playlist on load for the mood. (Maybe there is a way for it to work in non-SPA and non-React website?)
