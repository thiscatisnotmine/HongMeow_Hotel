
function saveFormData(formId, key, nextPage = "Booking_Summary.html") {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // หยุดการส่งปกติ

    const groupData = [];
    const forms = form.querySelectorAll(".contact-form, .pet-form");

    if (forms.length > 0) {
      forms.forEach(f => {
        const entry = {};
        f.querySelectorAll("input, select").forEach(el => {
          if (el.name) entry[el.name] = el.value;
        });
        groupData.push(entry);
      });
      localStorage.setItem(key, JSON.stringify(groupData));
    } else {
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




function loadFormData(formId, key) {
  const form = document.getElementById(formId);
  if (!form) return;

  const stored = localStorage.getItem(key);
  if (!stored) return;

  const data = JSON.parse(stored);
  const container = form.querySelector("#contact-container, #pet-container");

  if (Array.isArray(data) && container) {
    container.innerHTML = "";  // clear existing
    data.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = container.id === "contact-container" ? "contact-form" : "pet-form";

      wrapper.innerHTML = Object.entries(item).map(([k, v]) => {
        return `<div class="form-group"><label>${k}:</label><input name="${k}" value="${v}" required /></div>`;
      }).join("");
      container.appendChild(wrapper);
    });
  } else {
    Object.entries(data).forEach(([k, v]) => {
      const el = form.elements[k];
      if (el) el.value = v;
    });
  }
}



function saveMultiFormData(formId, key, formClass, nextPage) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const entries = [];
    const items = form.querySelectorAll(formClass);

    items.forEach((block) => {
      const item = {};
      const inputs = block.querySelectorAll("input, select");

      inputs.forEach(input => {
        const baseName = input.name?.replace(/\[\]$/, "");
        if (!baseName) return;

        if (input.type === "file") {
          item[baseName] = input.files[0]?.name || "No file";
        } else {
          item[baseName] = input.value;
        }
      });

      entries.push(item);
    });

    localStorage.setItem(key, JSON.stringify(entries));
    if (nextPage) window.location.href = nextPage;
  });
}




function loadMultiFormData(formId, key, itemClass) {
  const form = document.getElementById(formId);
  if (!form) return;

  const saved = JSON.parse(localStorage.getItem(key) || "[]");
  const container = form.querySelector("#pet-container, #contact-container");
  if (!container || saved.length === 0) return;

  const template = container.querySelector("." + itemClass);
  container.innerHTML = "";

  saved.forEach((data, index) => {
    const clone = template.cloneNode(true);
    clone.querySelectorAll("input, select").forEach(input => {
      const name = input.name?.replace(/\[\]$/, "");
      if (name && data[name] && input.type !== "file") {
        input.value = data[name];
      }
    });

    const title = clone.querySelector(".pet-title h2");
    if (title) title.textContent = `Pet ${index + 1}`;
    container.appendChild(clone);
  });
}