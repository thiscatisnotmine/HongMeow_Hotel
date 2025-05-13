const api = 'https://5364cfed-1e99-411c-bf1c-9aa4eafeecd1.mock.pstmn.io';

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
  fetch(`${api}/check-in-out/${q}`, {
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
          const check = '/check-in-out/'
          data.forEach(booking => {
              const row = document.createElement('tr'); 
              row.innerHTML = `
                  <td>${check.CusCID}</td>
                  <td>${check.BID}</td>
                  <td>${check.CheckInDate}</td>
                  <td>${check.CheckOutDate}</td>
                  <td>${check.PayStatus}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore("${check.CusCID}", "${check.BID}")'>
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

// to the Detail page
function viewMore(cusCID, BID) {
    window.location.href = `checkindetail.html?CusCID=${cusCID}&BID=${BID}`;
}
