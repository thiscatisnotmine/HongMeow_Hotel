const api = '';

/*
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  
  // จำลองระบบ login ง่ายๆ
  const staffAccounts = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "fai", password: "0000", role: "receptionist" }
  ];
  

 

  const user = staffAccounts.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "../Home/home.html"; 
  } else {
    document.getElementById("error-msg").style.display = "block";
  }
});
*/




 async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert('Please enter your usernameand password.');
    return;
  }
  
  try {
    const response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = `../Home/home.html`;
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function togglePassword() {
  const passwordField = document.getElementById("password");
  const passwordType = passwordField.type === "password" ? "text" : "password";
  passwordField.type = passwordType;

  const eyeIcon = document.querySelector(".toggle-password");
  eyeIcon.src = passwordType === "password" ? "../Picture/eye-open.png" : "../Picture/eye-closed.png";
}
