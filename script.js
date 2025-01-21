// Shayari Data File Path
const shayariFile = "shayri.txt";

// Login Setup
const adminName = "𝙈𝙨𝙧_𝙨𝙝𝙪𝙗𝙝𝙖𝙢.𝙠"; // Your hardcoded name

// Load Shayari from File
fetch(shayariFile)
  .then((response) => response.text())
  .then((data) => {
    const shayaris = data.split("\n\n"); // Separate by double newline for shayaris
    const container = document.getElementById("shayari-container");

    shayaris.forEach((shayari, index) => {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      bubble.innerHTML = `
        <div class="admin-name">${adminName} 
          <img src="https://files.catbox.moe/h37g94.png" alt="Verified Badge" class="verified-badge">
        </div>
        <div class="shayari-text">${shayari}</div>
        <div class="actions">
          <button class="action-btn comments-btn" onclick="openCommentsPage(${index}, '${encodeURIComponent(
            shayari
          )}')">Comments</button>
          <button class="action-btn share-btn" onclick="shareShayari('${encodeURIComponent(
            shayari
          )}')">Share</button>
        </div>
      `;
      container.appendChild(bubble);
    });
  });

// Open Comments Page
function openCommentsPage(index, shayari) {
  const commentsPageURL = `comments.html?shayari=${shayari}&id=${index}`;
  window.open(commentsPageURL, "_blank");
}

// Share Shayari to WhatsApp
function shareShayari(shayari) {
  const url = `https://wa.me/?text=${shayari}`;
  window.open(url, "_blank");
}

// Get shayari from URL
const urlParams = new URLSearchParams(window.location.search);
const shayari = decodeURIComponent(urlParams.get("shayari") || "");
const shayariDisplay = document.getElementById("shayari-display");
if (shayariDisplay) shayariDisplay.textContent = `Shayari: ${shayari}`;

const commentsSection = document.getElementById("comments-section");

// Load fake comments from comments.txt
function loadFakeComments() {
  fetch("comments.txt")
    .then((response) => response.text())
    .then((data) => {
      const fakeComments = data.split("\n").filter((comment) => comment.trim() !== "");
      fakeComments.forEach((comment) => {
        addCommentToUI(comment);
      });
    });
}

// Add comment to UI
function addCommentToUI(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  commentDiv.textContent = comment;
  if (commentsSection) commentsSection.appendChild(commentDiv);
}

// Add user comment
function addComment() {
  const commentInput = document.getElementById("comment-input");
  const userComment = commentInput.value.trim();

  if (userComment) {
    addCommentToUI(userComment); // Add to UI
    commentInput.value = ""; // Clear input
  } else {
    alert("Please write a comment!");
  }
}

// Load fake comments on page load
if (commentsSection) loadFakeComments();
function searchShayari() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const shayaris = document.querySelectorAll(".bubble");

  shayaris.forEach((bubble) => {
    const text = bubble.querySelector(".shayari-text").innerText.toLowerCase();
    bubble.style.display = text.includes(query) ? "block" : "none";
  });
}function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Function to share the website link on WhatsApp
function shareWebsite() {
  const websiteUrl = window.location.href;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    'Check out this amazing website: ' + websiteUrl
  )}`;
  window.open(whatsappUrl, '_blank');
}
