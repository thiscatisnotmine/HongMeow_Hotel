document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const startPicker = flatpickr(startDateInput, {
    dateFormat: "d M Y",
    defaultDate: today,
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      endPicker.set('minDate', dateStr); // set minDate for endPicker
    }
  });

  const endPicker = flatpickr(endDateInput, {
    dateFormat: "d M Y",
    defaultDate: tomorrow,
    minDate: tomorrow
  });

  // Day name labels
  const startDayLabel = document.getElementById("startDay");
  const endDayLabel = document.getElementById("endDay");

  function updateDayLabel(dateInput, label) {
    const date = new Date(dateInput.value);
    const options = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options); // ✅ เปลี่ยนจาก "th-TH"
    label.textContent = dayName;
  }

  updateDayLabel(startDateInput, startDayLabel);
  updateDayLabel(endDateInput, endDayLabel);

  startDateInput.addEventListener("change", () => updateDayLabel(startDateInput, startDayLabel));
  endDateInput.addEventListener("change", () => updateDayLabel(endDateInput, endDayLabel));
});
