import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveSearch,
  toggleSearchState,
  clearSearch,
  setSearchString,
  setErrorMessage,
  selectResults,
  selectIsSearching,
  selectSearchString,
  selectFoundNothing,
  selectErrorMessage,
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

const NoResults = styled.p`
  text-align: center;
  color: #676767;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: indianred;
`;

const useSearch = (id, apiCall) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const searchRef = useRef(null);
  useEffect(() => {
    const goSearch = async (searchString) => {
      try {
        const results = await apiCall(searchString);
        if (inputRef.current.value === searchString) {
          dispatch(receiveSearch({ id, results }));
        }
      } catch (ex) {
        dispatch(
          setErrorMessage({
            id,
            errorMessage: "An error occurred. Please try again later.",
          })
        );
      } finally {
        dispatch(toggleSearchState({ id, isSearching: false }));
      }
    };
    searchRef.current = _.debounce(goSearch, 300);
  }, [id, dispatch, apiCall]);

  const handleInputChange = (e) => {
    const searchString = inputRef.current.value;
    dispatch(setSearchString({ id, searchString }));
    if (!searchString) {
      searchRef.current.cancel();
      dispatch(clearSearch({ id }));
    } else {
      searchRef.current(searchString);
    }
  };

  return [inputRef, handleInputChange];
};

export const SearchComponent = ({
  id,
  placeholder = "Search...",
  apiCall,
  SearchResultItem,
}) => {
  const [inputEl, handleChange] = useSearch(id, apiCall);
  const foundNothing = useSelector(selectFoundNothing(id));
  const searchString = useSelector(selectSearchString(id));
  const isSearching = useSelector(selectIsSearching(id));
  const searchResults = useSelector(selectResults(id));
  const errorMessage = useSelector(selectErrorMessage(id));

  const [hasFocus, setFocus] = useState(false);
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  }
  return (
    <Wrapper>
      <SearchInput
        value={searchString}
        ref={inputEl}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {hasFocus && (
        <SearchResultsArea>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {foundNothing && <NoResults>No results found.</NoResults>}
          {isSearching && <Skeletons />}
          {!isSearching &&
            searchResults.map((item) => (
              <SearchResultItem key={item["@uri"]} item={item} />
            ))}
        </SearchResultsArea>
      )}
    </Wrapper>
  );
};
