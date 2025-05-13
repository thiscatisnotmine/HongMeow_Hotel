const api = '#';

// ถ้าไม่ใช่ admin ให้ไปหน้า restrict 
const token = localStorage.getItem('userToken');
  if (!token) {
    window.location.href = '/restrict.html';
}

// ข้อมูลพนักงานทั้งหมด
window.onload = function () {
  fetch(`${api}/employee`, {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json'
    }
})
      .then(response => response.json())
      .then(data => {
          
          console.log(data); 
          const resultBody = document.getElementById('resultBox');
          resultBody.innerHTML = ''; // clear หน้าเว็บ
          if (data.length === 0){
            alert('An error occurred. No data was found.');
            return;
          }

          // วนลูปเพื่อสร้าง row ของ employee แต่ละคน
          data.forEach(emp => {
              const row = document.createElement('tr'); 

              // เลือกข้อมูลที่จะเอามาแสดง
              row.innerHTML = `
                  <td>${emp.EmpCID}</td>
                  <td>${emp.EmpFname} ${emp.EmpLname}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore(${emp.EmpCID})'>
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
          console.error('Error fetching employee:', error);
      });
}


// ค้นหาพนักงาน
function search() {
  const q = document.getElementById('searchInput').value.trim();
  fetch(`${api}/employee/${q}`, {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json'
    }
})
      .then(response => response.json())
      .then(data => {
          
          console.log(data); 
          const resultBody = document.getElementById('resultBox');
          resultBody.innerHTML = ''; // clear หน้าเว็บ
          if (data.length === 0){
            alert('An error occurred. No data was found.');
            return;
          }

          // วนลูปเพื่อสร้าง row ของ employee แต่ละคน
          data.forEach(emp => {
              const row = document.createElement('tr'); 

              // เลือกข้อมูลที่จะเอามาแสดง
              row.innerHTML = `
                  <td>${emp.EmpCID}</td>
                  <td>${emp.EmpFname} ${emp.EmpLname}</td>
                  <td>
                    <button class="view-btn" onclick='viewMore(${emp.EmpCID})'>
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
          console.error('Error fetching employee:', error);
      });

}

// Viewmore button
function viewMore(empCID) {
    
  // เปิดหน้าใหม่
  window.location.href = `staff_viewmore.html?empCID=${encodeURIComponent(empCID)}`;
}

// Delete button
function deleteRow(button) {
  if (confirm('Are you sure you want to delete this?')) {
      const row = button.closest('tr');
      const empCID = row.querySelector('td').textContent.trim(); // ถ้าตัวข้อมูลที่จะดึงไม่ได้อยู่ช่องที่ 1 ให้ใช้ td:nth-child(x) แทน td และ x แทนด้วยช่องที่ข้อมูลนั้นอยู่

      fetch(`${api}/employee/${empCID}`, {
        method: 'DELETE'
    })
    .then(() => {
        // เพิ่มคลาสชื่อ fade-out เข้าไปใน <tr> แล้ว .fade-out ใน css จะทำงาน
        row.classList.add('fade-out');

        // ลบหลังแอนิเมชันจบ (400ms)
        setTimeout(() => {
          row.remove(); // ให้ลบแถวที่เลือกออกจากหน้าเว็บ
      }, 400); 
        console.log(`Employee: ${empCID} deleted successfully!`);
        
    })
    .catch(err => console.error('Failed to delete', err));

    
  }
}



