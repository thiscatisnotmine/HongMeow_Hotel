//******Calender******//
document.addEventListener("DOMContentLoaded", function () {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const startDayLabel = document.getElementById("startDay");
  const endDayLabel = document.getElementById("endDay");

  const today = new Date();
  if (!startDateInput || !endDateInput) return;

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let endPicker;

  const startPicker = flatpickr(startDateInput, {
    locale: "en",
    dateFormat: "d M Y",
    defaultDate: today,
    minDate: "today",
    onChange: function (selectedDates) {
      const selectedStart = selectedDates[0];
      const nextDay = new Date(selectedStart);
      nextDay.setDate(nextDay.getDate() + 1);
      endPicker.set("minDate", nextDay);

      const selectedEnd = new Date(endDateInput.value);
      if (!endDateInput.value || selectedEnd < nextDay) {
        endPicker.clear();
        endDayLabel.textContent = "Invalid date";
        endDayLabel.style.color = "red";
        alert("Check-out date must be at least one day after check-in date.");
      } else {
        updateDayLabel(endDateInput, endDayLabel);
        endDayLabel.style.color = "";
      }

      updateDayLabel(startDateInput, startDayLabel);
    }
  });

  endPicker = flatpickr(endDateInput, {
    locale: "en",
    dateFormat: "d M Y",
    defaultDate: tomorrow,
    minDate: tomorrow,
    onChange: function () {
      updateDayLabel(endDateInput, endDayLabel);
      endDayLabel.style.color = "";
    }
  });

  function updateDayLabel(dateInput, label) {
    const date = new Date(dateInput.value);
    if (!isNaN(date)) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      label.textContent = dayName;
    } else {
      label.textContent = "";
    }
  }

  updateDayLabel(startDateInput, startDayLabel);
  updateDayLabel(endDateInput, endDayLabel);
});
