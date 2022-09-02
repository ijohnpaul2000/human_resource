import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";

import authReducer from "./features/authReducer";
import appReducer from "./features/appReducer";
import sidebarReducer from "./features/sidebarReducer";
import appoinmentReducer from "./features/appoinmentReducer";
import modalReducer from "./features/modalReducer";
import dashboardReducer from "./features/DashboardThunk";

//ENTITIES
import ApplicantsThunk from "./features/Entities/ApplicantsThunk";
import AppointmentsThunk from "./features/Entities/AppointmentsThunk";
import EmployeesThunk from "./features/Entities/EmployeesThunk";
import OnlineApplicantsThunk from "./features/Entities/OnlineApplicantsThunk";

const persisConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  sidebar: sidebarReducer,
  appointment: appoinmentReducer,
  modal: modalReducer,
  dashboard: dashboardReducer,
  //ENTITIES
  applicants: ApplicantsThunk,
  appointments: AppointmentsThunk,
  employees: EmployeesThunk,
  onlineApplicants: OnlineApplicantsThunk,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
