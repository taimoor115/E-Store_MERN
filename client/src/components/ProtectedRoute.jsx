import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => {
  const accessToken = Cookies.get("accessToken");
  return !!accessToken;
};

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default ProtectedRoute;
