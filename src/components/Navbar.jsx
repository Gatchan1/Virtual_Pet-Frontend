import { useEffect, useState } from "react";
import { getUserNameFromToken } from "../utils/authUtils";

export default function Navbar({ setIsAuthenticated, showAdminDashboard, setShowAdminDashboard, isAdmin }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(getUserNameFromToken());
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const AdminPanelButton = () => {
    return (
      <button onClick={() => setShowAdminDashboard((bool) => !bool)} className="btn btn-warning">
        {showAdminDashboard ? "User Dashboard" : "Admin Panel"}
      </button>
    );
  };

  return (
    <div className="navbar">
      {isAdmin && <AdminPanelButton />}
      <p>Hello, <b>{username}</b></p>
      <button onClick={logout} className="btn btn-light">
        Logout
      </button>
    </div>
  );
}
