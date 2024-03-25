import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice.js';
import messagesReducers from './messagesSlise.js';
import uiReducers from './ui.js';

export default configureStore({
  reducer: {
    ui: uiReducers,
    channels: channelsReducers,
    messages: messagesReducers,
  },
});
