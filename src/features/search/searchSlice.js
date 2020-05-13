import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {},
    isSearching: {},
  },
  reducers: {
    receiveSearch: (state, action) => {
      const { id, results } = action.payload;
      state.results[id] = results;
    },
    toggleSearchState: (state, action) => {
      const { id, isSearching } = action.payload;
      state.isSearching[id] = isSearching;
    },
  },
});

export const { receiveSearch, toggleSearchState } = searchSlice.actions;

export const selectResults = (id) => (state) => state.search.results[id] || [];
export const selectIsSearching = (id) => (state) =>
  state.search.isSearching[id] || false;

export default searchSlice.reducer;
