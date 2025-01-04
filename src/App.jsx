import "./App.css";
import useAuth from "./hooks/useAuth";
import DashBoard from "./pages/DashBoard";
import AuthenticationPage from "./pages/AuthenticationPage";
import Layout from "./layouts/Layout";
import { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { API_URL } from "./api/apiConstants";

async function getTestRoute() {
  try {
    const response = await fetch(`${API_URL}/test/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    console.log("dataa test!", data);
  } catch (err) {
    console.log(err);
  }
}


function App() {
  const { isAuthenticated, setIsAuthenticated, isLoading } = useAuth();
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    getTestRoute();

    if (!isLoading)
      setTimeout(() => {
        setLoadingSpinner(false);
      }, 1000);
  }, [isLoading]);

  if (loadingSpinner) {
    return (
      <div className="spinnerContainer">
        <span className="spinner" role="status"></span>
      </div>
    );
  }

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
