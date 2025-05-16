// next-app/app/payment/page.tsx
"use client";

import "../../styles/HTML_Components/payment.css";
import "../../styles/HTML_Components/top-bar.css";
import "../../styles/HTML_Components/side-bar.css";
import "../../styles/HTML_Components/table.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bill {
  CusCID: string;
  BID: string;
  CheckInDate: string;
  DueDate: string;
  PayTotal: string;
}

export default function PaymentPage() {
  const [query, setQuery] = useState("");
  const [bills, setBills] = useState<Bill[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    setQuery(q);
    if (q) {
      fetch(
        `https://5364cfed-1e99-411c-bf1c-9aa4eafeecd1.mock.pstmn.io/bill/${q}`
      )
        .then((res) => res.json())
        .then((data: Bill[]) => setBills(data))
        .catch(console.error);
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      alert("Please enter customer ID Card Number");
      return;
    }
    window.location.search = `?q=${encodeURIComponent(query)}`;
  };

  const toggleSelect = (bid: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(bid)) {
      newSelected.delete(bid);
    } else {
      newSelected.add(bid);
    }
    setSelected(newSelected);
  };

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button className="choice choice-curr">Payments</button>
        <button className="choice" onClick={() => router.push("/receipt")}>
          Receipts
        </button>
      </div>

      <div className="headline">
        <h2>Unpaid Payments</h2>
        <div className="search-form" id="searchForm">
          <input
            className="search-inputs"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search with CustomerID"
          />
          <button className="search-icon" type="submit" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table" id="resultTable">
          <thead>
            <tr className="head-table">
              <th>
                <input
                  className="inp-cbx"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected(new Set(bills.map((b) => b.BID)));
                    } else {
                      setSelected(new Set());
                    }
                  }}
                  checked={selected.size === bills.length && bills.length > 0}
                />
              </th>
              <th>ID Card No.</th>
              <th>Booking No.</th>
              <th>Check-in Date</th>
              <th>Payment Due</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody className="result" id="resultBox">
            {bills.map((bill) => (
              <tr key={bill.BID}>
                <td>
                  <input
                    className="row-checkbox"
                    type="checkbox"
                    checked={selected.has(bill.BID)}
                    onChange={() => toggleSelect(bill.BID)}
                  />
                </td>
                <td>{bill.CusCID}</td>
                <td>{bill.BID}</td>
                <td>{bill.CheckInDate}</td>
                <td>{bill.DueDate}</td>
                <td>{bill.PayTotal}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      router.push(
                        `/paymentdetail?CusCID=${bill.CusCID}&BID=${bill.BID}`
                      )
                    }
                  >
                    view more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected.size > 0 && (
        <div>
          <button
            className="makepay"
            id="makepay"
            type="button"
            onClick={() =>
              alert("Confirm payment for: " + Array.from(selected).join(", "))
            }
            title="Confirm Payments"
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}
