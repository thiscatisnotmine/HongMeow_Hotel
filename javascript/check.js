document.addEventListener("DOMContentLoaded", function () {
  // ==== Check PDF (เฉพาะ Booking_Pet) ==== //
  const container = document.getElementById("pet-container");
  if (container) {
    container.addEventListener("change", function (e) {
      if (e.target && e.target.type === "file") {
        const file = e.target.files[0];
        const formGroup = e.target.closest(".form-group");
        const clearBtn = formGroup.querySelector(".clear-file-btn");
        const messageId = e.target.getAttribute("data-message-id");
        const messageElement = document.getElementById(messageId);

        if (!file) {
          if (messageElement) messageElement.textContent = "";
          if (clearBtn) clearBtn.style.display = "none";
          return;
        }

        if (file.type === "application/pdf") {
          if (messageElement) {
            messageElement.textContent = "The file has been uploaded.";
            messageElement.style.color = "green";
          }
          if (clearBtn) clearBtn.style.display = "inline-block";
        } else {
          if (messageElement) {
            messageElement.textContent = "Please upload only PDF files.";
            messageElement.style.color = "red";
          }
          e.target.value = "";
          if (clearBtn) clearBtn.style.display = "none";
        }
      }
    });

    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("clear-file-btn")) {
        const formGroup = e.target.closest(".form-group");
        const oldInput = formGroup.querySelector("input[type='file']");
        const messageId = oldInput.getAttribute("data-message-id");
        const messageElement = document.getElementById(messageId);

        const newInput = oldInput.cloneNode(true);
        newInput.value = "";
        oldInput.replaceWith(newInput);

        if (messageElement) messageElement.textContent = "";
        e.target.style.display = "none";
      }
    });
  }

  // ==== Check Required Inputs + Redirect ==== //
  const nextBtn = document.querySelector(".next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      const inputs = document.querySelectorAll("input[required], select[required]");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "2px solid red";
          valid = false;
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill in all required fields before continuing.");
        return;
      }

      const currentUrl = window.location.href;
      if (currentUrl.includes("Booking_Customer.html")) {
        window.location.href = "Booking_Urgent.html";
      } else if (currentUrl.includes("Booking_Urgent.html")) {
        window.location.href = "Booking_Room.html";
      } else if (currentUrl.includes("Booking_Pet.html")) {
        window.location.href = "Booking_Summary.html";
      } else if (currentUrl.includes("Booking_Summary.html")) {
        window.location.href = "Booking_Comfirmed.html";
      }
    });
  }
});



// ==== Check Required Inputs + Redirect (Choice) ==== //
document.addEventListener("DOMContentLoaded", function () {
  const choiceButtons = document.querySelectorAll(".choice");

  choiceButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      const inputs = document.querySelectorAll("input[required], select[required]");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "2px solid red";
          valid = false;
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill in all required fields before changing sections.");
        return;
      }

      const targetPage = button.getAttribute("data-target");
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
});


// ==== Check Room (Booking room) ==== //
function saveFormData(formId, key, nextPage = "Booking_Summary.html") {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
  e.preventDefault();

  const currentPage = window.location.pathname;

  // ถ้าเป็นหน้า Booking Room ให้บังคับเลือกห้อง
  if (currentPage.includes("Booking_Room.html")) {
    const selected = document.querySelector(".room-item.active");
    if (!selected) {
      alert("Please select a room before proceeding.");
      return false;
    }

    const roomName = selected.querySelector(".room-name")?.textContent.trim();
    const roomPrice = selected.querySelector(".room-price")?.textContent.trim();

    const data = { roomName, roomPrice };
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    // หน้าอื่น เก็บฟอร์มปกติ
    const data = {};
    [...form.elements].forEach(el => {
      if (el.name) {
        data[el.name] = el.value;
      }
    });
    localStorage.setItem(key, JSON.stringify(data));
  }

  if (nextPage) {
    window.location.href = nextPage;
  }
});
}


// ==== Check room-item select (booking-room) ==== //
document.addEventListener("DOMContentLoaded", function () {
  const roomList = document.querySelector(".room-list");
  const savedData = JSON.parse(localStorage.getItem("booking_room_data") || "{}");

  // Restore previous selection if exists
  if (savedData.roomName) {
    const items = document.querySelectorAll(".room-item");
    items.forEach(item => {
      const name = item.querySelector(".room-name")?.textContent.trim();
      if (name === savedData.roomName) {
        item.classList.add("active");
      }
    });
  }

  // Click-to-select behavior
  roomList.addEventListener("click", function (e) {
    const item = e.target.closest(".room-item");
    if (!item) return;

    // Remove active from others
    document.querySelectorAll(".room-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    // Extract data
    const roomName = item.querySelector(".room-name")?.textContent.trim();
    const roomPrice = item.querySelector(".room-price")?.textContent.trim();

    // Save to localStorage
    const roomData = JSON.parse(localStorage.getItem("booking_room_data") || "{}");
    roomData.roomName = roomName;
    roomData.roomPrice = roomPrice;
    localStorage.setItem("booking_room_data", JSON.stringify(roomData));
  });
});
