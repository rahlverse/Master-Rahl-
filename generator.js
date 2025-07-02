// js/generator.js
import { askRAHL } from './openai.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("generatorForm");
  const input = document.getElementById("promptInput");
  const output = document.getElementById("responseOutput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    output.innerHTML = "⏳ Thinking...";
    const reply = await askRAHL(question);
    output.innerHTML = `👑 ${reply} — <span style="color:gold">Unleashed by RAHL</span>`;
  });
});
