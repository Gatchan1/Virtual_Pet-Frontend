import axios from "axios";
import { API_URL } from "./apiConstants";
import { getUserIdFromToken } from "../utils/authUtils";

const token = localStorage.getItem("token");

export const getUserPets = async () => {
  const response = await axios.get(`${API_URL}/pet/getUserPets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: getUserIdFromToken(),
    },
  });

  return response.data;
};

export const getAllPets = async () => {
  const response = await axios.get(`${API_URL}/pet/admin/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updatePet = async (pet, { petInteraction = null, accessories = pet.accessories, location = pet.location }) => {
  const data = {
    userId: pet.userId,
    name: pet.name,
    petInteraction,
    accessories,
    location,
  };

  const response = await axios.put(`${API_URL}/pet/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deletePet = async (pet) => {
  const response = await axios.delete(`${API_URL}/pet/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: pet.userId,
      name: pet.name,
    },
  });

  return response;
};

export const createPet = async (name, type, color) => {
  const data = {
    userId: getUserIdFromToken(),
    name,
    type,
    color,
  };

  const response = await axios.post(`${API_URL}/pet/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
