const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.search = '?q=' + encodeURIComponent(query); 
  } else {
    alert('กรุณาใส่หมายเลขบัตรประชาชนลูกค้า'); 
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



// ค้นหาข้อมูลลูกค้า
function search(q) {
 

  // เปลี่ยนจาก /pet เป็น /customer เพื่อดึงข้อมูลลูกค้า
  fetch(`${api}/customer/${q}`, {

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

          // วนลูปเพื่อสร้าง row ของลูกค้าแต่ละคน
          data.forEach(customer => {
              const row = document.createElement('tr');

              // แสดง ID และชื่อลูกค้า
              row.innerHTML = `
                  <td>${customer.CusCID}</td>
                  <td>${customer.CusFname}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore(${customer.CusCID})'>
                      View more
                    </button>
                  </td> 
                  <td>
                    <button class="delete-btn" onclick="deleteRow(this)">
                      Delete
                    </button>
                  </td>
              `;

              resultBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching customers:', error);
      });
}

// Viewmore button
function viewMore(customerID) {
  // เปลี่ยนชื่อไฟล์และ parameter ที่ส่งไปด้วย
  window.location.href = `customer_viewmore.html?customerID=${encodeURIComponent(customerID)}`;
}

// Delete button
function deleteRow(button) {
  if (confirm('Are you sure you want to delete this?')) {
      const row = button.closest('tr');
      const customerID = row.querySelector('td:nth-child(1)').textContent.trim();

      fetch(`${api}/customer/${customerID}`, {
        method: 'DELETE'
    })
    .then(() => {
        row.classList.add('fade-out');
        setTimeout(() => {
          row.remove();
      }, 400);
        console.log(`Customer: ${customerID} deleted successfully!`);
        
    })
    .catch(err => console.error('Failed to delete', err));

    
  }
}