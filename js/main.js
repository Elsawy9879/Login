function register() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const existMsg = document.getElementById("exist");

  if (name === "" || email === "" || password === "") {
    existMsg.innerHTML = `<span class="text-danger">All fields are required</span>`;
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    existMsg.innerHTML = `<span class="text-danger">Please enter a valid email</span>`;
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    existMsg.innerHTML = `<span class="text-danger">Email already exists. Try another one.</span>`;
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
}

function logIn() {
  const emailInput = document.getElementById("loginEmail").value.trim();
  const passwordInput = document.getElementById("loginPassword").value;
  const incorrectMsg = document.getElementById("incorrect");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(user => user.email === emailInput && user.password === passwordInput);

  if (matchedUser) {
    localStorage.setItem("currentUser", matchedUser.name);
    window.location.href = "home.html";
  } else {
    incorrectMsg.innerHTML = `<span class="text-danger">Invalid email or password</span>`;
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "home.html") {
    const username = localStorage.getItem("currentUser");
    const usernameElement = document.getElementById("username");

    if (!username) {
      window.location.href = "index.html";
    } else {
      usernameElement.textContent = `Welcome ${username}`;
    }
  }
});
