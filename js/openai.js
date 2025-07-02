export async function askRAHL(question) {
  try {
    const response = await fetch("/api/rahl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: question }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.result || "RAHL is silent at the moment...";
  } catch (err) {
    return `An error occurred: ${err.message}`;
  }
}
