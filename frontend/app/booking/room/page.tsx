"use client";

import "../../../styles/HTML_Components/Booking_Room.css";
import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Thai } from "flatpickr/dist/l10n/th.js";
import { api } from "../../../lib/api";
import { useRouter } from "next/navigation";

interface RoomTypeAvail {
  RTID: string;
  AvailableRooms: number;
}

interface Room {
  RTID: string;
  RID: number;
  RStatus: string;
}

export default function BookingRoomPage() {
  const router = useRouter();

  /* date-range + choice state */
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rtid, setRtid] = useState(""); // selected room-type
  const [types, setTypes] = useState<RoomTypeAvail[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [picked, setPicked] = useState<Room | null>(null);

  /* load room-type availability once */
  useEffect(() => {
    (async () => {
      const list = await api<RoomTypeAvail[]>("/room/available");
      setTypes(list);
      if (list.length) setRtid(list[0].RTID); // default selection
    })();
  }, []);

  /* load rooms whenever rtid changes */
  useEffect(() => {
    if (!rtid) return;
    (async () => {
      const data = await api<Room[]>(`/room/search/${rtid}`);
      setRooms(data);
      setPicked(null);
    })();
  }, [rtid]);

  /* flatpickr init */
  useEffect(() => {
    flatpickr("#startDate", {
      locale: Thai,
      minDate: "today",
      onChange: ([d]) => d && setStartDate(d.toISOString().split("T")[0]),
    });
    flatpickr("#endDate", {
      locale: Thai,
      minDate: "today",
      onChange: ([d]) => d && setEndDate(d.toISOString().split("T")[0]),
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!picked || !startDate || !endDate) {
      alert("Please pick room and dates");
      return;
    }
    localStorage.setItem(
      "booking_room_data",
      JSON.stringify({ ...picked, startDate, endDate })
    );
    router.push("/booking/pet");
  };

  return (
    <div className="main-content">
      {/* Tabs */}
      <div className="filter-section">
        <div className="tab-inside">
          <button
            className="choice"
            onClick={() => router.push("/booking/customer")}
          >
            Customer
          </button>
          <button
            className="choice"
            onClick={() => router.push("/booking/emergency")}
          >
            Emergency
            <br />
            Contact
          </button>
          <button className="choice active">Room</button>
          <button
            className="choice"
            onClick={() => router.push("/booking/pet")}
          >
            Pet
          </button>
        </div>
      </div>

      {/* Header with date pickers */}
      <div className="section-header">
        <h1 className="section-title">Select a room</h1>
        <div className="date-range-box">
          <img
            src="/asset/solar_calendar-linearSVG.svg"
            className="calendar-icon"
            alt="calendar"
          />
          <div className="date-group">
            <input
              className="date-input"
              id="startDate"
              placeholder="Check-in"
              readOnly
            />
            <div className="day-label">{startDate}</div>
          </div>
          <div className="divider" />
          <div className="date-group">
            <input
              className="date-input"
              id="endDate"
              placeholder="Check-out"
              readOnly
            />
            <div className="day-label">{endDate}</div>
          </div>
        </div>
      </div>

      {/* Room-type dropdown */}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="filter-dropdown">
            <img src="/asset/dogSVG.svg" className="paw-icon" alt="paw" />
            <select
              className="dropdown-select"
              value={rtid}
              onChange={(e) => setRtid(e.target.value)}
            >
              {types.map((t) => (
                <option key={t.RTID} value={t.RTID}>
                  {t.RTID} – {t.AvailableRooms} available
                </option>
              ))}
            </select>
            <span className="dropdown-arrow" />
          </div>

          {/* Room list */}
          <div className="room-list">
            {rooms.map((r) => (
              <div
                key={r.RID}
                className={`room-item ${
                  picked?.RID === r.RID ? "selected" : ""
                }`}
                onClick={() => setPicked(r)}
              >
                <div className="room-info">
                  <span className="room-name">
                    {r.RTID} #{r.RID}
                  </span>
                  <span className="room-detail">{r.RStatus}</span>
                </div>
                <div className="room-control">
                  {picked?.RID === r.RID && (
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            ))}
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
