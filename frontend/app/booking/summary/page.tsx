"use client";
import "../../../styles/HTML_Components/Booking_Summary.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBookingFromDraft } from "../../../lib/booking";

export default function BookingSummaryPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Record<string, any>>({});

  /* load drafts for display */
  useEffect(() => {
    const keys = [
      "booking_customer_data",
      "booking_urgent_data",
      "booking_room_data",
      "booking_pet_data",
    ];
    const d: Record<string, any> = {};
    keys.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v) d[k] = JSON.parse(v);
    });
    setDrafts(d);
  }, []);

  const Confirm = async () => {
    try {
      const bid = await createBookingFromDraft();
      router.push(`/booking/confirmed?bid=${bid}`);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  /* helper to render */
  const render = (data: any) =>
    Array.isArray(data) ? (
      data.map((o: any, i: number) => <div key={i}>{JSON.stringify(o)}</div>)
    ) : (
      <div>{JSON.stringify(data)}</div>
    );

  return (
    <div className="main-content">
      <div className="filter-section">
        <div className="tab-inside">
          {["customer", "emergency", "room", "pet"].map((t) => (
            <button
              key={t}
              className="choice"
              onClick={() => router.push(`/booking/${t}`)}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="summary-title">
        <h2 className="summary-heading">Booking Summary</h2>
      </div>
      <div className="booking-summary">
        {Object.entries(drafts).map(([k, v]) => (
          <div className="summary-block" key={k}>
            <h3>{k.replace("booking_", "").replace("_data", "")}</h3>
            {render(v)}
          </div>
        ))}
      </div>

      <div className="confirm-wrapper">
        <button className="confirm-btn" onClick={Confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
