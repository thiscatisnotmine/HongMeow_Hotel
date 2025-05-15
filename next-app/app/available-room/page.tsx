"use client";

import "../../styles/HTML_Components/avaiable_room.css";
import "../../styles/HTML_Components/title_search.css";
import "../../styles/HTML_Components/table.css";

import { useEffect, useState } from "react";

interface Room {
  id: string;
  name: string;
  status: string;
}

export default function AvailableRoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate fetch data
    setRooms([
      { id: "101", name: "Room A", status: "Available" },
      { id: "102", name: "Room B", status: "Occupied" },
      { id: "103", name: "Room C", status: "Available" },
    ]);
  }, []);

  const handleSearch = () => {
    // Simulate filtering
    setRooms((prev) =>
      prev.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      )
    );
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
            placeholder="Search"
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
              <th>Room ID</th>
              <th>Room Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
