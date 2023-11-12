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
  gltf.scene.position.set(0, 0, 2);
  scene.add(gltf.scene);
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

const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(5, 3, 10);

scene.add(light);

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
camera.position.set(-3, 5, 15);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.transparent = true;
      intersects[i].object.material.opacity = 0.5;
    }
  }
};

const onClick = () => {
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const targetPosition = intersects[0].object.position.clone();
    console.log(targetPosition);
    gsap.to(camera.position, {
      x: targetPosition.x + 4,
      y: targetPosition.y,
      z: targetPosition.z, // Move the camera a bit away from the object
      duration: 1,
    });

    console.log("you clicked the object");
  }
};

const animate = () => {
  controls.update();
  resetHover();
  // hoverObjects();
  raycaster.setFromCamera(pointer, camera);
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

window.addEventListener("click", onClick);
window.addEventListener("pointermove", onPointerMove);
