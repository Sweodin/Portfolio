const welcomeLetters = document.querySelectorAll("#welcome-text .letter");
const enterLetters = document.querySelectorAll("#enter-button .letter");

welcomeLetters.forEach((letter) => {
  const delay = parseFloat(letter.style.animationDelay);
  const flickerClass =
    letter.dataset.flicker === "slow" ? "flicker-slow" : "flicker-fast";

  setTimeout(() => {
    letter.classList.add(flickerClass);
  }, delay * 200);
});

enterLetters.forEach((letter) => {
  const delay = parseFloat(letter.style.animationDelay);
  const flickerClass =
    letter.dataset.flicker === "slow" ? "flicker-slow" : "flicker-fast";

  setTimeout(() => {
    letter.classList.add(flickerClass);
  }, delay * 100);
});

function goToLandingPage() {
  const welcomeText = document.getElementById("welcome-text");
  const enterButton = document.getElementById("enter-button");
  const wrapper = document.querySelector(".wrapper");

  /*----- Turn off the glow -----*/
  welcomeText.classList.add("no-glow");
  enterButton.classList.add("no-glow");

  /*----- Initiate the fade-out effect -----*/
  wrapper.classList.add("fade-out");

  /*----- Redirect to the landing page after the fade-out transition completes -----*/
  setTimeout(() => {
    /*----- Replace 'your-landing-page.html' with the actual URL of your landing page -----*/
    window.location.href = "./main.html";
  }, 900); /*----- Match the duration of your fade-out transition in CSS -----*/
}
