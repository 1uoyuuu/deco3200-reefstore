// //Import the THREE.js library
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// import GUI from "lil-gui";

// // ***********************************
// // *      Customiser GUI Setup       *
// // ***********************************
// const customiser = document.getElementById("coral-customiser");
// const gui = new GUI({
//   container: customiser,
//   title: "Coral Customiser",
// });
// let material = {
//   type: "one",
//   roughness: 0.4,
//   metalness: 0,
//   baseColor: "#AA00FF",
//   emissive: "#ffffff",
// };
// gui.add(material, "type", ["one", "two", "three"]).onFinishChange(() => {
//   initCoral("coral_type_" + material.type);
// });
// const materialFolder = gui.addFolder("Material");
// materialFolder.add(material, "roughness", 0, 1); //slider
// materialFolder.add(material, "metalness", 0, 1); //slider
// materialFolder.addColor(material, "baseColor");
// materialFolder.addColor(material, "emissive");

// materialFolder.onChange(() => {
//   setMaterial(material, mesh);
// });

// setupMSF(document.getElementById("create-form"));

// //this function will setup a multistep display for different form
// //it require the form element as parameter and will generate relevant functioanlities
// function setupMSF(form) {
//   //toggle between different pages by adding/removing class name
//   const showPage = (element) => {
//     element.classList.add("msf-show");
//     element.classList.remove("msf-hide");
//   };
//   const hidePage = (element) => {
//     element.classList.add("msf-hide");
//     element.classList.remove("msf-show");
//   };

//   let msfPages = document.querySelectorAll(`#${form.id} > .form-page`);
//   //arrow function to display or hide the page
//   //declare the total page count of the form and current page
//   let msfIndex = 0;
//   let currentPage = msfPages[msfIndex];
//   showPage(currentPage);
//   //get all the buttons
//   const backBtns = document.querySelectorAll(`#${form.id} .back-btn`);
//   const nextBtns = document.querySelectorAll(`#${form.id} .next-btn`);
//   //remove the back button for the first page, and the next button for the last page
//   backBtns[0].classList.add("msf-visually-hide");
//   nextBtns[msfPages.length - 1].classList.add("msf-hide");
//   //if the form is gadget form, then some magical tweak will be added,

//   //user can always goes back to the previous page without any problem
//   //so the back buttons should work when user click it
//   backBtns.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       //prevent automatically refreshing the page
//       event.preventDefault();
//       hidePage(currentPage);
//       if (msfIndex !== 0) {
//         //decrement the page index
//         msfIndex--;
//       }
//       nextBtns[msfIndex].disabled = false;
//       //change the current page
//       currentPage = msfPages[msfIndex];
//       showPage(currentPage);
//     });
//   });
//   nextBtns.forEach((btn) => {
//     btn.addEventListener("click", (event) => {
//       //prevent automatically refreshing the page
//       event.preventDefault();
//       hidePage(currentPage);
//       if (msfIndex !== msfPages.length - 1) {
//         //decrement the page index
//         msfIndex++;
//       }
//       nextBtns[msfIndex].disabled = false;
//       //change the current page
//       currentPage = msfPages[msfIndex];
//       showPage(currentPage);

//       if (msfIndex == 2) {
//         initCoral("coral_type_one");
//       }
//     });
//   });
// }

// function initCoral(coralType) {
//   //Create a Three.JS Scene
//   // **************************
//   // *      Scene Setup       *
//   // **************************
//   const scene = new THREE.Scene();
//   const coralContainer = document.getElementById("coral-inspector");

//   //create a new camera with positions and angles
//   // **************************
//   // *      Camera Setup      *
//   // **************************
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     coralContainer.offsetWidth / coralContainer.offsetHeight,
//     0.1,
//     1000
//   );
//   //Set how far the camera will be from the 3D model
//   camera.position.z = 10;

//   // **************************
//   // *    Material Setup      *
//   // **************************
//   // Initial material
//   const INITIAL_MTL = new THREE.MeshStandardMaterial({
//     color: 0x00ff00,
//     metalness: 0.2,
//     roughness: 0.4,
//   });

//   // **************************
//   // *      Mesh Setup        *
//   // **************************
//   let mesh;
//   const MODEL_PATH = `/src/models/${coralType}/scene.gltf`;

//   // **************************
//   // *      Loader Setup      *
//   // **************************
//   const loader = new GLTFLoader();
//   loader.load(
//     MODEL_PATH,
//     function (gltf) {
//       mesh = gltf.scene;

//       // Set the models initial scale
//       mesh.scale.set(1, 1, 1);
//       mesh.rotation.y = Math.PI / 4;

//       // Offset the y position a bit
//       mesh.position.y = -3;

//       mesh.traverse((o) => {
//         if (o.isMesh) {
//           o.material = INITIAL_MTL;
//         }
//       });

//       // Add the model to the scene
//       scene.add(mesh);
//     },
//     undefined,
//     function (error) {
//       console.error(error);
//     }
//   );

//   // **************************
//   // *    Renderer Setup      *
//   // **************************
//   //Instantiate a new renderer and set its size
//   const renderer = new THREE.WebGLRenderer({
//     alpha: true,
//     canvas: document.querySelector("#coral-inspector canvas"),
//   }); //Alpha: true allows for the transparent background
//   renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);

//   // **************************
//   // *    Lighting Setup      *
//   // **************************
//   const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
//   topLight.position.set(500, 500, 500); //top-left-ish
//   topLight.castShadow = true;
//   scene.add(topLight);

//   const ambientLight = new THREE.AmbientLight(0x333333, 5);
//   scene.add(ambientLight);

//   //OrbitControls allow the camera to move around the scene
//   // **************************
//   // *    Control Setup       *
//   // **************************
//   let controls;
//   //This adds controls to the camera, so we can rotate / zoom it with the mouse
//   controls = new OrbitControls(camera, renderer.domElement);
//   controls.maxPolarAngle = Math.PI / 2;
//   controls.minPolarAngle = Math.PI / 3;
//   controls.enableDamping = true;
//   controls.enablePan = false;
//   controls.dampingFactor = 0.1;
//   controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
//   controls.autoRotateSpeed = 0.2; // 30
//   // **************************
//   // *    Animation Setup     *
//   // **************************
//   //Render the scene
//   function animate() {
//     controls.update();
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
//   }
//   animate();

//   //Add a listener to the window, so we can resize the window and the camera
//   window.addEventListener("resize", function () {
//     camera.aspect = coralContainer.offsetWidth / coralContainer.offsetHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);
//   });
// }

// function setMaterial(material, mesh) {
//   const newMaterial = new THREE.MeshStandardMaterial({
//     color: parseInt("0x" + material.baseColor.substring(1)),
//     emissive: parseInt("0x" + material.emissive.substring(1)),
//     metalness: material.metalness,
//     roughness: material.roughness,
//   });
//   mesh.traverse((o) => {
//     if (o.isMesh) {
//       o.material = newMaterial;
//     }
//   });
// }
