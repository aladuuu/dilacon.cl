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
    [
      { opacity: 0, transform: "translateY(-20px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
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
      hero.style.backgroundPositionY = -(scrollPos * 0.5) + "px";
    });
  }
})();

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Detecta todas las secciones
    const navLinks = document.querySelectorAll(".nav-links a"); // Detecta los enlaces del menú

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active"); // Quita la clase activa de todos
                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active"); // Agrega la clase al enlace correspondiente
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% de la sección es visible

    sections.forEach(section => observer.observe(section)); // Observa cada sección
});
