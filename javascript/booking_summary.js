
function fillSummary(id, key) {
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  const container = document.getElementById(id);
  if (!container) return;

  if (id === "summary-room" && data.roomName && data.roomPrice) {
    container.innerHTML = `
      <div><strong>Room:</strong> ${data.roomName}</div>
      <div><strong>Price:</strong> ${data.roomPrice} <small>per night</small></div>
    `;
  } else if (Array.isArray(data.firstname)) {
    let html = "";
    const count = data.firstname.length;
    for (let i = 0; i < count; i++) {
      html += `
        <div><strong>Contact ${i + 1}</strong></div>
        <div>First Name: ${data.firstname[i]}</div>
        <div>Last Name: ${data.lastname[i]}</div>
        <div>Tel: ${data.tel[i]}</div>
        <div>Relationship: ${data.relationship[i]}</div>
        <hr/>
      `;
    }
    container.innerHTML = html;
  } else if (Array.isArray(data.name)) {
    let html = "";
    const count = data.name.length;
    for (let i = 0; i < count; i++) {
      html += `
        <div><strong>Pet ${i + 1}</strong></div>
        <div>Type: ${data.type[i]}</div>
        <div>Breed: ${data.breed[i]}</div>
        <div>Name: ${data.name[i]}</div>
        <div>Age: ${data.age[i]}</div>
        <div>Disease: ${data.disease[i]}</div>
        <hr/>
      `;
    }
    container.innerHTML = html;
  } else {
    container.innerHTML = Object.entries(data)
      .map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`)
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fillSummary("summary-customer", "booking_customer_data");
  fillSummary("summary-urgent", "booking_urgent_data");
  fillSummary("summary-room", "booking_room_data");
  fillSummary("summary-pet", "booking_pet_data");
});

document.addEventListener("DOMContentLoaded", function () {
  const confirmBtn = document.getElementById("confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      window.location.href = "Booking_Confirmed.html";
    });
  }
}); 