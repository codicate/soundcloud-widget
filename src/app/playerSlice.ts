import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, errorHandler } from 'app/store';

import Soundcloud, { SoundcloudStreamPlayer } from 'soundcloud';
import { clamp } from 'utils/functions';


const initialState: {
  player: null | SoundcloudStreamPlayer;
  currentTrackIndex: number;
} = {
  player: null,
  currentTrackIndex: -1
};


export const playTrack = createAsyncThunk(
  'player/playTrack',
  (_, { getState }) => errorHandler(async () => {
    const { player, track } = getState() as RootState;
    const currentTrack = track.tracks[player.currentTrackIndex];

    return await Soundcloud.stream('/tracks/' + currentTrack.id);
  })
);

export const pauseTrack = createAsyncThunk(
  'player/pauseTrack',
  (_, { getState }) => errorHandler(async () => {
    const { player } = (getState() as RootState).player;
    if (!player) return;

    (player.isPlaying())
      ? await player.pause()
      : await player.play();
  })
);

export const seekTrack = createAsyncThunk(
  'player/seekTrack',
  async (second: number, { getState }) => errorHandler(async () => {
    const { player } = (getState() as RootState).player;
    if (!player) return;

    const currentTime = player.currentTime();
    const seekTime = clamp(currentTime + second * 1000, 0, player.getDuration());
    await player?.seek(seekTime);
  })
);

export const skipTrack = createAsyncThunk(
  'player/skipTrack',
  (direction: 'prev' | 'next', { getState, dispatch }) => errorHandler(async () => {
    const { player, track } = getState() as RootState;
    if (!player.player) return;

    (player.player.isPlaying())
      && (await player.player.pause());

    if (direction === 'prev') {
      return (player.currentTrackIndex <= 0)
        ? track.tracks.length - 1
        : player.currentTrackIndex - 1;
    }

    else
      return (player.currentTrackIndex >= track.tracks.length - 1)
        ? 0
        : player.currentTrackIndex + 1;
  })
);


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      playTrack.fulfilled,
      (state, action: PayloadAction<SoundcloudStreamPlayer>) => {
        state.player = action.payload;
      }
    ).addCase(
      pauseTrack.fulfilled,
      () => { }
    ).addCase(
      seekTrack.fulfilled,
      () => { }
    ).addCase(
      skipTrack.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.currentTrackIndex = action.payload;
      }
    );
  }
});

export const { changeTrack } = playerSlice.actions;
export default playerSlice.reducer;


const selectSelf = (state: RootState) => state.player;
const selectTrack = (state: RootState) => state.track;

export const selectPlayer = createDraftSafeSelector(
  selectSelf,
  (player) => player
);

export const isPlayerPaused = createDraftSafeSelector(
  selectSelf,
  (player) => player.player?.isPlaying()
);

export const selectCurrentTrack = createDraftSafeSelector(
  selectSelf,
  selectTrack,
  (player, track) => track.tracks[player.currentTrackIndex]
);