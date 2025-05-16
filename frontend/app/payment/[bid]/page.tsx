// next-app/app/payment/[bid]/page.tsx
"use client";

import "../../../styles/HTML_Components/payment.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BookingDetail {
  CusCID: string;
  CheckInDate: string;
  CheckOutDate: string;
  Duration: string;
  RoomAmout: string;
  PayTotal: string;
}

export default function PaymentDetailPage() {
  const searchParams = useSearchParams();
  const CusCID = searchParams.get("CusCID") || "Unknown";
  const BID = searchParams.get("BID") || "Unknown";

  const [booking, setBooking] = useState<BookingDetail | null>(null);

  useEffect(() => {
    // Mock API fetch
    setBooking({
      CusCID,
      CheckInDate: "2025-05-16",
      CheckOutDate: "2025-05-20",
      Duration: "4 nights",
      RoomAmout: "Room A - Deluxe",
      PayTotal: "$320.00",
    });
  }, [CusCID, BID]);

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button className="choice choice-curr">Payments</button>
        <button className="choice">Receipts</button>
      </div>

      {booking && (
        <div className="paysdetail">
          <div id="content">
            <h2>Booking Details</h2>
            <p>
              Customer ID: {booking.CusCID} <br />
              Date: {booking.CheckInDate} - {booking.CheckOutDate} |{" "}
              {booking.Duration} <br />
              {booking.RoomAmout}
            </p>
          </div>

          <div id="contentPrice">
            <h2>Total Price</h2>
            <h2>{booking.PayTotal}</h2>
          </div>

          <div id="pmethod">
            <h2>Payment Method</h2>
            <form>
              <input
                type="radio"
                id="credit_card"
                name="paymentMethod"
                value="Credit/Debit Card"
              />
              <label htmlFor="credit_card">Credit / Debit Card</label>
              <br />
              <input
                type="radio"
                id="qr_code"
                name="paymentMethod"
                value="QR Code"
              />
              <label htmlFor="qr_code">QR Code</label>
              <br />
              <input type="radio" id="cash" name="paymentMethod" value="Cash" />
              <label htmlFor="cash">Cash</label>
              <br />
              <input type="radio" id="bank" name="paymentMethod" value="Bank" />
              <label htmlFor="bank">Bank</label>
            </form>
          </div>

          <div>
            <button
              className="makepay"
              id="makepay"
              type="button"
              onClick={() => alert("Payment Confirmed")}
              title="Confirm Payments"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
