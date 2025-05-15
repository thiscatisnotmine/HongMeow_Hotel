// next-app/app/customer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// styling

import "../../../styles/HTML_Components/Profile.css";
import "../../../styles/HTML_Components/title_search.css";
import "../../../styles/HTML_Components/table.css";

interface Customer {
  CusCID: string;
  CusFname: string;
  CusLname: string;
}

export default function CustomerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [q, setQ] = useState(initialQ);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // whenever `q` changes, fetch matching customers
  useEffect(() => {
    if (!q.trim()) {
      setCustomers([]);
      return;
    }

    fetch(
      `https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io/customer/${encodeURIComponent(q)}`
    )
      .then((res) => res.json())
      .then((data: Customer[]) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.error("Failed to fetch customers:", err);
      });
  }, [q]);

  const handleSearch = () => {
    if (!q.trim()) {
      alert("กรุณาใส่หมายเลขบัตรประชาชนลูกค้า");
      return;
    }
    // update URL (triggers the useEffect above)
    router.push(`/customer?q=${encodeURIComponent(q.trim())}`);
  };

  const goToViewMore = (cusCID: string) => {
    // assuming you have a detail page at /customer/profile/[cusCID]
    router.push(`/customer/profile/${encodeURIComponent(cusCID)}`);
  };

  const deleteCustomer = (cusCID: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    fetch(
      `https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io/customer/${cusCID}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        // fade‐out animation class is in Profile.css
        setCustomers((prev) => prev.filter((c) => c.CusCID !== cusCID));
      })
      .catch(console.error);
  };

  return (
    <div className="main-content">
      {/* Tabs */}
      <div className="tab-inside" style={{ overflow: "auto" }}>
        <button
          className="choice choice-cus"
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          Customer
        </button>
        <button
          className="choice"
          onClick={() => router.push("/pet")}
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          Pet
        </button>
      </div>

      {/* Header + Search */}
      <div className="headline">
        <h2>Customer Profiles</h2>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            placeholder="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="search-icon" onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>View more & Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.CusCID}>
                  <td>{cust.CusCID}</td>
                  <td>{cust.CusFname}</td>
                  <td>
                    <button
                      className="blue-btn"
                      onClick={() => goToViewMore(cust.CusCID)}
                    >
                      View more
                    </button>
                  </td>
                  <td>
                    <button
                      className="red-btn"
                      onClick={() => deleteCustomer(cust.CusCID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
