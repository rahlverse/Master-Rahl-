export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://master-rahl.vercel.app", // Optional
        "X-Title": "RAHL Assistant", // Optional
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are RAHL, a wise and powerful royal assistant." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || "RAHL could not respond.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with RAHL." });
  }
}
