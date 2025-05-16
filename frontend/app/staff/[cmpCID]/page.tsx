// next-app/app/staff/[empCID]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/router";
import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/SideBar";

const api = "https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io";

export default function ViewStaffPage() {
  const { empCID } = useParams();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [employee, setEmployee] = useState({
    EmpCID: "",
    EmpRole: "",
    EmpUsername: "",
    EmpPassword: "",
    EmpFname: "",
    EmpLname: "",
    EmpPhone: "",
    EmpEmail: "",
    EmpBirth: "",
    EmpAddress: "",
  });

  useEffect(() => {
    fetch(`${api}/employee/${empCID}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => console.error("Fetch failed", err));
  }, [empCID]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`${api}/employee/${empCID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });

    if (res.ok) {
      alert("Successfully updated");
      setEditing(false);
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-[#5C4538]">
      <SideBar />
      <main className="flex-1 ml-[340px] mt-6 px-10">
        <TopBar />
        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-2xl font-semibold">Employee Profile</h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#FFFAA2] px-6 py-2 rounded-full hover:translate-y-[-2px] transition"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-[#89D3FF] px-6 py-2 text-white rounded-full hover:translate-y-[-2px] transition"
              >
                Confirm
              </button>
              <button
                onClick={() => router.refresh()}
                className="bg-[#E41D1D] px-6 py-2 text-white rounded-full hover:translate-y-[-2px] transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 text-lg max-w-xl">
          <Field label="ID Card No." value={employee.EmpCID} readOnly />
          <Field
            label="Role"
            name="EmpRole"
            value={employee.EmpRole}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Username"
            name="EmpUsername"
            value={employee.EmpUsername}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Password"
            name="EmpPassword"
            value={employee.EmpPassword}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="First Name"
            name="EmpFname"
            value={employee.EmpFname}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Last Name"
            name="EmpLname"
            value={employee.EmpLname}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Phone"
            name="EmpPhone"
            value={employee.EmpPhone}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Email"
            name="EmpEmail"
            value={employee.EmpEmail}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Birth Date"
            name="EmpBirth"
            type="date"
            value={employee.EmpBirth}
            onChange={handleChange}
            disabled={!editing}
          />
          <Field
            label="Address"
            name="EmpAddress"
            value={employee.EmpAddress}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = "text",
  readOnly = false,
}: {
  label: string;
  name?: string;
  value: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="w-40 font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChange}
        className={`border border-gray-300 px-4 py-2 rounded-md flex-1 ${
          disabled || readOnly ? "bg-gray-100" : ""
        }`}
      />
    </div>
  );
}
