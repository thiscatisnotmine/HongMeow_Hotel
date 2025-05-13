const mockCheckinData = [
  {
    CusCID: "123456789",
    BID: "AA0000",
    CheckInDate: "01/01/2025",
    CheckOutDate: "03/01/2025",
    PayStatus: "paid",
    RoomStatus: "NotCheckedIn"
  },
  {
    CusCID: "012345678",
    BID: "AA0001",
    CheckInDate: "03/01/2025",
    CheckOutDate: "04/01/2025",
    PayStatus: "unpaid",
    RoomStatus: "NotCheckedIn"
  },
  {
    CusCID: "987456321",
    BID: "AA0002",
    CheckInDate: "12/01/2025",
    CheckOutDate: "14/01/2025",
    PayStatus: "pending",
    RoomStatus: "NotCheckedIn"
  }
];

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
/***
function search(q) {
  fetch(`${api}/check/${q}`, {
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
          data.forEach(check => {
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
***/

function renderCheckinRow(check) {

  const tr = document.createElement("tr");

  const statusClass = check.PayStatus.toLowerCase(); // 'paid', 'unpaid', 'pending'
  const buttonLabel = check.RoomStatus === "CheckedIn" ? "Already In" : "Check-In";
  const isDisabled = check.RoomStatus === "CheckedIn" ? "disabled" : "";

  tr.innerHTML = `
    <td>${check.CusCID}</td>
    <td>${check.BID}</td>
    <td>${check.CheckInDate}</td>
    <td>${check.CheckOutDate}</td>
    <td class="${statusClass}">${check.PayStatus.toUpperCase()}</td>
    <td>
      <button class="view-btn" ${isDisabled} onclick='checkInHandler("${check.BID}", this)'>
        ${buttonLabel}
      </button>
    </td>
  `;

  return tr;
}

function renderCheckinTable(data) {
  const table = document.getElementById("checkin-table");
  table.innerHTML = "";

  // Rebuild thead
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>ID Card No.</th>
      <th>Booking No.</th>
      <th>Check-in</th>
      <th>Check-out</th>
      <th>Payment</th>
      <th></th>
    </tr>
  `;
  table.appendChild(thead);

  // Rebuild tbody
  const tbody = document.createElement("tbody");
  tbody.id = "checkin-tbody";
  data.forEach((check) => {
    const row = renderCheckinRow(check);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
}

function checkInHandler(bid, btnElement) {
  // Simulate a successful update and remove the row
  alert(`Checked in booking: ${bid}`);
  btnElement.closest("tr").remove();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckinTable(mockCheckinData);
});
