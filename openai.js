const apiKey = 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



async function askRAHL(question) {
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
  return data.choices[0].message.content;
}
