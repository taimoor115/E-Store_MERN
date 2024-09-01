import ThemeToggleButton from "./ThemeToggleButton";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../store/features/admin.service";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutAdmin());
    navigate("/");
  };
  return (
    <div className="navbar max-w-[1200px] mx-auto">
      <div className="flex navbar-center">
        <button onClick={logout} className="btn">
          Logout
        </button>
      </div>

      <div className="gap-12 navbar-end">
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default AdminNavbar;
