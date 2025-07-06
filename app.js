// app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup Function
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Account created! Please check your email to verify your address.");
      window.location.href = "login.html";
    } catch (error) {
      alert("Signup Error: " + error.message);
    }
  });
}

// Login Function
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email before logging in.");
        await auth.signOut();
        return;
      }
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Login Error: " + error.message);
    }
  });
}

// Logout Function
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out successfully.");
    window.location.href = "login.html";
  });
}

// Auth state check (for hiding/showing logout button)
onAuthStateChanged(auth, (user) => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    if (user && user.emailVerified) {
      logoutBtn.style.display = "inline-block";
    } else {
      logoutBtn.style.display = "none";
    }
  }
});
