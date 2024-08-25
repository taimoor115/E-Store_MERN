import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  //   return !!localStorage.getItem("token");
  return true;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
