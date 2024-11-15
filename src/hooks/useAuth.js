import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } 
        else {
          localStorage.removeItem('token'); // Eliminar token expirado
        }
      } catch (error) {
        console.error('Token no válido:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return {isAuthenticated, setIsAuthenticated};
}

export default useAuth;