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
