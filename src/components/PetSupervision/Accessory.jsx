import { useEffect, useState } from "react";
import { updatePet } from "../../api/petService";

export default function Accessory({ accessory, pet, fetchPets }) {
  const [isWearing, setIsWearing] = useState(false);

  useEffect(() => {
    if (pet.accessories.includes(accessory)) setIsWearing(true);
  }, []);

  const changeAccessories = async () => {
    let accessories = [...pet.accessories];
    accessories = isWearing ? accessories.filter((acc) => acc !== accessory) : [...accessories, accessory];
    try {
      await updatePet(pet, { accessories });
      fetchPets();
      setIsWearing((bool) => !bool);
    } catch (error) {
      console.error("Error updating pet accessories:", error);
    }
  };

  return (
    <div>
      <button className="margin btn btn-primary" onClick={() => changeAccessories()} disabled={!pet.active}>
        {isWearing ? "Remove " : "Put on "}
        <b>{accessory.toLowerCase()}</b>
      </button>
    </div>
  );
}
