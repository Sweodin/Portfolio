 /*----- Smooth scrolling for navigation links -----*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

 /*----- Intersection Observer for fade-in animations -----*/

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

 /*----- Observe all sections -----*/

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

 /*----- Contact form handling -----*/

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

         /*----- Add your form submission logic here -----*/

        const formData = new FormData(this);
        console.log('Form submitted:', Object.fromEntries(formData));
         /*----- You can add an AJAX request here to handle the form submission -----*/
    });
}

/*----- project Animation for my project cards -----*/

const cardGrid = document.getElementById('card-grid');
const loadNewCardsButton = document.getElementById('load-new-cards');

let currentCardIndex = 0;
const allCardData = [
  {
    title: 'Unleash the World of Anime',
    description:
      'This project is an anime-themed website that allows users to search for their favorite anime using a powerful search API. The site provides detailed information about each anime, including titles, genres, descriptions, and more. Designed with a clean and user-friendly interface, it offers an efficient way for anime enthusiasts to explore and discover new series or revisit old favorites',
    image: '/img/Anime-project.webp',
    githubLink: 'https://github.com/Sweodin/Anime-Api.git',
  },
  {
    title: 'Virtual pet game',
    description:
      'This project is a web-based virtual pet game where players can register, log in, and care for their pet. Key features include a dynamic status page, a store for purchasing items, and mini-games like a math quiz and a trivia game. The game uses local storage for user data, a background music API, and dynamic updates using React\'s useState and useEffect hooks.',
    image: '/img/Virtual-pet-game.png',
    githubLink: 'https://github.com/Sweodin/Virtual-Pet-Game.git',
  },
  {
    title: 'Code portfolio Generator',
    description:
      'A dynamic portfolio generator built with JavaScript and Node.js. Automatically creates beautiful portfolios from GitHub repositories with custom themes.',
    image: 'img/Coding.jpg',
    githubLink: '#',
  },
  {
    title: 'System Monitor Dashboard',
    description:
      'Real-time system monitoring dashboard built with React and Node.js. Tracks CPU, memory, and network usage with interactive charts and alerts.',
    image: '/img/Motherboard.jpg',
    githubLink: '#',
  },
  {
    title: 'Project 5',
    description: 'Description 5',
    image: 'img/Coding.jpg',
    githubLink: '#',
  },
  {
    title: 'Project 6',
    description: 'Description 6',
    image: '/img/Motherboard.jpg',
    githubLink: '#',
  },
  // ... more card data
];

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.innerHTML = `
          <div class="project-card-inner">
              <div class="project-card-front">
                  <div class="project-image">
                      <img src="${cardData.image}" alt="${cardData.title}">
                  </div>
                  <div class="project-content">
                      <h3>${cardData.title}</h3>
                      <div class="flip-prompt">Click to read more <i class="fas fa-redo"></i></div>
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

function updateGrid() {
    console.log("updateGrid() called")
  cardGrid.innerHTML = ''; // Clear existing cards
  for (let i = 0; i < 4; i++) {
    // Display 4 cards at a time
    const cardData = allCardData[currentCardIndex];
    if (cardData) {
        console.log("Creating card:", cardData);
      const card = createCard(cardData);
      cardGrid.appendChild(card);
      setTimeout(() => card.classList.add('active'), 10); // Add active class after a short delay
      currentCardIndex = (currentCardIndex + 1) % allCardData.length; // Cycle through cards
    }
  }
}

loadNewCardsButton.addEventListener('click', updateGrid);

updateGrid(); // Initial load



  /*----- Blog card flip effect -----*/

  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function() {
        const cardInner = this.querySelector('.card-inner');
        cardInner.classList.toggle('is-flipped');
    });
});

 /*----- Set up skill proficiency bars -----*/

document.querySelectorAll('.skill-item').forEach(item => {
    const proficiency = item.getAttribute('data-proficiency');
    const bar = item.querySelector('.proficiency-bar');
    if (bar) {
        bar.style.setProperty('--proficiency', proficiency);
    }
});

function playVideo(videoUrl) {

     /*----- Create modal container -----*/

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    
     /*----- Create video element -----*/

    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;
    video.autoplay = true;
    
     /*----- Create close button -----*/

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
     /*----- Add elements to modal -----*/

    modal.appendChild(closeBtn);
    modal.appendChild(video);
    
     /*----- Add modal to body -----*/

    document.body.appendChild(modal);
    
     /*----- Close modal when clicking outside video -----*/
     
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}
