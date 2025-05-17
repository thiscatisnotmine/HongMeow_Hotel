// frontend/app/booking/summary/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Customer {
  CusCID: string;
  CusFname: string;
  CusLname: string;
  CusPhone: string;
  CusEmail: string;
}

interface EmergencyContact {
  firstname: string;
  lastname: string;
  tel: string;
  relationship: string;
}

interface RoomDraft {
  RID: number;
  RTID: string;
  RStatus: string;
  RState: string;
  roomType: {
    RTID: string;
    RTName: string;
    RTDescription: string;
    RTMax: number;
    RTPrice: number;
    RTAmount: number;
  };
  startDate: string;
  endDate: string;
}

interface PetDraft {
  id: number;
  PType: string;
  PBreeds: string;
  PName: string;
  PAge: string;
  PDisease: string;
}

export default function BookingSummaryPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [urgent, setUrgent] = useState<EmergencyContact[] | null>(null);
  const [room, setRoom] = useState<RoomDraft | null>(null);
  const [pets, setPets] = useState<PetDraft[] | null>(null);

  useEffect(() => {
    // load everything
    const c = localStorage.getItem("booking_customer_data");
    const u = localStorage.getItem("booking_urgent_data");
    const r = localStorage.getItem("booking_room_data");
    const p = localStorage.getItem("booking_pet_data");

    if (!c || !u || !r || !p) {
      // something missing—go back to start
      router.replace("/booking/customer");
      return;
    }

    setCustomer(JSON.parse(c));
    setUrgent(JSON.parse(u));
    setRoom(JSON.parse(r));
    setPets(JSON.parse(p));
  }, [router]);

  if (!customer || !urgent || !room || !pets) {
    return <p>Loading summary…</p>;
  }

  return (
    <div className="main-content">
      <h1>Booking Summary</h1>

      <section>
        <h2>Customer</h2>
        <pre>{JSON.stringify(customer, null, 2)}</pre>
      </section>

      <section>
        <h2>Emergency Contact{urgent.length > 1 && "s"}</h2>
        <pre>{JSON.stringify(urgent, null, 2)}</pre>
      </section>

      <section>
        <h2>Room</h2>
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </section>

      <section>
        <h2>Pet{pets.length > 1 && "s"}</h2>
        <pre>{JSON.stringify(pets, null, 2)}</pre>
      </section>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => router.push("/booking/customer")}>
          Edit Customer
        </button>{" "}
        <button onClick={() => router.push("/booking/emergency")}>
          Edit Emergency
        </button>{" "}
        <button onClick={() => router.push("/booking/room")}>Edit Room</button>{" "}
        <button onClick={() => router.push("/booking/pet")}>Edit Pet</button>
      </div>
    </div>
  );
}
