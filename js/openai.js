// openai.js (frontend only)
async function askRAHL(prompt) {
  const response = await fetch('/api/rahl', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.reply;
}
