const api ='#';


// ข้อมูลลูค้าที่ยังไม่จ่ายเงิน หรือเข้าพักพรุ่งนี้
window.onload = function () {
  fetch(`${api}/notification`, {
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
            alert('No data.');
            return;
          }

          
          data.forEach(noti => {
              const row = document.createElement('tr'); 

              
              row.innerHTML = `
                  <td>${noti.CusCID}</td>
                  <td>${noti.CusFname} ${noti.CusLname}</td>
                  <td>${noti.CusPhone}</td>
                  <td>${noti.CusEmail}</td>
                  <td>${noti.Note || '-'}</td>
              `;

              resultBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching employee:', error);
      });
}