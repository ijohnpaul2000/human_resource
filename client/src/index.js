import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
