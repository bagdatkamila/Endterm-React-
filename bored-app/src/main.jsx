import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store.js";

import { initAuthListener } from "./features/auth/authSlice";

store.dispatch(initAuthListener());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((err) => console.error("SW registration failed:", err));
  });
}
