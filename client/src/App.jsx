import { Route, Routes, useLocation } from "react-router-dom";
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

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/shop" element={<Shop />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* {isAdminRoute ? "" : <Footer />} */}
    </>
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
