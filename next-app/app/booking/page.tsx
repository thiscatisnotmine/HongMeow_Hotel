// app/booking/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/booking/customer");
  }, [router]);

  return null;
}
