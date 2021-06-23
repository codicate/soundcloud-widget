import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, statusState, errorHandler } from 'app/store';

import Soundcloud, { PaginatedSearchResult, SoundcloudTrack } from 'soundcloud';


const paginationLength = 20;


const initialState: {
  searchStatus: statusState;
  tracks: SoundcloudTrack[];
  paginationStatus: statusState;
  input: string;
  limit: number;
  offset: number;
} = {
  searchStatus: 'idle',
  tracks: [],
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
    const { input, limit, offset } = (getState() as RootState).track;
    const { tracks, nextQuery } = await paginatedSearch(input, limit, offset);

    return {
      tracks,
      offset: offset + limit,
      isThereMoreTracks: !!nextQuery
    };
  })
);


const soundcloudSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
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
    );
  }
});

// export const { } = soundcloudSlice.actions;
export default soundcloudSlice.reducer;


const selectSelf = (state: RootState) => state.track;

export const selectTrack = createDraftSafeSelector(
  selectSelf,
  (track) => track
);