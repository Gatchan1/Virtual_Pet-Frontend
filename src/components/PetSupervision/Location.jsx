import { useEffect, useState } from 'react'
import { updatePet } from "../../api/petService";

export default function Location({location, pet, fetchPets}) {
  const [isHere, setIsHere] = useState(false);

  useEffect(() => {
    setIsHere(pet.location === location[0]);
  }, [pet.location]);

  const changeLocation = async () => {
    try {
      await updatePet(pet, {location: location[0]});
      fetchPets();
    } catch (error) {
      console.error("Error updating pet location:", error);
    }
  };

  return (
    <div>
      <button className={`margin btn ${isHere ? "btn-success" : "btn-primary"}`} onClick={() => changeLocation()
      } disabled={isHere || !pet.active}>
        {isHere ? "" : "Go to "}
        <b>{location[1]}</b>
      </button>
    </div>
  );
}
