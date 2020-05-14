import React from "react";
import { SearchComponent } from "features/search/SearchComponent";
import styled from "styled-components";

import { apiSearchWorks, apiSearchTitles } from "app/api";
import { SearchWorksItem } from "features/search/SearchWorksItem";
import { SearchTitlesItem } from "features/search/SearchTitlesItem";

const Header = styled.header`
  width: 100%;
  background: #fff;
  box-shadow: 0 0 8px 1px #eee;
  padding: 1em;
`;

function App() {
  return (
    <div className="App">
      <Header>
        <SearchComponent
          id="books"
          apiCall={apiSearchWorks}
          placeholder="Search books..."
          SearchResultItem={SearchWorksItem}
        />
        <SearchComponent
          id="titles"
          apiCall={apiSearchTitles}
          placeholder="Search titles on Amazon.com"
          SearchResultItem={SearchTitlesItem}
        />
      </Header>
      <main>
        <h1>
          <span role="img" aria-label="Look up">
            ☝️
          </span>
        </h1>
      </main>
    </div>
  );
}

export default App;
