"use client";

import { useEffect, useState } from "react";

interface Room {
  RTID: string;
  RID: number;
  RTName: string;
  RStatus: string;
}

export default function ReportPage() {
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  const api = "https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      search(q);
    }
  }, []);

  const search = async (q: string) => {
    try {
      const res = await fetch(`${api}/report/${q}`);
      const data = await res.json();
      if (data.length === 0) {
        alert("Not Found.");
        return;
      }
      setRooms(data);
    } catch (err) {
      console.error("Error fetching room:", err);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please, Enter Room ID No.or Room Type");
      return;
    }
    window.history.pushState({}, "", `?q=${encodeURIComponent(query)}`);
    search(query);
  };

  const updateRoomStatus = async (
    RTID: string,
    RID: number,
    status: string
  ) => {
    const confirmText = status === "Available" ? "repair" : "report";
    if (!confirm(`Do you want to ${confirmText} this room?`)) return;

    try {
      const res = await fetch(`${api}/report/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_code: RTID, room_number: RID, status }),
      });

      if (res.ok) {
        alert(
          `Room ${status === "Available" ? "repaired" : "reported"} successfully`
        );
        setRooms((prev) =>
          prev.map((r) => (r.RID === RID ? { ...r, RStatus: status } : r))
        );
      } else {
        alert("Failed to update room status");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="main-content">
      <div className="headline">
        <h2>Room Report</h2>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
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
              <th>Room NO.</th>
              <th>Room Name</th>
              <th>Status</th>
              <th>Repair</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.RID}>
                <td>
                  {room.RTID}-{room.RID}
                </td>
                <td>{room.RTName}</td>
                <td>{room.RStatus}</td>
                <td>
                  <button
                    className="blue-btn"
                    onClick={() =>
                      updateRoomStatus(room.RTID, room.RID, "Available")
                    }
                    disabled={room.RStatus === "Available"}
                  >
                    Repair
                  </button>
                </td>
                <td>
                  <button
                    className="red-btn"
                    onClick={() =>
                      updateRoomStatus(room.RTID, room.RID, "Out of order")
                    }
                    disabled={room.RStatus === "Out of order"}
                  >
                    Report
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
