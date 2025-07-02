// pdf-manager.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Make the function globally accessible
window.uploadPDF = async function () {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to upload PDFs.");
    return;
  }

  const fileInput = document.getElementById("pdfFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  const storageRef = ref(storage, `pdfs/${user.uid}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    alert("PDF uploaded successfully!");
  } catch (error) {
    alert("Upload failed: " + error.message);
  }
}
