class TopBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="tab-container">
                <div class="tab_menu">
                    <button class="tab" onclick="redirect('../../src/Avaiable_Room/avaiable_room.html')">Available Room</button>
                    <button class="tab" onclick="redirect('../../src/Staff/staff.html')">Staff Management</button>
                </div>
                <button class="profile" onclick="redirect('../src/Staff_Profile/profilestaff.html)">
                  <img src='../../image/solar_user-outline.png'/>

                </button>
                </div>

            </div>
                

        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-topbar', TopBar);
