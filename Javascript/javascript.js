
// Unified JavaScript for PE.T Website
document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------------------
   * 1️⃣ Dynamic Greeting
   ---------------------------------------- */
  const header = document.querySelector("header h1");
  if (header) {
    const hours = new Date().getHours();
    const greeting =
      hours < 12 ? "Good morning! Welcome to PE.T PROGRAM ☀️" :
      hours < 18 ? "Good afternoon! Welcome to PE.T PROGRAM 🌞" :
      "Good evening! Welcome to PE.T PROGRAM 🌙";
    header.textContent = greeting;
  }

  /* ----------------------------------------
   * 2️⃣ Highlight Current Page
   ---------------------------------------- */
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.endsWith(currentPage)) {
      link.classList.add("active");
    }
  });

  /* ----------------------------------------
   * 3️⃣ Smooth Scroll (Safe Version)
   ---------------------------------------- */
  document.addEventListener("click", (e) => {
    if (e.target.matches('a[href^="#"]')) {
      const id = e.target.getAttribute("href");
      const target = document.querySelector(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  /* ----------------------------------------
   * 4️⃣ Back-to-Top Button
   ---------------------------------------- */
  const topBtn = document.createElement("button");
  topBtn.id = "topBtn";
  topBtn.textContent = "⬆ Back to Top";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------------------------------------
   * 5️⃣ Contact Form Validation (Single Corrected Block)
   ---------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const contactFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        contactFeedback.textContent = "All input is required.";
        contactFeedback.style.color = "red";
        contactFeedback.style.display = "block";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        contactFeedback.textContent = "Please enter a valid email address.";
        contactFeedback.style.color = "red";
        contactFeedback.style.display = "block";
        return;
      }

      contactFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. We will respond within 24 hours.`;
      contactFeedback.style.color = "green";
      contactFeedback.style.display = "block";
      contactForm.reset();

      setTimeout(() => contactFeedback.style.display = "none", 5000);
    });
  }

  /* ----------------------------------------
   * 6️⃣ Enquiry Form Validation (Single Block)
   ---------------------------------------- */
  const enquiryForm = document.getElementById("enquiryForm");
  const enquiryFeedback = document.createElement("p");

  if (enquiryForm) {
    enquiryFeedback.id = "enquiryFeedback";
    enquiryFeedback.style.display = "none";
    enquiryFeedback.style.marginTop = "10px";
    enquiryForm.appendChild(enquiryFeedback);

    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = enquiryForm.name.value.trim();
      const email = enquiryForm.email.value.trim();
      const subject = enquiryForm.subject.value.trim();
      const message = enquiryForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        enquiryFeedback.textContent = "All input is required.";
        enquiryFeedback.style.color = "red";
        enquiryFeedback.style.display = "block";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        enquiryFeedback.textContent = "Please enter a valid email address.";
        enquiryFeedback.style.color = "red";
        enquiryFeedback.style.display = "block";
        return;
      }

      enquiryFeedback.textContent =
        `Thank you, ${name}! Your enquiry about "${subject}" has been submitted. We will get back to you soon.`;
      enquiryFeedback.style.color = "green";
      enquiryFeedback.style.display = "block";
      enquiryForm.reset();

      setTimeout(() => enquiryFeedback.style.display = "none", 5000);
    });
  }

  /* ----------------------------------------
   * 7️⃣ Collapsible Sections (FIXED: does NOT affect Gallery)
   ---------------------------------------- */
  document.querySelectorAll("main section").forEach(section => {
    if (section.id === "gallery") return; // FIX: Don't collapse gallery

    const heading = section.querySelector("h2, h3");
    const content = [...section.children].filter(el => el !== heading);

    if (heading && content.length) {
      heading.style.cursor = "pointer";
      content.forEach(el => el.style.display = "none");

      heading.addEventListener("click", () => {
        const hidden = content[0].style.display === "none";
        content.forEach(el => el.style.display = hidden ? "block" : "none");
      });
    }
  });

  /* ----------------------------------------
   * 8️⃣ Table Row Hover
   ---------------------------------------- */
  document.querySelectorAll("table tbody tr").forEach(row => {
    row.addEventListener("mouseenter", () => row.style.backgroundColor = "#f0f8ff");
    row.addEventListener("mouseleave", () => row.style.backgroundColor = "");
  });

  /* ----------------------------------------
   * 9️⃣ Product Description Toggle
   ---------------------------------------- */
  document.querySelectorAll(".product").forEach(product => {
    const link = product.querySelector("a");
    const description = product.querySelector("p");

    if (link && description) {
      description.style.display = "none";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        description.style.display =
          description.style.display === "none" ? "block" : "none";
      });
    }
  });

  /* ----------------------------------------
   * 🔟 Gallery Lightbox (Working Version)
   ---------------------------------------- */
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.close');

  if (lightbox && lightboxImg && caption) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        caption.textContent = img.alt;
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  /* ----------------------------------------
   * 1️⃣1️⃣ Dynamic Search
   ---------------------------------------- */
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchInput && searchResults) {

    const pages = [
      { title: 'Home', url: 'index.html', description: 'Welcome to PE.T Peer Tutoring Program' },
      { title: 'About Us', url: 'Pages/about.html', description: 'Learn about our mission and goals' },
      { title: 'Services', url: 'Pages/service.html', description: 'Explore our tutoring services' },
      { title: 'Contact Us', url: 'Pages/contact.html', description: 'Get in touch with our team' },
      { title: 'Products', url: 'Pages/products.html', description: 'Educational resources and materials' },
      { title: 'Gallery', url: 'Pages/gallery.html', description: 'View our tutoring sessions and events' },
      { title: 'Enquiry Form', url: 'Pages/Enquiry.html', description: 'Ask us anything!' }
    ];

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';

      if (!query) {
        searchResults.style.display = 'none';
        return;
      }

      const filtered = pages.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResults.style.display = 'none';
        return;
      }

      filtered.forEach(page => {
        const result = document.createElement('div');
        result.className = 'search-result';
        result.innerHTML = `<strong>${page.title}</strong><br><small>${page.description}</small>`;

        result.addEventListener('click', () => {
          window.location.href = page.url;
        });

        searchResults.appendChild(result);
      });

      searchResults.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

});
