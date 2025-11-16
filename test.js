// Register ScrollTrigger and SplitText
// for animation control and text splitting

// === Plugin Registration ===
gsap.registerPlugin(ScrollTrigger, SplitText);

// === Smooth Scroll Initialization ===
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

// Sync ScrollTrigger with LocomotiveScroll
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed",
});

// === DOM Element References ===
const menu = document.querySelector("#menuBtnContainer");
const overlay = document.querySelector("#overlay");
const aside = document.querySelector("aside");
const bar1 = document.querySelector("#bar1");
const bar2 = document.querySelector("#bar2");
const h4 = document.querySelectorAll("aside h4");
const menuLinks = document.querySelectorAll("#links-wrap a");
const rotateTargets = document.querySelectorAll(".flare-layer");
let isOpen = false;

// === Menu Toggle Function ===
function toggleMenu(open) {
  isOpen = open;

  // Icon Animation
  gsap.to([bar1, bar2], {
    xPercent: -50,
    yPercent: -50,
    rotation: open ? [-45, 45] : [0, 0],
    top: open ? "50%" : ["0%", "100%"],
    backgroundColor: "#fff",
    overwrite: true,
  });

  // Sidebar Animation
  gsap.to(aside, {
    duration: 0.5,
    right: open ? "0%" : "-110%",
    opacity: open ? 1 : 0,
    ease: open ? "power4.out" : "power2.in",
    delay: open ? 0 : 0.2,
  });

  // Overlay Animation
  gsap.to(overlay, {
    opacity: open ? 0.5 : 0,
    right: open ? "0%" : "-110%",
  });
  overlay.style.pointerEvents = open ? "all" : "none";

  // Links and Titles
  const linkAnim = {
    x: open ? 0 : 250,
    opacity: open ? 1 : 0,
    stagger: 0.02,
    duration: 0.4,
    ease: "power2.out",
  };
  gsap.to(menuLinks, {
    ...linkAnim,
    onComplete: () => !open && gsap.set(menuLinks, { x: 250, opacity: 0 }),
  });

  gsap.to(h4, {
    y: open ? 0 : 16,
    opacity: open ? 1 : 0,
    duration: 0.5,
    ease: "power2.out",
    delay: open ? 0.3 : 0,
    onComplete: () => !open && gsap.set(h4, { y: 16, opacity: 0 }),
  });
}

menu.addEventListener("click", () => toggleMenu(!isOpen));
overlay.addEventListener("click", () => toggleMenu(false));

// === Flare Background Rotation ===
gsap.to(
  { angle: 0 },
  {
    angle: 360,
    duration: 8,
    ease: "none",
    repeat: -1,
    onUpdate() {
      const angle = `${this.targets()[0].angle}deg`;
      rotateTargets.forEach((el) => {
        el.style.setProperty("--angle", angle);
        el.style.backgroundImage = `conic-gradient(from var(--angle), transparent 60%, #c498ff)`;
      });
    },
  }
);

// === Utility: Animate SplitText ===
function animateSplitText(selector, options = {}) {
  const split = new SplitText(selector, { type: "words", ...options });
  gsap.from(split.words, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: "power1.out",
    ...options.gsap,
  });
}

// === Entrance Animations ===
gsap.from("#logo", { y: -100, duration: 1, ease: "power2.out" });
gsap.to("#signin-btn", {
  boxShadow: "0 0 30px #e0c9ff, 0 0 60px #e0c9ff",
  repeat: -1,
  yoyo: true,
  duration: 1.5,
  ease: "power1.inOut",
});

// Nav links
gsap.from(".link a", {
  y: "-30px",
  opacity: 0,
  duration: 0.8,
  stagger: 0.05,
  ease: "power2.out",
  delay: 0.1,
});

// Hero Heading
gsap.from("#main-heading span", {
  y: 100,
  stagger: 0.2,
  duration: 0.6,
  ease: "power3.out",
});

animateSplitText(".description p");

// Hero Circles
gsap.from(".gradient-circle", {
  y: 100,
  duration: 1,
  ease: "power2.out",
  delay: 0.08,
});

// === ScrollTrigger Section Animations ===
function animateScrollElements(trigger, targets, opts) {
  gsap.from(targets, {
    ...opts,
    scrollTrigger: {
      trigger,
      scroller: "[data-scroll-container]",
      scrub: 2,
      start: opts.start || "top 90%",
      end: opts.end || "bottom 90%",
    },
  });
}

animateScrollElements(".feature-card", ".feature-card", {
  y: 80,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power4.out",
});
animateScrollElements(".callout-container", ".callout-text h1", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power4.out",
});
animateScrollElements(".divider", ".divider-line", {
  from: { width: "200px" },
  to: { width: "100%" },
  duration: 0.8,
  ease: "power2.out",
});
animateSplitText(".pricing-banner-text", {
  gsap: {
    scrollTrigger: {
      trigger: ".pricing-banner-text",
      start: "top 85%",
      end: "bottom 60%",
    },
  },
});
animateSplitText(".pricing-header h1", {
  gsap: { scrollTrigger: { trigger: ".pricing-header" } },
});
animateSplitText(".pricing-header p", {
  gsap: {
    scrollTrigger: { trigger: ".pricing-header" },
    y: 50,
    duration: 1,
    stagger: 0.03,
    ease: "power2.out",
  },
});

[1, 2, 3].forEach((i) => {
  const directions = [-150, 150];
  const props = i === 2 ? { y: 150 } : { x: directions[i - 1] };
  animateScrollElements(
    `#plans-grid .pricing-card:nth-child(${i})`,
    `#plans-grid .pricing-card:nth-child(${i})`,
    {
      ...props,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    }
  );
});

animateScrollElements("#faq-section #gradient-banner", "#gradient-banner", {
  opacity: 0,
  duration: 1,
  ease: "power4.out",
});
animateScrollElements(".faq-list", ".faq-list li", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "power4.out",
});

// === Refresh ScrollTrigger on layout changes ===
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();
