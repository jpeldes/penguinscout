import React from "react";
import { SearchInput } from "features/search/SearchInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchInput id="header" />
      </header>
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
