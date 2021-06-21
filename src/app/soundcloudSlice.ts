import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, statusState, errorHandler } from 'app/store';

import Soundcloud, { PaginatedSearchResult, SoundcloudTrack, SoundcloudStreamPlayer } from 'soundcloud';


Soundcloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});

const initialState: {
  searchStatus: statusState;
  paginationStatus: statusState;
  tracks: SoundcloudTrack[];
  input: string;
  limit: number;
  offset: number;
  currentTrackIndex: number;
  player: null | SoundcloudStreamPlayer;
  isPaused: boolean;
} = {
  searchStatus: 'idle',
  paginationStatus: 'idle',
  tracks: [],
  input: '',
  limit: 10,
  offset: 0,
  currentTrackIndex: -1,
  player: null,
  isPaused: false
};

type QueryResult = Pick<typeof initialState, 'tracks' | 'input' | 'limit' | 'offset'>;

const paginatedSearch = async (
  input: string,
  limit: number,
  offset: number
) => {
  const { collection, next_href } = await Soundcloud.get('/tracks', {
    q: input,
    limit: limit,
    offset: offset,
    linked_partitioning: 1
  }) as PaginatedSearchResult;

  return {
    tracks: collection,
    nextQuery: next_href
  };
};

export const queryNextPage = createAsyncThunk(
  'tracks/queryNextPage',
  (_, { getState }) => errorHandler(async () => {
    const { input, limit, offset } = (getState() as RootState).soundcloud;
    const { tracks, nextQuery } = await paginatedSearch(input, limit, offset);

    console.log(offset);

    return {
      tracks,
      offset: offset + limit
    };
  })
);

export const searchForTracks = createAsyncThunk(
  'tracks/searchForTracks',
  ({
    input,
    limit = 10,
  }: {
    input: string;
    limit?: number;
  }) => errorHandler(async () => {
    const { tracks, nextQuery } = await paginatedSearch(input, limit, 0);

    console.log(tracks);
    return {
      tracks,
      input,
      limit,
      offset: limit
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
        state.searchStatus = 'pending';
      }
    ).addCase(
      searchForTracks.fulfilled,
      (state, action: PayloadAction<QueryResult>) => {
        state.searchStatus = 'fulfilled';
        state.tracks = action.payload.tracks;
        state.input = action.payload.input;
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
      }
    ).addCase(
      searchForTracks.rejected,
      (state) => {
        state.searchStatus = 'rejected';
      }
    ).addCase(
      queryNextPage.pending,
      (state) => {
        state.paginationStatus = 'pending';
      }
    ).addCase(
      queryNextPage.fulfilled,
      (state, action: PayloadAction<QueryResult>) => {
        state.paginationStatus = 'idle'
        state.tracks = state.tracks.concat(action.payload.tracks);
        state.offset = action.payload.offset;
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