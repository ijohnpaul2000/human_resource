import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import MonitorStatus from "./pages/MonitorStatus";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  Appointment,
  Requirements,
  Screening,
  Contract,
  Examination,
} from "./pages/Hiring Process/index";

import Login from "./pages/Login";
import RegisterApplicant from "./pages/RegisterApplicant";
import ManageUsers from "./pages/ManageUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<ProtectedRoute allowedRoles={["user", "admin", "super_user"]} />}>
            <Route path="/applicant/appointment" element={<Appointment />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "super_user"]} />}>
            <Route path="/applicant/screening" element={<Screening />} />
            <Route path="/applicant/requirements" element={<Requirements />} />
            <Route path="/applicant/contract" element={<Contract />} />
            <Route path="/applicant/examination" element={<Examination />} />
            <Route path="/monitor-status" element={<MonitorStatus />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["super_user"]} />}>
            <Route path="/manage-users" element={<ManageUsers />} />
          </Route>

          <Route path="/register-applicant" element={<RegisterApplicant />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
