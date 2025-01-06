import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import { getUserPets } from "../api/petService";
import PetCreation from "../components/PetCreation";
import { getUserIdFromToken, getUserNameFromToken } from "../utils/authUtils";

export default function DashBoard() {
  const [pets, setPets] = useState(null);
  const [showCreatePet, setShowCreatePet] = useState(false);
  const [hasPets, setHasPets] = useState(true);

  useEffect(() => {
    fetchUserPets();
    const intervalId = setInterval(fetchUserPets, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchUserPets = async () => {
    try {
      const data = await getUserPets();
      const pets = data.map((pet) => {
        pet.userName = getUserNameFromToken();
        pet.userId = getUserIdFromToken();
        return pet;
      });
      if (pets.length == 0) setHasPets(false);
      else setHasPets(true);
      setPets(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  return (
    <>
      <div className="dashboard relative">
        <div className="relative">
          <div>
            <button onClick={() => setShowCreatePet((bool) => !bool)} className={showCreatePet ? "btn btn-light" : "btn btn-primary"}>
              Create new pet
            </button>
            {showCreatePet && <PetCreation fetchUserPets={fetchUserPets} setShowCreatePet={setShowCreatePet} setHasPets={setHasPets} />}
          </div>
          {!hasPets && !showCreatePet && (
            <div className="arrow-container">
              <img src="/arrow.webp" alt="animated arrow" />
            </div>
          )}
        </div>
        <div className="pet-card-container flex">
          {pets &&
            pets.map((pet) => {
              return <PetCard key={pet.name} pet={pet} fetchPets={fetchUserPets} isAdminDashboard={false} />;
            })}
        </div>
      </div>
    </>
  );
}
