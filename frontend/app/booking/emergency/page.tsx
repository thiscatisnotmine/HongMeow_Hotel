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

  /** load customer ID saved in Step 1 */
  const customer = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("booking_customer_data") ?? "{}"
      : "{}"
  ) as { CusCID?: string };

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { firstname: "", lastname: "", tel: "", relationship: "" },
  ]);

  const [saving, setSaving] = useState(false);

  /* restore draft if present */
  useEffect(() => {
    const saved = localStorage.getItem("booking_urgent_data");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  /* ----- handlers -------------------------------------------------- */
  const handleChange = (
    index: number,
    field: keyof EmergencyContact,
    value: string
  ) => {
    const clone = structuredClone(contacts);
    clone[index][field] = value;
    setContacts(clone);
  };

  const addContact = () => {
    setContacts((prev) => [
      ...prev,
      { firstname: "", lastname: "", tel: "", relationship: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.CusCID) {
      alert("Missing customer information – please complete previous step.");
      return;
    }

    setSaving(true);
    try {
      /* send each contact */
      await Promise.all(
        contacts.map((c) =>
          api("/urgent", {
            method: "POST",
            body: JSON.stringify({
              CusCID: customer.CusCID,
              UrFname: c.firstname,
              UrLname: c.lastname,
              UrPhone: c.tel,
              UrRelationship: c.relationship,
            }),
          })
        )
      );

      localStorage.setItem("booking_urgent_data", JSON.stringify(contacts));
      router.push("/booking/room");
    } catch (err) {
      console.error(err);
      alert("Failed to save emergency contacts.");
    } finally {
      setSaving(false);
    }
  };

  /* ----- UI -------------------------------------------------------- */
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
          {contacts.map((c, idx) => (
            <div key={idx} className="contact-form">
              <div className="contact-title">
                <h2>Contact {idx + 1}</h2>
              </div>

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
          <button type="button" className="add-btn" onClick={addContact}>
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
