class SideBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="sidebar">
                <div class="logo">
                    <img src='../../image/image_3-removebg-preview.png'/>
                </div>
                <button class="menu" onclick="redirect('../../src/Booking/booking_customer.html')">Create Booking</button>                
                <button class="menu" onclick="redirect('../../src/Booking_History/booking_history.html')">Booking History</button>                
                <button class="menu" onclick="redirect('../../src/Checkin_out/checkin.html')">Check-In / Check-Out</button>                
                <button class="menu" onclick="redirect('../../src/Payment/payment.html')">Payments & Receipts</button>
                <button class="menu" onclick="redirect('../../src/Customer_Profile/customer.html')">Customer & Pet Profiles</button>                
                <button class="menu room-report" onclick="redirect('../../src/Room_Report/report.html')">Room Report</button>                
                <button class="menu" onclick="redirect('../../src/Notification/notification.html')">Notification</button>                
            </div>
        `;
    }
}

// ใช้ชื่อที่มี hyphen
customElements.define('my-sidebar', SideBar);
