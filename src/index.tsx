import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./style.css";
import "./index.css";
import "./custom.css";
import "./components/styles/NavMenu.css";
import "./components/styles/Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
const baseUrl = document.getElementsByTagName("base")[0]?.getAttribute("href");
const rootElement = document.getElementById("root");

if (rootElement) {
  // Use createRoot only if rootElement is not null
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <BrowserRouter basename={baseUrl ?? "/"}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
