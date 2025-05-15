// components/TopBar.tsx
"use client";
import "../styles/HTML_Components/top-bar.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TopBar() {
  const router = useRouter();
  return (
    <div className="tab-container">
      <div className="tab_menu">
        <button className="tab" onClick={() => router.push("/available-room")}>
          Available Room
        </button>
        <button className="tab" onClick={() => router.push("/staff")}>
          Staff Management
        </button>
      </div>
      <button className="profile" onClick={() => router.push("/profile")}>
        <Image
          src="/image/solar_user-outline.png"
          alt="Profile"
          width={65}
          height={65}
        />
      </button>
    </div>
  );
}
