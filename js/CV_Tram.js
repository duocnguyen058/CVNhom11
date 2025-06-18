// Typed.js effect
const typed = new Typed(".typing", {
  strings: ["UI Designer", "IT Student"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

// Reveal sections on scroll
const sections = document.querySelectorAll("section");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Hide all contents
    tabContents.forEach(content => content.classList.add('hidden'));

    // Activate current button and show content
    button.classList.add('active');
    const target = document.getElementById(button.dataset.tab);
    target.classList.remove('hidden');
  });
});

// Hiệu ứng hiện chữ "About Me" khi cuộn đến phần .about
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about");
  const aboutHeading = document.querySelector(".about .heading");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutHeading.classList.add("animate");
        observer.unobserve(entry.target); // Chỉ chạy 1 lần
      }
    });
  }, {
    threshold: 0.5
  });

  if (aboutSection) {
    observer.observe(aboutSection);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Tab buttons logic (giữ nguyên nếu bạn đã có)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Bỏ active khỏi nút khác và ẩn tất cả tab content
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("fade-in");
      });

      // Kích hoạt tab mới
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
        targetContent.classList.add("fade-in");
      }
    });
  });

// Hiệu ứng tiêu đề About Me
const aboutSection = document.querySelector("#about");
const heading = aboutSection.querySelector(".heading");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heading.classList.add("blink");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

if (aboutSection) {
  observer.observe(aboutSection);
}

});

