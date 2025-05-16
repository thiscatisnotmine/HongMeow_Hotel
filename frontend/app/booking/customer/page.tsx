"use client";

import "../../../styles/HTML_Components/title_search.css";
import "../../../styles/HTML_Components/Booking_Customer.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    idcard: "",
    firstname: "",
    lastname: "",
    tel: "",
    email: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("booking_customer_data");
    if (saved) {
      const data = JSON.parse(saved);
      setForm(data);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("booking_customer_data", JSON.stringify(form));
    router.push("/booking/emergency");
  };

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
            placeholder="search"
            required
          />
          <button className="search-icon">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form id="bookingCustomerForm" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label>ID Card Number:</label>
            <input
              type="text"
              name="idcard"
              value={form.idcard}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tel.:</label>
            <input
              type="text"
              name="tel"
              value={form.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Next Button */}
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
