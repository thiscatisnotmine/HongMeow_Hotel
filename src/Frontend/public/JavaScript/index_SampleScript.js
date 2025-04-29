// Sample Script for Sample_index.thml

// Link mock API
const mockapi = 'https://b5b0fc7d-7be7-4d63-881a-8439438e9ccb.mock.pstmn.io';

// ให้ทำการโหลดหน้าเว็บให้เสร็จแล้วค่อยไปเรียกฟังก์ชั่น loadEmployee();
document.addEventListener('DOMContentLoaded', () => {
  loadEmployee();
});

// ฟังก์ชั่น loadEmployee จะโหลดข้อมูลของพนักงาน
function loadEmployee() {

  // สามารถเปลี่ยน /employee เป็นชื่อ table อื่นได้ เช่นจะดึงข้อมูลลูกค้าก็ใช้ /customer
  fetch(`${mockapi}/employee`, {

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
          const tableBody = document.getElementById('employeeTableBody');
          tableBody.innerHTML = ''; // clear หน้าเว็บ

          // วนลูปเพื่อสร้าง row ของ employee แต่ละตัว
          data.forEach(employee => {
              const row = document.createElement('tr'); 

              // อันนี้จะแสดงเฉพาะ EmpCID กับ EmpFname เท่านั้นในตาราง
              row.innerHTML = `
                  <td>${employee.EmpCID}</td>
                  <td>${employee.EmpFname}</td>
                  <td><button class="view-btn" onclick='viewMore(${employee.EmpCID})'>View More</button></td>
                  <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
              `;

              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching users:', error);
      });
}

  function viewMore(employee) {
    
    // เปิดหน้าใหม่
    window.location.href = `view_Sample.html?ssn=${encodeURIComponent(employee)}`;
  }

 // ฟังก์ชั่นลบ row ปล.ยังไม่สามารถลบข้อมูลได้แบบจริงๆ
function deleteRow(button) {
    if (confirm('Are you sure you want to delete this row?')) {
        const row = button.closest('tr');
        const ssn = row.querySelector('td').textContent.trim(); // ถ้าตัวข้อมูลที่จะดึงไม่ได้อยู่ช่องที่ 1 ให้ใช้ td:nth-child(x) แทน td และ x แทนด้วยช่องที่ข้อมูลนั้นอยู่

        fetch(`${mockapi}/employee/${ssn}`, {
          method: 'DELETE'
      })
      .then(() => {
          // เพิ่มคลาสชื่อ fade-out เข้าไปใน <tr> แล้ว .fade-out ใน css จะทำงาน
          row.classList.add('fade-out');

          // ลบหลังแอนิเมชันจบ (400ms)
          setTimeout(() => {
            row.remove(); // ให้ลบแถวที่เลือกออกจากหน้าเว็บ
        }, 400); 
          console.log(`Employee ${ssn} deleted successfully!`);
          
      })
      .catch(err => console.error('Failed to delete', err));

      
    }
}
