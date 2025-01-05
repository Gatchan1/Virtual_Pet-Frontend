import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserRoleFromToken } from "../utils/authUtils";
import Footer from "../components/Footer";

export default function Layout({ setIsAuthenticated, showAdminDashboard, setShowAdminDashboard, children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = getUserRoleFromToken();
    if (role === "ROLE_ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      <div className="anti-footer">
        <Navbar isAdmin={isAdmin} showAdminDashboard={showAdminDashboard} setShowAdminDashboard={setShowAdminDashboard} setIsAuthenticated={setIsAuthenticated} />
        <div className="content">{children}</div>
      </div>
      <Footer/>
    </>
  );
}
