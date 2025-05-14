class SideBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentPage = location.pathname.split("/").pop();

    this.innerHTML = `
      <div class="sidebar">
        <div class="logo">
          <img src='../src/Picture/image_3-removebg-preview.png'/>
        </div>
        <button class="menu" data-pages="Booking_Customer.html,Booking_Urgent.html,Booking_Room.html,Booking_Pet.html,Booking_Summary.html" onclick="redirect('Booking_Customer.html')">Create Booking</button> 
        <button class="menu" data-page="#########" onclick="redirect('#########')">Booking History</button>
        <button class="menu" data-page="#########" onclick="redirect('#########')">Check-In / Check-Out</button>
        <button class="menu" data-page="#########" onclick="redirect('#########')">Payments & Receipts</button>
        <button class="menu" data-page="#########" onclick="redirect('#########')">Customer & Pet Profiles</button>
        <button class="menu" data-page="#########" onclick="redirect('#########')">Room Report</button>
        <button class="menu" data-page="Notification.html" onclick="redirect('Notification.html')">Notification</button>
      </div>
    `;

     // รองรับหลายหน้าใน 1 ปุ่ม
    const buttons = this.querySelectorAll('.menu');
    buttons.forEach(btn => {
      const pages = btn.getAttribute('data-pages');
      const page = btn.getAttribute('data-page');
      const match = (pages && pages.split(',').includes(currentPage)) || page === currentPage;
      if (match) {
        btn.classList.add('active');
      }
    });
  }
}

customElements.define('my-sidebar', SideBar);