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
      const newPlaylist = {
        name: action.payload,
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
      state.playlists.forEach((playlist_) => {
        if (playlist_.name === playlist.name) {
          const isTrackDuplicate = playlist_.tracks.some((track_) =>
            (track_.id === track.id)
          );

          (!isTrackDuplicate) && playlist_.tracks.push(track);
        }
      });
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

export const selectPlaylist = createDraftSafeSelector(
  selectSelf,
  (playlist) => playlist.playlists
);