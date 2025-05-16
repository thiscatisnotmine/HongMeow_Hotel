"use client";

import { useEffect, useState } from "react";

interface Pet {
  CusCID: string;
  PID: string;
  PName: string;
  PType: string;
}

export default function PetPage() {
  const [query, setQuery] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const api = "https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      fetchPets(q);
    }
  }, []);

  const fetchPets = async (q: string) => {
    try {
      const res = await fetch(`${api}/pet/${q}`);
      const data = await res.json();
      if (data.length === 0) {
        alert("Not Found.");
      } else {
        setPets(data);
      }
    } catch (err) {
      console.error("Error fetching pets:", err);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      window.location.search = "?q=" + encodeURIComponent(query.trim());
    } else {
      alert("Please, Enter Customer Identification Card Number.");
    }
  };

  const handleDelete = async (pid: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      await fetch(`${api}/employee/${pid}`, {
        method: "DELETE",
      });
      setPets((prev) => prev.filter((pet) => pet.PID !== pid));
      console.log(`Pet ${pid} deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleViewMore = (pid: string, cid: string) => {
    window.location.href = `/pet/${pid}?customerID=${cid}`;
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          className="choice"
          onClick={() => (window.location.href = "/customer/profile")}
        >
          Customer
        </button>
        <button className="choice choice-pet">Pet</button>
      </div>

      <div className="headline">
        <h2>Pet Profiles</h2>
        <div className="search-form" id="searchForm">
          <input
            className="search-inputs"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
            required
          />
          <button className="search-icon" type="submit" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID Card NO.</th>
              <th>Pet ID</th>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>View more & Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="resultBox">
            {pets.map((pet) => (
              <tr key={pet.PID}>
                <td>{pet.CusCID}</td>
                <td>{pet.PID}</td>
                <td>{pet.PName}</td>
                <td>{pet.PType}</td>
                <td>
                  <button
                    className="blue-btn"
                    onClick={() => handleViewMore(pet.PID, pet.CusCID)}
                  >
                    View more
                  </button>
                </td>
                <td>
                  <button
                    className="red-btn"
                    onClick={() => handleDelete(pet.PID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pets.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No pets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
