const api = 'https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io';
window.onload = loadSearchQuery;

// กดไอคอน search แล้วจะ redirect พร้อมค่าค้นหา
function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.search = '?q=' + encodeURIComponent(query); 
  } else {
    alert('Please, Enter Room ID No.or Room Type');
    return;
  }
}

function loadSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');

  if (q) {
    document.getElementById('searchInput').value = q;
    search(q);
  }
}



// ค้นหาห้องที่ต้องการรายงาน
function search(q) {
  
    fetch(`${api}/report/${q}`, {
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
  
        // วนลูปเพื่อสร้าง row ของห้อง
        data.forEach(room => {
          const row = document.createElement('tr'); 
  
          // ตรวจสอบสถานะห้องและปรับปุ่ม
          const repairButtonDisabled = room.RStatus === 'Available' ? true : false;
          const reportButtonDisabled = room.RStatus === 'Out of order' ? true : false;
          
  
          // เลือกข้อมูลที่จะเอามาแสดง
          row.innerHTML = `
            <td>${room.RTID}-${room.RID}</td>
            <td>${room.RTName}</td>
            <td>${room.RStatus}</td>
            <td>
              <button class="repair-btn" id="repairBtn-${room.RID}" 
                onclick='repair("${room.RTID}", ${room.RID})' 
                ${repairButtonDisabled ? 'disabled' : ''}>
                Repair
              </button>
            </td> 
            <td>
              <button class="report-btn" id="reportBtn-${room.RID}" 
                onclick='reportRow("${room.RTID}", ${room.RID})' 
                ${reportButtonDisabled ? 'disabled' : ''}>
                Report
              </button>
            </td>
          `;
  
          resultBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching room:', error);
      });
  }
  
  // Repair button
  function repair(RTID, RID) {
    if (confirm('Do you want to repair this room?')) {
      fetch(`${api}/report/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_code: RTID,
          room_number: RID,
          status: 'Available'
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Room repaired as Available');
          // เปลี่ยนสถานะปุ่มหลังจาก repair
          document.getElementById(`repairBtn-${RID}`).disabled = true;
          document.getElementById(`reportBtn-${RID}`).disabled = false;

        } else {
          alert('Failed to repair room');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.log("Not yet repaired");
    }
  }
  
  // Report button
  function reportRow(RTID, RID) {
    if (confirm('Do you want to report this room?')) {
      fetch(`${api}/report/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_code: RTID,
          room_number: RID,
          status: 'Out of order'
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Room reported as Out of order');
          // เปลี่ยนสถานะปุ่มหลังจาก report
          document.getElementById(`repairBtn-${RID}`).disabled = false;
          document.getElementById(`reportBtn-${RID}`).disabled = true;

        } else {
          alert('Failed to report room');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.log("Not yet reported");
    }
  }
  