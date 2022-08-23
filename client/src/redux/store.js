import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";

import authReducer from "./features/authReducer";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
