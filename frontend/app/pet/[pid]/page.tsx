"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../../components/SideBar";
import Topbar from "../../../components/TopBar";

export default function PetViewMorePage() {
  const searchParams = useSearchParams();
  const petID = searchParams.get("petID");
  const customerID = searchParams.get("customerID");
  const [pet, setPet] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    petName: "",
    petType: "",
    petBreeds: "",
    petAge: "",
    petDisease: "",
  });

  const api = "https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io";

  useEffect(() => {
    if (!petID || !customerID) return;

    fetch(`${api}/customer/${customerID}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));

    fetch(`${api}/pet/${petID}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        setForm({
          petName: data.PName || "",
          petType: data.PType || "",
          petBreeds: data.PBreeds || "",
          petAge: data.PAge || "",
          petDisease: data.PDisease || "",
        });
      });
  }, [petID, customerID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    if (confirm("Do you want to discard changes?")) {
      setEditMode(false);
      if (pet) {
        setForm({
          petName: pet.PName,
          petType: pet.PType,
          petBreeds: pet.PBreeds,
          petAge: pet.PAge,
          petDisease: pet.PDisease,
        });
      }
    }
  };

  const handleConfirm = async () => {
    if (!confirm("Do you want to save the data?")) return;

    const formData = new FormData();
    formData.append("PName", form.petName);
    formData.append("PType", form.petType);
    formData.append("PBreeds", form.petBreeds);
    formData.append("PAge", form.petAge);
    formData.append("PDisease", form.petDisease);

    try {
      const res = await fetch(`${api}/pet/${petID}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Information updated successfully");
        setEditMode(false);
      } else {
        alert("Failed to update data");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating data");
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="main-content">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => (window.location.href = "/customer")}
          >
            Customer
          </button>
          <button className="choice choice-pet">Pet</button>
        </div>

        <div className="headline">
          <h2>View and Edit Pet Profiles</h2>
          <button className="edit" onClick={handleEdit}>
            Edit
          </button>
        </div>

        {customer && (
          <div className="cus-info">
            <h3>Customer</h3>
            ID: <span>{customer.CusCID}</span>
            <br />
            <br />
            Name: <span>{customer.CusFname}</span>
          </div>
        )}

        <div className="pet-info">
          <h3>Pet</h3>
          <div className="edit-pet">
            {["petName", "petType", "petBreeds", "petAge", "petDisease"].map(
              (key) => (
                <div className="edit-row" key={key}>
                  <label htmlFor={key}>{key.replace("pet", "")}: </label>
                  <input
                    type={key === "petAge" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={form[key as keyof typeof form]}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              )
            )}
            <div className="edit-row">
              <label htmlFor="petVaccine">Vaccine Book: </label>
              <input type="file" id="petVaccine" name="petVaccine" disabled />
            </div>
          </div>
        </div>

        {editMode && (
          <div className="hidden-space">
            <div></div>
            <div className="button-group">
              <button className="confirm" onClick={handleConfirm}>
                Confirm Editing
              </button>
              <button className="cancel" onClick={handleCancel}>
                Cancel Editing
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
