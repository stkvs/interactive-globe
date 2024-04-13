import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { getFresnelMat } from './getFresnelMat.js';

let w = window.innerWidth;
let h = window.innerHeight;

window.addEventListener('resize', function() {
    w = window.innerWidth;
    h = window.innerHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('./earth textures/8k_earth_daymap.jpg')
const bumpTexture = textureLoader.load('./earth textures/8081_earthbump4k.jpg')
const cloudTexture = textureLoader.load('./earth textures/fair_clouds_8k.jpg')

const geo = new THREE.IcosahedronGeometry(1.0, 64);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture1,
    bumpMap: bumpTexture,
    bumpScale: 2,
    flatShading: true,
});

const cloudGeo = new THREE.IcosahedronGeometry(1.0, 100);
const cloudMat = new THREE.MeshStandardMaterial({
    alphaMap: cloudTexture,
    transparent: true
});

const cloudCover = new THREE.Mesh(cloudGeo, cloudMat);
cloudCover.scale.setScalar(1.0075)
scene.add(cloudCover)

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.025);
// mesh.add(wireMesh)

const streetLights = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./earth textures/8k_earth_nightmap.jpg'),
    blending: THREE.AdditiveBlending,
})

const lightsMesh = new THREE.Mesh(geo, streetLights);
lightsMesh.scale.setScalar(1.0025)
// scene.add(lightsMesh)

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geo, fresnelMat);
glowMesh.scale.setScalar(1.0175);
scene.add(glowMesh);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-2, 0.5, 1.5);
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Rotate the mesh
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

    glowMesh.rotation.x += 0.001;
    glowMesh.rotation.y += 0.001;

    lightsMesh.rotation.x += 0.001;
    lightsMesh.rotation.y += 0.001;

    cloudCover.rotation.x += 0.0015;
    cloudCover.rotation.y += 0.0015;

    renderer.render(scene, camera);
}

animate();

