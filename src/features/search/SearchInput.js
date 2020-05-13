import React, { useRef, useEffect } from "react";
import _ from "lodash";
import { apiSearchWorks } from "app/api";
import { useDispatch, useSelector } from "react-redux";
import { initSearch, receiveSearch, selectResults } from "./searchSlice";

export const SearchInput = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initSearch({ id }));
  }, [dispatch, id]);
  const inputEl = useRef(null);

  const goSearch = (e) => {
    const searchString = inputEl.current.value;
    apiSearchWorks(searchString).then(({ data }) => {
      const results = data.work || [];
      dispatch(receiveSearch({ id, results }));
    });
  };
  const debouncedSearch = _.debounce(goSearch, 300);

  const searchResults = useSelector(selectResults(id));

  return (
    <div>
      <input
        ref={inputEl}
        type="text"
        placeholder="Search"
        onChange={debouncedSearch}
        autoFocus
      />
      <div>
        {searchResults.map((item) => (
          <div key={item.workid}>{item.titleweb}</div>
        ))}
      </div>
    </div>
  );
};
