import createGlobe from "cobe";

// current angle
let currentPhi = 0;
let currentTheta = 0;

// rotating angle
let focusPhi = 0;
let focusTheta = 0;

const doublePi = Math.PI * 2;

let canvas = document.getElementById("cobe");

const asia = document.getElementById("asia");
const europe = document.getElementById("europe");
const northAmerica = document.getElementById("north-america");
const oceania = document.getElementById("oceania");
const southAmerica = document.getElementById("south-america");
//goes to europe
asia.addEventListener("mouseover", () => {
  // i don't know how to do it mathematically, so here is manual tweaking
  focusPhi = -1.7;
  focusTheta = 0.8;
});
//goes to central east
europe.addEventListener("mouseover", () => {
  focusPhi = -2.3;
  focusTheta = 0.6;
});
northAmerica.addEventListener("mouseover", () => {
  focusPhi = -2.89;
  focusTheta = 0.4;
});
oceania.addEventListener("mouseover", () => {
  focusPhi = 0.2;
  focusTheta = 1.2;
});
southAmerica.addEventListener("mouseover", () => {
  focusPhi = 0.2;
  focusTheta = 1.2;
});

createGlobe(canvas, {
  devicePixelRatio: 1,
  width: 700,
  height: 700,
  phi: 0,
  theta: 0,
  dark: 0, //Display the globe in dark or light mode, 0 ≤ dark ≤ 1
  diffuse: 1, //diffuse lighting
  scale: 1,
  mapSamples: 20000, //the number of dots
  mapBrightness: 5,
  baseColor: [0.42, 0.749, 0.988],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  offset: [0, 0],
  //A marker is an object of location and size properties. location is a pair of latitude and longitude:
  markers: [
    {
      //phillipines
      location: [8.7, 119.8],
      size: 0.05,
    },
    {
      //indonesia
      location: [-0.8, 130.53],
      size: 0.05,
    },
    {
      //thailand
      location: [8.6, 97.2],
      size: 0.05,
    },
    {
      //australia
      location: [-15.5, 124.14],
      size: 0.05,
    },
  ],
  //A callback function called when a new frame is rendered
  // onRender: (state) => {
  //   // Called on every animation frame.
  //   // `state` will be an empty object, return updated params.
  //   state.phi = currentPhi;
  //   state.theta = currentTheta;
  //   // console.log([currentPhi,currentTheta]);
  //   const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
  //   const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
  //   // Control the speed
  //   if (distPositive < distNegative) {
  //     currentPhi += distPositive * 0.08;
  //   } else {
  //     currentPhi -= distNegative * 0.08;
  //   }
  //   currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
  // },
  onRender: (state) => {
    // Called on every animation frame.
    // `state` will be an empty object, return updated options.
    state.phi = currentPhi;

    // Rotate the globe by 0.01 on every frame.
    currentPhi += 0.01;
  },
});
