import { updatePet, deletePet } from "../../api/petService";
import { petAccessories, petLocations } from "../../api/apiConstants";

import ProgressBar from "../ProgressBar";
import Accessory from "./Accessory";
import Location from "./Location";
import { useEffect, useState } from "react";

export default function PetSupervision({ pet, fetchPets, closeModal }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [petState, setPetState] = useState("happy");

  useEffect(() => {
    console.log("peeeet", pet);
    establishState();
  }, [pet]);

  const establishState = () => {
    if (pet.asleep) setPetState("asleep");
    else if (pet.happiness < 50) setPetState("sad");
    else setPetState("happy");
  };

  const interact = async (petInteraction) => {
    try {
      await updatePet(pet, { petInteraction });
      fetchPets();
    } catch (error) {
      console.error("Error interacting with pet:", error);
    }
  };

  const deletion = async () => {
    try {
      await deletePet(pet);
      fetchPets();
      closeModal();
    } catch (error) {
      console.error("Error deleting pet:", error);
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
        <div className="button-to-left">
          <button onClick={closeModal} className="btn btn-light">
            ✖️
          </button>
        </div>
        <header>
          <h2>{pet.name}</h2>
          <p>Belongs to: <span className="bold">{pet.userName}</span></p>
        </header>
        <div className="modal-main flex">
          <div className="left">
            <div>
              <h4>Accessories</h4>
              {petAccessories.map((accessory) => (
                <Accessory key={accessory} accessory={accessory} pet={pet} fetchPets={fetchPets} />
              ))}
            </div>
          </div>

          <div className="middle">
            <div className="pet-image">
              <img className="location" src={`${pet.location.toLowerCase()}.webp`} />
              <img className="pet" src={`${pet.type.toLowerCase()}-${pet.color.toLowerCase()}-${petState}.png`} />
              {pet.accessories.includes("HAT") && <img className="accessory" src="hat.png" />}
              {pet.accessories.includes("SUNGLASSES") && <img className="accessory" src="sunglasses.png" />}
            </div>
            <div className="padding-top">
              <ProgressBar label={"Happiness"} value={pet.happiness} color={"#e1ff85"} />
              <ProgressBar label={"Energy"} value={pet.energy} color={"#b1fac5"} />
            </div>
            <div className="padding-top">
              <button className="margin btn btn-primary" onClick={() => interact("PLAY")}>Play</button>
              <button className="margin btn btn-primary" onClick={() => interact("EAT")}>Eat</button>
            </div>
          </div>

          <div className="right">
            <div>
              <h4>Locations</h4>
              {petLocations.map((location) => (
                <Location key={location[0]} location={location} pet={pet} fetchPets={fetchPets} />
              ))}
            </div>
          </div>
        </div>

        <div className="button-to-left">
          {showDeleteConfirmation ? (
            <div className="delete-confirmation">
              <p>Are you sure you want to delete this pet?</p>
              <button onClick={deletion} className="btn btn-outline-danger">
                Yes, delete
              </button>
              <button onClick={() => setShowDeleteConfirmation(false)} className="btn btn-outline-primary">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowDeleteConfirmation(true)} className="btn btn-outline-danger">
              Delete pet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
