const storyId = "gossip-posts"; // You can make this dynamic for each post

const postRef = doc(db, "posts", storyId);

// Initialize post if it doesn’t exist
getDoc(postRef).then((docSnap) => {
  if (!docSnap.exists()) {
    setDoc(postRef, { likes: 0 });
  }
});

// Live update likes
onSnapshot(postRef, (docSnap) => {
  document.querySelector('.like-count').textContent = docSnap.data().likes;
});

// Like button
document.querySelector('.like-btn').addEventListener('click', () => {
  updateDoc(postRef, { likes: increment(1) });
});

// Comment logic
const commentsCol = collection(db, "posts", storyId, "comments");

document.querySelector('.comment-btn').addEventListener('click', async () => {
  const input = document.querySelector('.comment-input');
  const text = input.value.trim();
  if (text) {
    await addDoc(commentsCol, {
      text: text,
      created: new Date()
    });
    input.value = "";
  }
});

// Show comments live
onSnapshot(commentsCol, (snapshot) => {
  const commentsDiv = document.querySelector('.comments-list');
  commentsDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const c = doc.data();
    const div = document.createElement('div');
    div.textContent = c.text;
    commentsDiv.appendChild(div);
  });
});
<script type="module"
src="likescomments.js"></script>