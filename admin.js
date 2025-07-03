// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (email === "admin@example.com") {
        window.location.href = "admin-dashboard.html";
      } else {
        document.getElementById("adminLoginError").innerText = "Access denied. Not an admin.";
      }
    })
    .catch((error) => {
      document.getElementById("adminLoginError").innerText = error.message;
    });
});
