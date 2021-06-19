import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, errorHandler } from 'app/store';

import Soundcloud, { PaginatedSearchResult, SoundcloudTrack, SoundcloudStreamPlayer } from 'soundcloud';


Soundcloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});

const initialState: {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  tracks: SoundcloudTrack[];
  offset?: number;
  nextPageQuery?: string;
  currentTrackIndex: number;
  player: null | SoundcloudStreamPlayer;
  isPaused: boolean;
} = {
  status: 'idle',
  tracks: [],
  currentTrackIndex: -1,
  player: null,
  isPaused: false
};

type QueryResult = Pick<typeof initialState, 'tracks' | 'offset' | 'nextPageQuery'>;

export const searchForTracks = createAsyncThunk(
  'tracks/searchForTracks',
  ({
    input,
    limit = 10,
    pagination = false,
    nextPageQuery
  }: {
    input?: string;
    limit?: number;
    pagination?: boolean;
    nextPageQuery?: string;
  }) => errorHandler(async () => {
    const tracks = (nextPageQuery)
      ? await Soundcloud.get(nextPageQuery)
      : await Soundcloud.get('/tracks', {
        q: input,
        limit: limit,
        linked_partitioning: pagination ? 1 : undefined,
        offset: 0
      });

    console.log(tracks);
    return (pagination)
      ? {
        tracks: (tracks as PaginatedSearchResult).collection,
        offset: (tracks as PaginatedSearchResult).next_href?.match(/(?<=offset=)\d+/),
        nextPageQuery: (tracks as PaginatedSearchResult).next_href
      } : {
        tracks: tracks
      };
  })
);

export const playTrack = createAsyncThunk(
  'tracks/playTrack',
  async (trackId: number) => errorHandler(async () => {
    return await Soundcloud.stream('/tracks/' + trackId);
  })
);

export const prevTrack = createAsyncThunk(
  'tracks/prevTrack',
  async (_, { getState }) => errorHandler(async () => {
    const state = (getState() as RootState).soundcloud;

    (await state.player?.isPlaying())
      && (await state.player?.pause());

    return (state.currentTrackIndex === 0)
      ? state.tracks.length - 1
      : state.currentTrackIndex - 1;
  })
);

export const nextTrack = createAsyncThunk(
  'tracks/nextTrack',
  async (_, { getState }) => errorHandler(async () => {
    const state = (getState() as RootState).soundcloud;

    (await state.player?.isPlaying())
      && (await state.player?.pause());

    return (state.currentTrackIndex === state.tracks.length - 1)
      ? 0
      : state.currentTrackIndex + 1;
  })
);

export const pauseTrack = createAsyncThunk(
  'tracks/pauseTrack',
  async (pause: boolean, { getState }) => errorHandler(async () => {
    const state = (getState() as RootState).soundcloud;

    (pause)
      ? (await state.player?.isPlaying())
      && (await state.player?.pause())
      : (!await state.player?.isPlaying())
      && (await state.player?.play());

    return pause;
  })
);


const soundcloudSlice = createSlice({
  name: 'soundcloud',
  initialState,
  reducers: {
    changeTrack: (state, action: PayloadAction<number>) => {
      state.currentTrackIndex = action.payload;
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
      (state, action: PayloadAction<QueryResult>) => {
        state.status = 'fulfilled';
        console.log(action);
        state.tracks = action.payload.tracks;
        state.offset = action.payload.offset;
        state.nextPageQuery = action.payload.nextPageQuery;
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
    ).addCase(
      prevTrack.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.currentTrackIndex = action.payload;
      }
    ).addCase(
      nextTrack.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.currentTrackIndex = action.payload;
      }
    ).addCase(
      pauseTrack.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.isPaused = action.payload;
      }
    );
  }
});

export const {
  changeTrack
} = soundcloudSlice.actions;
export default soundcloudSlice.reducer;


const selectSelf = (state: RootState) => state.soundcloud;

export const selectSoundcloud = createDraftSafeSelector(
  selectSelf,
  (soundcloud) => soundcloud
);