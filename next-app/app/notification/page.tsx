// app/notification/page.tsx
"use client";

import { useEffect, useState } from "react";
import "../../styles/HTML_Components/notification.css";

type Notification = {
  CusCID: string;
  CusFname: string;
  CusLname: string;
  CusPhone: string;
  CusEmail: string;
  Note?: string;
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Replace with your actual API URL
    fetch("#/notification")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="main-content">
      <div className="headline">
        <h2>Notification</h2>
        <div className="search-form" id="searchForm">
          <input
            className="search-inputs"
            type="text"
            placeholder="search"
            required
          />
          <button className="search-icon" type="submit">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table notification-table">
          <thead>
            <tr>
              <th>ID Card No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan={5}>No data.</td>
              </tr>
            ) : (
              notifications.map((noti, i) => (
                <tr key={i}>
                  <td>{noti.CusCID}</td>
                  <td>
                    {noti.CusFname} {noti.CusLname}
                  </td>
                  <td>{noti.CusPhone}</td>
                  <td>{noti.CusEmail}</td>
                  <td>{noti.Note || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
