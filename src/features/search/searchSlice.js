import { createSlice } from "@reduxjs/toolkit";

const selectSearchById = (state, id) => state.search[id] || {};

export const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    initSearch: (state, action) => {
      const { id } = action.payload;
      state[id] = {};
    },
    receiveSearch: (state, action) => {
      const { id, results } = action.payload;
      state[id].results = results;
    },
  },
});

export const { initSearch, receiveSearch } = searchSlice.actions;

export const selectResults = (id) => (state) =>
  selectSearchById(state, id).results || [];

export default searchSlice.reducer;
