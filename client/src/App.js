import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";

import {
  Appointment,
  Requirements,
  Screening,
  Status,
  Examination,
} from "./pages/Hiring Process/index";

import Login from "./pages/Login";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applicant/screening" element={<Screening />} />
          <Route path="/applicant/requirements" element={<Requirements />} />
          <Route path="/applicant/appointment" element={<Appointment />} />
          <Route path="/applicant/status" element={<Status />} />
          <Route path="/applicant/examination" element={<Examination />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
