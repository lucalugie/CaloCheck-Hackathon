import React from "react";
import ReactDOM from "react-dom/client";
import AppPim from "./AppPim";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <AppPim /> */}
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);
