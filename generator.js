<script>
  const form = document.getElementById("generatorForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = document.getElementById("prompt").value;

    resultDiv.innerHTML = "<p><em>RAHL is thinking...</em></p>";

    try {
      const response = await fetch("/api/rahl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      resultDiv.innerHTML = `<p>${data.reply}</p>`;
    } catch (err) {
      resultDiv.innerHTML = `<p class="error">An error occurred: ${err.message}</p>`;
    }
  });
</script>
