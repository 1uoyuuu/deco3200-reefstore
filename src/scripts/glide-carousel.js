import Glide from "@glidejs/glide";

const config = {
  type: "slider",
  rewind: true,
  startAt: 0,
  perView: 4,
  autoplay: false, //autoplay the carousel every 2 seconds
  gap: 0, //A size of the gap added between slides.
};

const carousel = document.querySelector(".glide");
const glide = new Glide(".glide", config);

document.addEventListener("DOMContentLoaded", function () {
  //after content fully loaded, then turn on the carousel visibility
  //this helps prevent the image flickering bug when refreshing the page
  carousel.style.visibility = "visible";
  glide.mount();
});
