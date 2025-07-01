// Load Firebase SDK modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Import your config
import { firebaseConfig } from './firebase-config.js';

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
