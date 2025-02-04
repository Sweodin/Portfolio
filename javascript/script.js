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

/*----- Menu Functionality -----*/
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

// Toggle menu
if (menuIcon && navbar) {
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle("active");
    navbar.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      menuIcon.classList.remove("active");
      navbar.classList.remove("active");
    }
  });

  // Close menu when clicking a nav link
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("active");
      navbar.classList.remove("active");
    });
  });

  // Close menu when scrolling
  window.addEventListener("scroll", () => {
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
  });
}

/*----- Add active class to current section in navbar -----*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

/*----- Contact Form Handling -----*/
const contactForm = document.getElementById("contact-form");
const formResult = document.getElementById("form-result");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading state
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
        credentials: "same-origin",
        body: json,
      });

      if (response.status === 429) {
        formResult.classList.add("error");
        formResult.innerHTML =
          "Too many attempts. Please try again in a few minutes.";
        return;
      }

      const data = await response.json();

      if (response.status === 200) {
        formResult.classList.remove("error");
        formResult.classList.add("success");
        formResult.innerHTML = "Message sent successfully!";
        contactForm.reset();
      } else {
        formResult.classList.add("error");
        formResult.innerHTML =
          data.message || "Something went wrong. Please try again.";
      }
    } catch (error) {
      console.error("Error:", error);
      formResult.classList.add("error");
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        formResult.innerHTML =
          "Network error. Please check your connection and try again.";
      } else {
        formResult.innerHTML =
          "Failed to send message. Please try again later.";
      }
    } finally {
      // Restore button state
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;

      // Hide message after 5 seconds
      setTimeout(() => {
        formResult.innerHTML = "";
      }, 5000);
    }
  });
}

/*----- Project Card Generation -----*/
// Project data
const projectsData = [
  {
    title: "Portfolio Website",
    description: "Dive into my personal portfolio website.",
    longDescription:
      "A dynamic showcase of my skills built with HTML, SCSS, and JavaScript. Experience a nostalgic journey through a Sonic the Hedgehog-inspired theme, bringing a touch of retro gaming flair to my web development work.",
    image: "./img/Projects/Minport.png",
    tech: ["HTML", "SCSS", "JavaScript"],
    githubLink: "https://github.com/Sweodin/Portfolio",
    liveLink: "https://sweodin.github.io/Portfolio/",
    category: "frontend",
  },
  {
    title: "Anime Search App",
    description: "Explore the vast world of Anime.",
    longDescription:
      "With my Anime Search App. This application leverages the Jikan API to provide a seamless experience for discovering new and favorite anime titles, all within a sleek and contemporary user interface.",
    image: "./img/Projects/Animeproject.jpg",
    tech: ["React", "API", "CSS"],
    githubLink: "https://github.com/Sweodin/Anime-Api",
    liveLink: "https://imaginative-lamington-46988f.netlify.app/",
    category: "web",
  },
  {
    title: "Virtual Pet Game",
    description:
      "An interactive virtual pet game with animations and game mechanics.",
    longDescription:
      "Engage with a charming digital companion in my Virtual Pet Game. This project brings a virtual pet to life with captivating animations and engaging game mechanics, offering an interactive and entertaining experience.",
    image: "./img/Projects/Virtual-pet-game.png",
    tech: ["JavaScript", "Canvas", "CSS"],
    githubLink: "https://github.com/Sweodin/Pet-game",
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
    id: 1,
    title: "✨ Turning Challenges into Opportunities ✨",
    image: "./img/Blogposts/Moving-forward.jpg",
    frontText: "My Journey into Web Development,",
    backText: `Starting something new is never easy, but sometimes life pushes you in just the right direction.
       For me, it all began when I moved back to Helsingborg with my family, determined to give us a fresh start and build a brighter future.
       This wasn't just about a new home — it was about a new beginning for me, my career, and our family.`,
  },
  {
    id: 2,
    title: "✨ The new Keyboard ✨",
    image: "./img/Blogposts/Keyboard.jpg",
    frontText:
      "After a long time I have finally found the perfect keyboard for me.",
    backText: `Finally upgraded my keyboard after the last one gave up—loving the new Asus ROG 75%! It’s been great for coding,
              especially as I dive deeper into HTML, Sass, and React.
              Things are going well on the coding front, and I’m excited
              about the progress on our game project—soon moving into the
              backend, which I’m really looking forward to. Lots of fun
              challenges ahead!`,
  },
  {
    id: 3,
    title: "✨ Another Step Forward: Weekend Hustle ✨",
    image: "./img/Blogposts/TLT.jpg",
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
  },
  {
    id: 4,
    title: "✨Sunday vibes, Monday mindset!✨",
    image: "./img/Blogposts/Monday.jpg",
    frontText:
      "A new week begins tomorrow, and it’s the perfect time to refocus and recharge.",
    backText: `Let’s step into the week with purpose, positivity, and a
              commitment to doing our best work.
              Make this week yours—stay productive, stay determined, and
              keep moving toward your goals. Small steps add up to big
              wins, so let’s keep pushing forward!
              Here’s to a productive and fulfilling week ahead. Let’s make
              it count, people!`,
  },
  {
    id: 5,
    title: "🌟 Another week wrapped up! 🌟",
    image: "./img/Blogposts/Minport.png",
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
  },
  {
    id: 6,
    title: "✨Exciting Progress on My React Project!✨",
    image: "./img/Blogposts/Anime-vid.png",
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
  },
  {
    id: 7,
    title: "🌟 Another week wrapped up! 🌟",
    image: "./img/Blogposts/Minport.png",
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
  },

  {
    id: 8,
    title: "Another Blog Post Example 3",
    image: "./img/Blogposts/Virtual-pet-game.png",
    frontText: "Quick update on something interesting.",
    backText:
      "More information and context about the interesting update. Hope you find it useful!",
  },
  {
    id: 9,
    title: "Another Blog Post Example 4",
    image: "./img/Blogposts/Anime-project.webp",
    frontText: "Thinking about future projects and ideas.",
    backText:
      "Some brainstorming and thoughts on what I might work on next. Stay tuned!",
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
  card.setAttribute("data-post-id", blogData.id);

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  /*----- Truncate text if it's too long -----*/
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
      </div>
      <div class="button-container">
        <a href="./blog/blog.html?post=${blogData.id}" class="read-full-post">Read Full Post</a>
        <span class="read-more">Click to flip back</span>
      </div>
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

const form = document.getElementById("contact-form");
const result = document.getElementById("form-result");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Sending message...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      credentials: "same-origin",
      body: json,
    });

    if (response.status === 429) {
      result.classList.add("error");
      result.innerHTML =
        "Too many attempts. Please try again in a few minutes.";
      return;
    }

    const data = await response.json();

    if (response.status === 200) {
      result.classList.remove("error");
      result.classList.add("success");
      result.innerHTML = "Message sent successfully!";
      form.reset();
    } else {
      result.classList.add("error");
      result.innerHTML =
        data.message || "Something went wrong. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    result.classList.add("error");
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      result.innerHTML =
        "Network error. Please check your connection and try again.";
    } else {
      result.innerHTML = "Failed to send message. Please try again later.";
    }
  }
});
