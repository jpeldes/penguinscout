import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: {},
    isSearching: {},
    searchString: {},
    foundNothing: {},
    errorMessage: {},
  },
  reducers: {
    receiveSearch: (state, action) => {
      const { id, results } = action.payload;
      state.results[id] = results;
      state.foundNothing[id] = results.length === 0;
    },
    toggleSearchState: (state, action) => {
      const { id, isSearching } = action.payload;
      state.isSearching[id] = isSearching;
    },
    setSearchString: (state, action) => {
      const { id, searchString } = action.payload;
      state.searchString[id] = searchString;

      state.isSearching[id] = true;
      state.foundNothing[id] = false;
      state.errorMessage[id] = "";
    },
    clearSearch: (state, action) => {
      const { id } = action.payload;
      state.results[id] = [];
      state.isSearching[id] = false;
      state.searchString[id] = "";
      state.foundNothing[id] = false;
      state.errorMessage[id] = "";
    },
    setErrorMessage: (state, action) => {
      const { id, errorMessage } = action.payload;
      state.errorMessage[id] = errorMessage;

      state.results[id] = [];
      state.isSearching[id] = false;
      state.foundNothing[id] = false;
    },
  },
});

export const {
  receiveSearch,
  toggleSearchState,
  setSearchString,
  clearSearch,
  setErrorMessage,
} = searchSlice.actions;

export const selectResults = (id) => (state) => state.search.results[id] || [];
export const selectIsSearching = (id) => (state) =>
  state.search.isSearching[id] || false;
export const selectSearchString = (id) => (state) =>
  state.search.searchString[id] || "";
export const selectFoundNothing = (id) => (state) =>
  state.search.foundNothing[id] || false;
export const selectErrorMessage = (id) => (state) =>
  state.search.errorMessage[id] || "";

export default searchSlice.reducer;
