<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>RAHL Generator</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <nav class="navbar">
      <h1 class="logo">👑 RAHL</h1>
      <ul class="nav-links">
        <li><a href="dashboard.html">Dashboard</a></li>
        <li><a href="#" id="logoutBtn">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main class="generator-section">
    <h2>Talk to RAHL</h2>
    <form id="promptForm">
      <input type="text" id="promptInput" placeholder="Ask me anything..." required />
      <button type="submit" class="btn">Generate</button>
    </form>
    <div id="response" class="response-box">
      <p id="typing">RAHL is typing...</p>
      <div id="output"></div>
    </div>
  </main>

  <footer>
    <p class="powered">Powered by RAHL</p>
  </footer>

  <!-- Firebase + Generator Script -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
    import { firebaseConfig } from "./firebase-config.js";

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Ensure logged in
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "login.html";
      }
    });

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.href = "login.html";
      });
    });

    // Generator logic
    const promptForm = document.getElementById("promptForm");
    const typing = document.getElementById("typing");
    const output = document.getElementById("output");

    promptForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      typing.style.display = "block";
      output.textContent = "";
      const prompt = document.getElementById("promptInput").value;

      try {
        const response = await fetch("/api/rahl", {
          method: "POST",
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        output.textContent = data.reply || "RAHL could not reply.";
      } catch (err) {
        output.textContent = "Error: " + err.message;
      } finally {
        typing.style.display = "none";
      }
    });
  </script>
</body>
</html>
