const api = '#';

window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.search = '?q=' + encodeURIComponent(query); 
  } else {
    alert('Please enter customer ID Card Number'); 
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

function search(q) {
  fetch(`${api}/check-in/${q}`, {
    // method 'GET': ใช้ดึงข้อมูลจากฐานข้อมูล
    // method 'POST': ใช้เพิ่มข้อมูลลงฐานข้อมูล
    // method 'PUT': ใช้อัปเดตข้อมูลลงฐานข้อมูล
    // method 'DELETE': ใช้ลบข้อมูลออกฐานข้อมูล
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
          if (data.length === 0){
            alert('Not Found.');
            return;
          }
          //const check = '/check-in-out/'
          data.forEach(check => {
              const row = document.createElement('tr'); 
              row.innerHTML = `
                  <td>${check.CusCID}</td>
                  <td>${check.BID}</td>
                  <td>${check.CheckInDate}</td>
                  <td>${check.CheckOutDate}</td>
                  <td>${check.PayStatus}</td>
                  <td>
                    <button class="blue-btn" onclick='checkin("${check.BID}","${check.RTID}",${check.RID})'>
                        Check-In
                    </button>
                  </td> 
              `;

              resultBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching:', error);
      });
}

// check-in
async function checkin(bookingId, roomCode, roomNumber) {
  try {
    const response = await fetch(`${api}/bookedroom/update-status`, { // อัปเดตสถานะห้องเป็น check-in ในตาราง bookedroom
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BID: bookingId,
        RTID: roomCode,
        RID: roomNumber,
        RoomStatus: "check-in"
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Update success:', result);

    // รีเฟรชตารางหลังอัปเดต
    checkin();

  } catch (error) {
    console.error('Update failed:', error);
  }
}
