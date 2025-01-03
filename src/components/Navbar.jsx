export default function Navbar({ setIsAuthenticated, showAdminDashboard, setShowAdminDashboard, isAdmin }) {
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const AdminPanelButton = () => {
    return (
    <button onClick={() => setShowAdminDashboard((bool) => !bool)} className="btn btn-warning">
    {showAdminDashboard ? "User Dashboard" : "Admin Panel"}
    </button>
  )};

  return (
    <div className={`navbar ${isAdmin ? "space-between" : "button-to-left"}`}>
      {isAdmin && <AdminPanelButton />}
      <button onClick={logout} className="btn btn-light">Logout</button>
    </div>
  );
}
