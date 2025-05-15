const api ='#';

async function handleSearch() {
  const citizenId = document.getElementById('searchInput').value.trim();
  if (citizenId.length !== 13 || isNaN(citizenId)) {
    alert('Please enter a valid 13-digit Citizen ID');
    return;
  }

  const res = await fetch(`${api}/reciept?citizenId=${citizenId}`);
  const bookings = await res.json();

  const tbody = document.querySelector('#resultTable tbody');
  tbody.innerHTML = ''; // Clear

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No bookings found.</td></tr>`;
    return;
  }

  bookings.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" name="booking" value="${b.BID}"></td>
      <td>${b.BID}</td>
      <td>${b.RTName}</td>
      <td>${b.CheckInDate}</td>
      <td>${b.RoomAmount}</td>
      <td>${b.RTPrice}</td>
      <td>${b.Total}</td>
    `;
    tbody.appendChild(row);
  });
}


document.getElementById('bookingForm').addEventListener('submit', async e => {
      e.preventDefault();
      const selected = [...document.querySelectorAll('input[name="booking"]:checked')]
        .map(input => input.value);

      if (selected.length === 0) {
        alert('Please select at least one booking.');
        return;
      }

      const res = await fetch('/api/receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingIds: selected })
      });

      const html = await res.text();

      // เปิดใบเสร็จใน tab ใหม่
      const receiptWindow = window.open('', '_blank');
      receiptWindow.document.write(html);
      receiptWindow.document.close();
    });