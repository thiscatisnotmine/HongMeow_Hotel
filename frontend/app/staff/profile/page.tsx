"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import "../../globals.css";

export default function StaffProfilePage() {
  const router = useRouter();
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Not logged in");
      router.push("/login");
      return;
    }

    let EmpCID;
    try {
      const decoded: any = jwtDecode(token);
      EmpCID = decoded.EmpCID;
    } catch (error) {
      alert("Invalid token");
      router.push("/login");
      return;
    }

    fetch(
      `https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/employee/${EmpCID}`
    )
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load employee data");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  return (
    <div className="main-content p-6">
      <div className="headline flex justify-between items-center mt-6 text-black">
        <h2 className="text-3xl font-semibold">Employee Profile</h2>
      </div>

      {employee && (
        <div className="employee-info text-lg text-[#5C4538] mt-8">
          <div className="edit-row mb-6">
            Identity Card Number: <span>{employee.EmpCID}</span>
          </div>
          <div className="edit-row mb-6">
            Role: <span>{employee.EmpRole}</span>
          </div>
          <div className="edit-row mb-6">
            Username: <span>{employee.EmpUsername}</span>
          </div>
          <div className="edit-row mb-6">
            Password: <span>{employee.EmpPassword}</span>
          </div>
          <div className="edit-row mb-6">
            First Name: <span>{employee.EmpFname}</span>
          </div>
          <div className="edit-row mb-6">
            Last Name: <span>{employee.EmpLname}</span>
          </div>
          <div className="edit-row mb-6">
            Phone: <span>{employee.EmpPhone}</span>
          </div>
          <div className="edit-row mb-6">
            Email: <span>{employee.EmpEmail}</span>
          </div>
          <div className="edit-row mb-6">
            Birth Date: <span>{employee.EmpBirth}</span>
          </div>
          <div className="edit-row mb-6">
            Address: <span>{employee.EmpAddress}</span>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-8 right-20 bg-[#89D3FF] text-white font-extrabold py-3 px-6 rounded-full text-xl shadow-md hover:bg-[#6FC6F5] transition"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}
