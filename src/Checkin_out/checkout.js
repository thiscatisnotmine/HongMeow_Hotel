const mockCheckoutData = [
  {
    CusCID: "123456789",
    BID: "AA0000",
    CheckInDate: "01/01/2025",
    CheckOutDate: "03/01/2025",
    PayStatus: "paid",
    RoomStatus: "CheckedIn"
  },
  {
    CusCID: "012345678",
    BID: "AA0001",
    CheckInDate: "03/01/2025",
    CheckOutDate: "04/01/2025",
    PayStatus: "paid",
    RoomStatus: "CheckedIn"
  },
  {
    CusCID: "987456321",
    BID: "AA0002",
    CheckInDate: "12/01/2025",
    CheckOutDate: "14/01/2025",
    PayStatus: "paid",
    RoomStatus: "CheckedIn"
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
                        Check-Out
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

function renderCheckoutRow(check) {

  const tr = document.createElement("tr");

  const statusClass = check.PayStatus.toLowerCase(); // 'paid', 'unpaid', 'pending'
  const isDisabled = check.RoomStatus === "CheckedOut" ? "disabled" : "";
  const buttonLabel = check.RoomStatus === "CheckedOut" ? "Already Out" : "Check-Out";

  tr.innerHTML = `
    <td>${check.CusCID}</td>
    <td>${check.BID}</td>
    <td>${check.CheckInDate}</td>
    <td>${check.CheckOutDate}</td>
    <td class="${statusClass}">${check.PayStatus.toUpperCase()}</td>
    <td>
      <button class="view-btn" ${isDisabled} onclick='checkOutHandler("${check.BID}", this)'>
        ${buttonLabel}
      </button>
    </td>
  `;

  return tr;
}

function renderCheckoutTable(data) {
  const table = document.getElementById("checkout-table");
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
  tbody.id = "checkout-tbody";
  data.forEach((check) => {
    const row = renderCheckoutRow(check);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
}

function checkOutHandler(bid, btnElement) {
  // Simulate a successful update and remove the row
  alert(`Checked Out booking: ${bid}`);
  btnElement.closest("tr").remove();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutTable(mockCheckoutData);
});
