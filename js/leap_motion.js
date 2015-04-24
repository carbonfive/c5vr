var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.3, 10000
);

var controls = new THREE.VRControls(camera);
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.PointLight(0xffffff, 1.0, 15);
light.position.set(0,0,0);
scene.add(light);

var bitGeometry = new THREE.DodecahedronGeometry(0.5);
var bitMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  shading: THREE.FlatShading
});
var bit = new THREE.Mesh(bitGeometry, bitMaterial);
bit.position.z = -2;
scene.add(bit);

var texture = THREE.ImageUtils.loadTexture('images/grid.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat = new THREE.Vector2(1000,1000);
texture.anisotropy = renderer.getMaxAnisotropy();
var planeGeometry =
  new THREE.PlaneBufferGeometry(1000, 1000, 100);
var planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shading: THREE.DoubleSide,
  map: texture
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI/2;
scene.add(plane);

var vrMode = false;

function enterVR() {
  effect.setFullScreen(true);
  vrMode = true;
}

function exitVR() {
  effect.setFullScreen(false);
  vrMode = false;
};

function toggleVR() {
  if (!vrMode) {
    enterVR();
  } else {
    exitVR();
  }
}

function onKey(event) {
  if (event.keyCode == 70) { // f
    toggleVR();
  }
};
window.addEventListener('keydown', onKey, true);

var lastClickTime;
function onClick(event) {
  event.stopPropagation();
  event.preventDefault();

  var clickTime = new Date();
  if (clickTime - lastClickTime < 300) {
    toggleVR();
  }
  lastClickTime = clickTime;
}
window.addEventListener('click', onClick, true);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener('resize', onWindowResize, false);

// Request animation frame loop function
function animate(time) {
  bit.position.x = Math.sin(time/1000) * 2;
  bit.position.y = Math.sin(time/2000);
  bit.rotation.y += 0.01;
  bit.rotation.z += 0.01;

  controls.update();
  effect.render(scene, camera);

  requestAnimationFrame( animate );
}

// Kick off animation loop
Leap.loop();
Leap.loopController.use('transform', {
  vr: true,
  effectiveParent: camera
});

Leap.loopController.use('riggedHand', {
  parent: scene,
  renderer: renderer,
  materialOptions: {
    emissive: new THREE.Color(0x00aaaa)
  }
});

animate();
