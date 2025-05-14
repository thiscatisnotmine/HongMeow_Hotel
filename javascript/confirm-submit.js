document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirm-btn");
  const numberEl = document.getElementById("booking-number");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      const keys = [
        "booking_customer_data",
        "booking_urgent_data",
        "booking_room_data",
        "booking_pet_data"
      ];

      const data = {};
      keys.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) data[key] = JSON.parse(val);
      });

      // สร้าง booking number ถ้ายังไม่มี
      if (!data.bookingNo) {
        const random = Math.floor(1000 + Math.random() * 9000);
        data.bookingNo = "DAD" + random;
      }

      // บันทึกข้อมูลไว้
      localStorage.setItem("booking_confirmed_data", JSON.stringify(data));

      // ไปหน้า confirmed พร้อม query
      window.location.href = "Booking_Confirmed.html?confirm=true";
    });
  }

  // แสดงเลข booking บนหน้า summary
  if (numberEl) {
    const confirmed = JSON.parse(localStorage.getItem("booking_confirmed_data") || "{}");
    if (confirmed.bookingNo) {
      numberEl.textContent = confirmed.bookingNo;
    }
  }

  // ถ้ามี query ?confirm=true ให้ลบข้อมูลต้นทาง
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("confirm") === "true") {
    localStorage.removeItem("booking_customer_data");
    localStorage.removeItem("booking_urgent_data");
    localStorage.removeItem("booking_room_data");
    localStorage.removeItem("booking_pet_data");
  }
});