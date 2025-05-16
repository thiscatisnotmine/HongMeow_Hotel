"use client";

import "../../styles/HTML_Components/avaiable_room.css";
import "../../styles/HTML_Components/title_search.css";
import "../../styles/HTML_Components/table.css";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

interface Room {
  RTID: string;
  RID: number;
  RStatus: string; // Available | Out of Order | Check-in …
}

export default function AvailableRoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* initial fetch – all rooms */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await api<Room[]>("/room");
        setRooms(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* server-side search */
  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = search
        ? await api<Room[]>(`/room/search/${encodeURIComponent(search)}`)
        : await api<Room[]>("/room"); // empty search = reset
      setRooms(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="headline">
        <h2>Available Room</h2>

        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by room-type or number"
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ padding: "1rem" }}>Loading…</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Room No.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={`${r.RTID}-${r.RID}`}>
                  <td>{r.RTID}</td>
                  <td>{r.RID}</td>
                  <td>{r.RStatus}</td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
