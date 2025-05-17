// frontend/app/booking/emergency/page.tsx
"use client";

import "../../../styles/HTML_Components/Booking_Urgent.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

interface EmergencyContact {
  firstname: string;
  lastname: string;
  tel: string;
  relationship: string;
}

export default function EmergencyContactPage() {
  const router = useRouter();

  // Step 1: load the CID from step 1
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("booking_customer_data")
      : null;
  const customer = stored ? JSON.parse(stored) : {};
  const CusCID = (customer as { CusCID?: string }).CusCID;

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { firstname: "", lastname: "", tel: "", relationship: "" },
  ]);
  const [saving, setSaving] = useState(false);

  // Step 2: restore draft
  useEffect(() => {
    const draft = localStorage.getItem("booking_urgent_data");
    if (draft) {
      setContacts(JSON.parse(draft));
    }
  }, []);

  // handlers
  const handleChange = (
    idx: number,
    field: keyof EmergencyContact,
    value: string
  ) => {
    setContacts((curr) => {
      const copy = [...curr];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addContact = () => {
    setContacts((curr) => [
      ...curr,
      { firstname: "", lastname: "", tel: "", relationship: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!CusCID) {
      alert("No customer found — please complete the Customer step first.");
      return;
    }

    setSaving(true);
    try {
      // POST each contact
      await Promise.all(
        contacts.map((c) =>
          api<void>("/urgent", {
            method: "POST",
            body: JSON.stringify({
              CusCID,
              UrFname: c.firstname,
              UrLname: c.lastname,
              UrPhone: c.tel,
              UrRelationship: c.relationship,
            }),
          })
        )
      );

      // persist locally and advance
      localStorage.setItem("booking_urgent_data", JSON.stringify(contacts));
      router.push("/booking/room");
    } catch (err) {
      console.error(err);
      alert("Failed to save emergency contacts. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="main-content">
      {/* Tabs */}
      <div className="filter-section">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => router.push("/booking/customer")}
          >
            Customer
          </button>
          <button className="choice active">
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
          <button
            className="choice"
            onClick={() => router.push("/booking/pet")}
          >
            Pet
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          {contacts.map((c, idx) => (
            <div key={idx} className="contact-form">
              <div className="contact-title">
                <h2>Contact {idx + 1}</h2>
              </div>

              {/* firstname, lastname, tel, relationship */}
              {(["firstname", "lastname", "tel", "relationship"] as const).map(
                (field) => (
                  <div className="form-group" key={field}>
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>

                    {field === "relationship" ? (
                      <select
                        required
                        value={c.relationship}
                        onChange={(e) =>
                          handleChange(idx, field, e.target.value)
                        }
                        className="relationship-select"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <input
                        required
                        value={c[field]}
                        onChange={(e) =>
                          handleChange(idx, field, e.target.value)
                        }
                      />
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>

        <div className="add-btn-wrapper">
          <button
            type="button"
            className="add-btn"
            onClick={addContact}
            disabled={saving}
          >
            + Add More Contact
          </button>
        </div>

        <div className="next-wrapper">
          <button className="next-btn" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
