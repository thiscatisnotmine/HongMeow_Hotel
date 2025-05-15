// next-app/app/receipt/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../../styles/HTML_Components/title_search.css";
import "../../styles/HTML_Components/table.css";
import "../../styles/HTML_Components/side-bar.css";
import "../../styles/HTML_Components/top-bar.css";
import "../../styles/HTML_Components/payment.css";

interface Payment {
  CusCID: string;
  BID: string;
  CheckInDate: string;
  PayDue: string;
  PayTotal: string;
}

export default function ReceiptPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearch(q);
      searchPayments(q);
    }
  }, [searchParams]);

  const searchPayments = async (query: string) => {
    try {
      const response = await fetch(
        `https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io/payment/${query}`
      );
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      alert("Failed to fetch payments");
    }
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      alert("Please enter customer ID Card Number");
      return;
    }
    const params = new URLSearchParams({ q: search });
    window.location.search = params.toString();
  };

  const viewMore = (CusCID: string, BID: string) => {
    window.location.href = `/receipt/${BID}?CusCID=${CusCID}`;
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          className="choice"
          onClick={() => (window.location.href = "/payment")}
        >
          Payments
        </button>
        <button className="choice choice-curr">Receipts</button>
      </div>

      <div className="headline">
        <h2>Paid Payments</h2>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search with CustomerID"
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <table className="result-table">
        <thead>
          <tr className="head-table">
            <th>ID Card No.</th>
            <th>Booking No.</th>
            <th>Check-in Date</th>
            <th>Payment Due</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="result">
          {payments.map((payment) => (
            <tr key={payment.BID}>
              <td>{payment.CusCID}</td>
              <td>{payment.BID}</td>
              <td>{payment.CheckInDate}</td>
              <td>{payment.PayDue}</td>
              <td>{payment.PayTotal}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => viewMore(payment.CusCID, payment.BID)}
                >
                  print receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
