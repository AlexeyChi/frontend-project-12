import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const id = action.payload;
      const newMessages = Object
        .values(state.entities)
        .filter((messages) => messages.channelId !== id);
      messagesAdapter.setAll(state, newMessages);
    });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
