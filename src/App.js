import React, { useState } from "react";
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

const View = ({ id, children }) => <div id={id}>{ children }</div>;

function App() {
  const [activeView, setView] = useState(1);
  return (
    <div className="App">
      <View id={activeView}>
      <Header>
      <button onClick={() => setView(Math.max(0, activeView-1))}>Previous view</button>
      <button onClick={() => setView(activeView+1)}>Next view</button>
        <SearchComponent
          id={activeView + "-books"}
          apiCall={apiSearchWorks}
          placeholder="Search books..."
          SearchResultItem={SearchWorksItem}
        />
        <SearchComponent
          id={activeView + "-titles"}
          apiCall={apiSearchTitles}
          placeholder="Search titles on Amazon.com"
          SearchResultItem={SearchTitlesItem}
        />
      </Header>
      <main>
        <h1>
          <span role="img" aria-label="Look up">
            ☝️ {activeView}
          </span>
        </h1>
      </main>
      </View>
    </div>
  );
}

export default App;
