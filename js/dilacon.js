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

const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

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
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;
  const message = document.getElementById("message").value;

  const data = {
    api_key: "19uJKv888MMk",
    name: name,
    email: email,
    phone: phone,
    company: company,
    message: message,
  };

  fetch("https://smtp.blackbelt.cl/dilacon.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        alert("Mensaje enviado con éxito");
        document.getElementById("contactForm").reset();
      } else {
        alert("Error: " + result.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al enviar el mensaje.");
    });
});
