document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("generator-form");
  const input = document.getElementById("prompt");
  const output = document.getElementById("output");
  const generateBtn = document.getElementById("generate-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = input.value.trim();

    if (!prompt) {
      output.textContent = "Please enter a prompt.";
      return;
    }

    generateBtn.disabled = true;
    output.textContent = "👑 RAHL is thinking...";

    try {
      const response = await fetch("/api/rahl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data?.reply) {
        output.textContent = `👑 RAHL: ${data.reply}`;
      } else {
        output.textContent = "No response from RAHL.";
      }
    } catch (err) {
      console.error("Error:", err);
      output.textContent = `Error: ${err.message}`;
    } finally {
      generateBtn.disabled = false;
    }
  });
});
