import "/src/scripts/navigation.js";
import "/src/scripts/parallex.js";
import "/src/scripts/show-on-scroll.js";
import "/src/scripts/msf-control.js"; //for switching to different section of coral's importance
import "/src/scripts/story-control.js";

import gsap from "gsap";
const grid = document.querySelector(".expansion-grid");
const items = document.querySelectorAll(".expansion-item");

items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(grid, {
      "--track": "2fr",
      duration: 0.3,
    });
    gsap.to(item, {
      "--innerTrack": "1fr",
      duration: 0.3,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(grid, {
      "--track": "1fr",
      duration: 0.3,
    });
    gsap.to(item, {
      "--innerTrack": "0fr",
      duration: 0.3,
    });
  });
});
