document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const menuBtn = document.getElementById("menu-btn");
  const topNav = document.getElementById("top-nav");
  const topNavOverlay = document.getElementById("top-nav-overlay");
  const overlayMenuListItems = document.querySelectorAll("#overlay-menu ul li");

  // Define colors
  const colors = {
    0: "#fa969a", // pink
    1: "#71de92", // green
    2: "#6bbffc", // blue
    3: "#f8b971", // orange
  };

  topNav.style.backgroundColor = topNavOverlay.classList.contains("open")
    ? ""
    : "#f9f8ff";

  // Menu button click event
  menuBtn.addEventListener("click", function () {
    topNavOverlay.classList.toggle("open");
    this.textContent = topNavOverlay.classList.contains("open")
      ? "(Close)"
      : "(Menu)";
    topNav.style.backgroundColor = topNavOverlay.classList.contains("open")
      ? ""
      : "#f9f8ff";
    // Disable or enable body scrolling based on whether the overlay is open
    document.body.style.overflow = topNavOverlay.classList.contains("open")
      ? "hidden"
      : "auto";
  });

  // Hover events for each list item
  overlayMenuListItems.forEach((li, index) => {
    li.addEventListener("mouseover", function () {
      topNavOverlay.style.backgroundColor = colors[index];
    });
    li.addEventListener("mouseout", function () {
      topNavOverlay.style.backgroundColor = ""; // Revert to default when hover ends
    });
  });
});

// logo scrolling spin animation setup
window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
  },
  false
);
