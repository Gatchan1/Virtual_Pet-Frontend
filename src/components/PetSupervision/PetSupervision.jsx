import { deletePet } from "../../api/petService";

import { useState } from "react";
import Accessories from "./Accessories";
import VisualsAndInteractions from "./VisualsAndInteractions";
import Locations from "./Locations";
import useScreenSize from "../../hooks/useScreenSize";

export default function PetSupervision({ pet, fetchPets, closeModal }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const isMobile = useScreenSize();

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
          <p>
            Belong{pet.active ? "s" : "ed"} to: <b>{pet.userName}</b>
          </p>
        </header>

        {isMobile && (
          <div className="modal-main flex">
            <div className="bottom-border">
              <VisualsAndInteractions pet={pet} fetchPets={fetchPets} />
            </div>
            <div className="bottom-border">
              <Accessories pet={pet} fetchPets={fetchPets} />
            </div>
            <Locations pet={pet} fetchPets={fetchPets} />
          </div>
        )}
        {!isMobile && (
          <div className="modal-main flex">
            <div className="left">
              <Accessories pet={pet} fetchPets={fetchPets} />
            </div>
            <div className="middle">
              <VisualsAndInteractions pet={pet} fetchPets={fetchPets} />
            </div>
            <div className="right">
              <Locations pet={pet} fetchPets={fetchPets} />
            </div>
          </div>
        )}

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
