import { useState } from "react";
import ProgressBar from "./ProgressBar";
import PetSupervision from "./PetSupervision/PetSupervision";

export default function PetCard({ pet, fetchPets, isAdminDashboard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={`pet-card ${isAdminDashboard && "admin"}`} onClick={openModal}>
        <h3>{pet.name}</h3>
        <ProgressBar label={"Happiness"} value={pet.happiness} color={"#e1ff85"}/>
        <ProgressBar label={"Energy"} value={pet.energy} color={"#b1fac5"}/>
      </div>

      {isModalOpen && <PetSupervision pet={pet} fetchPets={fetchPets} closeModal={closeModal}/>}
    </div>
  );
}
