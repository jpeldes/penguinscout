import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {},
  },
  reducers: {
    receiveSearch: (state, action) => {
      const { id, results } = action.payload;
      state.results[id] = results;
    },
  },
});

export const { receiveSearch } = searchSlice.actions;

export const selectResults = (id) => (state) => state.search.results[id] || [];

export default searchSlice.reducer;
