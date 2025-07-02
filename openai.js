// openai.js

async function askRAHL(question) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Uses the environment variable from Vercel
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices.length) {
      throw new Error("No response from RAHL.");
    }

    return data.choices[0].message.content;
  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}

export { askRAHL };
