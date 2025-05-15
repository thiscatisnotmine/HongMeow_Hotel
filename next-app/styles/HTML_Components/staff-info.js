class StaffInfo extends HTMLElement {
  connectedCallback() {
    const isEditablePage = window.location.pathname.includes("viewmore.html");
    const isAddPage = window.location.pathname.includes("addstaff.html");

    this.innerHTML = `
      <form class="profile-info">
        <p>
          <label><strong>ID:</strong>
            <input type="text" value="${isAddPage ? "" : "12345678"}" ${isAddPage ? "" : "readonly"} />
          </label>
        </p>
        <p>
          <label><strong>First Name:</strong>
            <input type="text" value="${isAddPage ? "" : "Bob"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <p>
          <label><strong>Last Name:</strong>
            <input type="text" value="${isAddPage ? "" : "Allen"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <br />

        <p>
          <label><strong>Tel.:</strong>
            <input type="tel" value="${isAddPage ? "" : "0123456789"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <p>
          <label><strong>Email:</strong>
            <input type="email" value="${isAddPage ? "" : "bob.all@hongmoew.com"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <br />

        <p>
          <label><strong>Birth Date:</strong>
            <input type="date" value="${isAddPage ? "" : "2002-01-01"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <p>
          <label><strong>Age:</strong>
            <input type="number" value="${isAddPage ? "" : "23"}" readonly />
          </label>
        </p>
        <p>
          <label><strong>Address:</strong>
            <input type="text" value="${isAddPage ? "" : "525 Soi Abc, Bangkok 10450"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <br />

        <p>
          <label><strong>Username:</strong>
            <input type="text" id="username-input" value="${isAddPage ? "" : "HM485"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
          </label>
        </p>
        <p>
          <label><strong>Password:</strong>
            <input type="password" id="password-input" value="${isAddPage ? "" : "mySecret123"}" ${!isEditablePage && !isAddPage ? "readonly" : ""} />
            ${isEditablePage ? `  
              <img
                id="toggle-password"
                src="../Picture/eye-closed.png"
                alt="Toggle Password"
                style="width: 20px; height: 20px; cursor: pointer; vertical-align: middle; margin-left: 8px;"
              />
            ` : ""}
          </label>
        </p>

        ${isEditablePage || isAddPage ? `
          <div class="action-buttons">
            ${!isAddPage && isEditablePage ? `
              <button class="save-button">Save</button>
              <button class="delete-button">Delete</button>
        ` : ""}

          </div>
        ` : ""}
      </form>
    `;

    if (isEditablePage || isAddPage) this.setupPasswordToggleView();
  }

  setupPasswordToggleView() {
    const passwordInput = this.querySelector("#password-input");
    const toggleBtn = this.querySelector("#toggle-password");
    if (!passwordInput || !toggleBtn) return;

    let visible = false;
    toggleBtn.addEventListener("click", () => {
      visible = !visible;
      passwordInput.type = visible ? "text" : "password";
      toggleBtn.src = visible ? "../Picture/eye-open.png" : "../Picture/eye-closed.png";
    });
  }
}

customElements.define("staff-info", StaffInfo);
