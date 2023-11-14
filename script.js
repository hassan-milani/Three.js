import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { gsap } from "gsap/gsap-core";

/**
 * Canvas
 */
const canvas = document.querySelector(".webgl");

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 *  3D MODELS
 *
 */

const loader = new GLTFLoader();
loader.load("./REY.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  const mainScene = gltf.scene;
  mainScene.name = "mainScene";
  mainScene.position.set(0, 0, 2);
  scene.add(mainScene);
});

loader.load("./Screen1.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(0, 0, 2);
  scene.add(gltf.scene);
});
loader.load("./Screen2.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(0, 0, 2);
  scene.add(gltf.scene);
});
loader.load("./wideSreen.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(0, 0, 2);
  scene.add(gltf.scene);
});
loader.load("./floor.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(0, 0, 2);
  gltf.scene.scale.set(5, 5, 5);
  scene.add(gltf.scene);
});
loader.load("./Light.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(0.35, 0, 2);
  scene.add(gltf.scene);
});
loader.load("./Light.glb", function (gltf) {
  //If the file is loaded, add it to the scene
  gltf.scene.position.set(1.55, 0, 2);
  scene.add(gltf.scene);
});

//lights

const ambientLight = new THREE.AmbientLight(0x6600cc, 0.2);
scene.add(ambientLight);

const lamp = new THREE.PointLight(0xfa8072, 15);
lamp.position.set(0, 1.7, 3.5);
scene.add(lamp);

const lamp1 = new THREE.PointLight(0x0066ff, 10);
lamp1.position.set(-1.5, 3, 3.5);
scene.add(lamp1);

const lamp2 = new THREE.PointLight(0x0066ff, 10);
lamp2.position.set(2, 2.5, -2);
scene.add(lamp2);

const lamp3 = new THREE.PointLight(0x0066ff, 10);
lamp3.position.set(-3, 2.5, -1);
scene.add(lamp3);

const lamp4 = new THREE.PointLight(0xfa8072, 5);
lamp4.position.set(-3, 1.3, 1);
scene.add(lamp4);

const diractionalLight = new THREE.DirectionalLight(0x6600cc, 1);
scene.add(diractionalLight);
console.log(scene);

const spotLight = new THREE.SpotLight(0xffffff, 3);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLightHelper);
spotLight.angle = 2;
spotLight.position.set(0, 4, 2.6);
spotLight.rotation.set(-1, 0, 0);
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xffffff, 3, 5, 3);
const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
//scene.add(spotLightHelper2);
spotLight2.position.set(-1.2, 4, 2.6);
spotLight2.rotation.set(-1, 0, 0);
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 100);
spotLight3.decay = 3;
const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
//scene.add(spotLightHelper3);
spotLight3.position.set(-1.2, 10, 0);
scene.add(spotLight3);
//pointer
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * View Size
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Camera

const camera = new THREE.PerspectiveCamera(
  40,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-7, 0.2, 17);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 2, 0);
controls.keys = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  BOTTOM: "ArrowDown",
  RIGHT: "ArrowRight",
};

controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 0.2;
controls.maxDistance = 20;
controls.listenToKeyEvents(window);
// Raycaster
var raycaster = new THREE.Raycaster();

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const resetHover = () => {
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].material) {
      scene.children[i].material.opacity = 1.0;
    }
  }
};

const hoverObjects = () => {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children.slice(0, 5));

  if (intersects.length > 0) {
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      intersects[i].object.material.opacity = 0.5;
    }
  }
};

const onClick = () => {
  raycaster.setFromCamera(pointer, camera);
  console.log(camera.position);
  let intersects = raycaster.intersectObjects(scene.children);
  console.log(controls.target, "00");
  console.log(camera.position, "11");
  if (intersects.length > 0) {
    const targetPosition = intersects[0].object.name;
    console.log(targetPosition);
    switch (targetPosition) {
      case "Cube034_1":
        gsap.to(camera.position, {
          x: 4.3,
          y: 2.6,
          z: 0.25, // Move the camera a bit away from the object
          duration: 1,
        });
        gsap.to(controls.target, {
          x: -0.06,
          y: 2.47,
          z: 0.029, // Move the camera a bit away from the object
          duration: 1,
        });
        break;
      case "Cube037_1":
        gsap.to(camera.position, {
          x: 2.4,
          y: 0.9,
          z: 0.95, // Move the camera a bit away from the object
          duration: 1,
        });
        gsap.to(controls.target, {
          x: -0.101,
          y: 0.67,
          z: 0.87, // Move the camera a bit away from the object
          duration: 1,
        });
        break;
      case "Cube036_1":
        gsap.to(camera.position, {
          x: 2.48,
          y: 0.85,
          z: -0.92, // Move the camera a bit away from the object
          duration: 1,
        });
        gsap.to(controls.target, {
          x: -0.054,
          y: 0.741,
          z: -0.87, // Move the camera a bit away from the object
          duration: 1,
        });
        break;
      default:
        break;
    }

    console.log("you clicked the object");
  }
};

const animate = () => {
  controls.update();
  resetHover();
  hoverObjects();
  raycaster.setFromCamera(pointer, camera);
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

window.addEventListener("click", onClick);
window.addEventListener("pointermove", onPointerMove);
