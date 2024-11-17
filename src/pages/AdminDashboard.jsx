import { useEffect, useState } from "react"
import PetCard from "../components/PetCard";
import { getAllPets } from "../api/petService";

export default function AdminDashboard() {
    const [pets, setPets] = useState(null);

    useEffect(()=>{
        fetchAllPets();
        const intervalId = setInterval(fetchAllPets, 60000);
    
        return () => clearInterval(intervalId);
    },[])

    const fetchAllPets = async () => {
        try {
          const data = await getAllPets();
          setPets(data);
        } catch (error) {
          console.error("Error fetching pets:", error);
        }
      };

  return (
    <div className="admin-dashboard relative">
    <div className="pet-card-container flex">
          {pets &&
            pets.map((pet) => {
              return <PetCard key={pet.name} pet={pet} fetchPets={fetchAllPets} isAdminDashboard={true}/>;
            })}
        </div>
    </div>
  )
}
