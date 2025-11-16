

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  // console.log(e);
});

// RequestAnimationFrame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Sync Lenis with ScrollTrigger
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value, { immediate: true }) : window.scrollY;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? "transform" : "fixed",
});


// DOM Elements
const navLinks = document.querySelectorAll("#nav-links div");
const menu = document.querySelector("#menuBtnContainer");
const overlay = document.querySelector("#overlay");
const aside = document.querySelector("aside");
const bar1 = document.querySelector("#bar1");
const bar2 = document.querySelector("#bar2");
const h4 = document.querySelectorAll("aside h4");
const menuLinks = document.querySelectorAll("#links-wrap a");
const rotateTargets = document.querySelectorAll(".flare-layer");
let tl = gsap.timeline();
const mm = gsap.matchMedia();
let isOpen = false;

// Menu Icon Animation
menu.addEventListener("click", () => {
  if (!isOpen) {
    // Open the menu

    gsap.to(bar1, {
      xPercent: -50,
      yPercent: -50,
      rotation: -45,
      top: "50%",
      backgroundColor: "#fff",
    });

    gsap.to(bar2, {
      xPercent: -50,
      yPercent: -50,
      rotation: 45,
      top: "50%",
      backgroundColor: "#fff",
    });

    gsap.to(aside, {
      duration: 0.5,
      right: "0%",
      ease: "power4.out",
      opacity: 1,
    });

    gsap.fromTo(
      h4,
      {
        y: 16,
        opacity: 0,
      },
      {
        duration: 0.5,
        y: 0,
        opacity: 1,
        delay: 0.3,
      }
    );

    // Stagger animation for menu links
    gsap.fromTo(
      menuLinks,
      {
        x: 250, // Reset to starting position
        opacity: 0,
      },
      {
        stagger: 0.01,
        duration: 0.4,
        x: 0, // Move to final position
        opacity: 1,
        delay: 0.2,
      }
    );

    gsap.to(overlay, {
      opacity: 0.5,
      right: "0%",
    });

    overlay.style.pointerEvents = "all";

    isOpen = true;
  } else {
    // Close the menu

    gsap.to(menuLinks, {
      stagger: 0.02,
      duration: 0.4,
      x: 250,
      opacity: 0,
      onComplete: () => {
        // Reset the position for the next time the menu opens
        gsap.set(menuLinks, { x: 250, opacity: 0 });
      },
    });

    gsap.to(h4, {
      duration: 0.5,
      y: 16,
      opacity: 0,
      onComplete: () => {
        gsap.set(h4, { y: 16, opacity: 0 });
      },
    });

    gsap.to(aside, {
      duration: 0.5,
      right: "-110%",
      // ease: 'cubic-bezier(.7, 0, .2, 1)',
      ease: "power2.in",
      opacity: 0,
      delay: 0.2,
    });

    gsap.to(bar1, {
      xPercent: -50,
      yPercent: -50,
      rotation: 0,
      top: "0%",
      backgroundColor: "#fff",
    });

    gsap.to(bar2, {
      xPercent: -50,
      yPercent: -50,
      rotation: 0,
      top: "100%",
      backgroundColor: "#fff",
    });

    gsap.to(overlay, {
      right: "-110%",
    });

    overlay.style.pointerEvents = "none";
    isOpen = false;
  }
});

overlay.addEventListener("click", () => {
  // Close the menu

  gsap.to(menuLinks, {
    stagger: 0.02,
    duration: 0.4,
    x: 250,
    opacity: 0,
    onComplete: () => {
      // Reset the position for the next time the menu opens
      gsap.set(menuLinks, { x: 250, opacity: 0 });
    },
  });

  gsap.to(h4, {
    duration: 0.5,
    y: 16,
    opacity: 0,
    onComplete: () => {
      gsap.set(h4, { y: 16, opacity: 0 });
    },
  });

  gsap.to(aside, {
    duration: 0.5,
    right: "-110%",
    // ease: 'cubic-bezier(.7, 0, .2, 1)',
    ease: "power2.in",
    opacity: 0,
    delay: 0.2,
  });

  gsap.to(bar1, {
    xPercent: -50,
    yPercent: -50,
    rotation: 0,
    top: "0%",
    backgroundColor: "#fff",
  });

  gsap.to(bar2, {
    xPercent: -50,
    yPercent: -50,
    rotation: 0,
    top: "100%",
    backgroundColor: "#fff",
  });

  gsap.to(overlay, {
    opacity: 0,
    right: "-110%",
  });

  overlay.style.pointerEvents = "none";
  isOpen = false;
});

// Rotate Flare Background
gsap.to(
  { angle: 0 },
  {
    angle: 360,
    duration: 8,
    ease: "none",
    repeat: -1,
    onUpdate() {
      const angleValue = `${this.targets()[0].angle}deg`;
      rotateTargets.forEach((el) => {
        el.style.setProperty("--angle", angleValue);
        el.style.backgroundImage = `conic-gradient(from var(--angle), transparent 60%, #c498ff)`;
      });
    },
  }
);

gsap.to("#signin-btn", {
  boxShadow: "0 0 30px #e0c9ff, 0 0 60px #e0c9ff",
  repeat: -1,
  yoyo: true,
  duration: 1.5,
  ease: "power1.inOut",
});

gsap.from(".logo",{
  x: -100,
  ease:"power4.inOut",
  duration:1, 
  opacity:0
});

gsap.from("#welcome-badge", {
  scale: 0.5,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)",
  delay: 0.4,
});

gsap.from("#main-heading span", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 1,
  ease: "power4.out",
  delay: 0.8,
});

gsap.from("#profile-link", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 1,
  ease: "power3.out",
  scale: 0.5,
});

gsap.from(".description", {
  opacity: 0,
  y: 60,
  duration: 1,
  delay: 1.2,
  ease: "power3.out",
});

gsap.from(".gradient-circle", {
  scale: 0,
  // rotation: 360,
  stagger: 0.1,
  duration: 1.5,
  delay: 1,
  ease: "elastic.out(1, 0.75)",
  transformOrigin: "center center",
});

// FEATURES SECTION

gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".feature-card",
    scroller: document.body,
    start: "top 70%",
    // markers: true,
  },
  y: 80,
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: "power4.out",
  delay: 0.05,
});

// CALLOUT SECTION
gsap.from(".callout-text h1", {
  scrollTrigger: {
    trigger: ".callout-text",
    scroller: document.body,
    start: "top 90%",
    // markers: true,
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: "expo.out",
});

gsap.from(".pricing-banner", {
  scrollTrigger: {
    trigger: ".pricing-banner",
    scroller: document.body,
    start: "top 80%",
    // markers: true,
  },
  opacity: 0,
  duration: 1,
  ease: "power4.inOut",
});

gsap.from(".pricing-card:nth-child(1)", {
  scrollTrigger: {
    trigger: ".pricing-card:nth-child(2)",
    scroller: document.body,
    start: "top 75%",
    end: "top 75%",
   
  },
  x: -100,
  y: 150,
  opacity: 0,
  ease: "power4.out",
  duration: 1,
}); // first card

gsap.from(".pricing-card:nth-child(3)", {
  scrollTrigger: {
    trigger: ".pricing-card:nth-child(3)",
    scroller: document.body,
    start: "top 75%",
    end: "top 75%",
    
  },
  x: 100,
  y: 150,
  opacity: 0,
  ease: "power4.out",
  duration: 1,
});