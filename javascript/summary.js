function fillSummary(id, key, allData = null) {
  const container = document.getElementById(id);
  if (!container) return;

  const data = allData ? allData[key] : JSON.parse(localStorage.getItem(key) || "[]");
  if (!data) return;

  let html = "";

  if (id === "summary-room" && data.roomName && data.roomPrice) {
    html += `<div class="summary-entry">`;
    html += `<div><strong>Room:</strong> ${data.roomName}</div>`;
    html += `<div><strong>Price:</strong> ${data.roomPrice} <small>per night</small></div>`;
    if (data.startDate && data.endDate) {
      html += `<div><strong>Check-in:</strong> ${data.startDate}</div>`;
      html += `<div><strong>Check-out:</strong> ${data.endDate}</div>`;
    }
    html += `</div>`;
  } else if (Array.isArray(data)) {
    data.forEach((entry, index) => {
      html += `<div class="summary-entry"><strong>${capitalize(id.replace("summary-", ""))} ${index + 1}</strong><br/>`;
      Object.entries(entry).forEach(([k, v]) => {
        html += `<div><strong>${capitalize(k)}:</strong> ${v}</div>`;
      });
      html += `</div>`;
    });
  } else if (typeof data === "object") {
    html += `<div class="summary-entry">`;
    Object.entries(data).forEach(([k, v]) => {
      html += `<div><strong>${capitalize(k)}:</strong> ${v}</div>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
  const confirmedData = JSON.parse(localStorage.getItem("booking_confirmed_data") || "{}");

  if (Object.keys(confirmedData).length > 0) {
    fillSummary("summary-customer", "booking_customer_data", confirmedData);
    fillSummary("summary-urgent", "booking_urgent_data", confirmedData);
    fillSummary("summary-room", "booking_room_data", confirmedData);
    fillSummary("summary-pet", "booking_pet_data", confirmedData);

    // ลบข้อมูลต้นฉบับ ถ้าอยู่ในหน้าคอนเฟิร์ม
    const isConfirmedPage = window.location.pathname.includes("Booking_Confirmed.html");
    if (isConfirmedPage) {
      localStorage.removeItem("booking_customer_data");
      localStorage.removeItem("booking_urgent_data");
      localStorage.removeItem("booking_room_data");
      localStorage.removeItem("booking_pet_data");
    }
  } else {
    // ใช้ข้อมูลที่ยังไม่ยืนยัน
    fillSummary("summary-customer", "booking_customer_data");
    fillSummary("summary-urgent", "booking_urgent_data");
    fillSummary("summary-room", "booking_room_data");
    fillSummary("summary-pet", "booking_pet_data");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirm-btn");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const keys = [
        "booking_customer_data",
        "booking_urgent_data",
        "booking_room_data",
        "booking_pet_data"
      ];

      const confirmedData = {};
      keys.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) {
          confirmedData[key] = JSON.parse(val);
        }
      });

      // เก็บข้อมูลรวมไว้ใน key ใหม่
      localStorage.setItem("booking_confirmed_data", JSON.stringify(confirmedData));

      // เปลี่ยนหน้า
      window.location.href = "Booking_Confirmed.html";
    });
  }
});