import { createSlice, createDraftSafeSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';


interface Notice {
  msg: string;
}

const initialState: {
  notices: Notice[];
} = {
  notices: []
};


export const newNotice = createAsyncThunk(
  'notice/newNotice',
  (newNotice: Notice, { dispatch }) => {
    setTimeout(() => {
      dispatch(clearNotice());
    }, 5000);

    return newNotice;
  }
);

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    clearNotice: (state) => {
      state.notices.shift();
    }
  },
  extraReducers: (builder) =>
    builder.addCase(
      newNotice.fulfilled,
      (state, action) => {
        state.notices.push(action.payload);
      }
    )
});

export const {
  clearNotice
} = noticeSlice.actions;
export default noticeSlice.reducer;


const selectSelf = (state: RootState) => state.notice;

export const selectNotices = createDraftSafeSelector(
  selectSelf,
  (notice) => notice.notices
);