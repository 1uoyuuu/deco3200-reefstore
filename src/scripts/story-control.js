// initialise data for slider
const fishNarrative = [
  "My name is Fin and I love my home, it's so colourful and I have many coral and fish friends here!",
  "Lately I have seen a lot of humans come into the reef getting really close to it and touching it.",
  "But it's not good to do that... Touching the coral hurts them and some even die...",
  "Hey, Mr.Coral, are you feeling well? You're a lot less brighter than I remember...",
  "T.T, I really miss my home and all my friends...",
];
const coralNarrative = [
  "My name is Corina, I am a coral living in a very beautiful reef. Many people come here to see our beauty and I don't mind it!",
  "But hey, I don't like it when you get too close to me... I am a living being just like you...",
  "I have a protective layer that give structure to myself and people touching it can damage me...",
  "I cannot fend for myself when this happens and a lot of us will lose our lives...",
];
const FISH_IMAGE_PATH = "/src/images/story/s3p";
const CORAL_IMAGE_PATH = "/src/images/story/s2p";
const fishImg = document.querySelector("#learn-story .little-fish");
const coralImg = document.querySelector("#learn-story .little-coral");

function createStory(character) {
  const narrative = character === "Fin" ? fishNarrative : coralNarrative;
  const imagePath = character === "Fin" ? FISH_IMAGE_PATH : CORAL_IMAGE_PATH;
  //get containers
  const textControlContainer = document.getElementById("story-text-container");
  const imageContainer = document.getElementById("story-image");

  let count = 0; //initilise the count as 0 for simplicity;
  //fill the story with first image and text
  imageContainer.innerHTML = `<img class="show-on-scroll" src="${imagePath}${
    count + 1
  }.jpg" alt="illustration of marine life story">
  <img src="" alt="" style="display:none;" id="preloaded-image">`;

  textControlContainer.innerHTML = `<p id="story-text"><b>${character}:</b> ${narrative[count]}</p>
  <div id="story-control">
      <button class="arrow-btn"><svg width="44" height="34" viewBox="0 0 44 34" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2.3125 17L44.3125 17" stroke="black" stroke-width="2" />
              <path d="M18 1L2 17L18 33" stroke="black" stroke-width="2" />
          </svg></button>
      <div class="progress-container">
      </div>
      <button class="arrow-btn"><svg width="44" height="34" viewBox="0 0 44 34" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M42 17H0" stroke="black" stroke-width="2" />
              <path d="M26.3125 33L42.3125 17L26.3125 0.999998" stroke="black" stroke-width="2" />
          </svg></button>
  </div>`;
  //get the actual text container after setting up the text
  const textContainer = document.getElementById("story-text");

  //get image number
  const imageCount = narrative.length;

  //get the progress container and create dots for each story
  const progressContainer = document.querySelector(
    "#story-control .progress-container"
  );
  for (let i = 0; i < imageCount; i++) {
    let dot = document.createElement("span");
    i === 0
      ? (dot.className = "progress-dot active")
      : (dot.className = "progress-dot");
    progressContainer.appendChild(dot);
  }
  //get controls
  const nextBtn = document.querySelector("#story-control > button:last-child");
  const backBtn = document.querySelector("#story-control > button:first-child");
  const progressDots = document.querySelectorAll(
    "#story-control .progress-dot"
  );
  //get images
  const visibleImage = imageContainer.querySelector("img:nth-child(1)");
  const hiddenImage = document.getElementById("preloaded-image");

  nextBtn.addEventListener("click", () => {
    progressDots[count].classList.remove("active");
    count++;
    //if already reach the end, go back to the start
    if (count == imageCount) {
      count = 0;
    }
    progressDots[count].classList.add("active");
    hiddenImage.src = `${imagePath}${count + 1}.jpg`;
    hiddenImage.onload = function () {
      visibleImage.src = hiddenImage.src;
      textContainer.innerHTML = `<b>${character}:</b> ${narrative[count]}`;
    };
  });
  backBtn.addEventListener("click", () => {
    progressDots[count].classList.remove("active");
    count--;
    //if already reach the beginning, go to the end
    if (count < 0) {
      count = imageCount - 1;
    }
    progressDots[count].classList.add("active");
    hiddenImage.src = `${imagePath}${count + 1}.jpg`;

    hiddenImage.onload = function () {
      visibleImage.src = hiddenImage.src;
      textContainer.innerHTML = `<b>${character}:</b> ${narrative[count]}`;
    };
  });
}

fishImg.addEventListener("click", () => {
  createStory("Fin");
});

coralImg.addEventListener("click", () => {
  createStory("Corina");
});
