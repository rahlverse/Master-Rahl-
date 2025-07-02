import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

// Init Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadPDFs(user.uid);
  }
});

window.uploadPDF = async function () {
  const file = document.getElementById("pdfFile").files[0];
  if (!file) return alert("Select a PDF first.");
  const user = auth.currentUser;
  const pdfRef = ref(storage, `pdfs/${user.uid}/${file.name}`);
  await uploadBytes(pdfRef, file);
  alert("PDF uploaded successfully!");
  loadPDFs(user.uid);
};

async function loadPDFs(uid) {
  const listRef = ref(storage, `pdfs/${uid}/`);
  const res = await listAll(listRef);
  const listEl = document.getElementById("pdfList");
  listEl.innerHTML = "";
  res.items.forEach(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    const li = document.createElement("li");
    li.innerHTML = `<a href="${url}" target="_blank">${itemRef.name}</a>`;
    listEl.appendChild(li);
  });
}

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
