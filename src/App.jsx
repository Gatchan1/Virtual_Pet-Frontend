import "./App.css";
import useAuth from "./hooks/useAuth";
import DashBoard from "./pages/DashBoard";
import AuthenticationPage from "./pages/AuthenticationPage";
import Layout from "./layouts/Layout";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <Layout setIsAuthenticated={setIsAuthenticated} showAdminDashboard={showAdminDashboard} setShowAdminDashboard={setShowAdminDashboard}>
          {showAdminDashboard ? <AdminDashboard /> : <DashBoard />}
        </Layout>
      ) : (
        <AuthenticationPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}

export default App;
