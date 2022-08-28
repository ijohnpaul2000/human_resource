import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";

import authReducer from "./features/authReducer";
import appReducer from "./features/appReducer";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
