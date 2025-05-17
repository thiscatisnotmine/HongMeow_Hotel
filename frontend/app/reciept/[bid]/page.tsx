// next-app/app/receipt/[bid]/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import "../../../styles/HTML_Components/payment.css";
import "../../../styles/HTML_Components/side-bar.css";
import "../../../styles/HTML_Components/top-bar.css";

export default function ReceiptDetailPage() {
  const searchParams = useSearchParams();
  const CusCID = searchParams.get("CusCID");
  const BID = searchParams.get("BID");

  return (
    <div className="main-content">
      <div className="tab-inside">
        <button
          className="choice"
          onClick={() => (window.location.href = "/payment")}
        >
          Payments
        </button>
        <button
          className="choice choice-curr"
          onClick={() => (window.location.href = "/receipt")}
        >
          Receipts
        </button>
      </div>

      <div className="file">
        <p style={{ textAlign: "center" }}>
          receipt.png (Booking ID: {BID}, Customer ID: {CusCID})
        </p>
      </div>

      <div className="print-btn">
        <button onClick={() => window.print()}>
          <img
            src="https://img.icons8.com/?size=100&id=fso03wZmSSfR&format=png&color=ffffff"
            style={{ backgroundColor: "transparent", width: "25px" }}
            alt="print"
          />
          Print
        </button>
        <button onClick={() => alert("Download feature not implemented")}>
          <img
            src="https://img.icons8.com/?size=100&id=Y9ExL4D7bQMF&format=png&color=ffffff"
            style={{ backgroundColor: "transparent", width: "25px" }}
            alt="download"
          />
          Download
        </button>
      </div>
    </div>
  );
}
