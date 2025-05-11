const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        search(query);
    } else {
        alert('Please, Enter Customer Identification Card Number.');
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

// ค้นหาข้อมูลสัตว์เลี้ยง
function search(q) {
    fetch(`${api}/booking?q=${q}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultBody = document.getElementById('resultBox');
            resultBody.innerHTML = '';

            // วนลูปเพื่อสร้าง row ของ booking แต่ละรายการ
            data.forEach(booking => {
                const row = document.createElement('tr');

                // เลือกข้อมูลที่จะเอามาแสดง
                row.innerHTML = `
                            <td>${booking.bookingId}</td>
                            <td>${booking.bookingNumber}</td>
                            <td>${booking.checkinDate}</td>
                            <td>${booking.checkoutDate}</td>
                            <td>
                                <button class="view-btn" onclick='viewMore(${booking.bookingId})'>
                                    View more
                                </button>
                            </td>
                        `;

                resultBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
}

// Viewmore button
function viewMore(bookingId) {
    // เปิดหน้าใหม่
    window.location.href = `Booking-edit.html?bookingId=${encodeURIComponent(bookingId)}`;
}

function getAllBookings() {
    fetch(`${api}/booking`, { // ดึงข้อมูลการจองทั้งหมด
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultBody = document.getElementById('resultBox');
            resultBody.innerHTML = ''; // Clear the table body
            data.forEach(booking => { // วนลูปตามข้อมูลที่ API ส่งมา
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${booking.bookingId}</td> 
                        <td>${booking.bookingNumber}</td>
                        <td>${booking.checkinDate}</td>
                        <td>${booking.checkoutDate}</td>
                        <td>
                            <button class="view-btn" onclick='viewMore(${booking.bookingId})'>View More</button>
                        </td>
                    `;
                resultBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching all bookings:', error);
            alert('Failed to fetch all bookings. Please check the console for details.');
        });
}

function filter_payStatus() {
    fetch(`${api}/payment`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(payments => {
        const pendingPayments = payments.filter(payment => payment.PayStatus === 'Pending');
        const resultBody = document.getElementById('resultBox');  // Make sure you have a table with id="resultBody"
        resultBody.innerHTML = ''; // Clear previous results

        pendingPayments.forEach(payment => {
            // Assuming you want to display booking details associated with the payment
            // You might need to fetch booking details based on payment.bookingId
            const booking = {
                bookingId: payment.bookingId,
                bookingNumber: 'N/A', // You might need to fetch this
                checkinDate: 'N/A',   // You might need to fetch this
                checkoutDate: 'N/A'  // You might need to fetch this
            };  // Replace with actual booking data

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.bookingId}</td>
                <td>${booking.bookingNumber}</td>
                <td>${booking.checkinDate}</td>
                <td>${booking.checkoutDate}</td>
                <td>
                    <button class="view-btn" onclick='viewMore(${booking.bookingId})'>View More</button>
                </td>
            `;
            resultBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching payments:', error);
        alert('Failed to fetch payments.');
    });
}



function filter_BookedRoom_status(status) {
    fetch(`${api}/BookedRoom`, {  // ใช้ endpoint ที่ถูกต้องสำหรับ BookedRoom
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(bookedRooms => {
        const filteredRooms = bookedRooms.filter(room => room.bookingStatus === status); // Use bookingStatus
        const resultBody = document.getElementById('resultBox');
        resultBody.innerHTML = '';

        filteredRooms.forEach(room => {
           const booking = {
                bookingId: room.bookingId,
                bookingNumber: 'N/A',  // You might need to fetch
                checkinDate: 'N/A',    // You might need to fetch
                checkoutDate: 'N/A'   // You might need to fetch
            };
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.bookingId}</td>
                <td>${booking.bookingNumber}</td>
                <td>${booking.checkinDate}</td>
                <td>${booking.checkoutDate}</td>
                <td>
                    <button class="view-btn" onclick='viewMore(${booking.bookingId})'>View More</button>
                </td>
            `;
            resultBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching booked rooms:', error);
        alert('Failed to fetch booked rooms.');
    });
}

