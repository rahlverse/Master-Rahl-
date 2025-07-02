const apiKey = OPENAI_API_KEY; // Make sure this is stored in Vercel as env variable

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
    const answer = data.choices?.[0]?.message?.content || "RAHL has no response.";

    document.getElementById("response").innerText = answer;
    speakResponse(answer); // Speak it
  } catch (error) {
    document.getElementById("response").innerText = `An error occurred: ${error.message}`;
  }
}

function handleQuestion() {
  const question = document.getElementById("userInput").value;
  askRAHL(question);
}

function speakResponse(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1.2;
  window.speechSynthesis.speak(speech);
}
