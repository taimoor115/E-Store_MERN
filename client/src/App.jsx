import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import Edit from "./pages/admin/Edit";
import Delete from "./pages/Delete";
import Create from "./pages/admin/Create";

const App = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/product/create" element={<Create />} />
      <Route path="/product/edit/:id" element={<Edit />} />
      <Route path="/product/delete/:id" element={<Delete />} />
    </Routes>
  );
};

export default App;
