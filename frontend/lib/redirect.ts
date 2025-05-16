// next-app/lib/redirect.ts
"use client";

import { useRouter } from "next/navigation";

export function useRedirect() {
  const router = useRouter();

  return (url: string) => router.push(url);
}
