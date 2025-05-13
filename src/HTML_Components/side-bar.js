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
                <button class="menu" onclick="redirect('../Booking_History/booking_history.html')">Booking History</button>                
                <button class="menu" onclick="redirect('#')">Check-In / Check-Out</button>                
                <button class="menu" onclick="redirect('#')">Payments & Receipts</button>
                <button class="menu" onclick="redirect('../Customer_Profile/customer.html')">Customer & Pet Profiles</button>                
                <button class="menu room-report" onclick="redirect('../Room_Report/report.html')">Room Report</button>                
                <button class="menu" onclick="redirect('#')">Notification</button>                
            </div>
        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-sidebar', SideBar);
