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

const Buttons = styled.div`
  margin: 1em 0;
  button {
    font-size: 15px;
  }
`;

const View = ({ id, children }) => <div id={id}>{children}</div>;

function App() {
  const [activeView, setView] = useState(1);
  return (
    <div className="App">
      <View id={activeView}>
        <Header>
          <Buttons>
            <button onClick={() => setView(Math.max(0, activeView - 1))}>
              Previous view
            </button>
            <button onClick={() => setView(activeView + 1)}>Next view</button>
          </Buttons>
          <h1>
            <span role="img" aria-label="Look here">
              👇
            </span>
            &nbsp;
            <span>Page #{activeView}</span>
          </h1>
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
          <h3>The inputs</h3>
          <p>
            The first input searches for /works API endpoint.
            <br />
            On hover, two buttons for Google and Amazon search appear.
          </p>
          <p>
            The second input searches for /titles.
            <br />
            Clicking on the result opens a popup with Amazon search results.
          </p>
          <p>These were created to demonstrate:</p>
          <ul>
            <li>
              The search interface is reusable, and state is persisted by Redux.
            </li>
            <li>
              The API call is configurable to search from different endpoints.
            </li>
            <li>
              As the search results can be different, the Search Result Items
              are configurable and can be rendered differently
            </li>
          </ul>

          <h3>Other features</h3>
          <ul>
            <li>
              The search results popup can be closed by removing focus from
              input, or by pressing Esc key
            </li>
            <li>Searching state is rendered with "skeletons".</li>
            <li>
              Error messages are rendered in search results area. Try disabling
              Network from DevTools.
            </li>
            <li>
              "No results found." message is rendered in search results area.
              Try searching for some jibberish.
            </li>
          </ul>
        </main>
      </View>
    </div>
  );
}

export default App;
