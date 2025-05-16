"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditCustomerProfile() {
  const searchParams = useSearchParams();
  const customerID = searchParams.get("customerID");
  const [formData, setFormData] = useState({
    customerID: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!customerID) return;
    fetch(
      `https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io/customer/${customerID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          customerID: data.CusCID || "",
          customerName: data.CusFname || "",
          customerEmail: data.CusEmail || "",
          customerPhone: data.CusTel || "",
        });
      })
      .catch((err) => console.error("Error fetching:", err));
  }, [customerID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enableEdit = () => setIsEditing(true);

  const confirmEdit = async () => {
    const confirm = window.confirm("Do you want to save the data?");
    if (!confirm) return;

    const form = new FormData();
    form.append("CusCID", formData.customerID);
    form.append("CusFname", formData.customerName);
    form.append("CusEmail", formData.customerEmail);
    form.append("CusTel", formData.customerPhone);

    try {
      const response = await fetch(
        `https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io/customer/${customerID}`,
        {
          method: "PUT",
          body: form,
        }
      );

      if (response.ok) {
        alert("Information sent successfully.");
        location.reload();
      } else {
        const errorText = await response.text();
        alert(`Failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      alert("An error occurred: " + (error as Error).message);
    }
  };

  const cancelEdit = () => {
    if (confirm("Do you want to discard the changes?")) {
      location.reload();
    }
  };

  return (
    <div className="main-content p-4">
      <div className="tab-inside flex h-[60px] mb-4">
        <button
          className="choice"
          onClick={() => (window.location.href = "/customer")}
        >
          Customer
        </button>
        <button
          className="choice choice-pet"
          onClick={() => (window.location.href = "/pet")}
        >
          Pet
        </button>
      </div>

      <div className="headline flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          View and Edit Customer Profiles
        </h2>
        <button className="edit" onClick={enableEdit}>
          Edit
        </button>
      </div>

      <div className="customer-info mb-10 text-[#5C4538] text-lg">
        <h3 className="font-bold mb-4">Customer Information</h3>
        <div className="edit-customer flex flex-col gap-6">
          {["customerID", "customerName", "customerEmail", "customerPhone"].map(
            (field) => (
              <div className="edit-row flex items-center gap-4" key={field}>
                <label htmlFor={field} className="w-[100px] capitalize">
                  {field.replace("customer", "")}:
                </label>
                <input
                  id={field}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className="border p-2 rounded w-80"
                />
              </div>
            )
          )}
        </div>
      </div>

      {isEditing && (
        <div className="hidden-space flex justify-end mt-4">
          <div className="button-group flex flex-col gap-4 w-[200px]">
            <button className="confirm" onClick={confirmEdit}>
              Confirm Editing
            </button>
            <button className="cancel" onClick={cancelEdit}>
              Cancel Editing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
