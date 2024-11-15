import axios from "axios";
import { API_URL } from "./apiConstants";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      userName: username,
      password,
    });
    const token = response.data;
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw new Error("Inicio de sesión fallido. Verifica tus credenciales.");
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      userName: username,
      email,
      password
    });
    const token = response.data;
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw new Error("Intento de registro fallido. Puede que ese nombre de usuario ya exista.");
  }
};
