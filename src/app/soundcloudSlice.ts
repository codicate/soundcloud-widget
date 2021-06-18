import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import Soundcloud from 'soundcloud';
import { SoundcloudTrack, SoundcloudStreamPlayer } from 'types/soundcloud';


Soundcloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});

const initialState: {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  tracks: SoundcloudTrack[];
  currentTrackIndex: number;
  player: null | SoundcloudStreamPlayer;
  isPaused: boolean
} = {
  status: 'idle',
  tracks: [],
  currentTrackIndex: -1,
  player: null,
  isPaused: false
};


export const searchForTracks = createAsyncThunk(
  'tracks/searchForTracks',
  async (input: string, {
    rejectWithValue
  }) => {
    try {
      return await Soundcloud.get('/tracks', {
        q: input
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.value);
    }
  },
);

export const playTrack = createAsyncThunk(
  'tracks/playTrack',
  async (trackId: number, {
    rejectWithValue
  }) => {
    try {
      return await Soundcloud.stream('/tracks/' + trackId);
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.value);
    }
  },
);


const soundcloudSlice = createSlice({
  name: 'soundcloud',
  initialState,
  reducers: {
    changeTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
    },
    prevTrack: (state) => {
      state.player?.pause()

      state.currentTrackIndex = (state.currentTrackIndex === 0)
        ? state.tracks.length - 1
        : state.currentTrackIndex - 1;
    },
    nextTrack: (state) => {
      state.player?.pause()

      state.currentTrackIndex = (state.currentTrackIndex === state.tracks.length - 1)
        ? 0
        : state.currentTrackIndex + 1;
    },
    pauseTrack: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
      
      (action.payload)
        ? state.player?.pause()
        : state.player?.play();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      searchForTracks.pending,
      (state) => {
        state.status = 'pending';
      }
    ).addCase(
      searchForTracks.fulfilled,
      (state, action: PayloadAction<SoundcloudTrack[]>) => {
        state.status = 'fulfilled';
        state.tracks = action.payload;
      }
    ).addCase(
      searchForTracks.rejected,
      (state) => {
        state.status = 'rejected';
      }
    ).addCase(
      playTrack.fulfilled,
      (state, action: PayloadAction<SoundcloudStreamPlayer>) => {
        state.player = action.payload;
      }
    );
  }
});

export const {
  changeTrack, prevTrack, nextTrack, pauseTrack
} = soundcloudSlice.actions;
export default soundcloudSlice.reducer;


const selectSelf = (state: RootState) => state.soundcloud;

export const selectSoundcloud = createDraftSafeSelector(
  selectSelf,
  (soundcloud) => soundcloud
);