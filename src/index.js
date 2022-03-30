import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import texture from "./textures/shoes.jpg";
import texture2 from "./textures/shoes2.jpg";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const shoesTexture = textureLoader.load(texture);
const shoes2Texture = textureLoader.load(texture2);

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.8, 0.5, 0.0) },
    uTime: { value: 0 },
    uTexture: { value: shoesTexture },
  },
  // wireframe: true,
  // side: THREE.DoubleSide,
});

const material2 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0.8, 0.5, 0.0) },
    uTime: { value: 0 },
    uTexture: { value: shoes2Texture },
  },
  // wireframe: true,
  // side: THREE.DoubleSide,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.y = -1.2;
scene.add(mesh2);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 1.2);
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;
  material2.uniforms.uTime.value = elapsedTime;

  // controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
