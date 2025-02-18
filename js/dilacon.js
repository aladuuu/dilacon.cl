window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 800);
});

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  navLinks.animate(
    {
      duration: 300,
      easing: "ease-out",
    }
  );
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

const animateOnScrollElements =
  document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

animateOnScrollElements.forEach((element) => {
  observer.observe(element);
});
(function () {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const hero = document.querySelector(".hero");

  if (isMobile) {
    hero.style.backgroundAttachment = "scroll";
    window.addEventListener("scroll", function () {
      const scrollPos = window.pageYOffset;
      hero.style.backgroundPositionY = -(scrollPos * 0.3) + "px";
    });
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
