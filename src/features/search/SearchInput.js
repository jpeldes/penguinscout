import React, { useRef } from "react";
import _ from "lodash";
import { apiSearchWorks } from "app/api";
import { useDispatch, useSelector } from "react-redux";
import { receiveSearch, selectResults } from "./searchSlice";

import styled from "styled-components";
import { SearchResultItem } from "./SearchResultItem";

const Wrapper = styled.div`
  position: relative;
  max-width: 300px;
`;

const Input = styled.input`
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
  position: absolute;
  background: #f4f4f1;
  max-width: 320px;
  width: 100%;
  max-height: 250px;
  overflow: auto;
`;

export const SearchInput = ({ id }) => {
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const goSearch = (searchString) => {
    apiSearchWorks(searchString).then(({ data }) => {
      const results = data.work || [];
      dispatch(receiveSearch({ id, results }));
    });
  };
  const debouncedSearch = _.debounce(goSearch, 300);
  const handleChange = () => {
    const searchString = inputEl.current.value;
    if (!searchString) {
      debouncedSearch.cancel();
      dispatch(receiveSearch({ id, results: [] }));
    } else {
      debouncedSearch(searchString);
    }
  };

  const searchResults = useSelector(selectResults(id));

  return (
    <Wrapper>
      <Input
        ref={inputEl}
        type="text"
        placeholder="Search"
        onChange={handleChange}
        autoFocus
      />
      <SearchResultsArea>
        {searchResults.map((item) => (
          <SearchResultItem key={item.workid} item={item} />
        ))}
      </SearchResultsArea>
    </Wrapper>
  );
};
