// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase config here 👇
 const firebaseConfig = {
    apiKey: "AIzaSyAcgrGvWtjVrDa5aNbeRDlrt3plZM1hSvE",
    authDomain: "gossip-girl-45241.firebaseapp.com",
    projectId: "gossip-girl-45241",
    storageBucket: "gossip-girl-45241.firebasestorage.app",
    messagingSenderId: "1088508330152",
    appId: "1:1088508330152:web:1916e93660d824628e029d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get DOM elements
const messagesDiv = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

// Anonymous nickname logic
const nicknames = ["Outsider", "TeaDropper", "MaskedBabe", "SneakyOne", "SpicySpill", "Anonymous"];
const username = sessionStorage.getItem("chatNick") || (() => {
  const name = nicknames[Math.floor(Math.random() * nicknames.length)] + Math.floor(Math.random() * 1000);
  sessionStorage.setItem("chatNick", name);
  return name;
})();

// Send message
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  await addDoc(collection(db, "messages"), {
    user: username,
    text: text,
    created: serverTimestamp()
  });

  chatInput.value = "";
});

// Display messages
const q = query(collection(db, "messages"), orderBy("created", "desc"));
onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach((doc) => {
    const msg = doc.data();
    const time = msg.created?.toDate?.().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "⏳";
    const div = document.createElement("div");
    div.classList.add("msg");
    div.innerHTML = `<strong>${msg.user}</strong>: ${msg.text}<br><small>${time}</small>`;
    messagesDiv.appendChild(div);
  });
});
