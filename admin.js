import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function checkAdmin() {
  const output = document.getElementById("output");
  onAuthStateChanged(auth, (user) => {
    if (user && user.email === "youremail@example.com") {
      output.innerHTML = "✅ Admin verified.<br><br>User ID: " + user.uid;
    } else {
      output.innerHTML = "🚫 Access denied. You are not the Emperor.";
    }
  });
}
