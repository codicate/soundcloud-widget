import { createSlice, createDraftSafeSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import {} from 'soundcloud.ts'

const initialState: {
  status: 'idle' | 'loading' | 'succeed' | 'failed';
  tracks: [];
} = {
  status: 'idle',
  tracks: []
};

const TracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {

  }
});

export const {

} = TracksSlice.actions;
export default TracksSlice.reducer;


const selectSelf = (state: RootState) => state.tracks;

export const selectUserSigninStatus = createDraftSafeSelector(
  selectSelf,
  (tracks) => tracks.status
);