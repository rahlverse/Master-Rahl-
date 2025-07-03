export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://master-rahl.vercel.app",  // Your deployed site
      "X-Title": "RAHL AI", // Optional
    },
    body: JSON.stringify({
      model: "openrouter/openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ reply: `Error: ${data.error.message}` });
  }

  const message = data.choices?.[0]?.message?.content;
  return res.status(200).json({ reply: message || "RAHL did not respond." });
}
