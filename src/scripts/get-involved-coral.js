//Import the THREE.js library
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();

const coralContainer = document.getElementById("coral-display");
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(
  75,
  coralContainer.offsetWidth / coralContainer.offsetHeight,
  0.1,
  1000
);

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

const model = "/src/models/acropora-coral/model.gltf";
//Load the file
loader.load(
  model,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.position.y = -20;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector("#coral-display canvas"),
}); //Alpha: true allows for the transparent background
renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);
//Set how far the camera will be from the 3D model
camera.position.z = 36;

//Add lights to the scene, so we can actually see the 3D model
const frontLight = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
frontLight.position.set(0, 0, 50);
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xffffff, 10); // You can adjust the intensity
backLight.position.set(0, 0, -50); // Opposite direction to the front light
scene.add(backLight);

const leftLight = new THREE.DirectionalLight(0xffffff, 15); // You can adjust the intensity
leftLight.position.set(-50, 0, 0); // Opposite direction to the front light
scene.add(leftLight);
const rightLight = new THREE.DirectionalLight(0xffffff, 15); // You can adjust the intensity
rightLight.position.set(50, 0, 0); // Opposite direction to the front light
scene.add(rightLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
controls = new OrbitControls(camera, renderer.domElement);
//Turn on the autorotate property of OrbitControls
controls.autoRotate = true;
controls.update();
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  controls.update();
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = coralContainer.offsetWidth / coralContainer.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);
});

//Start the 3D rendering
animate();
