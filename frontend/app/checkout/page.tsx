/* app/checkout/page.tsx */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SideBar from "../../components/SideBar";

import TopBar from "../../components/TopBar";
import "../../styles/HTML_Components/cincout.css";
import "../globals.css";

interface BookingData {
  CusCID: string;
  BID: string;
  CheckInDate: string;
  CheckOutDate: string;
  PayStatus: string;
  RTID: string;
  RID: number;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [data, setData] = useState<BookingData[]>([]);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  const fetchData = async (q: string) => {
    try {
      const response = await fetch(`#/check-out/${q}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      alert("Please enter customer ID Card Number");
      return;
    }
    window.location.search = `?q=${encodeURIComponent(searchInput.trim())}`;
  };

  const handleCheckout = async (
    bookingId: string,
    roomCode: string,
    roomNumber: number
  ) => {
    try {
      const response = await fetch(`#/bookedroom/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          BID: bookingId,
          RTID: roomCode,
          RID: roomNumber,
          RoomStatus: "check-out",
        }),
      });
      if (!response.ok) throw new Error(`Failed: ${response.status}`);
      fetchData(searchInput);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => (window.location.href = "/checkin")}
          >
            Check-In
          </button>
          <button className="choice choice-curr">Check-Out</button>
        </div>

        <div className="headline">
          <h2>Check-Out</h2>
          <div className="search-form">
            <input
              className="search-inputs"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="search with ID Card"
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
                <th>ID Card No.</th>
                <th>Booking No.</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Payment status</th>
                <th>Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {data.map((check) => (
                <tr key={check.BID}>
                  <td>{check.CusCID}</td>
                  <td>{check.BID}</td>
                  <td>{check.CheckInDate}</td>
                  <td>{check.CheckOutDate}</td>
                  <td>{check.PayStatus}</td>
                  <td>
                    <button
                      className="blue-btn"
                      onClick={() =>
                        handleCheckout(check.BID, check.RTID, check.RID)
                      }
                    >
                      Check-Out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
