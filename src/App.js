import React from "react";
import { SearchInput } from "features/search/SearchInput";
import styled from "styled-components";

import { apiSearchWorks, apiSearchTitles } from "app/api";

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
        <SearchInput
          id="books"
          apiCall={apiSearchWorks}
          placeholder="Search books..."
        />
        <SearchInput
          id="titles"
          apiCall={apiSearchTitles}
          placeholder="Search titles..."
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
