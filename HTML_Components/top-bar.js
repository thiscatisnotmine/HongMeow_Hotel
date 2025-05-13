class TopBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentPage = location.pathname.split("/").pop();

    this.innerHTML = `
      <div class="tab-container">
        <div class="tab_menu">
          <button class="tab" data-page="Avaiable_Room_(Admin).html" onclick="redirect('Avaiable_Room_(Admin).html')">Available Room</button>
          <button class="tab" data-page="############" onclick="redirect('##############')">Staff Management</button>
        </div>
        <button class="profile" onclick="redirect('#')">
          <img src='../src/Picture/solar_user-outline.png'/>
        </button>
      </div>
    `;

    // ใส่ .active ให้ปุ่มที่ตรงกับหน้า
    const tabs = this.querySelectorAll(".tab");
    tabs.forEach(tab => {
      const page = tab.getAttribute("data-page");
      if (page === currentPage) {
        tab.classList.add("active");
      }
    });
  }
}

customElements.define('my-topbar', TopBar);