import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    defaultChannelId: '1',
    activeChannelId: '1',
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => ({ ...state, activeChannelId: payload }),
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
