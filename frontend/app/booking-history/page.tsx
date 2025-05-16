// next-app/app/booking-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import "../../styles/HTML_Components/booking_history.css";
import "../../styles/HTML_Components/top-bar.css";
import "../../styles/HTML_Components/side-bar.css";
import "../../styles/HTML_Components/title_search.css";
import "../../styles/HTML_Components/table.css";

interface Booking {
  CusCID: string;
  BID: string;
  CheckInDate: string;
  CheckOutDate: string;
  PayStatus?: string;
  RoomStatus?: string;
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulated fetch all
    const mockData: Booking[] = [
      {
        CusCID: "1234567890123",
        BID: "B001",
        CheckInDate: "2024-01-01",
        CheckOutDate: "2024-01-03",
        PayStatus: "Pending",
        RoomStatus: "Booked",
      },
      {
        CusCID: "1234567890124",
        BID: "B002",
        CheckInDate: "2024-01-05",
        CheckOutDate: "2024-01-07",
        PayStatus: "Paid",
        RoomStatus: "Check-out",
      },
    ];
    setBookings(mockData);
    setAllData(mockData);
  }, []);

  const handleSearch = () => {
    const filtered = allData.filter(
      (b) =>
        b.CusCID.includes(search) ||
        b.BID.toLowerCase().includes(search.toLowerCase())
    );
    setBookings(filtered);
  };

  const handleFilter = (type: "PayStatus" | "RoomStatus", value: string) => {
    const filtered = allData.filter((b) => b[type] === value);
    setBookings(filtered);
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          onClick={() => handleFilter("PayStatus", "Pending")}
          className="choice"
        >
          Waiting For Payment
        </button>
        <button
          onClick={() => handleFilter("RoomStatus", "Booked")}
          className="choice"
        >
          Waiting to Check-In
        </button>
        <button
          onClick={() => handleFilter("RoomStatus", "Check-in")}
          className="choice"
        >
          Checking-In
        </button>
        <button
          onClick={() => handleFilter("RoomStatus", "Cancel")}
          className="choice"
        >
          Cancelled
        </button>
        <button
          onClick={() => handleFilter("RoomStatus", "Check-out")}
          className="choice"
        >
          Succeeded
        </button>
      </div>

      <div className="headline">
        <button
          className="check-all-button"
          onClick={() => setBookings(allData)}
        >
          All Bookings
        </button>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="head-table">
              <th>ID Card NO.</th>
              <th>Booking No.</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>View more & Edit</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.BID}>
                <td>{booking.CusCID}</td>
                <td>{booking.BID}</td>
                <td>{booking.CheckInDate}</td>
                <td>{booking.CheckOutDate}</td>
                <td>
                  <button
                    className="blue-btn"
                    onClick={() =>
                      (window.location.href = "/booking-history/" + booking.BID)
                    }
                  >
                    View more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
