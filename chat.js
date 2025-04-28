document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatMessages = document.getElementById('chat-messages');

  chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (message !== '') {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('chat-message');
      msgDiv.textContent = "Anonymous: " + message;
      chatMessages.appendChild(msgDiv);
      chatInput.value = '';
    }
  });
});
