//Import the THREE.js library
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture.js";
import GUI from "lil-gui";

// Global variables
let scene;
let camera;
let renderer;
let mesh;
let material;
let lights = [];
// ***********************************
// *      Customiser GUI Setup       *
// ***********************************
const customiser = document.getElementById("coral-customiser");
const gui = new GUI({
  container: customiser,
  title: "Coral Customiser",
});
material = {
  type: "acropora",
  roughness: 1,
  metalness: 0,
  baseColor: "#ff5c64",
  emissive: "#000000",
};
gui.add(material, "type", ["acropora", "branch", "lobo"]).onFinishChange(() => {
  initCoral("type-" + material.type);
});
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "roughness", 0, 1); //slider
materialFolder.add(material, "metalness", 0, 1); //slider
materialFolder.addColor(material, "baseColor");
materialFolder.addColor(material, "emissive");

materialFolder.onChange(() => {
  setMaterial(material, mesh);
});

// ********************************
// *      Image Capture Setup     *
// ********************************
let snap = false;

const capture = () => {
  const cav = document.querySelector("#coral-inspector canvas");
  const base64 = cav.toDataURL("img/png");
  sessionStorage.setItem("capturedImage", base64); //save the image for displaying in another window
  console.log("Image saved in sessionStorage");
};
document.getElementById("go-donate-btn").addEventListener("click", (e) => {
  snap = true;
});

document.getElementById("save-btn").addEventListener("mouseover", (e) => {
  console.log("HOVERING OVER");
  snap = true;
  const dataURL = sessionStorage.getItem("capturedImage");
  console.log(dataURL);
  const link = document.getElementById("save-btn");
  link.href = dataURL;
  link.download = "my-coral.png";
});
//Create a Three.JS Scene
// **************************
// *      Scene Setup       *
// **************************
function initScene() {
  scene = new THREE.Scene();
  const coralContainer = document.getElementById("coral-inspector");

  //create a new camera with positions and angles
  // **************************
  // *      Camera Setup      *
  // **************************
  camera = new THREE.PerspectiveCamera(
    75,
    coralContainer.offsetWidth / coralContainer.offsetHeight,
    0.1,
    1000
  );
  //Set how far the camera will be from the 3D model
  camera.position.z = 15;
  // **************************
  // *    Renderer Setup      *
  // **************************
  //Instantiate a new renderer and set its size
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  //Alpha: true allows for the transparent background
  renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  coralContainer.appendChild(renderer.domElement);
  // **************************
  // *    Lighting Setup      *
  // **************************
  //Add lights to the scene, so we can actually see the 3D model
  const frontLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  frontLight.position.set(0, 0, 50);
  scene.add(frontLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 1); // You can adjust the intensity
  backLight.position.set(0, 0, -50); // Opposite direction to the front light
  scene.add(backLight);

  const leftLight = new THREE.DirectionalLight(0xffffff, 2); // You can adjust the intensity
  leftLight.position.set(-50, 0, 0); // Opposite direction to the front light
  scene.add(leftLight);
  const rightLight = new THREE.DirectionalLight(0xffffff, 2); // You can adjust the intensity
  rightLight.position.set(50, 0, 0); // Opposite direction to the front light
  scene.add(rightLight);

  scene.traverse((object) => {
    if (object instanceof THREE.DirectionalLight) {
      lights.push(object);
    }
  });
  //OrbitControls allow the camera to move around the scene
  // **************************
  // *    Control Setup       *
  // **************************
  let controls;
  //This adds controls to the camera, so we can rotate / zoom it with the mouse
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 3;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.1;
  controls.autoRotate = true; // Toggle this if you'd like the chair to automatically rotate
  controls.autoRotateSpeed = 2; // 30
  // **************************
  // *    Animation Setup     *
  // **************************
  //Render the scene
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (snap) {
      capture();
      snap = false;
    }
  }
  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = coralContainer.offsetWidth / coralContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(coralContainer.offsetWidth, coralContainer.offsetHeight);
  });

  animate();
}

setupMSF(document.getElementById("create-form"));
//for the simplicity of this demo, there will be no information operation or actually submitting the form here
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the form from submitting
  snap = true; //save the newly coral
  window.location.href = "/get-involved/";
});

const coralDescription = {
  acropora:
    "Acropora is a genus of small polyp stony coral in the phylum Cnidaria. Some of its species are known as table coral, elkhorn coral, and staghorn coral. Acropora species are some of the major reef corals responsible for building the immense calcium carbonate substructure that supports the thin living skin of a reef.",
  branch:
    "Colonies of branch coral consist of thick upright, and sometimes horizontal, branches growing from a sprawling or encrusting base. There are side branches and small branchlets which resemble knobs. The corallites are evenly spread. The colour of this coral varies, and may be pinkish-brown or some shade of green.",
  lobo: "Lobophyllia, commonly called lobed brain coral or lobo coral, is a genus of large polyp stony corals. Members of this genus are sometimes found in reef aquariums.",
};
function initCoral(coralType) {
  const heading = document.getElementById("coral-type-heading");
  const description = document.getElementById("coral-description");

  const coralName = coralType.substring(5);
  heading.textContent = `How would you like to customise your ${coralName} coral?`;
  description.textContent = `${coralDescription[`${coralName}`]}`;
  // **************************
  // *      Mesh Setup        *
  // **************************
  const MODEL_PATH = `/src/models/${coralType}/model.gltf`;
  console.log("trying to load model: " + coralType);
  // **************************
  // *      Loader Setup      *
  // **************************

  // Destroy existing coral if there is any.
  DestroyCoral(mesh);
  const loader = new GLTFLoader();
  loader.load(
    MODEL_PATH,
    function (gltf) {
      mesh = gltf.scene;
      // Offset the y position a bit
      mesh.position.y = -5;
      // Set the models initial scale
      if (coralType === "type-branch") {
        mesh.scale.set(0.5, 0.5, 0.5);
      } else if (coralType === "type-acropora") {
        mesh.position.y = -10;
      } else if (coralType === "type-lobo") {
        mesh.position.y = -3;
      }
      // **************************
      // *    Material Setup      *
      // **************************
      setMaterial(material, mesh);

      // Add the model to the scene
      scene.add(mesh);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
function initPreset(coralType) {
  // **************************
  // *      Mesh Setup        *
  // **************************
  const MODEL_PATH = `/src/models/preset/${coralType}/model.gltf`;
  console.log("trying to load model: " + coralType);
  // **************************
  // *      Loader Setup      *
  // **************************
  // Destroy existing coral if there is any.
  DestroyCoral(mesh);
  const loader = new GLTFLoader();
  loader.load(
    MODEL_PATH,
    function (gltf) {
      mesh = gltf.scene;
      // Offset the y position a bit
      mesh.position.y = -5;
      // Set the models initial scale
      if (coralType === "preset-1") {
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.position.y = -10;
      } else if (coralType === "preset-2") {
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.position.y = -15;
      } else if (coralType === "preset-3") {
        mesh.scale.set(0.6, 0.6, 0.6);
        mesh.position.y = -12;
      } else if (coralType === "preset-4") {
        mesh.scale.set(0.3, 0.3, 0.3);
        mesh.position.y = -10;
      } else if (coralType === "preset-5") {
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.position.y = 3;
      } else if (coralType === "preset-6") {
        mesh.scale.set(1.2, 1.2, 1.2);
        mesh.position.y = -10;
      } else if (coralType === "preset-7") {
        mesh.scale.set(1.4, 1.4, 1.4);
        mesh.position.y = -10;
      } else if (coralType === "preset-8") {
        mesh.scale.set(0.9, 0.9, 0.9);
        mesh.position.y = -7;
      } else if (coralType === "preset-9") {
        mesh.position.y = -12;
      } else if (coralType === "preset-10") {
        mesh.position.y = -10;
      } else if (coralType === "preset-11") {
        mesh.scale.set(1.4, 1.4, 1.4);
        mesh.position.y = -7;
      } else if (coralType === "preset-12") {
        mesh.scale.set(1.4, 1.4, 1.4);
        mesh.position.y = -10;
      } else if (coralType === "preset-13") {
        mesh.scale.set(1.4, 1.4, 1.4);
        mesh.position.y = -7;
      } else if (coralType === "preset-14") {
        mesh.scale.set(0.6, 0.6, 0.6);
        mesh.position.y = -12;
      }
      // **************************
      // *    Material Setup      *
      // **************************

      // Add the model to the scene
      scene.add(mesh);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}
function setMaterial(material, mesh) {
  const texture = new THREE.CanvasTexture(new FlakesTexture());
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 10;
  texture.repeat.y = 8;

  const materialConstructor = {
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    metalness: material.metalness,
    roughness: material.roughness,
    color: parseInt("0x" + material.baseColor.substring(1)),
    emissive: parseInt("0x" + material.emissive.substring(1)),
    normalMap: texture,
    normalScale: new THREE.Vector2(0.15, 0.15),
  };
  // const newMaterial = new THREE.MeshStandardMaterial({
  //   color: parseInt("0x" + material.baseColor.substring(1)),
  //   emissive: parseInt("0x" + material.emissive.substring(1)),
  //   metalness: material.metalness,
  //   roughness: material.roughness,
  // });
  const newMaterial = new THREE.MeshPhysicalMaterial(materialConstructor);
  mesh.traverse((o) => {
    if (o.isMesh) {
      o.material = newMaterial;
    }
  });
}

//this function will setup a multistep display for different form
//it require the form element as parameter and will generate relevant functioanlities
function setupMSF(form) {
  //toggle between different pages by adding/removing class name
  const showPage = (element) => {
    element.classList.add("msf-show");
    element.classList.remove("msf-hide");
  };
  const hidePage = (element) => {
    element.classList.add("msf-hide");
    element.classList.remove("msf-show");
  };

  let msfPages = document.querySelectorAll(`#${form.id} > .form-page`);
  //arrow function to display or hide the page
  //declare the total page count of the form and current page
  let msfIndex = 0;
  let currentPage = msfPages[msfIndex];
  showPage(currentPage);
  //get all the buttons
  const backBtns = document.querySelectorAll(`#${form.id} .back-btn`);
  const nextBtns = document.querySelectorAll(`#${form.id} .next-btn`);
  //remove the back button for the first page, and the next button for the last page
  backBtns[0].classList.add("msf-visually-hide");
  nextBtns[msfPages.length - 1].classList.add("msf-hide");

  //move the 3d inspector from result section and cutomise section
  const customiseSection = document.getElementById("customise-section");
  const resultSection = document.getElementById("result-section");
  const coralInspector = document.getElementById("coral-inspector");
  const coralCustomiser = document.getElementById("coral-customiser");
  const resultButtons = document.getElementById("result-buttons");

  const createOptions = document.querySelectorAll(".create-option");
  const coralOptions = document.querySelectorAll(".preset-option");

  let designMode, coralPreset;
  createOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      createOptions.forEach((opt) => opt.classList.remove("active-option"));
      opt.classList.add("active-option");
      designMode = document.querySelector(".create-option.active-option").id;
      nextBtns[0].disabled = false;
    });
  });
  coralOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      coralOptions.forEach((opt) => opt.classList.remove("active-option"));
      opt.classList.add("active-option");
      coralPreset = document
        .querySelector(".preset-option.active-option")
        .getAttribute("data-number");
      nextBtns[1].disabled = false;
    });
  });

  //By default the nextBtn should be disabled until user select a design mode
  nextBtns[0].disabled = true;
  nextBtns[1].disabled = true;

  //user can always goes back to the previous page without any problem
  //so the back buttons should work when user click it
  backBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      //prevent automatically refreshing the page
      event.preventDefault();
      hidePage(currentPage);
      if (designMode === "option-make-your-own" && msfIndex == 2) {
        msfIndex--;
      }
      if (designMode === "option-choose-preset" && msfIndex == 3) {
        msfIndex--;
      }
      if (msfIndex !== 0) {
        //decrement the page index
        msfIndex--;
      }
      //change the current page
      currentPage = msfPages[msfIndex];
      showPage(currentPage);

      if (msfIndex == 2) {
        customiseSection.insertBefore(coralInspector, coralCustomiser);
        if (mesh && scene) {
          DestroyCoral(mesh);
        } else {
          initScene();
        }
        initCoral("type-" + material.type);
      }

      if (msfIndex == 3) {
        resultSection.insertBefore(coralInspector, resultButtons);
      }
    });
  });
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      //prevent automatically refreshing the page
      event.preventDefault();
      hidePage(currentPage);
      if (designMode === "option-make-your-own" && msfIndex == 0) {
        msfIndex++;
      }
      if (designMode === "option-choose-preset" && msfIndex == 1) {
        msfIndex++;
      }
      if (msfIndex !== msfPages.length - 1) {
        //decrement the page index
        msfIndex++;
      }
      //change the current page
      currentPage = msfPages[msfIndex];
      showPage(currentPage);
      if (msfIndex == 2) {
        customiseSection.insertBefore(coralInspector, coralCustomiser);
        if (mesh && scene) {
          DestroyCoral(mesh);
        } else {
          initScene();
        }
        lights.forEach((light) => {
          light.intensity = 2;
        });
        camera.position.z = 15;
        initCoral("type-" + material.type);
      }

      if (msfIndex == 3) {
        resultSection.insertBefore(coralInspector, resultButtons);
      }
      if (designMode == "option-choose-preset" && msfIndex == 3) {
        if (mesh && scene) {
          DestroyCoral(mesh);
        } else {
          initScene();
        }
        lights.forEach((light) => {
          light.intensity = 5;
        });
        camera.position.z = 40;
        initPreset("preset-" + coralPreset); // need fix
      }
    });
  });
}

function DestroyCoral(mesh) {
  if (mesh) {
    // Remove old model from scene
    console.log("removing our coral mesh....");
    scene.remove(mesh);
  }
}
