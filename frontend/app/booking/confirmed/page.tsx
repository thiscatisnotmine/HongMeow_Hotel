"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../../../lib/api";
import "../../../styles/HTML_Components/Booking_Summary.css";

export default function BookingConfirmedPage() {
  const params = useSearchParams();
  const bid = params.get("bid");

  const [booking, setBooking] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    if (!bid) return;
    (async () => {
      const b = await api(`/booking/${bid}`);
      const p = await api(`/payment/${bid}`);
      setBooking(b);
      setPayment(p);
    })();
  }, [bid]);

  if (!bid) return <p>Missing booking id</p>;
  if (!booking) return <p>Loading…</p>;

  return (
    <div className="main-content">
      <div className="summary-title">
        <h2 className="summary-heading">Booking is confirmed</h2>
        <div className="room-code">
          Booking No.: <span className="room-number">{bid}</span>
        </div>
      </div>

      <div className="booking-summary">
        <div className="summary-block">
          <h3>Customer</h3>
          {JSON.stringify(booking.customer)}
        </div>
        <div className="summary-block">
          <h3>Room</h3>
          {JSON.stringify(booking.room)}
        </div>
        <div className="summary-block">
          <h3>Payment</h3>
          {JSON.stringify(payment)}
        </div>
      </div>

      <div className="confirm-wrapper">
        <button
          className="wait-btn"
          onClick={() => alert("Waiting for payment")}
        >
          Wait for Payment
        </button>
        <button
          className="confirm-btn"
          onClick={() => alert("Navigate to payment page")}
        >
          Payment
        </button>
      </div>
    </div>
  );
}
