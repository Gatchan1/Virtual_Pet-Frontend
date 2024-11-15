import './App.css'
import useAuth from './hooks/useAuth';
import DashBoard from './pages/DashBoard';
import AuthenticationPage from './pages/AuthenticationPage';

function App() {
  const {isAuthenticated, setIsAuthenticated} = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <DashBoard setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <AuthenticationPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  )
}

export default App
