import createGlobe from "cobe";

// current angle
let currentPhi = 0;
let currentTheta = 0;

let canvas = document.getElementById("cobe");

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
    { location: [9.19, 121.88], size: 0.03 }, // Tubbataha Reef, Philippines
    { location: [-0.47, 130.84], size: 0.03 }, // Raja Ampat, Indonesia
    { location: [8.64, 97.64], size: 0.03 }, // Similan Islands, Thailand
    { location: [38.55, -28.64], size: 0.03 }, // Azores, Portugal
    { location: [36.0, 30.0], size: 0.03 }, // Mediterranean Coast, Turkey
    { location: [17.5, -88.2], size: 0.03 }, // Mesoamerican Reef, Belize
    { location: [12.5, -70.0], size: 0.03 }, // Molokai Reef, Aruba
    { location: [-23.44, 151.91], size: 0.03 }, // Great Barrier Reef, Australia
    { location: [-21.93, 113.93], size: 0.03 }, // Ningaloo Coast, Western Australia
    { location: [-15.28, 124.58], size: 0.03 }, // Montgomery Reef, Western Australia
    { location: [-0.95, -90.96], size: 0.03 }, // Galapagos Islands, Ecuador
    { location: [12.15, -68.27], size: 0.03 }, // Bonaire, Venezuela
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
