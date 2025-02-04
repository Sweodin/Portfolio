document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post");

  console.log("URL Parameters:", urlParams.toString());
  console.log("Post ID:", postId);

  const blogPosts = {
    1: {
      title:
        "Turning Challenges into Opportunities: My Journey into Web Development",
      date: "September 19, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Moving-forward.jpg",
      content: `
        <p>Starting something new is never easy, but sometimes life pushes you in just the right direction.
         For me, it all began when I moved back to Helsingborg with my family, determined to give us a fresh start and build a brighter future.
         This wasn't just about a new home — it was about a new beginning for me, my career, and our family.</p>

        <h2>The Decision to Study</h2>

        <p>After settling in Helsingborg, I knew it was time to take the leap. 
        My first step? Going back to school at Komvux to boost my grades.
       I wanted to make myself eligible for Högskola (university), and that meant putting in the hard work. 
       Balancing full-time studies and part-time work wasn't exactly a walk in the park, especially with ADHD making its presence felt daily. 
       But I wasn't going to let that hold me back. Instead, I decided to embrace my diagnosis and turn it into a strength.
        ADHD fuels my creativity, my ability to think outside the box, and my determination to keep moving forward.</p>

        <h2>The Grind Pays Off</h2>

        <p>That year was tough.
        Between assignments, exams, work, and family life, there were days I felt like I was running on empty. 
        But every challenge I overcame brought me one step closer to my goal. And finally, the moment came: my grades were good enough to move on to the next stage. 
        In August 2024, I began my studies at Sundsgårdens Folkhögskola, diving headfirst into the world of web development and IT.</p>

        <h2>The Start of Something Great</h2>

        <p>Joining Sundsgården felt like unlocking the door to my dream career. 
        I finally had the chance to focus on what I'm passionate about: tech and problem-solving. 
        From learning the basics of frontend and backend development to building my first projects, every day felt like a step closer to the future I'd always envisioned.
        This journey hasn't just been about learning HTML or JavaScript. 
        It's been about resilience, growth, and proving to myself that I'm capable of achieving great things — even when the odds aren't in my favor.</p>

        <h2>Moving Forward</h2>

        <p>Looking back, I'm proud of how far I've come. Moving cities, balancing family life, and managing ADHD while pursuing my dreams hasn't been easy, but it's been worth every late night and early morning. 
        I'm excited about what's to come and ready to continue pushing forward.
        To anyone else out there who might feel like their goals are out of reach: don't give up. 
        Challenges are just opportunities in disguise. Embrace them, grow from them, and use them to fuel your journey forward. 
        If I can do it, so can you.</p>
        
        <p>Here's to building a career in IT and tech — one line of code at a time.</p>
      `,
    },
    2: {
      title: "The new Keyboard",
      date: "October 24, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Keyboard.jpg",
      content: `
      <h2>Out with the Old, In with the New!</h2>

        <p>Finally laid my old keyboard to rest!  After years of faithful service (and a few too many sticky keys!), it was time for an upgrade.
          I'm thrilled to introduce my new companion in code: the Asus ROG 75%!
      </p>

      <h2>First Impressions: ROG 75% Keyboard Bliss</h2>

      <p>
        What a difference a keyboard makes!  The ROG 75% is a dream to type on.
        It's made a noticeable difference in my typing speed and comfort, which is crucial when you're spending hours writing code.
          Plus, let's be honest, the customizable RGB lighting is pretty awesome and adds a bit of fun to my setup!
      </p>

      <h2>Coding Progress Update: Frontend Focus</h2>

      <p>
        On the coding front, things are really clicking.
        I've been diving deeper into frontend technologies, really getting comfortable with HTML, Sass, and React.
        I recently tackled a challenge working with these technologies.
        It's incredibly satisfying to see ideas come to life on the screen, and these tools are making the process more efficient and enjoyable.
      </p>

      <h2>Looking Ahead: Web Development and Beyond</h2>

      <p>
      But that's all part of the learning process, right?  
      I'm excited to share more updates as the game project progresses and as I continue my journey into the world of web development! Stay tuned!
      </p>
      `,
    },
    3: {
      title: "The Art of Responsive Design",
      date: "November 15, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/TLT.jpg",
      content: `
        <p>In today's digital landscape, responsive design isn't just a nice-to-have—it's essential. 
        With users accessing websites from various devices, we need to ensure our designs adapt seamlessly to different screen sizes.</p>

        <h2>Key Principles of Responsive Design</h2>

        <ul>
          <li>Fluid Grids</li>
          <li>Flexible Images</li>
          <li>Media Queries</li>
          <li>Mobile-First Approach</li>
        </ul>

        <p>One of the most important aspects of responsive design is understanding breakpoints. 
         Here's a common approach I use:</p>

        <code>
        /* Mobile First */
        .container {
          width: 100%;
        }

        /* Tablet */
        @media (min-width: 768px) {
          .container {
            width: 750px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .container {
            width: 970px;
          }
        }
        </code>

        <h2>Testing Across Devices</h2>
        <p>A responsive design is only as good as its testing process.
        I always ensure to test my designs across multiple devices and browsers to guarantee a consistent experience.</p>
      `,
    },
    4: {
      title: "Sunday Vibes, Monday Mindset:",
      date: "December 8, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Monday.jpg",
      content: `
      <h2>Gear Up for a Productive Week!</h2>

      <p>Sunday evening... that sweet spot between weekend relaxation and the start of a new work week. ... Monday mindset!</p>

      <h2>Reflect and Recharge: Fuel Your Productivity Engine</h2>

  <p>Before diving into planning, take a few moments to simply recharge. ... fueling up your "productivity engine."</p>

  <h2>Set Intentions, Not Just To-Dos: Find Your Purpose</h2>

  <p>Instead of just making a long list of tasks, try setting intentions for the week. ... beyond just ticking off boxes.</p>

  <h2>Prioritize and Plan (Smartly): Focus on Your "Rocks"</h2>

  <p>Now, let's get practical. Look at your upcoming week and identify the 2-3 most important tasks or projects. ... leads to burnout.</p>

  <h2>Embrace Positivity and Purpose: Fuel Your Motivation</h2>

  <p>Approach the week with a positive attitude and a sense of purpose. ... overall progress.</p>

  <h2>Small Steps, Big Wins: The Power of Consistency</h2>

  <p>Don't underestimate the power of small, consistent actions. ... build momentum.</p>

  <h2>Let's Make it Count!</h2>

  <p>So, as you transition from Sunday vibes to Monday mindset, remember to recharge, set intentions, prioritize, embrace positivity, and focus on consistent progress. ... Let's make it count, people!</p>
 `,
    },
    5: {
      title: "Week in Review:",
      date: "December 13, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Minport.png",
      content: `

      <h2>Portfolio Progress, Anime APIs, and Backend Adventures!</h2>

      <p>Another week of learning and coding is in the books! ... fingers crossed it's all coming together as planned! 🤞</p>

  <h2>School's Going Great: Deep Dive into Web Dev</h2>
  <p>This week in school has been particularly rewarding.
   ... enjoying fun things like animations and projects.</p>

  <h2>Portfolio Sneak Peek: Building My Digital Showcase</h2>
  <p>Speaking of the portfolio, progress is definitely being made! ... share the finished product with you all soon!</p>

  <h2>Anime Project: API-Powered Search Fun!</h2>
  <p>One of the exciting projects I've been immersed in is my Anime search site. ... enhance the user experience.</p>

  <h2>Event Tickets Backend: Node.js, TypeScript, and Database Magic</h2>
  <p>On the backend side, I've been tackling the Event Tickets project. ... see this project come to fruition.</p>

  <h2>Keeping the Momentum Going!</h2>
  <p>The energy is high, and the ideas are flowing! ... development journeys! 🚀</p>
  

  <p><a
                href="../videos/Myportfolio.mp4"
                class="video-link"
                onclick="playVideo('videos/Myportfolio.mp4'); return false;"
                >Watch Demo Video</a>
</p>
  

`,
    },
    6: {
      title: "Exciting Progress on My React Project!",
      date: "December 17, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Monday.jpg",
      content: `
`,
    },
    7: {
      title: "Sunday Vibes, Monday Mindset:",
      date: "December 8, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/Monday.jpg",
      content: `
`,
    },
  };

  function loadBlogPost(postId) {
    console.log("Loading blog post with ID:", postId);

    const post = blogPosts[postId];
    console.log("Found post:", post ? "Yes" : "No", post);

    if (post) {
      console.log("Loading post content for:", post.title);

      // Get elements
      const titleEl = document.getElementById("post-title");
      const dateEl = document.getElementById("post-date");
      const imageEl = document.getElementById("post-image");
      const contentEl = document.getElementById("post-content");

      // Debug element existence
      console.log("Elements found:", {
        title: !!titleEl,
        date: !!dateEl,
        image: !!imageEl,
        content: !!contentEl,
      });

      // Set content
      if (titleEl) titleEl.textContent = post.title;
      if (dateEl) {
        dateEl.innerHTML = `
          <span><i class="fas fa-calendar"></i> ${post.date}</span>
          <span><i class="fas fa-user"></i> ${post.author}</span>
        `;
      }
      if (imageEl) {
        imageEl.src = post.image;
        imageEl.alt = post.title;
      }
      if (contentEl) {
        contentEl.innerHTML = post.content;
      }

      document.title = `${post.title} | Peter's Blog`;
    } else {
      console.log("Post not found");
      document.querySelector(".blog-post").innerHTML = `
        <div class="blog-post-header">
          <h1>Blog Post Not Found</h1>
          <p>The requested blog post could not be found. Please check the URL and try again.</p>
        </div>
      `;
    }
  }

  // Load all blog posts in the list
  function loadBlogList() {
    const blogList = document.getElementById("blog-list");
    if (!blogList) return;

    const currentPostId = postId; // Remember current post ID

    Object.entries(blogPosts).forEach(([id, post]) => {
      // Skip the current post in the list
      if (id === currentPostId) return;

      const preview = document.createElement("div");
      preview.className = "blog-preview";
      preview.innerHTML = `
        <h3>${post.title}</h3>
        <div class="blog-meta">
          <span><i class="fas fa-calendar"></i> ${post.date}</span>
          <span><i class="fas fa-user"></i> ${post.author}</span>
        </div>
        <a href="?post=${id}">Read this post</a>
      `;
      blogList.appendChild(preview);
    });
  }

  // Load the current post if there's an ID
  if (postId) {
    loadBlogPost(postId);
  } else {
    console.log("No post ID in URL");
    document.querySelector(".blog-post").innerHTML = `
      <div class="blog-post-header">
        <h1>Welcome to My Blog</h1>
        <p>Please select a blog post to read from the list below.</p>
      </div>
    `;
  }

  // Always load the blog list
  loadBlogList();
});
