/*----- Event listener for the logo -----*/

const logoLink = document.querySelector(".logo");
if (logoLink) {
  logoLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*----- Event listener for other internal links -----*/

document.querySelectorAll('a[href^="#"]:not(.logo)').forEach((anchor) => {
  /*----- Exclude the logo -----*/
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.error(
        `Target element with selector "${this.getAttribute("href")}" not found.`
      );
    }
  });
});

/*----- Toggle menu for the navbar -----*/

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuIcon.classList.toggle("active");
});

/*----- Close menu when clicking outside -----*/
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
  }
});

/*----- Close menu when clicking a nav link -----*/
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
  });
});

/*----- Contact Form Handling -----*/
if (document.querySelector(".contact-section")) {
  // Contact section interactions can be added here if needed
}

/*----- project Animation for my project cards -----*/

/*----- Slide Out Old Cards -----*/

const observerOptions = {
  threshold: 0.1,
};

const combinedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "projects") {
        /*----- Logic for loading project cards when the projects section is visible -----*/
        setTimeout(() => {
          loadInitialCards();
          combinedObserver.unobserve(
            entry.target
          ); /*----- Load cards only once -----*/
        }, 500);
        /*----- Logic for adding the "visible" class to sections -----*/
        entry.target.classList.add("visible");
      }
    }
  }, observerOptions);
});

/*----- Here i handle my project cards -----*/

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
    image: "./img/Anime-project.webp",
    githubLink: "https://github.com/Sweodin/Anime-Api.git",
  },
  {
    title: "Virtual pet game",
    description:
      "This project is a web-based virtual pet game where users can interact with and care for a virtual pet, with its status updating in real-time using React's useState and useEffect hooks.",
    image: "./img/Virtual-pet-game.png",
    githubLink: "https://github.com/Sweodin/Virtual-Pet-Game.git",
  },
  {
    title: "Code portfolio Generator",
    description:
      "A dynamic portfolio generator built with JavaScript that allows developers to create and customize their online portfolios from GitHub repositories with custom themes.",
    image: "./img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "System Monitor Dashboard",
    description:
      "Real-time system monitoring dashboard built with React, displaying key metrics like CPU usage, memory usage, and network usage with interactive charts and alerts.",
    image: "./img/Motherboard.jpg",
    githubLink: "#",
  },
  {
    title: "E-commerce Product Page",
    description:
      "A responsive e-commerce product page showcasing product details, images, and purchasing options with a clean and user-friendly design.",
    image: "./img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "Task Management App",
    description:
      "A simple task management application allowing users to create, organize, and track their tasks with features like due dates and priority levels.",
    image: "./img/Anime-project.webp",
    githubLink: "#",
  },
  {
    title: "Weather Application",
    description:
      "A web application that fetches and displays current weather information for a specified location using a weather API.",
    image: "./img/Virtual-pet-game.png",
    githubLink: "#",
  },
  {
    title: "Recipe Finder App",
    description:
      "An application that allows users to search for recipes based on ingredients or dietary restrictions, utilizing a recipe database or API.",
    image: "./img/Coding.jpg",
    githubLink: "#",
  },
  {
    title: "Personal Blog Website",
    description:
      "A personal blog website built with a focus on clean design and readability, allowing the author to share their thoughts and ideas through articles and posts.",
    image: "./img/Virtual-pet-game.png",
    githubLink: "#",
  },
  {
    title: "Interactive Data Visualization",
    description:
      "A project focused on visualizing data using libraries like D3.js or Chart.js to create interactive and informative charts and graphs.",
    image: "./img/Anime-project.webp",
    githubLink: "#",
  },
];

const cardGrid = document.querySelector("#card-grid");
const loadNewCardsButton = document.querySelector("#load-new-cards");
let visibleCards = 0;
const cardsPerLoad = window.innerWidth <= 768 ? 2 : 3; // Show fewer cards on mobile

/*----- Here i can handle styling for the cards -----*/

function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "project-card";

  const cardInner = document.createElement("div");
  cardInner.className = "project-card-inner";

  cardInner.innerHTML = `
    <div class="project-card-front">
      <div class="project-image">
        <img src="${cardData.image}" alt="${cardData.title}">
      </div>
      <h3>${cardData.title}</h3>
      <p class="flip-prompt">Click to see more</p>
    </div>
    <div class="project-card-back">
      <h3>${cardData.title}</h3>
      <p>${cardData.description}</p>
      <a href="${cardData.link}" class="github-link" target="_blank">View on GitHub</a>
    </div>
  `;

  card.appendChild(cardInner);

  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  card.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  card.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 50) {
      // Minimum swipe distance
      cardInner.style.transform =
        diffX > 0 ? "rotateY(180deg)" : "rotateY(0deg)";
    }
  }

  // Add click handler for flipping
  const flipPrompt = cardInner.querySelector(".flip-prompt");
  const githubLink = cardInner.querySelector(".github-link");

  flipPrompt.addEventListener("click", () => {
    cardInner.style.transform = "rotateY(180deg)";
  });

  githubLink.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return card;
}

function loadInitialCards() {
  visibleCards = 0;
  cardGrid.innerHTML = "";
  for (let i = 0; i < cardsPerLoad; i++) {
    const card = createCard(allCardData[i]);
    cardGrid.appendChild(card);
    // Delay each card's appearance
    setTimeout(() => {
      card.classList.add("active");
    }, i * 200);
    visibleCards++;
  }
}

loadNewCardsButton.addEventListener("click", () => {
  const isMobile = window.innerWidth <= 768;

  // Slide out old cards
  const currentCards = Array.from(cardGrid.children);
  currentCards.forEach((card, index) => {
    const direction = index % 2 === 0 ? "Left" : "Right";
    card.style.animation = `slideOut${direction} 0.5s ease forwards`;
  });

  // After animation, load new cards
  setTimeout(() => {
    cardGrid.innerHTML = "";
    const startIndex = visibleCards % allCardData.length;
    const numCardsToLoad = isMobile ? 2 : 3;

    for (let i = 0; i < numCardsToLoad; i++) {
      const cardIndex = (startIndex + i) % allCardData.length;
      const card = createCard(allCardData[cardIndex]);
      cardGrid.appendChild(card);

      setTimeout(() => {
        card.classList.add("active");
      }, i * 200);
    }
    visibleCards += numCardsToLoad;
  }, 500);
});

// Update cards per load on window resize
window.addEventListener("resize", () => {
  const newCardsPerLoad = window.innerWidth <= 768 ? 2 : 3;
  if (newCardsPerLoad !== cardsPerLoad) {
    loadInitialCards();
  }
});

// Initial load
loadInitialCards();

/*----- Here i handle my blog cards -----*/

const blogGrid = document.getElementById("blog-grid");
const loadMoreBlogsButton = document.getElementById("load-more-blogs");

/*----- Array to hold your blog post data -----*/
const blogPostsData = [
  {
    title: "The new Keyboard",
    image: "./img/Keyboard.jpg",
    frontText:
      "After a long time I have finally found the perfect keyboard for me.",
    backText: `Finally upgraded my keyboard after the last one gave up—loving the new Asus ROG 75%! It’s been great for coding,
              especially as I dive deeper into HTML, Sass, and React.
              Things are going well on the coding front, and I’m excited
              about the progress on our game project—soon moving into the
              backend, which I’m really looking forward to. Lots of fun
              challenges ahead!`,
    link: "#",
  },
  {
    title: "✨ Another Step Forward: Weekend Hustle ✨",
    image: "./img/TLT.jpg",
    frontText:
      "The workweek is officially over, but the grind doesn’t stop here! Tomorrow,",
    backText: `I’ll be diving deeper into React and Figma, sharpening my
              skills to build more dynamic projects and elevate my
              designs. Each step brings me closer to launching my
              portfolio, and I couldn’t be more excited to showcase what
              I’ve been working on! 🎯 It’s all about consistency,
              learning, and staying committed to the journey. Here’s to
              turning knowledge into results and making dreams a reality!
              🚀 How are you using your weekend to grow? Let’s inspire
              each other!`,
    link: "#",
  },
  {
    title: "Sunday vibes, Monday mindset!",
    image: "./img/Monday.jpg",
    frontText:
      "A new week begins tomorrow, and it’s the perfect time to refocus and recharge.",
    backText: `Let’s step into the week with purpose, positivity, and a
              commitment to doing our best work.
              Make this week yours—stay productive, stay determined, and
              keep moving toward your goals. Small steps add up to big
              wins, so let’s keep pushing forward!
              Here’s to a productive and fulfilling week ahead. Let’s make
              it count, people!`,
    link: "#",
  },
  {
    title: "Exciting Progress on My React Project!",
    image: "./img/Anime-vid.png",
    frontText:
      "Currently working on a small React project at school, building an anime search site powered by an API.",
    backText: `Here's a quick peek into my progress so far (see video)!
              This project has been a great learning experience in: API
              Integration React Development Combining creativity and
              functionality.
              Still a work in progress, but I’m proud of how far I’ve
              come! Today feels like a good day, reflecting on this
              journey.
              Feel free to share your thoughts or tips—always open to
              learning!
              <a
                href="#"
                class="video-link"
                onclick="playVideo('videos/Anime.mp4'); return false;"
                >Watch Demo Video</a>`,
    link: "#",
  },
  {
    title: "🌟 Another week wrapped up! 🌟",
    image: "./img/Minport.png",
    frontText: "Today is Lucia, but the grind doesn’t stop! 🔥",
    backText: `School is going great, and my portfolio is starting to come together (at least, I hope so 🤞). Here’s a little sneak peek of what I’ve been working on:.
     💻 Anime Project: Building a search site powered by APIs, working hard to make it both functional and fun!
     🎫 Event Tickets with QR Codes:
Tackling backend magic with Node.js, TypeScript, and a database.
The flow is strong, and who knows? Maybe I’ll keep going tonight! For now, I’m just enjoying the process and learning something new every day.
Wishing you all a fantastic weekend ahead! 🎉
Let’s keep the energy up and the ideas flowing! 🚀

<a
                href="#"
                class="video-link"
                onclick="playVideo('videos/Myportfolio.mp4'); return false;"
                >Watch Demo Video</a>`,
    link: "#",
  },
  {
    title: "Another Blog Post Example 2",
    image: "./img/Motherboard.jpg",
    frontText: "Just sharing some thoughts on a new topic.",
    backText:
      "Here are more details and insights about the topic I mentioned in the short preview.",
    link: "#",
  },
  {
    title: "Another Blog Post Example 3",
    image: "./img/Virtual-pet-game.png",
    frontText: "Quick update on something interesting.",
    backText:
      "More information and context about the interesting update. Hope you find it useful!",
    link: "#",
  },
  {
    title: "Another Blog Post Example 4",
    image: "./img/Anime-project.webp",
    frontText: "Thinking about future projects and ideas.",
    backText:
      "Some brainstorming and thoughts on what I might work on next. Stay tuned!",
    link: "#",
  },
];

let currentBlogIndex = 0;
const blogsPerPage = 4;

function generateNewBlogPosts() {
  if (currentBlogIndex >= blogPostsData.length) {
    currentBlogIndex = 0;
  }
  const startIndex = currentBlogIndex;
  const endIndex = startIndex + blogsPerPage;
  return blogPostsData.slice(startIndex, endIndex);
}

function createBlogCard(blogData) {
  const card = document.createElement("div");
  card.className = "blog-card";

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  cardInner.innerHTML = `
    <div class="card-front">
      <div class="blog-image">
        <img src="${blogData.image}" alt="${blogData.title}">
      </div>
      <div class="blog-content">
        <h3>${blogData.title}</h3>
        <p>${blogData.frontText}</p>
        <span class="flip-prompt">Click to read more</span>
      </div>
    </div>
    <div class="card-back">
      <div class="back-content">
        <h3>${blogData.title}</h3>
        <p>${blogData.backText}</p>
      </div>
      <span class="read-more">Click to flip back</span>
    </div>
  `;

  card.appendChild(cardInner);

  // Add click handlers for flipping
  const flipPrompt = cardInner.querySelector(".flip-prompt");
  const readMore = cardInner.querySelector(".read-more");

  flipPrompt.addEventListener("click", () => {
    cardInner.style.transform = "rotateY(180deg)";
  });

  readMore.addEventListener("click", () => {
    cardInner.style.transform = "rotateY(0deg)";
  });

  return card;
}

/*----- loding in more blog posts -----*/

function loadInitialBlogPosts() {
  blogGrid.innerHTML = ""; // Clear existing cards
  const initialPosts = generateNewBlogPosts();
  initialPosts.forEach((post) => {
    const card = createBlogCard(post);
    blogGrid.appendChild(card);
  });
  currentBlogIndex += blogsPerPage;
}

loadMoreBlogsButton.addEventListener("click", () => {
  /*----- Slide Out Old Cards (optional, but looks nice) -----*/
  const currentCards = Array.from(blogGrid.children);
  currentCards.forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? "slide-out-left" : "slide-out-right");
    setTimeout(() => {
      card.remove();
    }, 900);
  });

  /*----- Wait and then Add New Cards -----*/

  setTimeout(() => {
    const newBlogPosts = generateNewBlogPosts();
    newBlogPosts.forEach((post) => {
      const newCard = createBlogCard(post);
      newCard.classList.add(
        currentBlogIndex % 2 === 0 ? "slide-in-right" : "slide-in-left"
      );
      blogGrid.appendChild(newCard);
    });

    currentBlogIndex += blogsPerPage;
  }, 900);
});

/*----- Initial loading of blog posts -----*/

loadInitialBlogPosts();

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
