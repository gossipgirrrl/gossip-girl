// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAcgrGvWtjVrDa5aNbeRDlrt3plZM1hSvE",
  authDomain: "gossip-girl-45241.firebaseapp.com",
  projectId: "gossip-girl-45241",
  storageBucket: "gossip-girl-45241.appspot.com",
  messagingSenderId: "1088508330152",
  appId: "1:1088508330152:web:1916e93660d824628e029d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const messagesDiv = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

let username = "Anonymous"; // default in case user not found

// Check if user is logged in and get saved username from Firestore
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      username = userDocSnap.data().username || "Anonymous";
    } else {
      console.error("No username found for user.");
    }

    setupChat(); // Once username is loaded, initialize chat listeners
  } else {
    alert("You must be logged in to access the chat.");
    window.location.href = "login.html";
  }
});

function setupChat() {
  // Send message
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    try {
      await addDoc(collection(db, "messages"), {
        user: username,
        text: text,
        created: serverTimestamp()
      });
      chatInput.value = "";
    } catch (err) {
      console.error("Message not sent:", err);
    }
  });

  // Display messages
  const q = query(collection(db, "messages"), orderBy("created", "asc"));
  onSnapshot(q, (snapshot) => {
    let html = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const time = msg.created?.toDate?.().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }) || "⏳";
      html += `
        <div class="msg">
          <strong>${msg.user}</strong>: ${msg.text}
          <br><small>${time}</small>
        </div>`;
    });
    messagesDiv.innerHTML = html;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}
