import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import UserDataProvider from "./contexts/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
