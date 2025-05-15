// next-app/app/pet/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
// global resets + .main-content override
import "@/app/globals.css";
// shared component CSS
import "@/styles/HTML_Components/title_search.css";
import "@/styles/HTML_Components/table.css";
// pet-specific CSS (move your pet.css into /styles/)
import "@/styles/pet.css";

interface Pet {
  CusCID: string;
  PID: string;
  PName: string;
  PType: string;
}

export default function PetListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (!q) return;
    fetch(`https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/pet/${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data: Pet[]) => setPets(data))
      .catch(console.error);
  }, [q]);

  const handleSearch = () => {
    if (!q.trim()) {
      alert("Please enter a Customer ID to search.");
      return;
    }
    // update URL param, which also triggers the useEffect
    router.push(`/pet?q=${encodeURIComponent(q.trim())}`);
  };

  const goToViewMore = (pid: string, cusCID: string) => {
    router.push(`/pet/${encodeURIComponent(pid)}?customerID=${encodeURIComponent(cusCID)}`);
  };

  const deletePet = (pid: string) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    fetch(`https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/pet/${pid}`, {
      method: "DELETE",
    })
      .then(() => {
        setPets((prev) => prev.filter((p) => p.PID !== pid));
      })
      .catch(console.error);
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <TopBar />
        <div className="main-content">
          {/* Tabs */}
          <div className="tab-inside">
            <button
              className="choice"
              onClick={() => router.push("/customer")}
            >
              Customer
            </button>
            <button className="choice choice-pet">Pet</button>
          </div>

          {/* Header + Search */}
          <div className="headline">
            <h2>Pet Profiles</h2>
            <div className="search-form">
              <input
                className="search-inputs"
                type="text"
                placeholder="search by Customer ID"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="search-icon" onClick={handleSearch}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          {/* Pet Table */}
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Card No.</th>
                  <th>Pet ID</th>
                  <th>Pet Name</th>
                  <th>Pet Type</th>
                  <th>View more & Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {pets.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      No pets found.
                    </td>
                  </tr>
                ) : (
                  pets.map((pet) => (
                    <tr key={pet.PID}>
                      <td>{pet.CusCID}</td>
                      <td>{pet.PID}</td>
                      <td>{pet.PName}</td>
                      <td>{pet.PType}</td>
                      <td>
                        <button
                          className="blue-btn"
                          onClick={() => goToViewMore(pet.PID, pet.CusCID)}
                        >
                          View more
                        </button>
                      </td>
                      <td>
                        <button
                          className="red-btn"
                          onClick={() => deletePet(pet.PID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
