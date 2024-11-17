import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";  // Adjust the path if needed
import { getUserRoleFromToken } from "../utils/authUtils";

export default function Layout ({ setIsAuthenticated, showAdminDashboard, setShowAdminDashboard, children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is an admin
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