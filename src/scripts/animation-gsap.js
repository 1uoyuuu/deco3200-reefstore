import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//homepage before-after image transition
gsap.utils.toArray("#comparison-section").forEach((section) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
      end: () => "+=" + section.offsetWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      // markers: true, //marker helper
    },
    defaults: { ease: "none" },
  });
  // animate the container one way...
  tl.fromTo(
    section.querySelector(".after-image"),
    { xPercent: 300, x: 0 },
    { xPercent: 0 }
  )
    // ...and the image the opposite way (at the same time)
    .fromTo(
      section.querySelector(".after-image img"),
      { xPercent: -300, x: 0 },
      { xPercent: 0 },
      0
    )
    .fromTo(
      section.querySelector(".after-image h1"),
      { opacity: 0 }, // autoAlpha handles both visibility and opacity
      { opacity: 0.8 },
      1 // You can adjust this time to control when the h1 starts fading in relative to the rest of the animation
    );
});
window.onload = function () {
  setTimeout(() => {
    document.body.style.position = "fixed";
    gsap.to("#preloader", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.getElementById("preloader").style.display = "none";
        document.body.style.position = "";
      },
    });
  }, 2000); // give the shadertoy 2 seconds buffer time to complete the loading and hide the gui completely
};
