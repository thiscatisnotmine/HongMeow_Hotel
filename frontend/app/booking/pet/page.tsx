"use client";

import "../../../styles/HTML_Components/Booking_Pet.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

interface PetDraft {
  id: number;
  PType: string;
  PBreeds: string;
  PName: string;
  PAge: string;
  PDisease: string;
  file: File | null;
}

interface SavedPet {
  PID: string;
  PName: string;
  PType: string;
  PBreeds: string;
  PAge: number;
  PDisease: string;
}

export default function BookingPetPage() {
  const router = useRouter();

  const customer = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("booking_customer_data") ?? "{}"
      : "{}"
  ) as { CusCID?: string };

  const [savedPets, setSavedPets] = useState<SavedPet[]>([]);
  const [pets, setPets] = useState<PetDraft[]>([
    {
      id: 1,
      PType: "",
      PBreeds: "",
      PName: "",
      PAge: "",
      PDisease: "",
      file: null,
    },
  ]);

  /* ---- load saved pets for dropdown -------------------------------- */
  useEffect(() => {
    (async () => {
      if (!customer.CusCID) return;
      const list = await api<SavedPet[]>(`/pet/customer/${customer.CusCID}`, {
        return204: true,
      });
      setSavedPets(list ?? []);
    })();

    const draft = localStorage.getItem("booking_pet_data");
    if (draft) setPets(JSON.parse(draft));
  }, []);

  /* ---- handlers ---------------------------------------------------- */
  const addPet = () =>
    setPets((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        PType: "",
        PBreeds: "",
        PName: "",
        PAge: "",
        PDisease: "",
        file: null,
      },
    ]);

  const update = (
    idx: number,
    field: keyof PetDraft,
    val: string | File | null
  ) => {
    const clone = structuredClone(pets);
    // @ts-ignore
    clone[idx][field] = val;
    setPets(clone);
  };

  const chooseSaved = (idx: number, pid: string) => {
    const match = savedPets.find((p) => p.PID === pid);
    if (!match) return;
    update(idx, "PName", match.PName);
    update(idx, "PBreeds", match.PBreeds);
    update(idx, "PType", match.PType);
    update(idx, "PAge", String(match.PAge));
    update(idx, "PDisease", match.PDisease);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.CusCID) return alert("Missing customer ID.");

    /* send each pet */
    for (const p of pets) {
      await api("/pet", {
        method: "POST",
        body: JSON.stringify({
          CusCID: customer.CusCID,
          PType: p.PType,
          PBreeds: p.PBreeds,
          PName: p.PName,
          PAge: Number(p.PAge),
          PDisease: p.PDisease,
        }),
      });
      // File upload omitted; handle separately with FormData if desired.
    }

    localStorage.setItem("booking_pet_data", JSON.stringify(pets));
    router.push("/booking/summary");
  };

  /* ---- render ------------------------------------------------------ */
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
            onClick={() => router.push("/booking/emergency")}
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

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          {pets.map((p, idx) => (
            <div className="pet-form" key={p.id}>
              <div className="pet-title">
                <h2>Pet {idx + 1}</h2>

                {savedPets.length > 0 && (
                  <div className="filter-dropdown">
                    <select
                      className="dropdown-select"
                      value=""
                      onChange={(e) => chooseSaved(idx, e.target.value)}
                    >
                      <option value="">Choose from saved name</option>
                      {savedPets.map((s) => (
                        <option key={s.PID} value={s.PID}>
                          {s.PName}
                        </option>
                      ))}
                    </select>
                    <span className="dropdown-arrow" />
                  </div>
                )}
              </div>

              {(["PType", "PBreeds", "PName", "PAge", "PDisease"] as const).map(
                (field) => (
                  <div className="form-group" key={field}>
                    <label>{field.replace("P", "Pet ")}:</label>
                    <input
                      required
                      value={p[field]}
                      onChange={(e) => update(idx, field, e.target.value)}
                    />
                  </div>
                )
              )}

              <div className="form-group">
                <label>Vaccine Book:</label>
                <input
                  className="file-input"
                  required
                  type="file"
                  onChange={(e) =>
                    update(idx, "file", e.target.files?.[0] ?? null)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="add-btn-wrapper">
          <button type="button" className="add-btn" onClick={addPet}>
            + Add More Pet
          </button>
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
