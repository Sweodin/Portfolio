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
      image: "../img/Blogposts/Motherboard.jpg",
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
      title: "The Art of Responsive Design",
      date: "January 20, 2024",
      author: "Peter Gustafsson",
      image: "../img/Blogposts/TLT.jpg",
      content: `
        <p>In today's digital landscape, responsive design isn't just a nice-to-have—it's essential. With users accessing websites from various devices, we need to ensure our designs adapt seamlessly to different screen sizes.</p>

        <h2>Key Principles of Responsive Design</h2>
        <ul>
          <li>Fluid Grids</li>
          <li>Flexible Images</li>
          <li>Media Queries</li>
          <li>Mobile-First Approach</li>
        </ul>

        <p>One of the most important aspects of responsive design is understanding breakpoints. Here's a common approach I use:</p>

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
        <p>A responsive design is only as good as its testing process. I always ensure to test my designs across multiple devices and browsers to guarantee a consistent experience.</p>
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
