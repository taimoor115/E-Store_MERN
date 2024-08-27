import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const AdminNavbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
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
