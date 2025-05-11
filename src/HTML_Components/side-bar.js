class SideBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="sidebar">
                <div class="logo">
                    <img src='../Picture/image_3-removebg-preview.png'/>
                </div>
                <button class="menu" onclick="redirect('#')">Create Booking</button>                
                <button class="menu" onclick="redirect('#')">Booking History</button>                
                <button class="menu" onclick="redirect('../Checkin_out/checkin.html')">Check-In / Check-Out</button>                
                <button class="menu" onclick="redirect('../Payment/payment.html')">Payments & Receipts</button>
                <button class="menu" onclick="redirect('#')">Customer & Pet Profiles</button>                
                <button class="menu" onclick="redirect('#')">Room Report</button>                
                <button class="menu" onclick="redirect('#')">Notification</button>                
            </div>
        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-sidebar', SideBar);
