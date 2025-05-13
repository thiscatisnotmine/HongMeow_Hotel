const api = '#';
const fields = {
    idCard: {
      element: document.getElementById("idCard"),
      error: document.getElementById("idCardError"),
      validate: val => {
        if (!val) return "ID card is required.";
        if (!/^\d{13}$/.test(val)) return "ID card must be 13 digits.";
        return "";
      }
    },
    firstName: {
      element: document.getElementById("firstName"),
      error: document.getElementById("firstNameError"),
      validate: val => {
        if (!val) return "First name is required.";
        if (!/^[A-Z][a-zA-Z]*$/.test(val)) return "Must start with uppercase and contain only English letters.";
        return "";
      }
    },
    lastName: {
      element: document.getElementById("lastName"),
      error: document.getElementById("lastNameError"),
      validate: val => {
        if (!val) return "Last name is required.";
        if (!/^[A-Z][a-zA-Z]*$/.test(val)) return "Must start with uppercase and contain only English letters.";
        return "";
      }
    },
    phone: {
      element: document.getElementById("phone"),
      error: document.getElementById("phoneError"),
      validate: val => {
        if (!val) return "Phone number is required.";
        if (!/^\d{10}$/.test(val)) return "Phone number must be 10 digits.";
        return "";
      }
    },
    email: {
      element: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: val => {
        if (!val) return "This field is required.";
        if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(val)) return emailError.textContent = "Invalid email format: example.example@gmail.com";
        return ""; 
        
      }
    },
    birthDate: {
      element: document.getElementById("birthDate"),
      error: document.getElementById("birthDateError"),
      validate: val => {
        if (!val) return "Birth date is required.";
        const today = new Date().toISOString().split("T")[0];
        if (val > today) return "Birth date cannot be in the future.";
        return "";
      }
    },
    address: {
      element: document.getElementById("address"),
      error: document.getElementById("addressError"),
      validate: val => {
        return val ? "" : "Address is required.";
      }
    }
  };

// Real-time validation
  for (let key in fields) {
    fields[key].element.addEventListener("input", () => {
      const value = fields[key].element.value.trim();
      const errorMsg = fields[key].validate(value);
      fields[key].error.textContent = errorMsg;
    });
}


async function submitEmployee() {
    let isValid = true;
    for (let key in fields) {
      const value = fields[key].element.value.trim();
      const errorMsg = fields[key].validate(value);
      fields[key].error.textContent = errorMsg;
      if (errorMsg) isValid = false;
    }

    if (isValid) {
        const idCard = document.getElementById('idCard').value.trim();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const dob = document.getElementById('dob').value;
      const address = document.getElementById('address').value.trim();

      // Basic validation
      if (!idCard || !firstName || !lastName || !phone || !email || !dob || !address) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const response = await fetch(`${api}/employee`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            EmpCID: idCard,
            EmpFname: firstName,
            EmpLname: lastName,
            EmpPhone: phone,
            EmpEmail: email,
            EmpBirth: dob,
            EmpAddress: address
          })
        });

        const result = await response.json();

        if (response.ok) {
          alert("Employee added successfully!");
          document.getElementById('employeeForm').reset();
        } else {
          alert("Failed to add employee: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while submitting the form.");
      }

    }else {
      alert("Please correct the errors before submitting.");
    }
}