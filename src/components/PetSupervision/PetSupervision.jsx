import { updatePet } from "../../api/petService";
import { petAccessories, petLocations } from "../../api/apiConstants";

import ProgressBar from "../ProgressBar";
import Accessory from "./Accessory";
import Location from "./Location";

export default function PetSupervision({ pet, fetchUserPets, closeModal }) {
  const interact = async (petInteraction) => {
    try {
      await updatePet(pet, { petInteraction });
      fetchUserPets();
    } catch (error) {
      console.error("Error interacting with pet:", error);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal-content">
        <div className="close-modal">
          <button onClick={closeModal}>Close</button>
        </div>
        <h2>{pet.name}</h2>
        <div className="modal-main flex">
          <div className="left">
            {/* imagen */}
            <ProgressBar label={"Happiness"} value={pet.happiness} color={"#8ae048"} />
            <ProgressBar label={"Energy"} value={pet.energy} color={"#c197de"} />
            <div>
              <button onClick={() => interact("PLAY")}>Play</button>
              <button onClick={() => interact("EAT")}>Eat</button>
            </div>
          </div>
          <div className="right">
            <div>
              <h4>Accessories</h4>
              {petAccessories.map((accessory) => (
                <Accessory key={accessory} accessory={accessory} pet={pet} fetchUserPets={fetchUserPets} />
              ))}
            </div>
            <div>
              <h4>Locations</h4>
              {petLocations.map((location) => (
                <Location key={location[0]} location={location} pet={pet} fetchUserPets={fetchUserPets} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
