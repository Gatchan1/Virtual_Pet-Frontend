import { useEffect, useState } from "react";
import { updatePet } from "../../api/petService";

export default function Accessory({ accessory, pet, fetchUserPets }) {
  const [isWearing, setIsWearing] = useState(false);

  useEffect(() => {
    if (pet.accessories.includes(accessory)) setIsWearing(true);
  }, []);

  const changeAccessories = async () => {
    let accessories = [...pet.accessories];
    accessories = isWearing ? accessories.filter((acc) => acc !== accessory) : [...accessories, accessory];
    try {
      await updatePet(pet, { accessories });
      fetchUserPets();
      setIsWearing((bool) => !bool);
    } catch (error) {
      console.error("Error interacting with pet:", error);
    }
  };

  return (
    <div>
      <button onClick={() => changeAccessories()}>
        {isWearing ? "Remove " : "Put on "}
        {accessory.toLowerCase()}
      </button>
    </div>
  );
}
