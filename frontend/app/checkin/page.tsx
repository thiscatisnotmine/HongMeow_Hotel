"use client";
import { useEffect, useState } from "react";
import "../../styles/HTML_Components/cincout.css";
import "../globals.css";

export default function CheckinPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      search(q);
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return alert("Please enter customer ID Card Number");
    window.location.search = "?q=" + encodeURIComponent(query);
  };

  const search = async (q: string) => {
    try {
      const res = await fetch(`#/check-in/${q}`);
      const data = await res.json();
      setResults(data);
      if (!data.length) alert("Not Found.");
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const checkin = async (BID: string, RTID: string, RID: number) => {
    try {
      const res = await fetch(`#/bookedroom/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ BID, RTID, RID, RoomStatus: "check-in" }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const result = await res.json();
      console.log("Check-in success:", result);
      search(query);
    } catch (err) {
      console.error("Check-in failed:", err);
    }
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          className="choice choice-curr"
          onClick={() => (window.location.href = "/checkin")}
        >
          Check-In
        </button>
        <button
          className="choice"
          onClick={() => (window.location.href = "/checkout")}
        >
          Check-Out
        </button>
      </div>

      <div className="headline">
        <h2>Check-In</h2>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            placeholder="search with CustomerID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID Card No.</th>
              <th>Booking No.</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Payment status</th>
              <th>Check-In</th>
            </tr>
          </thead>
          <tbody>
            {results.map((check, idx) => (
              <tr key={idx}>
                <td>{check.CusCID}</td>
                <td>{check.BID}</td>
                <td>{check.CheckInDate}</td>
                <td>{check.CheckOutDate}</td>
                <td>{check.PayStatus}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => checkin(check.BID, check.RTID, check.RID)}
                  >
                    Check-In
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
