import { petLocations } from "../../api/apiConstants";
import Location from "./Location";

export default function Locations({pet, fetchPets}) {
  return (
    <>
      <h4>Locations</h4>
      {petLocations.map((location) => (
        <Location key={location[0]} location={location} pet={pet} fetchPets={fetchPets} />
      ))}
    </>
  );
}
