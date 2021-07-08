import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, errorHandler } from 'app/store';
import { newNotice } from 'app/noticeSlice';

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


export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (newPlaylistName: string, { getState, dispatch }) => {
    const state = (getState() as RootState).playlist;

    const isDuplicatePlaylist = state.playlists.some((playlist) => {
      if (playlist.name === newPlaylistName)
        return true;
    });
    if (isDuplicatePlaylist) {
      dispatch(newNotice({
        msg: `You already have a playlist named '${newPlaylistName}'.`
      }));
      return;
    }

    return {
      name: newPlaylistName,
      tracks: []
    };
  }
);


const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
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
  extraReducers: (builder) =>
    builder.addCase(
      createPlaylist.fulfilled,
      (state, action) => {
        if (action.payload)
          state.playlists.push(action.payload);
      }
    )
});

export const {
  addToPlaylist
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