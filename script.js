import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Particle geometry
const particleCount = 10000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xff00ff,
  size: 0.02,
  transparent: true
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animation
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0003;

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
