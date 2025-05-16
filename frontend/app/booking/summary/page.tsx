// next-app/app/booking/summary/page.tsx
"use client";

import "../../../styles/HTML_Components/Booking_Summary.css";

import { useEffect } from "react";

export default function BookingSummaryPage() {
  useEffect(() => {
    const fillSummary = (containerId: string, storageKey: string) => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        container.innerHTML = "<p>No data available.</p>";
        return;
      }

      const data = JSON.parse(saved);
      if (Array.isArray(data)) {
        // Multi-entry summary (Emergency / Pet)
        container.innerHTML = data
          .map(
            (item: any, index: number) => `
            <div class='summary-entry'>
              <strong>#${index + 1}</strong>
              ${Object.entries(item)
                .map(([k, v]) => `<div>${k}: ${v}</div>`)
                .join("")}
            </div>
          `
          )
          .join("");
      } else {
        // Single-entry summary (Customer / Room)
        container.innerHTML = `
          <div class='summary-entry'>
            ${Object.entries(data)
              .map(([k, v]) => `<div>${k}: ${v}</div>`)
              .join("")}
          </div>
        `;
      }
    };

    fillSummary("summary-customer", "booking_customer_data");
    fillSummary("summary-urgent", "booking_urgent_data");
    fillSummary("summary-room", "booking_room_data");
    fillSummary("summary-pet", "booking_pet_data");
  }, []);

  const handleConfirm = () => {
    alert("Booking Confirmed!");
    // Optional: Clear localStorage or navigate
  };

  return (
    <div className="main-content">
      {/* Tabs */}
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
            onClick={() => (window.location.href = "/booking/urgent")}
          >
            Emergency <br /> Contact
          </button>
          <button
            className="choice"
            onClick={() => (window.location.href = "/booking/room")}
          >
            Room
          </button>
          <button
            className="choice"
            onClick={() => (window.location.href = "/booking/pet")}
          >
            Pet
          </button>
        </div>
      </div>

      {/* Summary Title */}
      <div className="summary-title">
        <h2 className="summary-heading">Booking Summary</h2>
        <div className="room-code">
          Booking No.: <span className="room-number">DAD0001</span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="booking-summary">
        <div className="summary-block">
          <h3>Customer</h3>
          <div id="summary-customer"></div>
        </div>

        <div className="summary-block">
          <h3>Emergency Contact</h3>
          <div id="summary-urgent"></div>
        </div>

        <div className="summary-block">
          <h3>Room</h3>
          <div id="summary-room"></div>
        </div>

        <div className="summary-block">
          <h3>Pet</h3>
          <div id="summary-pet"></div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="confirm-wrapper">
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
