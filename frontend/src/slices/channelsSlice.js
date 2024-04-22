import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (headers, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.api.channelsPath(), { headers });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => channelsAdapter.addOne(state, payload),
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload.id);
    },
    renameChannel: channelsAdapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchChannels.rejected, (state, action) => ({ ...state, error: action.error }));
  },
});

const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectChannels = (state) => selectors.selectAll(state);

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
