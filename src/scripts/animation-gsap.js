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
      markers: true, //marker helper
    },
    defaults: { ease: "none" },
  });
  // animate the container one way...
  tl.fromTo(
    section.querySelector(".after-image"),
    { xPercent: 100, x: 0 },
    { xPercent: 0 }
  )
    // ...and the image the opposite way (at the same time)
    .fromTo(
      section.querySelector(".after-image img"),
      { xPercent: -100, x: 0 },
      { xPercent: 0 },
      0
    );
});
