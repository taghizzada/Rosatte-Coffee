(function () {
  const slider = document.querySelector(".hero-slider");
  const slides = [...slider.querySelectorAll(".slide")];
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");
  const dotsWrap = slider.querySelector(".hero-dots");

  let i = 0,
    timer;

  // Build dots
  slides.forEach((_, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    b.addEventListener("click", () => go(idx, true));
    dotsWrap.appendChild(b);
  });

  function go(idx) {
    slides[i].classList.remove("is-active");
    i = (idx + slides.length) % slides.length;
    slides[i].classList.add("is-active");
    [...dotsWrap.children].forEach((d, di) =>
      d.setAttribute("aria-selected", di === i ? "true" : "false")
    );
  }

  function next() {
    go(i + 1);
  }
  function prev() {
    go(i - 1);
  }
  function start() {
    timer = setInterval(next, 5000); // 5s autoplay
  }
  function stop() {
    clearInterval(timer);
  }

  // Init
  go(0);
  start();

  // Controls — stop autoplay after manual clicks
  nextBtn.addEventListener("click", () => {
    go(i + 1);
    stop();
  });
  prevBtn.addEventListener("click", () => {
    go(i - 1);
    stop();
  });

  // Pause on hover (still works)
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  // Keyboard controls — also stop autoplay
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      go(i + 1);
      stop();
    }
    if (e.key === "ArrowLeft") {
      go(i - 1);
      stop();
    }
  });

  // Swipe controls — also stop autoplay
  let sx = null;
  slider.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      stop();
    },
    { passive: true }
  );

  slider.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      go(i + (dx < 0 ? 1 : -1));
      stop();
    }
    sx = null;
  });

  document.getElementById("loyalty-btn").addEventListener("click", function () {
    this.textContent = "✔ Added to the Order";
    this.disabled = true;
  });
})();
