import axios from "axios";
import { API_URL } from "./apiConstants";
import { getUserIdFromToken } from "../utils/authUtils";

export const getUserPets = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/pet/getUserPets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: getUserIdFromToken(),
      },
    });

    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    return null;
  }
};

export const updatePet = async (pet, 
  { petInteraction = null, 
  accessories = pet.accessories,
  location = pet.location }) => {
  try {
    const token = localStorage.getItem("token");

    const data = {
      userId: getUserIdFromToken(),
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
  } catch (error) {
    console.error("Error updating pet:", error);
    return null;
  }
};