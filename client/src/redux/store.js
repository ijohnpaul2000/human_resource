import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";

import authReducer from "./features/authReducer";
import sidebarReducer from "./features/sidebarReducer";
import appoinmentReducer from "./features/appoinmentReducer";
import modalReducer from "./features/modalReducer";
import dashboardReducer from "./features/DashboardThunk";
import requirementReducer from "./features/requirementReducer";
import contractReducer from "./features/contractReducer";
import userReducer from "./features/userReducer";
import filterReducer from "./filterReducer";
import applicantEmployeeReducer from "./features/applicantEmployeeReducer";

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
  sidebar: sidebarReducer,
  appointment: appoinmentReducer,
  modal: modalReducer,
  dashboard: dashboardReducer,
  requirements: requirementReducer,
  contract: contractReducer,
  users: userReducer,
  filtration: filterReducer,
  applicantEmployee: applicantEmployeeReducer,
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
