const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const backendURL = "https://atlas-backend-roi5.onrender.com/chat"; // Your Render backend URL

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('You', message);
  userInput.value = '';

  try {
    const response = await fetch(backendURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }) // Must match backend
    });

    const data = await response.json();

    // Check if reply exists
    if (data.reply) {
      appendMessage('Atlas', data.reply);
    } else {
      appendMessage('Atlas', 'Hmm... I did not get a proper reply 😕');
      console.log('Full response from backend:', data);
    }
  } catch (err) {
    appendMessage('Atlas', 'Oops! Something went wrong.');
    console.error(err);
  }
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
