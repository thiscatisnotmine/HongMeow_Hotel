// next-app/app/booking/pet/page.tsx
"use client";

import "../../../styles/HTML_Components/Booking_Pet.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BookingPetPage() {
  const router = useRouter();
  const [pets, setPets] = useState([
    {
      id: 1,
      type: "",
      breed: "",
      name: "",
      age: "",
      disease: "",
      file: null as File | null,
    },
  ]);
  const [room, setRoom] = useState({
    name: "Air conditioned deluxe",
    code: "DAD001",
  });

  const handleAddPet = () => {
    setPets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "",
        breed: "",
        name: "",
        age: "",
        disease: "",
        file: null,
      },
    ]);
  };

  const handleChange = (index: number, field: string, value: string | File) => {
    const updated = [...pets];
    (updated[index] as any)[field] = value;
    setPets(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving pet info", pets);
    router.push("/booking/summary");
  };

  return (
    <div className="main-content">
      <div className="filter-section">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => router.push("/booking/customer")}
          >
            Customer
          </button>
          <button
            className="choice"
            onClick={() => router.push("/booking/urgent")}
          >
            Emergency
            <br />
            Contact
          </button>
          <button
            className="choice"
            onClick={() => router.push("/booking/room")}
          >
            Room
          </button>
          <button className="choice active">Pet</button>
        </div>
      </div>

      <div className="label-section">
        <div className="label-header">
          <div className="room-label">
            Room: <span className="room-name">{room.name}</span>
          </div>
          <div className="room-code">
            NO. <span className="room-number">{room.code}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          {pets.map((pet, index) => (
            <div key={index} className="pet-form">
              <div className="pet-title">
                <h2 style={{ margin: 0 }}>Pet {index + 1}</h2>
                <div className="filter-dropdown">
                  <select className="dropdown-select">
                    <option value="">Choose from saved name</option>
                    <option value="Haruka_Sakura">Haruka Sakura</option>
                    <option value="Hayato_Suo">Hayato Suo</option>
                  </select>
                  <span className="dropdown-arrow"></span>
                </div>
              </div>
              <div className="form-group">
                <label>Pet Type:</label>
                <input
                  required
                  type="text"
                  value={pet.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Breed:</label>
                <input
                  required
                  type="text"
                  value={pet.breed}
                  onChange={(e) => handleChange(index, "breed", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Name:</label>
                <input
                  required
                  type="text"
                  value={pet.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Pet Age:</label>
                <input
                  required
                  type="text"
                  value={pet.age}
                  onChange={(e) => handleChange(index, "age", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Disease:</label>
                <input
                  required
                  type="text"
                  value={pet.disease}
                  onChange={(e) =>
                    handleChange(index, "disease", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Vaccine Book:</label>
                <input
                  className="file-input"
                  required
                  type="file"
                  onChange={(e) =>
                    handleChange(
                      index,
                      "file",
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
              </div>
            </div>
          ))}

          <div className="add-btn-wrapper">
            <button className="add-btn" type="button" onClick={handleAddPet}>
              + Add More Pet
            </button>
          </div>
        </div>

        <div className="next-wrapper">
          <button className="next-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
