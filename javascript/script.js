/*----- Smooth scrolling for navigation links -----*/
/* console.log("Script started"); */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/*----- Contact form handling -----*/

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    /*----- Add your form submission logic here -----*/

    const formData = new FormData(this);
    console.log("Form submitted:", Object.fromEntries(formData));
    /*----- You can add an AJAX request here to handle the form submission -----*/
  });
}

/*----- project Animation for my project cards -----*/

/*----- Slide Out Old Cards -----*/

const cardGrid = document.getElementById("card-grid");
const loadNewCardsButton = document.getElementById("load-new-cards");
const projectsSection = document.getElementById("projects");

const observerOptions = {
  threshold: 0.1,
};

const combinedObserver = new IntersectionObserver((entries) => {
  /* console.log("Intersection observer triggered for: about"); */
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "projects") {
        // Logic for loading project cards when the projects section is visible
        loadInitialCards();

        combinedObserver.unobserve(projectsSection); // Load cards only once
      }
      // Logic for adding the "visible" class to sections
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  combinedObserver.observe(section);
});

let currentCardIndex = 0;
const cardsPerPage = 4;
const allCardData = [
  {
    title: "World of Anime",
    description:
      "This project is an anime-themed website that allows users to browse and discover new series or revisit old favorites",
    image: "/img/Anime-project.webp",
    githubLink: "https://github.com/Sweodin/Anime-Api.git",
  },
  {
    title: "Virtual pet game",
    description:
      "This project is a web-based virtual pet game where users can interact with and care for a virtual pet, with its status updating in real-time using React's useState and useEffect hooks.",
    image: "/img/Virtual-pet-game.png",
    githubLink: "https://github.com/Sweodin/Virtual-Pet-Game.git",
  },
  {
    title: "Code portfolio Generator",
    description:
      "A dynamic portfolio generator built with JavaScript that allows developers to create and customize their online portfolios from GitHub repositories with custom themes.",
    image: "img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "System Monitor Dashboard",
    description:
      "Real-time system monitoring dashboard built with React, displaying key metrics like CPU usage, memory usage, and network usage with interactive charts and alerts.",
    image: "/img/Motherboard.jpg",
    githubLink: "#",
  },
  {
    title: "E-commerce Product Page",
    description:
      "A responsive e-commerce product page showcasing product details, images, and purchasing options with a clean and user-friendly design.",
    image: "img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description:
      "A simple task management application allowing users to create, organize, and track their tasks with features like due dates and priority levels.",
    image: "/img/Anime-project.webp",
    githubLink: "#",
  },
  {
    title: "Weather Application",
    description:
      "A web application that fetches and displays current weather information for a specified location using a weather API.",
    image: "/img/Virtual-pet-game.png",
    githubLink: "#",
  },
  {
    title: "Recipe Finder App",
    description:
      "An application that allows users to search for recipes based on ingredients or dietary restrictions, utilizing a recipe database or API.",
    image: "img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "Personal Blog Website",
    description:
      "A personal blog website built with a focus on clean design and readability, allowing the author to share their thoughts and ideas through articles and posts.",
    image: "/img/Virtual-pet-game.png",
    githubLink: "#",
  },
  {
    title: "Interactive Data Visualization",
    description:
      "A project focused on visualizing data using libraries like D3.js or Chart.js to create interactive and informative charts and graphs.",
    image: "/img/Anime-project.webp",
    githubLink: "#",
  },
];

function generateNewCardData() {
  const startIndex = currentCardIndex;
  const endIndex = startIndex + cardsPerPage;
  return allCardData.slice(startIndex, endIndex);
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("project-card");
  card.innerHTML = `
          <div class="project-card-inner">
              <div class="project-card-front">
                  <div class="project-image">
                      <img src="${cardData.image}" alt="${cardData.title}">
                  </div>
                  <div class="project-content">
                  <div class="flip-prompt"></div>
                      <h3>${cardData.title}</h3>
                      
                  </div>
              </div>
              <div class="project-card-back">
                  <h3>${cardData.title}</h3>
                  <div class="project-description">
                      <p>${cardData.description}</p>
                  </div>
                  <a href="${cardData.githubLink}" class="github-link" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
              </div>
          </div>
      `;
  return card;
}

function loadInitialCards() {
  const initialCards = generateNewCardData();
  initialCards.forEach((cardData, index) => {
    const card = createCard(cardData);
    card.classList.add(index % 2 === 0 ? "slide-in-right" : "slide-in-left");
    cardGrid.appendChild(card);
  });
  currentCardIndex += cardsPerPage;
}

loadNewCardsButton.addEventListener("click", () => {
  // 1. Slide Out Old Cards
  const currentCards = Array.from(cardGrid.children);
  currentCards.forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? "slide-out-left" : "slide-out-right");
    setTimeout(() => {
      card.remove();
    }, 900);
  });

  // 2. Wait and then Add New Cards
  setTimeout(() => {
    const newCardData = generateNewCardData();
    console.log("New Card Data:", newCardData);
    console.log("cardGrid element:", cardGrid);

    newCardData.forEach((data, index) => {
      console.log("Creating card with data:", data);
      const newCard = createCard(data);
      newCard.classList.add(
        index % 2 === 0 ? "slide-in-right" : "slide-in-left"
      );
      cardGrid.appendChild(newCard);
    });

    currentCardIndex += cardsPerPage; // Increment for the next load
    console.log("Current card index updated to:", currentCardIndex);
  }, 900);
});

/*----- Blog card flip effect -----*/

document.querySelectorAll(".blog-card").forEach((card) => {
  card.addEventListener("click", function () {
    const cardInner = this.querySelector(".card-inner");
    cardInner.classList.toggle("is-flipped");
  });
});

/*----- Set up skill proficiency bars -----*/

document.querySelectorAll(".skill-item").forEach((item) => {
  const proficiency = item.getAttribute("data-proficiency");
  const bar = item.querySelector(".proficiency-bar");
  if (bar) {
    bar.style.setProperty("--proficiency", proficiency);
  }
});

function playVideo(videoUrl) {
  /*----- Create modal container -----*/

  const modal = document.createElement("div");
  modal.className = "video-modal";

  /*----- Create video element -----*/

  const video = document.createElement("video");
  video.src = videoUrl;
  video.controls = true;
  video.autoplay = true;

  /*----- Create close button -----*/

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "×";
  closeBtn.onclick = function () {
    document.body.removeChild(modal);
  };

  /*----- Add elements to modal -----*/

  modal.appendChild(closeBtn);
  modal.appendChild(video);

  /*----- Add modal to body -----*/

  document.body.appendChild(modal);

  /*----- Close modal when clicking outside video -----*/

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}
