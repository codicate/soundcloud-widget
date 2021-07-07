import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, errorHandler } from 'app/store';

import { SoundcloudTrack } from 'soundcloud';


export interface Playlist {
  name: string;
  tracks: SoundcloudTrack[];
}

const initialState: {
  playlists: Playlist[];
} = {
  playlists: []
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action: PayloadAction<string>) => {
      const newPlaylistName = action.payload;

      const isDuplicatePlaylist = state.playlists.some((playlist) => {
        if (playlist.name === newPlaylistName)
          return true;
      });
      if (isDuplicatePlaylist) return;

      const newPlaylist = {
        name: newPlaylistName,
        tracks: []
      };

      state.playlists.push(newPlaylist);
    },
    addToPlaylist: (
      state,
      action: PayloadAction<{
        playlist: Playlist,
        track: SoundcloudTrack;
      }>
    ) => {
      const { playlist, track } = action.payload;
      const playlistToAdd = state.playlists.find((playlist_) =>
        playlist.name === playlist_.name
      );

      const isDuplicateTrack = playlistToAdd?.tracks.some((track_) =>
        track_.id === track.id
      );
      if (!playlistToAdd || isDuplicateTrack) return;

      playlistToAdd.tracks.push(track);
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(

    // )
  }
});

export const {
  createPlaylist, addToPlaylist
} = playlistSlice.actions;
export default playlistSlice.reducer;


const selectSelf = (state: RootState) => state.playlist;

export const selectPlaylists = createDraftSafeSelector(
  selectSelf,
  (playlist) => playlist.playlists
);

export const selectPlaylist = (playlistName: string) => {
  return createDraftSafeSelector(
    selectSelf,
    (playlist) => playlist.playlists.filter((playlist) =>
      playlist.name === playlistName
    )[0]
  );
};