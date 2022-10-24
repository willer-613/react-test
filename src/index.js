import React from "react";
import ReactDOM from "react-dom";
import { fakeNames } from "./fakeNames";
import { FilterList } from "./FilterList";

import "./styles.css";

export const context = React.createContext();

function App() {
  return (
    <context.Provider value={{ a: 1 }}>
      <FilterList names={fakeNames} />
    </context.Provider>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
