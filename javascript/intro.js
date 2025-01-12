// Cache DOM elements
const welcomeText = document.getElementById("welcome-text");
const enterButton = document.getElementById("enter-button");
const welcomeLetters = welcomeText.querySelectorAll(".letter");
const enterLetters = enterButton.querySelectorAll(".letter");
const wrapper = document.querySelector(".wrapper");

// Function to animate letters with better performance
function animateLetters(letters) {
  letters.forEach((letter) => {
    const delay = parseFloat(letter.style.getPropertyValue("--delay")) * 1000;
    setTimeout(() => {
      const flickerClass =
        letter.dataset.flicker === "slow" ? "flicker-slow" : "flicker-fast";
      letter.classList.add(flickerClass);
    }, delay);
  });

  // Return the total animation time
  const delays = Array.from(letters).map((letter) =>
    parseFloat(letter.style.getPropertyValue("--delay"))
  );
  return Math.max(...delays) * 1000 + 2000; // Add 2s buffer for more visibility
}

// Initialize animations
function initializeAnimations() {
  // First show the wrapper with background
  setTimeout(() => {
    wrapper.style.opacity = "1";
    wrapper.style.transform = "translateY(0)";

    // After wrapper is visible, start welcome text animation with longer delay
    setTimeout(() => {
      welcomeText.style.visibility = "visible";
      const welcomeDuration = animateLetters(welcomeLetters);

      // After welcome text finishes, show button and animate its letters
      setTimeout(() => {
        enterButton.style.visibility = "visible";
        enterButton.style.opacity = "1";
        enterButton.style.transform = "scale(1)";

        // Animate enter text
        animateLetters(enterLetters);
      }, welcomeDuration + 500); // Added 500ms extra delay before button appears
    }, 1500); // Increased delay before welcome text starts
  }, 800); // Increased initial delay
}

// Smooth transition to main page
async function goToLandingPage() {
  // Disable button to prevent multiple clicks
  enterButton.disabled = true;

  // Remove glows
  welcomeText.classList.add("no-glow");
  enterButton.classList.add("no-glow");

  // Start fade out animation
  wrapper.classList.add("fade-out");

  // Wait for animation to complete
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Store animation completion in session storage
  sessionStorage.setItem("introComplete", "true");

  // Redirect to main page
  window.location.href = "./main.html";
}

// Check for intro completion and initialize
if (sessionStorage.getItem("introComplete")) {
  window.location.href = "./main.html";
} else {
  // Start animations when DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAnimations);
  } else {
    initializeAnimations();
  }
}
