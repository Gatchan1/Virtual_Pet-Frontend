import { useEffect, useState } from 'react'
import { updatePet } from "../../api/petService";

export default function Location({location, pet, fetchUserPets}) {
  const [isHere, setIsHere] = useState(false);

  useEffect(() => {
    setIsHere(pet.location === location[0]);
  }, [pet.location]);

  const changeLocation = async () => {
    try {
      await updatePet(pet, {location: location[0]});
      fetchUserPets();
    } catch (error) {
      console.error("Error interacting with pet:", error);
    }
  };

  return (
    <div>
      <button onClick={() => changeLocation()} disabled={isHere}>
        {isHere ? "" : "Go to "}
        {location[1]}
      </button>
    </div>
  );
}
