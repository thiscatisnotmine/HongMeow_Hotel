"use client";
import { useEffect } from "react";

export default function BookingConfirmedPage() {
  useEffect(() => {
    const fillConfirmedData = (id: string, key: string) => {
      const container = document.getElementById(id);
      if (!container) return;

      const allData = JSON.parse(
        localStorage.getItem("booking_confirmed_data") || "{}"
      );
      const data = allData[key];
      if (!data) return;

      let html = "";

      if (Array.isArray(data)) {
        data.forEach((entry, index) => {
          html += `<div class="summary-entry"><strong>${key
            .replace("booking_", "")
            .replace("_data", "")} ${index + 1}</strong><br/>`;
          for (const [k, v] of Object.entries(entry)) {
            html += `<div><strong>${k}:</strong> ${v}</div>`;
          }
          html += `</div>`;
        });
      } else {
        html += `<div class="summary-entry">`;
        for (const [k, v] of Object.entries(data)) {
          html += `<div><strong>${k}:</strong> ${v}</div>`;
        }
        html += `</div>`;
      }

      container.innerHTML = html;
    };

    fillConfirmedData("summary-customer", "booking_customer_data");
    fillConfirmedData("summary-urgent", "booking_urgent_data");
    fillConfirmedData("summary-room", "booking_room_data");
    fillConfirmedData("summary-pet", "booking_pet_data");

    localStorage.removeItem("booking_customer_data");
    localStorage.removeItem("booking_urgent_data");
    localStorage.removeItem("booking_room_data");
    localStorage.removeItem("booking_pet_data");
  }, []);

  return (
    <div className="main-content">
      <div className="summary-title">
        <div className="title-left">
          <h2 className="summary-heading">Booking is confirmed</h2>
          <img
            src="/asset/lets-icons_check-fill.svg"
            className="check-icon"
            alt="Confirmed"
          />
        </div>
        <div className="room-code">
          Booking No.:{" "}
          <span className="room-number" id="booking-number">
            DAD0000
          </span>
        </div>
      </div>

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

      <div className="confirm-wrapper">
        <button
          className="wait-btn"
          onClick={() => (window.location.href = "/payment")}
        >
          Wait for Payment
        </button>
        <button
          className="confirm-btn"
          onClick={() => (window.location.href = "/payment")}
        >
          Payment
        </button>
      </div>
    </div>
  );
}
