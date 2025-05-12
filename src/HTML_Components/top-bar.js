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
                  <img src='../Picture/solar_user-outline.png'/>

                </button>


            </div>
                

        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-topbar', TopBar);
