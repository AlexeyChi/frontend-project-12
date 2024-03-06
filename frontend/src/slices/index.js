import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducers,
  },
});
