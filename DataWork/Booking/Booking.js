const api = 'https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io';

window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        search(query);
    } else {
        alert('Please, Enter Customer Identification Card Number or Booking Number.');
        return;
    }
}

// ไว้ดึงค่า q (ค่าที่ใช้ค้นหา) จาก URL
function loadSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');

    if (q) {
        document.getElementById('searchInput').value = q;
        search(q);
    }
}

let allData = [];

// ค้นหาข้อมูลการจอง
function search(q) {
    try{
        fetch(`${api}/booking-history${q}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        allData = data;  // เก็บข้อมูลจาก API ลงใน allData
        displayData(allData); // เรียกฟังก์ชั่น displayData
    });
    }catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

function displayData(data) {
    const resultBody = document.getElementById('resultBox');
    resultBody.innerHTML = '';

    // วนลูปเพื่อสร้าง row ของ booking แต่ละรายการ
        data.forEach(booking => {
            const row = document.createElement('tr');

            // เลือกข้อมูลที่จะเอามาแสดง
            row.innerHTML = `
            <td>${booking.CusCID}</td>
            <td>${booking.BID}</td>
            <td>${booking.CheckInDate}</td>
            <td>${booking.CheckOutDate}</td>
            <td>
            <button class="view-btn" onclick='viewMore(${booking.BID})'>
                View more
            </button>
            </td>
            `;

            resultBody.appendChild(row);
        });
}

// Viewmore button
function viewMore(BID) {
    // เปิดหน้าใหม่
    window.location.href = `Booking-edit.html?bookingId=${encodeURIComponent(BID)}`;
}

function getAllBookings() {
    try {
        fetch(`${api}/booking-history`, { // ดึงข้อมูลการจองทั้งหมด
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            allData = data;
            console.log(allData);
            displayData(allData);
            
        })}catch(error) {
            console.log(error);
    }
    
        
}

function filterData_Payment(button,status) {
      button.classList.add('tab-change-color');
      let filteredData;
      filteredData = allData.filter(item => item.PayStatus === status);  // กรองตามสถานะ Pending
      displayData(filteredData);  // แสดงข้อมูลที่กรอง
}

function filterData_Booked(button,status) {
      button.classList.add('tab-change-color');
      let filteredData;
      filteredData = allData.filter(item => item.RoomStatus === status);  // กรองตามสถานะ check-in, check-out, cancel
      displayData(filteredData);  // แสดงข้อมูลที่กรอง
}
