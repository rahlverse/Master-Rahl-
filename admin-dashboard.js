// admin-dashboard.js import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"; import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js"; import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"; import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig); const storage = getStorage(app); const auth = getAuth(app);

const pdfUpload = document.getElementById("pdfUpload"); const pdfList = document.getElementById("pdfList");

// Ensure only authenticated admin can access onAuthStateChanged(auth, (user) => { if (!user || user.email !== "admin@example.com") { window.location.href = "admin.html"; } else { listPDFs(); } });

window.logoutAdmin = function () { signOut(auth).then(() => window.location.href = "admin.html"); };

window.uploadPDF = function () { const file = pdfUpload.files[0]; if (!file) return alert("Please select a PDF file."); const storageRef = ref(storage, pdfs/${file.name}); uploadBytes(storageRef, file) .then(() => { alert("Uploaded successfully."); listPDFs(); }) .catch((error) => alert("Upload failed: " + error)); };

function listPDFs() { const listRef = ref(storage, "pdfs"); listAll(listRef) .then((res) => { pdfList.innerHTML = ""; res.items.forEach((itemRef) => { getDownloadURL(itemRef).then((url) => { const li = document.createElement("li"); li.innerHTML = <a href="${url}" target="_blank">${itemRef.name}</a> <button onclick="deletePDF(\"${itemRef.fullPath}\")">Delete</button>; pdfList.appendChild(li); }); }); }) .catch((error) => console.error(error)); }

window.deletePDF = function (path) { const fileRef = ref(storage, path); deleteObject(fileRef) .then(() => { alert("Deleted successfully."); listPDFs(); }) .catch((error) => alert("Delete failed: " + error)); };

