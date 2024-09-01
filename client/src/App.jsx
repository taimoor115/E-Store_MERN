import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import Edit from "./pages/admin/Edit";
import Delete from "./pages/Delete";
import Create from "./pages/admin/Create";
import Home from "./pages/user/Home";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";
import Cookies from "js-cookie";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoggedIn = Cookies.get("accessToken");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="product/create" element={<Create />} />
      <Route path="product/edit/:id" element={<Edit />} />
      <Route path="product/delete/:id" element={<Delete />} />
    </Routes>
  );
};

export default App;
