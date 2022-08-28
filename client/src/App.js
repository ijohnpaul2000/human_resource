import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SharedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
