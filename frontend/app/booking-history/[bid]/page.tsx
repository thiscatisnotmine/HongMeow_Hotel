// next-app/app/booking-history/[bid]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../../../styles/HTML_Components/bookhis_viewmore.css";

export default function BookingViewPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [data, setData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  useEffect(() => {
    if (!bookingId) return;

    fetch(
      `https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/booking-history/${bookingId}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setCheckin(res.CheckInDate);
        setCheckout(res.CheckOutDate);
      });
  }, [bookingId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (data) {
      setCheckin(data.CheckInDate);
      setCheckout(data.CheckOutDate);
    }
  };

  const handleConfirmEdit = async () => {
    const res = await fetch(
      `https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/booking/${bookingId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkinDate: checkin, checkoutDate: checkout }),
      }
    );
    if (res.ok) {
      alert("Booking updated.");
      setEditMode(false);
    } else {
      alert("Failed to update booking.");
    }
  };

  const handleCancelBooking = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const res = await fetch(
      `https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/booking-history/${bookingId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ RoomStatus: "cancel" }),
      }
    );
    if (res.ok) {
      alert("Booking cancelled.");
      window.location.href = "/booking-history";
    } else {
      alert("Failed to cancel booking.");
    }
  };

  if (!data) return <div className="main-content">Loading...</div>;

  return (
    <div className="main-content">
      <div className="tab-inside">
        {[
          "Waiting For Payment",
          "Waiting to Check-In",
          "Checking-In",
          "Cancelled",
          "Succeeded",
        ].map((label) => (
          <button className="choice" disabled key={label}>
            {label}
          </button>
        ))}
      </div>

      <div className="headline">
        <h2>Booking is confirmed</h2>
        <div className="group-btn-headline">
          <button className="edit" onClick={handleEdit}>
            Edit Booking
          </button>
          <button
            className="cancel-booking-buttot"
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </button>
        </div>
      </div>

      <div className="booking-info">
        <h3>Booking Information</h3>
        <div className="edit-customer">
          <div className="edit-row">
            Booking ID: <span>{data.BID}</span>
          </div>
          <div className="edit-row">
            <label>Check-In: </label>
            <input
              type="date"
              value={checkin}
              disabled={!editMode}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div className="edit-row">
            <label>Check-Out: </label>
            <input
              type="date"
              value={checkout}
              disabled={!editMode}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="customer-info">
        <h3>Customer Information</h3>
        <div className="edit-customer">
          <div className="edit-row">
            <label>ID: </label>
            <input value={data.CusCID} disabled />
          </div>
          <div className="edit-row">
            <label>Name: </label>
            <input value={`${data.CusFname} ${data.CusLname}`} disabled />
          </div>
          <div className="edit-row">
            <label>Email: </label>
            <input value={data.CusEmail} disabled />
          </div>
          <div className="edit-row">
            <label>Phone: </label>
            <input value={data.CusPhone} disabled />
          </div>
        </div>
      </div>

      <div className="urgent-info">
        <h3>Emergency contact</h3>
        <div className="edit-customer">
          <div className="edit-row">
            <label>Name: </label>
            <input value={`${data.UrFname} ${data.UrLname}`} disabled />
          </div>
          <div className="edit-row">
            <label>Tel: </label>
            <input value={data.UrPhone} disabled />
          </div>
          <div className="edit-row">
            <label>Relationship: </label>
            <input value={data.UrRelationship} disabled />
          </div>
        </div>
      </div>

      <div className="pet-info">
        <h3>Pet</h3>
        <div className="edit-pet">
          <div className="edit-row">
            <label>Pet ID: </label>
            <input value={data.PID} disabled />
          </div>
          <div className="edit-row">
            <label>Pet Name: </label>
            <input value={data.PName} disabled />
          </div>
          <div className="edit-row">
            <label>Type: </label>
            <input value={data.PType} disabled />
          </div>
        </div>
      </div>

      {editMode && (
        <div className="hidden-space">
          <div></div>
          <div className="button-group">
            <button className="confirm" onClick={handleConfirmEdit}>
              Confirm Editing
            </button>
            <button className="cancel" onClick={handleCancelEdit}>
              Cancel Editing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
