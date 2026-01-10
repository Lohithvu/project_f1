let soundEnabled = true;

document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTS =====
  const clickSound = document.getElementById("clickSound");
  const hoverSound = document.getElementById("hoverSound");
  const whooshSound = document.getElementById("whooshSound");

  const modal = document.getElementById("workModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeModal = document.getElementById("closeModal");

  const workCards = document.querySelectorAll(".work-card");
  const filterBtns = document.querySelectorAll(".filters button");

  // ===== SOUND TOGGLE =====
  const soundToggle = document.getElementById("soundToggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggle.innerText = soundEnabled ? "🔊 Sound" : "🔇 Muted";
    });
  }

  // ===== HOVER SOUND (DESKTOP) =====
  if (window.innerWidth > 768) {
    document.querySelectorAll(".work-card, .service").forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (soundEnabled && hoverSound) {
          hoverSound.currentTime = 0;
          hoverSound.play();
        }
      });
    });
  }

  // ===== WORK CARD CLICK → VIDEO MODAL =====
 let lastTapTime = 0;

workCards.forEach(card => {
  card.addEventListener("click", () => {

    const videoSrc = card.dataset.video;
    if (!videoSrc) return;

    const now = new Date().getTime();

    // 📱 MOBILE → DOUBLE TAP
    if (window.innerWidth <= 768) {

      if (now - lastTapTime < 400) {
        // ✅ SECOND TAP → OPEN VIDEO

        if (soundEnabled && clickSound) {
          clickSound.currentTime = 0;
          clickSound.play();
        }

        setTimeout(() => {
          if (soundEnabled && whooshSound) {
            whooshSound.currentTime = 0;
            whooshSound.play();
          }
        }, 200);

        setTimeout(() => {
          modalVideo.src = videoSrc;
          modal.classList.add("show");
          modalVideo.play();
          document.body.style.overflow = "hidden";
        }, 900);

      } else {
        // 👆 FIRST TAP → just feedback
        if (soundEnabled && clickSound) {
          clickSound.currentTime = 0;
          clickSound.play();
        }
      }

      lastTapTime = now;
      return;
    }

    // 💻 DESKTOP → SINGLE CLICK
    if (soundEnabled && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }

    setTimeout(() => {
      if (soundEnabled && whooshSound) {
        whooshSound.currentTime = 0;
        whooshSound.play();
      }
    }, 200);

    setTimeout(() => {
      modalVideo.src = videoSrc;
      modal.classList.add("show");
      modalVideo.play();
      document.body.style.overflow = "hidden";
    }, 900);

  });
});


  // ===== CLOSE MODAL =====
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.src = "";
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal.click();
  });

  // ===== FILTER =====
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.filter;

      workCards.forEach(card => {
        card.style.display =
          type === "all" || card.classList.contains(type)
            ? "block"
            : "none";
      });
    });
  });

});

// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hide");
});



// const filterBtns = document.querySelectorAll(".filters button");

// filterBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     filterBtns.forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     const type = btn.dataset.filter;

//     workCards.forEach(card => {
//       if (type === "all" || card.classList.contains(type)) {
//         card.style.opacity = "1";
//         card.style.pointerEvents = "auto";
//         card.style.transform = "scale(1)";
//       } else {
//         card.style.opacity = "0";
//         card.style.pointerEvents = "none";
//         card.style.transform = "scale(0.9)";
//       }
//     });
//   });
// });

/* ================= CURSOR GLOW ================= */
const glow = document.querySelector(".cursor-glow");
if (glow) {
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}


const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    emailInput.focus();
  }
});

emailInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    messageInput.focus();
  }
});

/* ================= TESTIMONIAL SLIDER ================= */
const testimonials = [
  { text: "Amazing quality work, very professional and creative team.", name: "– Business Owner" },
  { text: "Our brand reach improved a lot after working with them.", name: "– Startup Founder" },
  { text: "Highly recommended for photography and video editing.", name: "– Marketing Head" }
];

let t = 0;
setInterval(() => {
  const textEl = document.getElementById("testimonial-text");
  const nameEl = document.getElementById("testimonial-name");
  if (textEl && nameEl) {
    textEl.innerText = testimonials[t].text;
    nameEl.innerText = testimonials[t].name;
    t = (t + 1) % testimonials.length;
  }
}, 4000);

/* ================= MOBILE NAV ================= */
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuIcon.classList.remove("open");
    });
  });
}

/* ================= CONTACT EMAIL ================= */
const sendBtn = document.getElementById("sendMail");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

sendBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    toastText.innerText = "Please fill all fields";
    showToast();
    return;
  }

  // 🔥 SHOW TOAST FIRST
  toastText.innerText = "Thank you! We’ll get back to you soon.";
  showToast();

  // 🔥 THEN OPEN MAIL APP
  setTimeout(() => {
    const subject = `New enquiry from ${name}`;
    const body =
      `Name: ${name}
Email: ${email}

Message:
${message}`;

    window.location.href =
      `mailto:mohan987qz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, 800);

  // Optional clear
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
});

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* ================= SCROLL REVEAL ================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

/* ================= NAVBAR SCROLL SHOW ================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
