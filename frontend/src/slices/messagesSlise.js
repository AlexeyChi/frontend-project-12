import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { fetchChannels, selectChannels, actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
