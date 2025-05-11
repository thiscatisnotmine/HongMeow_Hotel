const api = 'https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io';

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

//maybe i can use this one for this page
// fetch('/api/payment?paystatus=Pending')
function search(q) {
  fetch(`${api}/payment${q}`, {
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

          // วนลูปเพื่อสร้าง row
          data.forEach(payment => {
              const row = document.createElement('tr'); 

              // เลือกข้อมูลที่จะเอามาแสดง
              /*ใน figma มันจะมี CusCID, BID, CheckInDate, PaymentDue แต่ตอนนี้ข้อมูลใน mockup ไม่มี PaymentDue?*/
              row.innerHTML = `
                  <td>${payment.CusCID}</td>
                  <td>${payment.BID}</td>
                  <td>${booking.CheckInDate}</td>
                  <td>${payment.PayDate}</td> 
                  <td>${payment.PayTotal}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore(${payment},${booking})'>
                      View more
                    </button>
                  </td> 
              `;

              resultBody.appendChild(row);
          });

          const makepay = document.getElementById("makepay");
          makepay.style.display = "block";
      })
      .catch(error => {
          console.error('Error fetching pets:', error);
      });
}

// Viewmore button
function viewMore(payment,booking) {
    
  // เปิดหน้าใหม่
  window.location.href = `paymentdetail.html?PID=${encodeURIComponent(payment)}&BID=${encodeURIComponent(booking)}`;
}

function confirmPay() {
    //connfirm payment and redirect to payment detail? or receipts?
}

// Delete button
/*
function deleteRow(button) {
  if (confirm('Are you sure you want to delete this?')) {
      const row = button.closest('tr');
      const petID = row.querySelector('td:nth-child(2)').textContent.trim(); // ถ้าตัวข้อมูลที่จะดึงไม่ได้อยู่ช่องที่ 1 ให้ใช้ td:nth-child(x) แทน td และ x แทนด้วยช่องที่ข้อมูลนั้นอยู่

      fetch(`${api}/employee/${petID}`, {
        method: 'DELETE'
    })
    .then(() => {
        // เพิ่มคลาสชื่อ fade-out เข้าไปใน <tr> แล้ว .fade-out ใน css จะทำงาน
        row.classList.add('fade-out');

        // ลบหลังแอนิเมชันจบ (400ms)
        setTimeout(() => {
          row.remove(); // ให้ลบแถวที่เลือกออกจากหน้าเว็บ
      }, 400); 
        console.log(`Pet: ${petID} deleted successfully!`);
        
    })
    .catch(err => console.error('Failed to delete', err));

    
  }
}
*/