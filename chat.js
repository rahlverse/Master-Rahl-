const chatbox = document.getElementById("chatbox");
const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) return;

  appendMessage("You", question, "user");
  questionInput.value = "";

  appendMessage("RAHL", "Typing...", "rahl");
  const botReplies = document.querySelectorAll(".rahl");
  const latestReply = botReplies[botReplies.length - 1];

  const answer = await askRAHL(question);
  latestReply.textContent = answer;
});

function appendMessage(sender, text, className) {
  const msg = document.createElement("div");
  msg.classList.add("msg", className);
  msg.innerText = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}
