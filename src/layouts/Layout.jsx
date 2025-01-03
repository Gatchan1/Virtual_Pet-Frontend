import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserRoleFromToken } from "../utils/authUtils";

export default function Layout ({ setIsAuthenticated, showAdminDashboard, setShowAdminDashboard, children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role === "ROLE_ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div>
      <Navbar isAdmin={isAdmin} showAdminDashboard={showAdminDashboard} setShowAdminDashboard={setShowAdminDashboard} setIsAuthenticated={setIsAuthenticated}/>
      <div className="content">
        {children}
      </div>
    </div>
  );
};