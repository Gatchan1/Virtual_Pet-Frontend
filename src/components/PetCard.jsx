import { useState } from "react";
import ProgressBar from "./ProgressBar";
import PetSupervision from "./PetSupervision/PetSupervision";

export default function PetCard({ pet, fetchUserPets }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="pet-card" onClick={openModal}>
        <h3>{pet.name}</h3>
        <ProgressBar label={"Happiness"} value={pet.happiness} color={"#8ae048"} />
        <ProgressBar label={"Energy"} value={pet.energy} color={"#c197de"} />
      </div>

      {isModalOpen && <PetSupervision pet={pet} fetchUserPets={fetchUserPets} closeModal={closeModal}/>}
    </div>
  );
}
