
const api = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.search = '?q=' + encodeURIComponent(query); 
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
 

  // สามารถเปลี่ยน /pet เป็นชื่อ table อื่นได้ เช่นจะดึงข้อมูลลูกค้าก็ใช้ /customer
  fetch(`${api}/pet/${q}`, {

    // method 'GET': ใช้ดึงข้อมูลจากฐานข้อมูล
    // method 'POST': ใช้เพิ่มข้อมูลลงฐานข้อมูล
    // method 'PUT': ใช้อัปเดตข้อมูลลงฐานข้อมูล
    // method 'DELETE': ใช้ลบข้อมูลออกฐานข้อมูล
    method: 'GET', // หรือ 'POST', 'PUT', 'DELETE' ตามที่ต้องการ ปล.ตอนนี้ใช้ได้แค่ GET เนื่องจากมันเป็นแค่ mock api ไม่ได้มีฐานข้อมูลจริงๆเลยแก้ไข เพิ่ม ลบจริงๆยังไม่ได้
    headers: {
        'Content-Type': 'application/json'
    }
})
      .then(response => response.json())
      .then(data => {
          console.log(data); // ดูที่ console บนหน้าเว็บใน Developoer tool ว่าได้ข้อมูลอะไรมาบ้าง
          const resultBody = document.getElementById('resultBox');
          resultBody.innerHTML = ''; // clear หน้าเว็บ

          // วนลูปเพื่อสร้าง row ของ pet แต่ละตัว
          data.forEach(pet => {
              const row = document.createElement('tr'); 

              // เลือกข้อมูลที่จะเอามาแสดง
              row.innerHTML = `
                  <td>${pet.CusCID}</td>
                  <td>${pet.PID}</td>
                  <td>${pet.PName}</td>
                  <td>${pet.PType}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore(${pet.PID},${pet.CusCID})'>
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
          console.error('Error fetching pets:', error);
      });
}

// Viewmore button
function viewMore(pet,customerID) {
    
  // เปิดหน้าใหม่
  window.location.href = `pet_viewmore.html?petID=${encodeURIComponent(pet)}&customerID=${encodeURIComponent(customerID)}`;
}

// Delete button
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
