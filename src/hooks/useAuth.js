import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } 
        else {
          localStorage.removeItem('token'); // Eliminate expired token
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token no válido:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  return {isAuthenticated, setIsAuthenticated, isLoading};
}

export default useAuth;