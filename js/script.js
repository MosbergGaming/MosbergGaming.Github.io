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

// Responsive navigation toggle (for future use)
// Uncomment and modify the following code if you add a navigation menu
/*
const navToggle = document.querySelector('.nav-toggle'); // Assuming you have a button for toggling navigation
const navMenu = document.querySelector('.nav-menu'); // Assuming you have a navigation menu

if (navToggle && navMenu) {
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active'); // Toggle the active class to show/hide the menu
  });
}
*/
