// next-app/app/booking/emergency/page.tsx
"use client";

import "../../../styles/HTML_Components/Booking_Urgent.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EmergencyContact {
  firstname: string;
  lastname: string;
  tel: string;
  relationship: string;
}

export default function EmergencyContactPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      firstname: "",
      lastname: "",
      tel: "",
      relationship: "",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("booking_urgent_data");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  const handleChange = (
    index: number,
    field: keyof EmergencyContact,
    value: string
  ) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      { firstname: "", lastname: "", tel: "", relationship: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("booking_urgent_data", JSON.stringify(contacts));
    router.push("/booking/room");
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
          {contacts.map((contact, index) => (
            <div className="contact-form" key={index}>
              <div className="contact-title">
                <h2>Contact {index + 1}</h2>
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  value={contact.firstname}
                  onChange={(e) =>
                    handleChange(index, "firstname", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  value={contact.lastname}
                  onChange={(e) =>
                    handleChange(index, "lastname", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Tel.:</label>
                <input
                  value={contact.tel}
                  onChange={(e) => handleChange(index, "tel", e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Relationship:</label>
                <div className="relationship-select-wrapper">
                  <select
                    value={contact.relationship}
                    onChange={(e) =>
                      handleChange(index, "relationship", e.target.value)
                    }
                    required
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
                  <span className="relationship-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="add-btn-wrapper">
          <button type="button" className="add-btn" onClick={handleAddContact}>
            + Add More Contact
          </button>
        </div>

        <div className="next-wrapper">
          <button type="submit" className="next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
