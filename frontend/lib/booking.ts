import { api } from "./api";

export async function createBookingFromDraft(): Promise<string> {
  /* read drafts */
  const customer = JSON.parse(
    localStorage.getItem("booking_customer_data") || "{}"
  );
  const room = JSON.parse(localStorage.getItem("booking_room_data") || "{}");
  const pets = JSON.parse(
    localStorage.getItem("booking_pet_data") || "[]"
  ) as unknown[];

  if (!customer.CusCID || !room.RTID || !room.RID) {
    throw new Error("Incomplete booking data");
  }

  /* 1️⃣  create Booking */
  interface BookingRes {
    BID: string;
  }
  const booking = await api<BookingRes>("/booking", {
    method: "POST",
    body: JSON.stringify({
      CusCID: customer.CusCID,
      CheckInDate: room.startDate,
      CheckOutDate: room.endDate,
      RoomAmount: pets.length,
      RTID: room.RTID,
      RID: room.RID,
    }),
  });

  const bid = booking.BID;

  /* 2️⃣  placeholder Payment */
  await api("/payment", {
    method: "POST",
    body: JSON.stringify({
      BID: bid,
      CusCID: customer.CusCID,
      PayTotal: room.price ?? 0, // adjust if your draft has price
      PayMethod: "Pending",
      PayStatus: "Pending",
    }),
  });

  /* 3️⃣  clear drafts */
  [
    "booking_customer_data",
    "booking_urgent_data",
    "booking_room_data",
    "booking_pet_data",
  ].forEach((k) => localStorage.removeItem(k));

  return bid;
}
