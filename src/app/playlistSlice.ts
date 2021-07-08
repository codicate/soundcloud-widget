import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, errorHandler } from 'app/store';
import { newNotice } from 'app/noticeSlice';

import { SoundcloudTrack } from 'soundcloud';


export interface Playlist {
  name: string;
  tracks: SoundcloudTrack[];
}

const initialState: {
  playlists: Record<string, Playlist>;
} = {
  playlists: {}
};


export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (newPlaylistName: string, { getState, dispatch }) => {
    const { playlists } = (getState() as RootState).playlist;

    const isDuplicatePlaylist = !!playlists[newPlaylistName];
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

interface AddToPlaylist {
  playlist: Playlist;
  track: SoundcloudTrack;
}

export const addToPlaylist = createAsyncThunk(
  'playlist/addToPlaylist',
  (
    { playlist, track }: AddToPlaylist,
    { getState, dispatch }
  ) => {
    const { playlists } = (getState() as RootState).playlist;

    const playlistToAdd = playlists[playlist.name];
    if (!playlistToAdd) return;

    const isDuplicateTrack = playlistToAdd.tracks.some((track_) =>
      track_.id === track.id
    );
    if (isDuplicateTrack) {
      dispatch(newNotice({
        msg: `The song is already added to '${playlist.name}'.`
      }));
      return;
    };

    return {
      playlist,
      track
    };
  }
);


const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      createPlaylist.fulfilled,
      (state, action) => {
        if (!action.payload) return;
        const newPlaylist = action.payload;
        state.playlists[newPlaylist.name] = newPlaylist;
      }
    ).addCase(
      addToPlaylist.fulfilled,
      (state, action) => {
        if (!action.payload) return;
        const { playlist, track } = action.payload;
        state.playlists[playlist.name].tracks.push(track);
      }
    )
});

// export const {} = playlistSlice.actions;
export default playlistSlice.reducer;


const selectSelf = (state: RootState) => state.playlist;

export const selectPlaylists = createDraftSafeSelector(
  selectSelf,
  (playlist) => playlist.playlists
);

export const selectPlaylistsAsArray = createDraftSafeSelector(
  selectSelf,
  (playlist) => Object.values(playlist.playlists)
);