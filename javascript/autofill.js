// ============================
// Autofill: Booking_Urgent
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const contactContainer = document.getElementById("contact-container");
  if (!contactContainer) return; // <<< หยุดทันทีถ้าไม่ใช่หน้านี้

  const savedContacts = {
    Conan_Edogawa: {
      firstname: "Conan",
      lastname: "Edogawa",
      tel: "0812345678",
      relationship: "Friend"
    },
    Liu_Bai: {
      firstname: "Liu",
      lastname: "Bai",
      tel: "0898765432",
      relationship: "Sibling"
    }
  };

  function fillFormData(select, data) {
  const form = select.closest(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input");
  const relationshipSelect = form.querySelector("select.relationship-select");

  if (data) {
    inputs[0].value = data.firstname;
    inputs[1].value = data.lastname;
    inputs[2].value = data.tel;
    if (relationshipSelect) {
      relationshipSelect.value = data.relationship || "";
    }
  } else {
    inputs.forEach(input => input.value = "");
    if (relationshipSelect) relationshipSelect.selectedIndex = 0;
  }
}

  function updateDropdownOptions() {
    const allSelects = document.querySelectorAll(".dropdown-select");
    const selected = Array.from(allSelects).map(sel => sel.value).filter(v => v !== "");

    allSelects.forEach(select => {
      const currentValue = select.value;
      select.querySelectorAll("option").forEach(option => {
        if (option.value === "") {
          option.disabled = false;
        } else {
          option.disabled = selected.includes(option.value) && option.value !== currentValue;
        }
      });
    });
  }

  contactContainer.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("dropdown-select")) {
      const selectedKey = e.target.value;
      const data = selectedKey ? savedContacts[selectedKey] : null;
      fillFormData(e.target, data);
      updateDropdownOptions();
    }
  });

  updateDropdownOptions();
});


// ============================
// Autofill: Booking_Pet
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const petContainer = document.getElementById("pet-container");
  if (!petContainer) return; // <<< หยุดทันทีถ้าไม่ใช่หน้านี้

  const petData = {
    Haruka_Sakura: {
      type: "Cat",
      breed: "American Shorthair",
      name: "Haruka Sakura",
      age: "3",
      disease: "None"
    },
    Hayato_Suo: {
      type: "Cat",
      breed: "Persian",
      name: "Hayato Suo",
      age: "3",
      disease: "None"
    }
  };

  function fillPetForm(selectElement, data) {
    const form = selectElement.closest(".pet-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input[type='text']");
    if (data) {
      if (inputs.length >= 5) {
        inputs[0].value = data.type;
        inputs[1].value = data.breed;
        inputs[2].value = data.name;
        inputs[3].value = data.age;
        inputs[4].value = data.disease;
      }
    } else {
      inputs.forEach(input => input.value = "");
    }
  }

  function updateDropdownOptions() {
    const allSelects = document.querySelectorAll(".dropdown-select");
    const selectedValues = Array.from(allSelects)
      .map(sel => sel.value)
      .filter(v => v !== "");

    allSelects.forEach(select => {
      const currentValue = select.value;
      select.querySelectorAll("option").forEach(option => {
        if (option.value === "") {
          option.disabled = false;
        } else {
          option.disabled = selectedValues.includes(option.value) && option.value !== currentValue;
        }
      });
    });
  }

  petContainer.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("dropdown-select")) {
      const selectedKey = e.target.value;
      const data = selectedKey ? petData[selectedKey] : null;
      fillPetForm(e.target, data);
      updateDropdownOptions();
    }
  });

  updateDropdownOptions();
});



// ============================
// Autofill: Booking_Pet(from Booking-room)
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const roomData = JSON.parse(localStorage.getItem("booking_room_data") || "{}");

  if (roomData.roomName) {
    const roomNameSpan = document.querySelector(".room-name");
    if (roomNameSpan) {
      roomNameSpan.textContent = roomData.roomName;
    }
  }

  if (roomData.roomNumber) {
    const roomNumberSpan = document.querySelector(".room-number");
    if (roomNumberSpan) {
      roomNumberSpan.textContent = roomData.roomNumber;
    }
  }
});
