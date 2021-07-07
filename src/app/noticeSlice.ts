import { createSlice, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';


interface Notice {
  msg: string;
}

const initialState: {
  notices: Notice[];
} = {
  notices: []
};


const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    newNotice: (state, action: PayloadAction<Notice>) => {
      const newNotice = action.payload;
      state.notices.push(newNotice);
      setTimeout(() => {
        state.notices.splice(state.notices.indexOf(newNotice), 1);
      }, 5000);
    }
  }
});

export const {
  newNotice
} = noticeSlice.actions;
export default noticeSlice.reducer;


const selectSelf = (state: RootState) => state.notice;

export const selectNotices = createDraftSafeSelector(
  selectSelf,
  (notice) => notice.notices
);