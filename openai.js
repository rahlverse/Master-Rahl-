// openai.js

async function askRAHL(question) {
  try {
    const response = await fetch("/api/rahl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await response.json();
    return data.result || "RAHL could not respond.";
  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}
