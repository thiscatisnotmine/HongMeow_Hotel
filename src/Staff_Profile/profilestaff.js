function logout() {
  window.location.href = "../Login/login.html"; 
}


// ให้เอาข้อมูของพนักงานที่ login ใช้งานระบบอยู่
window.onload = function () {
  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("Not logged in");
    window.location.href = "../Login/login.html";
    return;
  }

  let EmpCID;

  try {
    const decoded = jwt_decode(token);
    EmpCID = decoded.EmpCID; // ต้องแน่ใจว่า backend ใส่ EmpCID ตอนสร้าง token
  } catch (error) {
    alert("Invalid token");
    window.location.href = "../Login/login.html";
    return;
  }

  // ดึงข้อมูล employee ของผู้ login
  fetch(`${api}/employee/${EmpCID}`)
    .then(res => res.json())
    .then(emp => {
      console.log(emp);
      document.getElementById('empID').textContent = emp.EmpCID || "undefined";
      document.getElementById('empRole').value = emp.EmpRole;
      document.getElementById('empUsername').value = emp.EmpUsername;
      document.getElementById('empPassword').value = emp.EmpPassword;
      document.getElementById('empFirstName').value = emp.EmpFname;
      document.getElementById('empLastName').value = emp.EmpLname;
      document.getElementById('empPhone').value = emp.EmpPhone;
      document.getElementById('empEmail').value = emp.EmpEmail;
      document.getElementById('empBirthDate').value = emp.EmpBirth;
      document.getElementById('empAddress').value = emp.EmpAddress;
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load employee data");
    });
};

