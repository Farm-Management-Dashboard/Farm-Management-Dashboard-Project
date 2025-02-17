document.addEventListener("DOMContentLoaded", function () {
  // Ensure GSAP and ScrollTrigger are registered
  if (typeof gsap !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Hero and About Section Animations
      gsap.from(".about-content h2", {
          opacity: 0,
          y: -50,
          duration: 1,
          scrollTrigger: {
              trigger: ".about-section",
              start: "top 80%",
          },});

      gsap.from(".about-content p", {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
              trigger: ".about-section",
              start: "top 75%",
          },
      });

      gsap.from(".about-content ul li", {
          opacity: 0,
          x: -50,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
              trigger: ".about-section",
              start: "top 70%",
          },
      });

      gsap.from(".about-video video", {
          opacity: 0,
          scale: 0.8,
          duration: 1.5,
          scrollTrigger: {
              trigger: ".about-video",
              start: "top 75%",
          },
      });
           
    } else {
        console.error("GSAP not loaded!");
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function () {
          navLinks.classList.toggle("active"); // Show/hide menu
          menuToggle.classList.toggle("active"); // Change icon
      });
  } else {
      console.error("Menu elements not found!");
  }