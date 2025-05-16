"use client";

import "../../../styles/HTML_Components/title_search.css";
import "../../../styles/HTML_Components/Booking_Customer.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/api";

interface Customer {
  CusCID: string;
  CusFname: string;
  CusLname: string;
  CusPhone: string;
  CusEmail: string;
}

export default function BookingCustomerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    CusCID: "",
    CusFname: "",
    CusLname: "",
    CusPhone: "",
    CusEmail: "",
  });

  const [results, setResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  /* restore draft from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("booking_customer_data");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  /* ------------------------- handlers ------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const { CusCID, CusFname, CusLname } = form;
    if (!CusCID && !CusFname && !CusLname) return;

    setLoading(true);
    try {
      const qs = new URLSearchParams({
        cid: CusCID,
        fname: CusFname,
        lname: CusLname,
      }).toString();

      const data = await api<Customer[]>(`/customer/search?${qs}`);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  const chooseResult = (c: Customer) => {
    setForm({
      CusCID: c.CusCID,
      CusFname: c.CusFname,
      CusLname: c.CusLname,
      CusPhone: c.CusPhone,
      CusEmail: c.CusEmail,
    });
    setResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    /* up-sert customer */
    await api("/customer", {
      method: "POST",
      body: JSON.stringify(form),
    });

    localStorage.setItem("booking_customer_data", JSON.stringify(form));
    router.push("/booking/emergency");
  };

  /* --------------------------- UI ----------------------------- */
  return (
    <div className="main-content">
      {/* Tabs */}
      <div className="filter-section">
        <div className="tab-inside">
          <button className="choice active">Customer</button>
          <button
            className="choice"
            onClick={() => router.push("/booking/emergency")}
          >
            Emergency
            <br />
            Contact
          </button>
          <button
            className="choice"
            onClick={() => router.push("/booking/room")}
          >
            Room
          </button>
          <button
            className="choice"
            onClick={() => router.push("/booking/pet")}
          >
            Pet
          </button>
        </div>
      </div>

      {/* Page Title + Search */}
      <div className="headline">
        <h2>Customer</h2>
        <div className="search-form">
          <input
            className="search-inputs"
            type="text"
            placeholder="search by CID or name"
            onChange={(e) => setForm({ ...form, CusCID: e.target.value })}
          />
          <button className="search-icon" type="button" onClick={handleSearch}>
            {loading ? (
              "..."
            ) : (
              <span className="material-symbols-outlined">search</span>
            )}
          </button>
        </div>
      </div>

      {/* Search results dropdown */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((c) => (
            <div
              key={c.CusCID}
              className="result-row"
              onClick={() => chooseResult(c)}
            >
              {c.CusCID} – {c.CusFname} {c.CusLname}
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <form id="bookingCustomerForm" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label>ID Card Number:</label>
            <input
              name="CusCID"
              value={form.CusCID}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              name="CusFname"
              value={form.CusFname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              name="CusLname"
              value={form.CusLname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tel.:</label>
            <input
              name="CusPhone"
              value={form.CusPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="CusEmail"
              value={form.CusEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="next-wrapper">
            <button className="next-btn" type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
