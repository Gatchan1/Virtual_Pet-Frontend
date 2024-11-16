import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import { getUserPets } from "../api/petService";

export default function DashBoard({ setIsAuthenticated }) {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    fetchUserPets();
    const intervalId = setInterval(fetchUserPets, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchUserPets = async () => {
    try {
      const data = await getUserPets();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  return (
    <>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="pet-card-container flex">
        {pets &&
          pets.map((pet) => {
            return <PetCard key={pet.name} className="pet-card" pet={pet} fetchUserPets={fetchUserPets}/>;
          })}
      </div>
    </>
  );
}
