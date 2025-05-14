document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const startDayLabel = document.getElementById("startDay");
  const endDayLabel = document.getElementById("endDay");
  const form = document.getElementById("bookingRoomForm");

  const saved = JSON.parse(localStorage.getItem("booking_room_data") || "{}");

  if (saved.startDate) {
    startDateInput.value = saved.startDate;
    updateDayLabel(startDateInput, startDayLabel);
  }
  if (saved.endDate) {
    endDateInput.value = saved.endDate;
    updateDayLabel(endDateInput, endDayLabel);
  }

  function saveDateToStorage() {
    const start = startDateInput.value;
    const end = endDateInput.value;
    if (start && end) {
      const data = JSON.parse(localStorage.getItem("booking_room_data") || "{}");
      data.startDate = start;
      data.endDate = end;
      localStorage.setItem("booking_room_data", JSON.stringify(data));
    }
  }

  function updateDayLabel(input, label) {
    const date = new Date(input.value);
    if (!isNaN(date)) {
      label.textContent = date.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      label.textContent = "";
    }
  }

  let endPicker;
  const startPicker = flatpickr(startDateInput, {
    locale: "en",
    dateFormat: "d M Y",
    defaultDate: saved.startDate || new Date(),
    minDate: "today",
    onChange: function (selectedDates) {
      const nextDay = new Date(selectedDates[0]);
      nextDay.setDate(nextDay.getDate() + 1);
      endPicker.set("minDate", nextDay);
      updateDayLabel(startDateInput, startDayLabel);
      saveDateToStorage();
    }
  });

  endPicker = flatpickr(endDateInput, {
    locale: "en",
    dateFormat: "d M Y",
    defaultDate: saved.endDate || null,
    minDate: saved.startDate || "today",
    onChange: function () {
      updateDayLabel(endDateInput, endDayLabel);
      saveDateToStorage();
    }
  });

  
  // ===== ตรวจสอบวันก่อน Submit =====
  if (form) {
    form.addEventListener("submit", function (e) {
      const roomData = JSON.parse(localStorage.getItem("booking_room_data") || "{}");
      const hasRoom = roomData.roomName && roomData.roomPrice;
      const hasDates = roomData.startDate && roomData.endDate;

      if (!hasDates) {
        alert("Please select both Check-in and Check-out dates.");
        e.preventDefault();
        return;
      }

      if (!hasRoom) {
        alert("Please select a room before continuing.");
        e.preventDefault();
        return;
      }

      // เก็บข้อมูลฟอร์มอื่น ๆ เพิ่มเติม
      const data = {};
      [...form.elements].forEach(el => {
        if (el.name) data[el.name] = el.value;
      });

      data.startDate = roomData.startDate;
      data.endDate = roomData.endDate;
      data.roomName = roomData.roomName;
      data.roomPrice = roomData.roomPrice;

      localStorage.setItem("booking_room_data", JSON.stringify(data));

      window.location.href = "Booking_Pet.html";
      e.preventDefault(); // ป้องกัน reload ซ้ำ
    });
  }
});
