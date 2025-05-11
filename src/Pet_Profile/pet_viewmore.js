const api = 'https://6ba789b3-3c09-4dd7-bb94-f9a8a5bf82fa.mock.pstmn.io';

const params = new URLSearchParams(window.location.search);
const petID = params.get('petID');
const cusID =params.get('customerID');
console.log(petID);
console.log(cusID);



window.onload = function () {
    // ดึงข้อมูลเจ้าของ Pet
    fetch(`${api}/customer/${cusID}`)
      .then(res => res.json())
      .then(cus => {
        console.log(cus);
        document.getElementById('cusID').textContent = cus.CusCID || "undefined";
        document.getElementById('cusName').textContent = cus.CusFname || "undefined";
      });
    
    // ดึงข้อมูล Pet
    fetch(`${api}/pet/${petID}`)
    .then(res => res.json())
    .then(pet => {
      document.getElementById('petName').value = pet.PName;
      document.getElementById('petType').value = pet.PType;
      document.getElementById('petBreeds').value = pet.PBreeds;
      document.getElementById('petAge').value = pet.PAge;
      document.getElementById('petDisease').value = pet.PDisease;

    });
  };


/* Enable Edit Pet Info */
function enableEdit() {
    document.getElementById('petName').disabled = false;
    document.getElementById('petType').disabled = false;
    document.getElementById('petBreeds').disabled = false;
    document.getElementById('petAge').disabled = false;
    document.getElementById('petDisease').disabled = false;
    document.getElementById('petVaccine').disabled = false;
    document.getElementById("buttonGroup").classList.remove("hidden-btn");
}


// แก้ไขข้อมูล
async function confirmEdit() {
  const name = document.getElementById('petName').value.trim();
  const type = document.getElementById('petType').value;
  const breeds = document.getElementById('petBreeds').value;
  const age = document.getElementById('petAge').value;
  const disease = document.getElementById('petDisease').value;
  //const file = document.getElementById('fileInput').files[0];

  const formData = new FormData();
  formData.append('PName', name);
  formData.append('PType', type);
  formData.append('PBreeds', breeds);
  formData.append('PAge', age);
  formData.append('PDisease', disease);
  /*if (file) {
    formData.append('file', file);
  }
  */

  if (confirm('Do you want to save the data?')) {
    // ผู้ใช้กด OK
    const response = await fetch(`${api}/pet/${petID}`, {
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