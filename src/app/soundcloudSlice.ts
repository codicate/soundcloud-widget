import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, statusState, errorHandler } from 'app/store';

import Soundcloud, { PaginatedSearchResult, SoundcloudTrack, SoundcloudStreamPlayer } from 'soundcloud';


const paginationLength = 20;


Soundcloud.initialize({
  client_id: process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID
});

const initialState: {
  searchStatus: statusState;
  tracks: SoundcloudTrack[];
  currentTrack: SoundcloudTrack | null;
  currentTrackIndex: number;
  player: null | SoundcloudStreamPlayer;
  isPaused: boolean;
  paginationStatus: statusState;
  input: string;
  limit: number;
  offset: number;
} = {
  searchStatus: 'idle',
  tracks: [],
  currentTrack: null,
  currentTrackIndex: -1,
  player: null,
  isPaused: false,
  paginationStatus: 'idle',
  input: '',
  limit: 10,
  offset: 0
};

type QueryResult = Pick<typeof initialState, 'tracks' | 'input' | 'limit' | 'offset'>;

const paginatedSearch = async (
  input: string,
  limit: number,
  offset: number
) => {
  const { collection, next_href } = await Soundcloud.get('/tracks', {
    q: input,
    limit,
    offset,
    linked_partitioning: 1
  }) as PaginatedSearchResult;

  return {
    tracks: collection,
    nextQuery: next_href
  };
};

export const searchForTracks = createAsyncThunk(
  'tracks/searchForTracks',
  (input: string) => errorHandler(async () => {
    const { tracks } = await paginatedSearch(input, paginationLength, 0);

    return {
      tracks,
      input,
      limit: paginationLength,
      offset: paginationLength
    };
  })
);

export const queryNextPage = createAsyncThunk(
  'tracks/queryNextPage',
  (_, { getState }) => errorHandler(async () => {
    const { input, limit, offset } = (getState() as RootState).soundcloud;
    const { tracks, nextQuery } = await paginatedSearch(input, limit, offset);

    return {
      tracks,
      offset: offset + limit,
      isThereMoreTracks: !!nextQuery
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

    (state.player?.isPlaying())
      && (await state.player?.pause());

    return (state.currentTrackIndex <= 0)
      ? state.tracks.length - 1
      : state.currentTrackIndex - 1;
  })
);

export const nextTrack = createAsyncThunk(
  'tracks/nextTrack',
  async (_, { getState }) => errorHandler(async () => {
    const state = (getState() as RootState).soundcloud;

    (state.player?.isPlaying())
      && (await state.player?.pause());

    return (state.currentTrackIndex >= state.tracks.length - 1)
      ? 0
      : state.currentTrackIndex + 1;
  })
);

export const pauseTrack = createAsyncThunk(
  'tracks/pauseTrack',
  async (pause: boolean, { getState }) => errorHandler(async () => {
    const state = (getState() as RootState).soundcloud;

    (pause)
      ? (state.player?.isPlaying())
      && (await state.player?.pause())
      : (!state.player?.isPlaying())
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
      state.currentTrack = state.tracks[state.currentTrackIndex];
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
      (state, action) => {
        if (action.payload.isThereMoreTracks) {
          state.paginationStatus = 'idle';
          state.tracks = state.tracks.concat(action.payload.tracks);
          state.offset = action.payload.offset;
        } else {
          state.paginationStatus = 'fulfilled';
        }
      }
    ).addCase(
      queryNextPage.rejected,
      (state) => {
        state.paginationStatus = 'rejected';
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
        state.currentTrack = state.tracks[state.currentTrackIndex];
      }
    ).addCase(
      nextTrack.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.currentTrackIndex = action.payload;
        state.currentTrack = state.tracks[state.currentTrackIndex];
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