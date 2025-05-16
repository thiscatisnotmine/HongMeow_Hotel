// next-app/app/staff/page.tsx
"use client";
import "../../styles/HTML_Components/staff.css";
import "../../styles/HTML_Components/title_search.css";
import "../../styles/HTML_Components/table.css";
import { useEffect, useState } from "react";

interface Employee {
  EmpCID: string;
  EmpFname: string;
  EmpLname: string;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Employee[]>([]);

  useEffect(() => {
    fetch("/api/employee") // or your mock URL
      .then((r) => r.json())
      .then(setStaff);
  }, []);

  return (
    <>
      <div className="headline">
        <button
          className="add-employee-button"
          onClick={() => (location.href = "/staff/add")}
        >
          Add Employee
        </button>
        <div className="search-form">
          <input
            className="search-inputs"
            id="searchInput"
            placeholder="search"
          />
          <button
            className="search-icon"
            onClick={() => {
              const q = (
                document.getElementById("searchInput") as HTMLInputElement
              ).value;
              // call fetch(`api/employee/${q}`)
            }}
          >
            🔍
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID Card NO.</th>
              <th>Name</th>
              <th>View & Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((emp) => (
              <tr key={emp.EmpCID}>
                <td>{emp.EmpCID}</td>
                <td>
                  {emp.EmpFname} {emp.EmpLname}
                </td>
                <td>
                  <button
                    className="blue-btn"
                    onClick={() => (location.href = `/staff/${emp.EmpCID}`)}
                  >
                    View more
                  </button>
                </td>
                <td>
                  <button
                    className="red-btn"
                    onClick={() => {
                      if (!confirm("Delete?")) return;
                      fetch(`/api/employee/${emp.EmpCID}`, {
                        method: "DELETE",
                      }).then(() =>
                        setStaff(staff.filter((e) => e.EmpCID !== emp.EmpCID))
                      );
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
