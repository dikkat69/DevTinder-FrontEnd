import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addfeed: (state, action) => action.payload,
    removefeed: () => null,
  },
});

export const { addfeed, removefeed } = feedSlice.actions;
export default feedSlice.reducer;