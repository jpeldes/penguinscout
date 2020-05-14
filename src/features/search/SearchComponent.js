import React, { useRef } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveSearch,
  toggleSearchState,
  selectResults,
  selectIsSearching,
} from "./searchSlice";

import styled from "styled-components";
import { Skeletons } from "./SearchSkeleton";

const Wrapper = styled.div`
  position: relative;
  max-width: 300px;
`;

const SearchInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 2px;
  font-size: 15px;
  line-height: 19px;
  padding: 9px 12px;
  width: 100%;
  &:focus {
    border: 2px solid #003cd7;
    outline: 0;
  }
`;

const SearchResultsArea = styled.div`
  z-index: 1;
  position: absolute;
  background: #f4f4f1;
  max-width: 320px;
  width: 100%;
  max-height: 285px;
  overflow: auto;
`;

const useSearch = (id, apiCall) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const goSearch = async (searchString) => {
    try {
      const results = await apiCall(searchString);
      if (inputRef.current.value === searchString) {
        dispatch(receiveSearch({ id, results }));
      }
    } finally {
      dispatch(toggleSearchState({ id, isSearching: false }));
    }
  };
  const debouncedSearch = useRef(_.debounce(goSearch, 300)).current;
  const handleInputChange = () => {
    const searchString = inputRef.current.value;
    if (!searchString) {
      debouncedSearch.cancel();
      dispatch(receiveSearch({ id, results: [] }));
      dispatch(toggleSearchState({ id, isSearching: false }));
    } else {
      dispatch(toggleSearchState({ id, isSearching: true }));
      debouncedSearch(searchString);
    }
  };
  return [inputRef, handleInputChange];
};

export const SearchComponent = ({ id, placeholder = "Search...", apiCall, SearchResultItem }) => {
  const [inputEl, handleChange] = useSearch(id, apiCall);
  const isSearching = useSelector(selectIsSearching(id));
  const searchResults = useSelector(selectResults(id));
  return (
    <Wrapper>
      <SearchInput
        ref={inputEl}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        autoFocus
      />
      <SearchResultsArea>
        {isSearching && <Skeletons />}
        {!isSearching &&
          searchResults.map((item) => (
            <SearchResultItem key={item["@uri"]} item={item} />
          ))}
      </SearchResultsArea>
    </Wrapper>
  );
};
