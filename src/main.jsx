// src/main.jsx (or index.jsx depending on setup)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // important to include styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
