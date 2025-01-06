import { petAccessories } from "../../api/apiConstants";
import Accessory from "./Accessory";

export default function Accessories({pet, fetchPets}) {
  return (
    <>
      <h4>Accessories</h4>
      {petAccessories.map((accessory) => (
        <Accessory key={accessory} accessory={accessory} pet={pet} fetchPets={fetchPets} />
      ))}
    </>
  );
}
