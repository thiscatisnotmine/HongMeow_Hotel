// components/SideBar.tsx
"use client";
import "../styles/HTML_Components/side-bar.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const router = useRouter();
  const items = [
    ["Create Booking", "/booking"],
    ["Booking History", "/booking-history"],
    ["Check-In ", "/checkin"],
    ["Check-Out", "/checkout"],
    ["Payments & Receipts", "/payment"],
    ["Customer & Pet Profiles", "/customer/profile"],
    ["Room Report", "/report"],
    ["Notification", "/notification"],
  ] as const;

  return (
    <div className="sidebar">
      <div className="logo">
        <Image
          src="/image/image_3-removebg-preview.png"
          alt="Logo"
          width={150}
          height={150}
        />
      </div>
      {items.map(([label, path]) => (
        <button key={label} className="menu" onClick={() => router.push(path)}>
          {label}
        </button>
      ))}
    </div>
  );
}
