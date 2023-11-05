// initialise data for slider
const headings = [
  "Biodiversity Habitats",
  "Coastal Protection",
  "Food Resource",
  "Wealth for Tourism",
];
const descriptions = [
  "Corals represent an exceptional biodiversity, and are present in both tropical and cold waters. Scientists estimate that coral reefs are home to more than 25% of marine species and yet they cover less than 0.2% of the ocean. Corals are also at the core of the formation of other ecosystems.",
  "Reefs only cover 0.2% of the oceans. Yet they protect more than 150,000 kilometres of coastline in more than 100 countries and territories. They can form a barrier that absorbs wave energy and thus help reduce coastal erosion.",
  "Approximately 1 billion people live within 100 kilometres of coral reefs and are likely to benefit from their ecosystem services. 500 million people directly depend on them, i.e. almost 8% of the world’s population, in terms of coastal protection, fisheries resources and tourism.",
  "Reefs are often an essential part in the economy of the tropical regions where they are located. They attract divers, snorkelers, recreational fishermen and beach and white sand enthusiasts.",
];

//preload the images
const IMAGE_PATH = "/src/images/importance/learn-importance-";
const imageCount = 4;

//get containers
const textContainer = document.getElementById("importance-text");
const imageContainer = document.getElementById("importance-image");

//get controls
const nextBtn = document.querySelector(
  "#importance-control > button:last-child"
);
const backBtn = document.querySelector(
  "#importance-control > button:first-child"
);

//get images
const visibleImage = imageContainer.querySelector("img:nth-child(1)");
const hiddenImage = document.getElementById("preloaded-image");

const progressDots = document.querySelectorAll(".progress-dot");
console.log(progressDots);

let count = 0; //initilise the count as 0 for simplicity;

nextBtn.addEventListener("click", () => {
  progressDots[count].classList.remove("active");
  count++;
  //if already reach the end, go back to the start
  if (count == 4) {
    count = 0;
  }
  progressDots[count].classList.add("active");

  hiddenImage.src = `${IMAGE_PATH}${count + 1}.jpg`;

  hiddenImage.onload = function () {
    visibleImage.src = hiddenImage.src;
    textContainer.innerHTML = `<h2>${headings[count]}</h2><p>${descriptions[count]}</p>`;
  };
});
backBtn.addEventListener("click", () => {
  progressDots[count].classList.remove("active");
  count--;
  //if already reach the beginning, go to the end
  if (count < 0) {
    count = 3;
  }
  progressDots[count].classList.add("active");

  hiddenImage.src = `${IMAGE_PATH}${count + 1}.jpg`;

  hiddenImage.onload = function () {
    visibleImage.src = hiddenImage.src;
    textContainer.innerHTML = `<h2>${headings[count]}</h2><p>${descriptions[count]}</p>`;
  };
});
