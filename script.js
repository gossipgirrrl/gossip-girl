document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gossip-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const gossipContent = document.getElementById('gossip-content').value;
      if (gossipContent) {
        const gossipPost = document.createElement('div');
        gossipPost.classList.add('gossip-post');
        gossipPost.innerHTML = `
          <img src="anonymous.png" alt="Anonymous">
          <span>${gossipContent}</span>
          <p><em>Anonymous</em></p>
        `;
        document.getElementById('gossip-posts').appendChild(gossipPost);

        document.getElementById('gossip-content').value = '';

        showPopup(); // Call notification
      }
    });
  }
});

// Function to show notification popup
function showPopup() {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = 'New Gossip Posted! XOXO 💋';

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000); // Remove after 3 seconds
}
