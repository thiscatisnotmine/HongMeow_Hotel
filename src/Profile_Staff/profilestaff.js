function logout() {
  window.location.href = "../Login/login.html"; 
}

const params = new URLSearchParams(window.location.search);
const EmpCID = params.get('EmpCID');
window.onload = function () {
    // ดึงข้อมูล employee
    fetch(`${api}/employee/${EmpCID}`)
      .then(res => res.json())
      .then(emp => {
        console.log(cus);
        document.getElementById('empCID').textContent = emp.EmpCID || "undefined";
        document.getElementById('empName').textContent = emp.EmpFname || "undefined";
      });
}
