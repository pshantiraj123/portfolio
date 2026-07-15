/* ============================================================
   Shanti Raj P — Portfolio interactions
   - typing effect for role titles
   - scroll-reveal for .card elements (was missing entirely,
     which is why Experience/Projects rendered blank before)
   - fixed navbar background + active-link highlight on scroll
   - mobile nav toggle
   - scroll-to-top button
   - graceful fallback if the profile photo fails to load
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Typing effect ---------- */
  const roles = [
    "DevOps Engineer",
    "Site Reliability Engineer",
    "AWS Cloud Engineer",
    "Kubernetes Engineer",
    "Platform Engineer"
  ];

  let i = 0, j = 0, deleting = false;
  const typing = document.getElementById("typing");

  function type() {
    if (!typing) return;
    const text = roles[i];
    typing.textContent = text.substring(0, j);

    if (!deleting) {
      j++;
      if (j > text.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 50 : 120);
  }
  type();

  /* ---------- Scroll-reveal for cards ---------- */
  const cards = document.querySelectorAll(".card");
  if ("IntersectionObserver" in window && cards.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card) => revealObserver.observe(card));
  } else {
    // No IntersectionObserver support (or no cards) — just show them
    cards.forEach((card) => card.classList.add("show"));
  }

  /* ---------- Navbar background + active link on scroll ---------- */
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const sections = document.querySelectorAll("section[id]");
  const topBtn = document.getElementById("topBtn");

  function onScroll() {
    const y = window.scrollY;

    if (navbar) navbar.classList.toggle("scrolled", y > 20);
    if (topBtn) topBtn.classList.toggle("visible", y > 400);

    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (y >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll to top ---------- */
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".navbar ul");
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      navList.classList.toggle("open");
    });
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        toggle.classList.remove("open");
        navList.classList.remove("open");
      })
    );
  }

  /* ---------- Profile image fallback ---------- */
  const avatarImg = document.getElementById("avatarImg");
  const avatarWrap = document.querySelector(".avatar-wrap");
  if (avatarImg && avatarWrap) {
    avatarImg.addEventListener("error", () => {
      avatarImg.remove();
      const fallback = document.createElement("div");
      fallback.className = "avatar-fallback";
      fallback.textContent = "SR";
      avatarWrap.appendChild(fallback);
    }, { once: true });
  }
});
