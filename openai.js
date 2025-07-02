// openai.js

const apiKey = process.env.OPENAI_API_KEY;

async function askRAHL(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.choices?.[0]?.message?.content || "RAHL could not respond.";
  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}
