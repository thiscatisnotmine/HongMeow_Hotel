// frontend/lib/customer.ts
import { api } from "./api";

export function searchCustomerByCID(cid: string) {
  return api<Customer[]>(
    `/customer/search-by-cid?cid=${encodeURIComponent(cid)}`,
    { method: "GET" }
  );
}
