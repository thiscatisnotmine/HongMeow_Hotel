// next-app/app/booking/room/page.tsx
"use client";

import "../../../styles/HTML_Components/Booking_Room.css";
import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

export default function BookingRoomPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roomType, setRoomType] = useState("dog");
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    flatpickr("#startDate", {
      locale: Thai,
      onChange: ([date]) => setStartDate(date.toISOString().split("T")[0]),
    });
    flatpickr("#endDate", {
      locale: Thai,
      onChange: ([date]) => setEndDate(date.toISOString().split("T")[0]),
    });
  }, []);

  useEffect(() => {
    // Simulated data fetch
    if (roomType === "dog") {
      setRooms([
        { name: "Dog Room A", detail: "Large dog room", price: 1200 },
        { name: "Dog Room B", detail: "Medium dog room", price: 1000 },
      ]);
    } else {
      setRooms([
        { name: "Cat Room A", detail: "Sunny window spot", price: 900 },
        { name: "Cat Room B", detail: "Quiet corner room", price: 850 },
      ]);
    }
  }, [roomType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted. Move to next step.");
  };

  return (
    <div className="main-content">
      <div className="filter-section">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => (window.location.href = "/booking/customer")}
          >
            Customer
          </button>
          <button
            className="choice"
            onClick={() => (window.location.href = "/booking/emergency")}
          >
            Emergency
            <br />
            Contact
          </button>
          <button className="choice active">Room</button>
          <button
            className="choice"
            onClick={() => (window.location.href = "/booking/pet")}
          >
            Pet
          </button>
        </div>
      </div>

      <div className="section-header">
        <h1 className="section-title">Select a room</h1>
        <div className="date-range-box">
          <img
            src="/asset/solar_calendar-linearSVG.svg"
            className="calendar-icon"
            alt="calendar"
          />
          <div className="date-group">
            <input
              type="text"
              className="date-input"
              id="startDate"
              placeholder="Check-in"
              readOnly
            />
            <div className="day-label">{startDate}</div>
          </div>
          <div className="divider" />
          <div className="date-group">
            <input
              type="text"
              className="date-input"
              id="endDate"
              placeholder="Check-out"
              readOnly
            />
            <div className="day-label">{endDate}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="filter-dropdown">
            <img src="/asset/dogSVG.svg" className="paw-icon" alt="paw" />
            <select
              id="roomTypeSelect"
              className="dropdown-select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="dog">Room Type: Dog</option>
              <option value="cat">Room Type: Cat</option>
            </select>
            <span className="dropdown-arrow"></span>
          </div>

          <div className="room-list">
            {rooms.map((room, idx) => (
              <div key={idx} className="room-item">
                <div className="room-info">
                  <span className="room-name">{room.name}</span>
                  <span className="room-detail">{room.detail}</span>
                </div>
                <div className="room-control">
                  <span className="room-price">฿{room.price}</span>
                  <span className="per-night">/ night</span>
                </div>
              </div>
            ))}
          </div>

          <div className="next-wrapper">
            <button className="next-btn" type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
