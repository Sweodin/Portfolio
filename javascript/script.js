/* document.addEventListener("DOMContentLoaded", funcion (){
  const sections = document.querySelectorAll("section");
  const body = document.body;

  function changeBackgroundColor() {
    let scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionColor = window.getComputedStyle(section).backgroundColor;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        body.style.backgroundColor = sectionColor;
      }
    });
  }

  window.addEventListener("scroll", changeBackgroundColor);
}); */

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

/*----- Project Card Generation -----*/
// Project data
const projectsData = [
  {
    title: "Portfolio Website",
    description: "Dive into my personal portfolio website.",
    longDescription:
      "A dynamic showcase of my skills built with HTML, SCSS, and JavaScript. Experience a nostalgic journey through a Sonic the Hedgehog-inspired theme, bringing a touch of retro gaming flair to my web development work.",
    image: "./img/Minport.png",
    tech: ["HTML", "SCSS", "JavaScript"],
    githubLink: "#",
    liveLink: "#",
    category: "frontend",
  },
  {
    title: "Anime Search App",
    description: "Explore the vast world of Anime.",
    longDescription:
      "With my Anime Search App. This application leverages the Jikan API to provide a seamless experience for discovering new and favorite anime titles, all within a sleek and contemporary user interface.",
    image: "./img/Animeproject.jpg",
    tech: ["React", "API", "CSS"],
    githubLink: "#",
    liveLink: "#",
    category: "web",
  },
  {
    title: "Virtual Pet Game",
    description:
      "An interactive virtual pet game with animations and game mechanics.",
    longDescription:
      "Engage with a charming digital companion in my Virtual Pet Game. This project brings a virtual pet to life with captivating animations and engaging game mechanics, offering an interactive and entertaining experience.",
    image: "./img/Virtual-pet-game.png",
    tech: ["JavaScript", "Canvas", "CSS"],
    githubLink: "#",
    liveLink: "#",
    category: "frontend",
  },
];

// Create and append project cards
function createProjectCards(projects = projectsData) {
  const projectsGrid = document.querySelector(".projects-grid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card" data-category="${project.category}">
      <div class="card-inner">
        <div class="card-front">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="flip-prompt">Click to read more</span>
          </div>
        </div>
        <div class="card-back">
          <div class="back-content">
            <h3>${project.title}</h3>
            <p>${project.longDescription}</p>
            <div class="tech-stack">
              ${project.tech
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join("")}
            </div>
            <div class="project-links">
              <a href="${
                project.liveLink
              }" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
              <a href="${
                project.githubLink
              }" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> View Code
              </a>
            </div>
          </div>
          <span class="read-more">Click to flip back</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Add flip functionality
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const cardInner = card.querySelector(".card-inner");
    const flipPrompt = card.querySelector(".flip-prompt");
    const readMore = card.querySelector(".read-more");

    flipPrompt.addEventListener("click", () => {
      cardInner.style.transform = "rotateY(180deg)";
    });

    readMore.addEventListener("click", () => {
      cardInner.style.transform = "rotateY(0deg)";
    });
  });
}

// Filter functionality
function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter projects
      const filter = btn.dataset.filter;
      const filteredProjects =
        filter === "all"
          ? projectsData
          : projectsData.filter((project) => project.category === filter);

      createProjectCards(filteredProjects);
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createProjectCards();
  initializeFilters();
});

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
      "Currently working on a React project, an anime search with an API.",
    backText: `Here's a quick peek into my progress so far (see video)!
              This project has been a great learning experience in: API
              Integration React Development Combining creativity and
              functionality.
              Still a work in progress, but I’m proud of how far I’ve
              come! Today feels like a good day, reflecting on this
              journey.
              Feel free to share your thoughts or tips—always open to
              learning!s
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
const blogsPerPage = 3;

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

  // Truncate text if it's too long
  const frontText =
    blogData.frontText.length > 100
      ? blogData.frontText.substring(0, 100) + "..."
      : blogData.frontText;

  const backText =
    blogData.backText.length > 200
      ? blogData.backText.substring(0, 250) + "..."
      : blogData.backText;

  cardInner.innerHTML = `
    <div class="card-front">
      <div class="blog-image">
        <img src="${blogData.image}" alt="${blogData.title}">
      </div>
      <div class="blog-content">
        <h3>${blogData.title}</h3>
        <p>${frontText}</p>
        <span class="flip-prompt">Click to read more</span>
      </div>
    </div>
    <div class="card-back">
      <div class="back-content">
        <h3>${blogData.title}</h3>
        <p>${backText}</p>
        <a href="${blogData.link}" class="read-full-post">Read Full Post</a>
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
