document.addEventListener("DOMContentLoaded", function () {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
  
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    function formatThai(date) {
      return date.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
  
    // ตั้งค่าเริ่มต้นที่ input
    startDateInput.value = formatThai(today);
    endDateInput.value = formatThai(tomorrow);
  
    flatpickr(startDateInput, {
      locale: "th",
      defaultDate: today,
      dateFormat: "d M Y",
    });
  
    flatpickr(endDateInput, {
      locale: "th",
      defaultDate: tomorrow,
      dateFormat: "d M Y",
    });
  });