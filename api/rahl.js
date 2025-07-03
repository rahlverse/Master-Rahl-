export default async function handler(req, res) {
  const { question } = JSON.parse(req.body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://master-rahl.vercel.app",
      "X-Title": "RAHL Launchpad"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      temperature: 0.8
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0]?.message?.content || "RAHL had no answer." });
}
