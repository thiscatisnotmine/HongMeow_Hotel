"use client";

import { useState } from "react";

export default function ReceiptPage() {
  const [citizenId, setCitizenId] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (citizenId.length !== 13 || isNaN(Number(citizenId))) {
      setError("Please enter a valid 13-digit Citizen ID");
      return;
    }
    setError("");
    const res = await fetch(`/api/reciept?citizenId=${citizenId}`);
    const data = await res.json();
    setBookings(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selected = bookings
      .filter(
        (b) =>
          (document.getElementById(`checkbox-${b.BID}`) as HTMLInputElement)
            ?.checked
      )
      .map((b) => b.BID);

    if (selected.length === 0) {
      alert("Please select at least one booking.");
      return;
    }

    const res = await fetch("/api/receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingIds: selected }),
    });

    const html = await res.text();
    const receiptWindow = window.open("", "_blank");
    if (receiptWindow) {
      receiptWindow.document.write(html);
      receiptWindow.document.close();
    }
  };

  return (
    <div className="main-content p-8">
      <h2 className="text-2xl font-semibold mb-4">Receipt Generator</h2>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-64"
          placeholder="Enter 13-digit Citizen ID"
          value={citizenId}
          onChange={(e) => setCitizenId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-300 text-black px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} id="bookingForm">
        <table className="table-auto w-full border mt-4" id="resultTable">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Select</th>
              <th className="border p-2">Booking No.</th>
              <th className="border p-2">Room Type</th>
              <th className="border p-2">Check-in</th>
              <th className="border p-2">Room Amount</th>
              <th className="border p-2">Price/Room</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td className="text-center p-4" colSpan={7}>
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.BID}>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      name="booking"
                      id={`checkbox-${b.BID}`}
                      value={b.BID}
                    />
                  </td>
                  <td className="border p-2 text-center">{b.BID}</td>
                  <td className="border p-2 text-center">{b.RTName}</td>
                  <td className="border p-2 text-center">{b.CheckInDate}</td>
                  <td className="border p-2 text-center">{b.RoomAmount}</td>
                  <td className="border p-2 text-center">{b.RTPrice}</td>
                  <td className="border p-2 text-center">{b.Total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {bookings.length > 0 && (
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Generate Receipt
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
