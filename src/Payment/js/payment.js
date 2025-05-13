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

// maybe use this one for this page to filter?
// fetch('/api/payment?paystatus=Pending')
function search(q) {
  fetch(`${api}/bill/${q}`, {
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
          console.log(data); // ดูที่ console บนหน้าเว็บใน Developoer tool ว่าได้ข้อมูลอะไรมาบ้าง
          const resultBody = document.getElementById('resultBox');
          resultBody.innerHTML = ''; // clear หน้าเว็บ
          if (data.length === 0){
            alert('Not Found.');
            return;
          }
          if (data.length > 0) {
            document.getElementById('makepay').style.display = 'none'; // initially make pay button
          }
          // วนลูปเพื่อสร้าง row
          data.forEach(bill => {
              const row = document.createElement('tr'); 
              row.innerHTML = `
                  <td>
                    <input class="row-checkbox" type="checkbox" />
                  </td>
                  <td>${bill.CusCID}</td>
                  <td>${bill.BID}</td>
                  <td>${bill.CheckInDate}</td>
                  <td>${bill.DueDate}</td> 
                  <td>${bill.PayTotal}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore("${bill.CusCID}", "${bill.BID}")'>
                      view more
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

//Viewmore button
// ไม่ค่อยแน่ใจว่าควรจะส่ง payment กับ booking ทั้งหมดไปเลยดีไหมหรือแค่ส่งไอดีแล้วค่อยไปดึงข้อมูลเอาอีกที
function viewMore(cusCID, BID) {
    window.location.href = `paymentdetail.html?CusCID=${cusCID}&BID=${BID}`;
}
// paymentdetail.html --> pdetail.js


//จัดการปุ่มยืนยันให้ขึ้นเฉพาะตอนที่มีการเลือกแถวอย่างน้อยแถวนึง
const confirmButton = document.querySelector('.makepay');
const selectAll = document.getElementById('select-all');

// Show/hide confirm button based on selection
function updateConfirmButton() {
  const selected = document.querySelectorAll('.row-checkbox:checked');
  confirmButton.style.display = selected.length > 0 ? 'block' : 'none';
}

// Select/deselect all checkboxes
selectAll.addEventListener('change', function () {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  checkboxes.forEach(cb => {
    cb.checked = this.checked;
  });
  updateConfirmButton();
});

// Watch individual row checkboxes
document.addEventListener('change', function (e) {
  if (e.target.classList.contains('row-checkbox')) {
    // If any checkbox is unchecked, uncheck "select all"
    if (!e.target.checked) {
      selectAll.checked = false;
    }
    updateConfirmButton();
  }
});


// Send POST/PUT request to update payment status to 'Paid'
/* ****Unfinished***** 
  fetch('/api/payments/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bids: selectedBIDs })
  }).then(res => {
    if (res.ok) {
      alert('Payments confirmed!');
    } else {
      alert('Something went wrong.');
    }
  });
}
*****/