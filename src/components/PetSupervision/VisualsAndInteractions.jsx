import { useEffect, useState } from "react";
import { updatePet } from "../../api/petService";
import ProgressBar from "../ProgressBar";

export default function VisualsAndInteractions({ pet, fetchPets }) {
  const [petState, setPetState] = useState("happy");

  useEffect(() => {
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

  const calculateTimePassed = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - createdDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(differenceInDays * 10) / 10;
  };

  return (
    <div className="align-center">
      <div className="pet-image-container">
        {!pet.active && (
          <h5 className="pet-gone">
            <p className="big-font">😔</p>
            <p>
              <b>{pet.name}</b> felt mistreated and left you.
            </p>
            <p>They were with you for {calculateTimePassed(pet.createdAt)} days.</p>
          </h5>
        )}
        {pet.active && (
          <>
            <img className="location" src={`/${pet.location.toLowerCase()}.webp`} />
            <img className="pet" src={`/${pet.type.toLowerCase()}-${pet.color.toLowerCase()}-${petState}.png`} />
            {pet.accessories.includes("HAT") && <img className="accessory" src="/hat.png" />}
            {pet.accessories.includes("SUNGLASSES") && <img className="accessory" src="/sunglasses.png" />}
          </>
        )}
      </div>
      <div className="progress-bars padding-top">
        <ProgressBar label={"Happiness"} value={pet.happiness} color={"#e1ff85"} />
        <ProgressBar label={"Energy"} value={pet.energy} color={"#b1fac5"} />
      </div>
      <div className="padding-top">
        <button className="margin btn btn-primary" onClick={() => interact("PLAY")} disabled={!pet.active}>
          Play
        </button>
        <button className="margin btn btn-primary" onClick={() => interact("EAT")} disabled={!pet.active}>
          Eat
        </button>
      </div>
    </div>
  );
}
