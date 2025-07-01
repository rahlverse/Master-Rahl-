// RAHL LAUNCHPAD APP LOGIC
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Signup
if (window.location.pathname.includes("signup.html")) {
  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup successful!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  });
}

// Handle Login
if (window.location.pathname.includes("index.html")) {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  });
}
