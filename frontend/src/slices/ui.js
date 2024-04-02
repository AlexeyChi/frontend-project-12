import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpened: null,
      type: null,
      selectId: null,
    },
    defaultChannelId: '1',
    activeChannelId: '1',
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => ({ ...state, activeChannelId: payload }),
    openModal: (state, { payload }) => {
      const { type, selectId } = payload;
      return {
        ...state,
        modal: {
          isOpened: true,
          type,
          selectId: selectId ?? null,
        },
      };
    },
    closeModal: (state) => ({
      ...state,
      modal: {
        isOpened: false,
        type: null,
        selectId: null,
      },
    }),
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
