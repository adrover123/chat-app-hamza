import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Ensure this file exists
import App from "./App";
import reportWebVitals from "./reportWebVitals";  // Ensure this file exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
