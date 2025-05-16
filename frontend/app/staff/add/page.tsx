"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStaffPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    idCard: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!/^\d{13}$/.test(form.idCard)) newErrors.idCard = "Must be 13 digits";
    if (!/^[A-Z][a-zA-Z]*$/.test(form.firstName))
      newErrors.firstName = "Start with uppercase (A-Z only)";
    if (!/^[A-Z][a-zA-Z]*$/.test(form.lastName))
      newErrors.lastName = "Start with uppercase (A-Z only)";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Must be 10 digits";
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.birthDate) newErrors.birthDate = "Required";
    if (!form.address) newErrors.address = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validate()) {
      alert("Please correct the errors");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmpCID: form.idCard,
          EmpFname: form.firstName,
          EmpLname: form.lastName,
          EmpPhone: form.phone,
          EmpEmail: form.email,
          EmpBirth: form.birthDate,
          EmpAddress: form.address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Employee added successfully!");
        router.push("/staff");
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (err) {
      alert("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className="ml-[390px] px-8 mt-10 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add New Staff</h2>
        <button
          onClick={handleSubmit}
          className="bg-[#0073ff] text-white px-6 py-2 rounded-full hover:bg-[#016bec] transition hover:-translate-y-1"
        >
          Add
        </button>
      </div>

      <form className="space-y-4">
        {[
          ["ID Card Number", "idCard"],
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Phone Number", "phone"],
          ["Email", "email"],
          ["Birth Date", "birthDate"],
          ["Address", "address"],
        ].map(([label, id]) => (
          <div key={id}>
            <label className="block font-medium">{label}</label>
            <input
              type={id === "birthDate" ? "date" : "text"}
              id={id}
              value={(form as any)[id]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors[id] && <small className="text-red-500">{errors[id]}</small>}
          </div>
        ))}
      </form>
    </div>
  );
}
