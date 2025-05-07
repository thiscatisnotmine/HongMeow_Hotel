class TopBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="tab-container">
                <div class="tab_menu">
                    <button class="tab" onclick="redirect('#')">Available Room</button>
                    <button class="tab" onclick="redirect('#')">Staff Management</button>
                </div>
                <button class="profile" onclick="redirect('#')">
                  <img src="solar_user-outline.png" alt="Profile" class="profile-img">
                </button>


            </div>
                

        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-tabbar', TabBar);
