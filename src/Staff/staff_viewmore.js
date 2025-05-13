const api = '#';

const params = new URLSearchParams(window.location.search);
const empCID = params.get('empCID');

window.onload = function () {
    // ดึงข้อมูล employee
    fetch(`${api}/employee/${empCID}`)
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
      });
  };

/* Enable Edit Pet Info */
function enableEdit() {
    document.getElementById('empRole').disabled = false;
    document.getElementById('empUsername').disabled = false;
    document.getElementById('empPassword').disabled = false;
    document.getElementById('empFirstName').disabled = false;
    document.getElementById('empLastName').disabled = false;
    document.getElementById('empPhone').disabled = false;
    document.getElementById('empEmail').disabled = false;
    document.getElementById('empBirthDate').disabled = false;
    document.getElementById('empAddress').disabled = false;
    document.getElementById("buttonGroup").classList.remove("hidden-btn");

}

// แก้ไขข้อมูล
async function confirmEdit() {
  const role = document.getElementById('empRole').value;
  const username = document.getElementById('empUsername').value.trim();
  const password =document.getElementById('empPassword').value.trim();
  const firstname = document.getElementById('empFirstName').value.trim();
  const lastname = document.getElementById('empLastName').value.trim();
  const phone =document.getElementById('empPhone').value.trim();
  const email = document.getElementById('empEmail').value;
  const birth = document.getElementById('empBirthDate').value;
  const address = document.getElementById('empAddress').value;

  const formData = new FormData();
  formData.append('EmpRole', role);
  formData.append('EmpUsername', username);
  formData.append('EmpPassword', password);
  formData.append('EmpFname', firstname);
  formData.append('EmpLname', lastname);
  formData.append('EmpPhone', phone);
  formData.append('EmpEmail', email);
  formData.append('EmpBirth', birth);
  formData.append('EmpAddress', address);


  if (confirm('Do you want to save the data?')) {
    // ผู้ใช้กด OK
    const response = await fetch(`${api}/employee/${empCID}`, {
      method: 'PUT',
      body: formData
    });
  
    if (response.ok) {
      alert('Information sent successfully.');
      location.reload();
    } else {
      alert('Failed to send data.');
    }
  } else {
    // ผู้ใช้กด Cancel
    console.log("Changes not saved");
  }
  
}

// ยกเลิกการแก้ไขข้อมูล
function cancelEdit() {
  if (confirm('Do you want to unchange the data?')) {
    // ผู้ใช้กด OK
    console.log("Saved");
    location.reload();
  } else {
    // ผู้ใช้กด Cancel
    console.log("Unsaved");
  }
}
