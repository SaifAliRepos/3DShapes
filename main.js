import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000022);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("canva").appendChild(renderer.domElement);

let shape, geometry, texture, material, textureLoader;

geometry = new THREE.SphereGeometry(2, 32, 16);
textureLoader = new THREE.TextureLoader();
texture = textureLoader.load('https://media.istockphoto.com/id/1156217558/photo/sun-texture.jpg?s=170667a&w=0&k=20&c=vFpfvkpf56dXPkKVQ7dtwY8tgfx7bhtwrwBMuDXhNwk='); // Replace 'https://example.com/moon_texture.jpg' with the actual URL of your moon texture image.

material = new THREE.MeshPhongMaterial({ map: texture });
shape = new THREE.Mesh(geometry, material);
scene.add(shape);


document.getElementById('moon').onclick = () => {
  geometry = new THREE.SphereGeometry(2, 32, 16);
  texture = textureLoader.load('https://t4.ftcdn.net/jpg/03/09/04/59/360_F_309045980_zKAgyd8feCR69CMWQ1PlhCHhteODo9zd.jpg'); // Replace with the actual URL of your moon texture image.

  material = new THREE.MeshPhongMaterial({ map: texture });
  shape.geometry.dispose();
  shape.geometry = geometry;
  shape.material = material;
  shape.castShadow = true;
  shape.receiveShadow = true;
  scene.add(shape);
};

document.getElementById('planet').onclick = () => {
  geometry = new THREE.SphereGeometry(2, 32, 16);
  texture = textureLoader.load('https://media.istockphoto.com/id/182058785/photo/world-topographic-map.jpg?s=612x612&w=0&k=20&c=eWrcGjNB9o-KrzW4TC2yxUII7k5E26QIqlN3JEJu1e4='); // Replace with the actual URL of your moon texture image.

  material = new THREE.MeshPhongMaterial({ map: texture });
  shape.geometry.dispose();
  shape.geometry = geometry;
  shape.material = material;
  shape.castShadow = true;
  shape.receiveShadow = true;
  scene.add(shape);
};

document.getElementById('knott').onclick = () => {
  const torusGeometry = new THREE.TorusKnotGeometry(1.5, 0.4, 80, 14);
  const torusMaterial = new THREE.MeshPhongMaterial({ color: 'red', shininess: 100, flatShading: true });
  shape.geometry.dispose();
  shape.material.dispose();
  shape.geometry = torusGeometry;
  shape.material = torusMaterial;
  shape.castShadow = true;
  shape.receiveShadow = true;
  scene.add(shape);
};

// Add a point light source
const light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(10, 10, 10);
light.castShadow = true;
scene.add(light);

// Add ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0x505050);
scene.add(ambientLight);

// Set up shadow properties for the light
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;

// Enable shadow casting for the sphere
shape.castShadow = true;

const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(shape, true);

  if (intersects.length > 0) {
    const mouseX = event.clientX - window.innerWidth / 2;
    const mouseY = event.clientY - window.innerHeight / 2;
    shape.rotation.x = mouseY / 50;
    shape.rotation.y = mouseX / 50;
  }
}

window.addEventListener('mousemove', onMouseMove, false);

function animate() {
  requestAnimationFrame(animate);
  shape.rotation.x += 0.009;
  shape.rotation.y += 0.009;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
