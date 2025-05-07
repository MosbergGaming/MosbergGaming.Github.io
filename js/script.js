// script.js

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor click behavior
    // Smoothly scroll to the target section
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Function to display a welcome message when the button is clicked
const welcomeButton = document.querySelector(".button");
if (welcomeButton) {
  welcomeButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Create or show a welcome message inline instead of alert
    let welcomeMessage = document.getElementById("welcome-message");
    if (!welcomeMessage) {
      welcomeMessage = document.createElement("div");
      welcomeMessage.id = "welcome-message";
      welcomeMessage.style.position = "fixed";
      welcomeMessage.style.top = "1rem";
      welcomeMessage.style.right = "1rem";
      welcomeMessage.style.backgroundColor = "#007bff";
      welcomeMessage.style.color = "#fff";
      welcomeMessage.style.padding = "1rem 1.5rem";
      welcomeMessage.style.borderRadius = "0.3rem";
      welcomeMessage.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
      welcomeMessage.style.zIndex = "1000";
      welcomeMessage.style.fontWeight = "600";
      welcomeMessage.textContent = "Welcome to MosbergGaming! Enjoy your stay!";
      document.body.appendChild(welcomeMessage);
      setTimeout(() => {
        welcomeMessage.remove();
      }, 4000);
    }
  });
}

// Responsive navigation toggle
const navToggle = document.createElement("button");
navToggle.className = "nav-toggle";
navToggle.setAttribute("aria-label", "Toggle navigation menu");
navToggle.textContent = "☰";
const navMenu = document.querySelector("header nav ul.nav-menu");
if (navMenu) {
  document.querySelector("header nav").prepend(navToggle);
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    const expanded =
      navToggle.getAttribute("aria-expanded") === "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);
  });
}

// Blog read more toggle
document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const fullText = button.nextElementSibling;
    if (fullText.style.display === "none" || fullText.style.display === "") {
      fullText.style.display = "block";
      button.textContent = "Read Less";
    } else {
      fullText.style.display = "none";
      button.textContent = "Read More";
    }
  });
});

// Comment form validation and dynamic display
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

function loadComments() {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsList.innerHTML = "";
  savedComments.forEach(({ username, comment }) => {
    addCommentToDOM(username, comment);
  });
}

function addCommentToDOM(username, comment) {
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  const userSpan = document.createElement("span");
  userSpan.className = "comment-username";
  userSpan.textContent = username;
  const commentP = document.createElement("p");
  commentP.className = "comment-text";
  commentP.textContent = comment;
  commentDiv.appendChild(userSpan);
  commentDiv.appendChild(commentP);
  commentsList.appendChild(commentDiv);
}

if (commentForm) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = commentForm.username.value.trim();
    const comment = commentForm.comment.value.trim();
    if (username && comment) {
      addCommentToDOM(username, comment);
      saveComment(username, comment);
      commentForm.reset();
    } else {
      alert("Please fill in both name and comment.");
    }
  });
}

function saveComment(username, comment) {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.push({ username, comment });
  localStorage.setItem("comments", JSON.stringify(savedComments));
}

// Load comments on page load
loadComments();

// Interactive spreadsheet sorting
const spreadsheetTable = document.querySelector(".spreadsheet-table");
if (spreadsheetTable) {
  const headers = spreadsheetTable.querySelectorAll("th");
  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      sortTableByColumn(spreadsheetTable, index);
    });
  });
}

function sortTableByColumn(table, columnIndex) {
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const isNumeric = !isNaN(rows[0].cells[columnIndex].textContent.trim());
  const sortedRows = rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();
    return isNumeric
      ? Number(aText) - Number(bText)
      : aText.localeCompare(bText);
  });
  // Toggle sort direction
  if (
    table.dataset.sortColumn == columnIndex &&
    table.dataset.sortDirection == "asc"
  ) {
    sortedRows.reverse();
    table.dataset.sortDirection = "desc";
  } else {
    table.dataset.sortDirection = "asc";
  }
  table.dataset.sortColumn = columnIndex;
  // Append sorted rows
  sortedRows.forEach((row) => tbody.appendChild(row));
}
