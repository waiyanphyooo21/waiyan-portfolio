// Three.js Animation
let scene, camera, renderer, particles;

function init() {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    color: "#4F46E5",
    transparent: true,
    opacity: 0.8,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

// Initialize Three.js animation
init();

document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Handle scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        if (navLinks) navLinks.classList.remove("active");
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector(
    ".contact-form, .contact-form-modern"
  );
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      // Here you would typically send the data to a server
      console.log("Form submitted:", data);
      // Show success message
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Intersection Observer for animations
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);
  document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
    observer.observe(el);
    el.classList.add("fade-in");
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", currentTheme);
  function toggleTheme() {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Typewriter effect for new hero layout
  const typerText = document.querySelector(".typer-text");
  if (typerText) {
    typeWriterEffect(["Wai Yan Phyo Oo", "Full Stack Developer"], typerText);
  }

  // Loader for projects section
  const projectsLoader = document.getElementById("projects-loader");
  const projectsSection = document.getElementById("projects");
  if (projectsLoader && projectsSection) {
    setTimeout(() => {
      projectsLoader.style.display = "none";
      projectsSection.style.display = "";
    }, 2000);
  }
});

// Typewriter effect for hero section
function typeWriterEffect(words, element, delay = 120, pause = 1200) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? delay / 2 : delay);
  }
  type();
}
// 🚫 Disable right-click context menu silently
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

// 🚫 Block common DevTools & View Source shortcuts silently
document.addEventListener("keydown", function (event) {
  // F12
  if (event.key === "F12") {
    event.preventDefault();
  }

  // Ctrl+Shift+I or Ctrl+Shift+J
  if (
    event.ctrlKey &&
    event.shiftKey &&
    (event.key === "I" || event.key === "J")
  ) {
    event.preventDefault();
  }

  // Ctrl+U
  if (event.ctrlKey && event.key === "u") {
    event.preventDefault();
  }
});
//new
const maintenanceButtons = document.querySelectorAll(".maintenance-btn");
const maintenancePopup = document.getElementById("maintenance-popup");
const closePopup = document.getElementById("close-popup");

maintenanceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    maintenancePopup.style.display = "block";
  });
});

closePopup.addEventListener("click", () => {
  maintenancePopup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === maintenancePopup) {
    maintenancePopup.style.display = "none";
  }
});
