import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SearchProvider } from './context/searchContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
