import { jwtDecode } from "jwt-decode";

const decodeTokenField = (field) => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken[field] || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  return decodeTokenField("id");
};

export const getUserNameFromToken = () => {
  return decodeTokenField("sub");
};

export const getUserRoleFromToken = () => {
  return decodeTokenField("role");
};