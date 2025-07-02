// js/openai.js

async function askRAHL(question) {
  try {
    const response = await fetch("/api/rahl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: question }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.reply;
  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}
