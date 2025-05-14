// *****add contract(Booking_Urgent)*****//
document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.getElementById("addContactBtn");
  const container = document.getElementById("contact-container");

  // ตั้งชื่อให้ Contact 1 ถ้ายังไม่มี
  const firstForm = container.querySelector(".contact-form");
  if (firstForm && !firstForm.querySelector(".contact-title")) {
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "contact-title";
    titleWrapper.innerHTML = `
      <h2 style="margin: 0;">Contact 1</h2>
      <div class="filter-dropdown">
        <select name="savedContact" class="dropdown-select">
          <option value="">Choose from saved name</option>
          <option value="Conan_Edogawa">Conan Edogaw</option>
          <option value="Liu_Bai">Liu Bai</option>
        </select>
        <span class="dropdown-arrow"></span>
      </div>
    `;
    firstForm.prepend(titleWrapper);
  }

  addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const currentForms = container.querySelectorAll(".contact-form");
    if (currentForms.length >= 2) {
      alert("You can only add up to 2 contacts.");
      return;
    }

    const newForm = currentForms[0].cloneNode(true);

    // ล้างข้อมูลเก่า
    newForm.querySelectorAll("input").forEach(input => input.value = "");
    newForm.querySelectorAll("select").forEach(select => {
      select.selectedIndex = 0;
    });

    // เปลี่ยนหัวข้อ Contact
    const newIndex = currentForms.length + 1;
    const titleEl = newForm.querySelector(".contact-title h2");
    if (titleEl) {
      titleEl.textContent = `Contact ${newIndex}`;
    }

    // ปุ่มลบ
    let removeBtn = newForm.querySelector(".remove-contact-btn");
    if (!removeBtn) {
      removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "remove-contact-btn";
      removeBtn.textContent = "Remove Contact";
      removeBtn.style.marginTop = "10px";
      removeBtn.style.alignSelf = "flex-end";
    }
    removeBtn.onclick = () => newForm.remove();
    newForm.appendChild(removeBtn);

    container.appendChild(newForm);
  });
})


// *****add_pet(Booking_Pet)*****//
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("pet-container");
  const addBtn = document.getElementById("addPetBtn");

  if (!container || !addBtn) return;

  let petCount = 1;

  addBtn.addEventListener("click", function () {
    const currentForms = container.querySelectorAll(".pet-form");
    if (currentForms.length >= 2) {
      alert("You can only add up to 2 pets.");
      return;
    }

    petCount++;

    const newPet = document.createElement("div");
    newPet.className = "pet-form";
    newPet.innerHTML = `
    <div class="pet-title">
      <h2 style="margin: 0;">Pet 2</h2>
      <div class="filter-dropdown">
        <select name="savedPet" class="dropdown-select">
          <option value="">Choose from saved name</option>
          <option value="Haruka_Sakura">Haruka Sakura</option>
          <option value="Hayato_Suo">Hayato Suo</option>
        </select>
        <span class="dropdown-arrow"></span>
      </div>
    </div>
    <div class="form-group"><label>Pet Type:</label><input type="text" name="type" required /></div>
    <div class="form-group"><label>Pet Breed:</label><input type="text" name="breed" required /></div>
    <div class="form-group"><label>Pet Name:</label><input type="text" name="name" required /></div>
    <div class="form-group"><label>Pet Age:</label><input type="text" name="age" required /></div>
    <div class="form-group"><label>Disease:</label><input type="text" name="disease" required /></div>
    <div class="form-group">
      <label>Vaccine Book:</label>
      <input type="file" class="file-input" name="vaccine" data-message-id="pdf-message-2" required />
      <button type="button" class="clear-file-btn" style="display: none;">Remove file.</button>
      <div id="pdf-message-2" class="upload-message" style="margin-top: 5px; font-size: 14px;"></div>
    </div>
    <button type="button" class="remove-pet-btn">Remove Pet</button>
  `;

    container.appendChild(newPet);
  });

  // Event Delegation: ลบฟอร์มที่คลิกปุ่มลบ
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-pet-btn")) {
      const form = e.target.closest(".pet-form");
      if (form) {
        form.remove();
      }
    }
  });
});