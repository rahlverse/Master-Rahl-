export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    res.status(500).json({ reply: "Error: " + data.error.message });
  } else {
    res.status(200).json({ reply: data.choices[0].message.content });
  }
}
