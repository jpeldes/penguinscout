import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {},
    isSearching: {},
    searchString: {},
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
    setSearchString: (state, action) => {
      const { id, searchString } = action.payload;
      state.searchString[id] = searchString;
    }
  },
});

export const { receiveSearch, toggleSearchState, setSearchString } = searchSlice.actions;

export const selectResults = (id) => (state) => state.search.results[id] || [];
export const selectIsSearching = (id) => (state) =>
  state.search.isSearching[id] || false;
export const selectSearchString = (id) => (state) =>
  state.search.searchString[id] || "";

export default searchSlice.reducer;
