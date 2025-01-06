import { useState } from "react";
import { createPet } from "../api/petService";

export default function PetCreation({ fetchUserPets, setShowCreatePet, setHasPets }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("CAT");
  const [color, setColor] = useState("WHITE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setHasPets(true);
      const response = await createPet(name, type, color);
      setShowCreatePet(bool => !bool);
      if (response.status === 201) {
        fetchUserPets();
        //alert("Pet created successfully!");
      }
    } catch (error) {
      console.error("Error creating pet:", error);
      alert("Failed to create pet.");
    }
  };

  return (
    <form className="pet-creation" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="CAT">Cat</option>
          <option value="DOG">Dog</option>
          <option value="DUCK">Duck</option>
        </select>
      </div>

      <div>
        <label>Color:</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="WHITE">White</option>
          <option value="YELLOW">Yellow</option>
          <option value="GREY">Grey</option>
          <option value="BROWN">Brown</option>
        </select>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Create Pet</button>
      </div>
    </form>
  );
}
