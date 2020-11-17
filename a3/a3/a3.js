/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2019
//  Assignment 3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('hello world');

a = 5;
b = 2.6;
console.log('a=', a, 'b=', b);
myvector = new THREE.Vector3(0, 1, 2);
console.log('myvector =', myvector);

var animation = true;
var meshesLoaded = false;

var myboxMotion = new Motion(myboxSetMatrices);
var handMotion = new Motion(handSetMatrices);
var dragonMotion = new Motion(dragonSetMatrices);
var link1, link2, link3, link4, link5;
var dra1, dra2, dra3, dra4, dra5, dra6, dra7, dra8, dra9, dra10, dra11, dra12, dra01,dra02;
var draFrame, linkFrame1, linkFrame2, linkFrame3, linkFrame4, linkFrame5;
var meshes = {};
var RESOURCES_LOADED = false;

// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xd0f0d0);     // set background colour
canvas.appendChild(renderer.domElement);

// set background picture (searched at three.js website )
var textureLoader = new THREE.TextureLoader();
// picture is from https://www.chinatimes.com/cn/realtimenews/20180123004714-260408?chdtv
var texture = textureLoader.load('images/hh.jpg');

scene.background = texture
//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
  // set up M_proj    (internally:  camera.projectionMatrix )
  var cameraFov = 30;     // initial camera vertical field of view, in degrees
  // view angle, aspect ratio, near, far
  camera = new THREE.PerspectiveCamera(cameraFov, 1, 0.1, 1000);

  var width = 10; var height = 5;
  //    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );


  // fog the background
  scene.fog = new THREE.Fog( 0xc71414, 70, 300 );
  

  // set up M_view:   (internally:  camera.matrixWorldInverse )
  camera.position.set(-200, 200, -200);
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(0, 10, -20);
  scene.add(camera);

  // SETUP ORBIT CONTROLS OF THE CAMERA
  var controls = new THREE.OrbitControls(camera);
  controls.damping = 0.2;
  controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
  window.scrollTo(0, 0);
}

////////////////////////////////////////////////////////////////////////	
// init():  setup up scene
////////////////////////////////////////////////////////////////////////	

function init() {
  console.log('init called');

  initCamera();
  initMotions();
  initLights();
  initObjects();
  initDragon();
  initHand();
  initFileObjects();
  dragondance1();
  window.addEventListener('resize', resize);
  resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() {

  // keyframes for the mybox animated motion:   name, time, [x, y, z]
  myboxMotion.addKeyFrame(new Keyframe('rest pose', 0.0, [0, 1.9, 0]));
  myboxMotion.addKeyFrame(new Keyframe('rest pose', 1.0, [1, 1.9, 0]));
  myboxMotion.addKeyFrame(new Keyframe('rest pose', 2.0, [1, 6, 0]));
  myboxMotion.addKeyFrame(new Keyframe('rest pose', 3.0, [0, 6, 0]));
  myboxMotion.addKeyFrame(new Keyframe('rest pose', 4.0, [0, 1.9, 0]));

  // basic interpolation test
  myboxMotion.currTime = 0.1;


  console.log('kf', myboxMotion.currTime, '=', myboxMotion.getAvars());    // interpolate for t=0.1
  myboxMotion.currTime = 2.9;
  console.log('kf', myboxMotion.currTime, '=', myboxMotion.getAvars());    // interpolate for t=2.9

  // keyframes for hand:    name, time, [x, y, theta1, theta2, theta3, theta4, theta5]
  handMotion.addKeyFrame(new Keyframe('straight', 0.0, [2, 5, 0, 0, 0, 0, 0]));
  handMotion.addKeyFrame(new Keyframe('right finger curl', 1.0, [2, 5, 0, -180, -90, 0, 0]));
  handMotion.addKeyFrame(new Keyframe('straight', 2.0, [2, 3, 0, 0, 0, 0, 0]));
  handMotion.addKeyFrame(new Keyframe('left finger curl', 3.0, [2, 3, 0, 0, 0, -90, -90]));
  handMotion.addKeyFrame(new Keyframe('straight', 4.0, [2, 4, 0, 0, 0, 0, 0]));
  handMotion.addKeyFrame(new Keyframe('both fingers curl', 4.5, [2, 3, 0, -90, -90, -90, -90]));
  handMotion.addKeyFrame(new Keyframe('straight', 6.0, [2, 5, 0, 0, 0, 0, 0]));
}
function dragondance1() {
  dragonMotion = new Motion(dragonSetMatrices);
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 0.0, [3, 5, -10,  -90,-70, 85, -80,5, 0,0,0,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 1.0, [2, 4, -10,  -90, -45, 90, -90,-5,45,90,0,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 2.0, [3, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,0,0]));

}
function dragondance2() {
  dragonMotion = new Motion(dragonSetMatrices);
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 0.0, [3, 5, -10,  -90,-70, 85, -80,5, 0,0, 15,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 1.0, [-2, 0, -10,  -90, -45, 90, -90,-5,45,90,-15,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 2.0, [-7, -5, -10,  -90, -45, 90, -90,5,45,90,0,15,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 3.0, [-2, -5, -10,  -90, -45, 90, -90,-5,45,0,0,-15,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 4.0, [-1, -5, -10,  -90, -70, 90, -90,5,45,90,-15,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 5.0, [1, 0, -10,  -90, -70, 90, -90,-5,45,0,15,0,0,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 6.0, [3, 5, -10,  -90, -70, 90, -90,5,45,90,0,0,0,0]));

}
function dragondance3() {
  dragonMotion = new Motion(dragonSetMatrices);
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 0.0, [3, 5, -10,  -90,-70, 85, -80,5, 0,0,0,0,-30,0]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 0.5, [5, 6, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 1.0, [7, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,-30,30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 1.5, [9, 6, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 2.0, [11, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,-30,30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 2.5, [13, 6, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 3.0, [15, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,-30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 4.0, [20, 8, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 5.0, [25, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,-30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 6.0, [30, 8, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 7.0, [35, 5, -10,  -90,-70, 85, -80,5, 0, 0,0,0,-30,-30]));
  dragonMotion.addKeyFrame(new Keyframe('rest pose', 8.0, [40, 8, -10,  -90, -45, 90, -90,-5,45,90,0,0,30,30]));}

///////////////////////////////////////////////////////////////////////////////////////
// myboxSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function myboxSetMatrices(avars) {
  mybox.matrixAutoUpdate = false;     // tell three.js not to over-write our updates
  mybox.matrix.identity();
  mybox.matrix.multiply(new THREE.Matrix4().makeTranslation(avars[0], avars[1], avars[2]));
  mybox.matrix.multiply(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
  mybox.matrix.multiply(new THREE.Matrix4().makeScale(1.0, 1.0, 1.0));
  mybox.updateMatrixWorld();
}

function dragonSetMatrices(avars) {
  var deg2rad = Math.PI / 180;

  var x = avars[0];
  var y = avars[1];
  var z = avars[2];
  var theta1 = avars[3] * deg2rad;
  var theta2 = avars[4] * deg2rad;
  var theta3 = avars[5] * deg2rad;
  var theta4 = avars[6] * deg2rad;
  var theta5 = avars[7] * deg2rad;
  var theta6 = avars[8] * deg2rad;
  var theta7 = avars[9] * deg2rad;
  var theta8 = avars[10] * deg2rad;
  var theta9 = avars[11] * deg2rad;
  var theta10 = avars[12] * deg2rad;
  var theta11 = avars[13] * deg2rad;

  dra1.matrixAutoUpdate = false;  
  dra2.matrixAutoUpdate = false;  
  dra01.matrixAutoUpdate = false;  
  dra02.matrixAutoUpdate = false;  
  dra3.matrixAutoUpdate = false;  
  dra4.matrixAutoUpdate = false;  
  dra5.matrixAutoUpdate = false;  
  dra6.matrixAutoUpdate = false;  
  dra7.matrixAutoUpdate = false;  
  dra8.matrixAutoUpdate = false;  
  dra9.matrixAutoUpdate = false;  
  dra10.matrixAutoUpdate = false;  
  dra11.matrixAutoUpdate = false;  

  draFrame.matrix.identity();
  draFrame.matrix.multiply(new THREE.Matrix4().makeTranslation(x,y,z));

  dra01.matrix.copy(draFrame.matrix);
  dra01.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0.5,1));
  dra01.matrix.multiply(new THREE.Matrix4().makeScale(1.5, 1.2, 1.0));
  dra01.matrix.multiply(new THREE.Matrix4().makeRotationX(theta6));

  dra1.matrix.copy(dra01.matrix);
  dra1.matrix.multiply(new THREE.Matrix4().makeTranslation(-2,2,0));
  dra1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra1.matrix.multiply(new THREE.Matrix4().makeScale(1,1, 1.0));
  dra1.matrix.multiply(new THREE.Matrix4().makeRotationY(theta7));

  dra02.matrix.copy(draFrame.matrix);
  dra02.matrix.multiply(new THREE.Matrix4().makeTranslation(1,0.5,-1));
  dra02.matrix.multiply(new THREE.Matrix4().makeScale(1.5, 1.2, 1.0));
  dra02.matrix.multiply(new THREE.Matrix4().makeRotationX(-theta6));

  dra2.matrix.copy(dra02.matrix);
  dra2.matrix.multiply(new THREE.Matrix4().makeTranslation(-2,2,0));
  dra2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra2.matrix.multiply(new THREE.Matrix4().makeScale(1, 1, 1));
  dra2.matrix.multiply(new THREE.Matrix4().makeRotationY(-theta7));
  
  dra3.matrix.copy(draFrame.matrix);
  dra3.matrix.multiply(new THREE.Matrix4().makeTranslation(6,2.4,0));
  dra3.matrix.multiply(new THREE.Matrix4().makeRotationX(theta8));
  dra3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta9));
  dra3.matrix.multiply(new THREE.Matrix4().makeScale(4, 2, 3.5));

  dra4.matrix.copy(dra5.matrix);
  dra4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.6,-0.7));
  dra4.matrix.multiply(new THREE.Matrix4().makeRotationX(-theta2));
  dra4.matrix.multiply(new THREE.Matrix4().makeScale(1, 2, 0.5));
  
  dra5.matrix.copy(draFrame.matrix);
  dra5.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0,0));
  dra5.matrix.multiply(new THREE.Matrix4().makeRotationY(theta4));
  dra5.matrix.multiply(new THREE.Matrix4().makeRotationX(theta3));
  dra5.matrix.multiply(new THREE.Matrix4().makeScale(5, 5, 2));
  
  dra6.matrix.copy(draFrame.matrix);
  dra6.matrix.multiply(new THREE.Matrix4().makeTranslation(-4,-0.1,0));
  dra6.matrix.multiply(new THREE.Matrix4().makeRotationY(theta4));
  dra6.matrix.multiply(new THREE.Matrix4().makeRotationX(theta4));
  dra6.matrix.multiply(new THREE.Matrix4().makeScale(5, 5, 2));

  dra7.matrix.copy(dra6.matrix);
  dra7.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-1.2,0));
  dra7.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
  dra7.matrix.multiply(new THREE.Matrix4().makeScale(1,2,1));
  
  dra8.matrix.copy(draFrame.matrix);
  dra8.matrix.multiply(new THREE.Matrix4().makeTranslation(1,-1.1,-1));
  dra8.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra8.matrix.multiply(new THREE.Matrix4().makeRotationZ(2*theta8));  
  dra8.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta10));    
  dra8.matrix.multiply(new THREE.Matrix4().makeScale(3, 1, 0.5));
  
  dra9.matrix.copy(draFrame.matrix);
  dra9.matrix.multiply(new THREE.Matrix4().makeTranslation(1,-1.1,1));
  dra9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra9.matrix.multiply(new THREE.Matrix4().makeRotationZ(4*theta8));
  dra9.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta11));    
  dra9.matrix.multiply(new THREE.Matrix4().makeScale(3, 1, 0.5));
  
  dra10.matrix.copy(draFrame.matrix);
  dra10.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,-1.1,-1));
  dra10.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra10.matrix.multiply(new THREE.Matrix4().makeRotationZ(4*theta8));
  dra10.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta11));    
  dra10.matrix.multiply(new THREE.Matrix4().makeScale(3, 1, 0.5));
  
  dra11.matrix.copy(draFrame.matrix);
  dra11.matrix.multiply(new THREE.Matrix4().makeTranslation(-1,-1.1,1));
  dra11.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  dra11.matrix.multiply(new THREE.Matrix4().makeRotationZ(2*theta8));
  dra11.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta10));    
  dra11.matrix.multiply(new THREE.Matrix4().makeScale(3, 1, 0.5));
  
  dra1.updateMatrixWorld();
  dra01.updateMatrixWorld();
  dra02.updateMatrixWorld();
  dra2.updateMatrixWorld();
  dra3.updateMatrixWorld();
  dra4.updateMatrixWorld();
  dra5.updateMatrixWorld();
  dra6.updateMatrixWorld();
  dra7.updateMatrixWorld();
  dra8.updateMatrixWorld();
  dra9.updateMatrixWorld();
  dra10.updateMatrixWorld();
  dra11.updateMatrixWorld();
}
 


///////////////////////////////////////////////////////////////////////////////////////
// handSetMatrices(avars)
///////////////////////////////////////////////////////////////////////////////////////

function handSetMatrices(avars) {
  var deg2rad = Math.PI / 180;

  var xPosition = avars[0];
  var yPosition = avars[1];
  var theta1 = avars[2] * deg2rad;
  var theta2 = avars[3] * deg2rad;
  var theta3 = avars[4] * deg2rad;
  var theta4 = avars[5] * deg2rad;
  var theta5 = avars[6] * deg2rad;

  ////////////// link1
  linkFrame1.matrix.identity();
  linkFrame1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition, yPosition, 0));
  linkFrame1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));
  // Frame 1 has been established
  link1.matrix.copy(linkFrame1.matrix);
  link1.matrix.multiply(new THREE.Matrix4().makeTranslation(2, 0, 0));
  link1.matrix.multiply(new THREE.Matrix4().makeScale(4, 1, 4));

  ////////////// link2
  linkFrame2.matrix.copy(linkFrame1.matrix);      // start with parent frame
  linkFrame2.matrix.multiply(new THREE.Matrix4().makeTranslation(4, 0, 1));
  linkFrame2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));
  // Frame 2 has been established
  link2.matrix.copy(linkFrame2.matrix);
  link2.matrix.multiply(new THREE.Matrix4().makeTranslation(3, 0, 0.5));
  link2.matrix.multiply(new THREE.Matrix4().makeScale(6, 1, 1));

  ///////////////  link3
  linkFrame3.matrix.copy(linkFrame2.matrix);
  linkFrame3.matrix.multiply(new THREE.Matrix4().makeTranslation(6, 0, 0));
  linkFrame3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));
  // Frame 3 has been established
  link3.matrix.copy(linkFrame3.matrix);
  link3.matrix.multiply(new THREE.Matrix4().makeTranslation(3, 0, 0.5));
  link3.matrix.multiply(new THREE.Matrix4().makeScale(6, 1, 1));

  /////////////// link4
  linkFrame4.matrix.copy(linkFrame1.matrix);
  linkFrame4.matrix.multiply(new THREE.Matrix4().makeTranslation(4, 0, -1));
  linkFrame4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));
  // Frame 4 has been established
  link4.matrix.copy(linkFrame4.matrix);
  link4.matrix.multiply(new THREE.Matrix4().makeTranslation(3, 0, -0.5));
  link4.matrix.multiply(new THREE.Matrix4().makeScale(6, 1, 1));

  // link5
  linkFrame5.matrix.copy(linkFrame4.matrix);
  linkFrame5.matrix.multiply(new THREE.Matrix4().makeTranslation(6, 0, 0));
  linkFrame5.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta5));
  // Frame 5 has been established
  link5.matrix.copy(linkFrame5.matrix);
  link5.matrix.multiply(new THREE.Matrix4().makeTranslation(3, 0, -0.5));
  link5.matrix.multiply(new THREE.Matrix4().makeScale(6, 1, 1));

  link1.updateMatrixWorld();
  link2.updateMatrixWorld();
  link3.updateMatrixWorld();
  link4.updateMatrixWorld();
  link5.updateMatrixWorld();

  linkFrame1.updateMatrixWorld();
  linkFrame2.updateMatrixWorld();
  linkFrame3.updateMatrixWorld();
  linkFrame4.updateMatrixWorld();
  linkFrame5.updateMatrixWorld();
}

/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
  light = new THREE.PointLight(0xffffff);
  light.position.set(0, 4, 2);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0x606060);
  scene.add(ambientLight);
}

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	

var diffuseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var diffuseMaterial2 = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var armadilloMaterial = new THREE.MeshBasicMaterial({ color: 0x7fff7f });
var wingcolor = new THREE.MeshLambertMaterial({ color:  0x800080 , side: THREE.DoubleSide  });
/////////////////////////////////////	
// initObjects():  setup objects in the scene
/////////////////////////////////////	

function initObjects() {
  worldFrame = new THREE.AxesHelper(5);
  scene.add(worldFrame);
  
 
 
  // mybox 
  myboxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
  mybox = new THREE.Mesh(myboxGeometry, diffuseMaterial);
  scene.add(mybox);

  // textured floor
  floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(1, 1);
  floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
  floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -1.1;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  // sphere, located at light position
  sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
  sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
  sphere.position.set(0, 4, 2);
  sphere.position.set(light.position.x, light.position.y, light.position.z);
  scene.add(sphere);

  // box
  boxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
  box = new THREE.Mesh(boxGeometry, diffuseMaterial);
  box.position.set(-4, 0, 0);
  scene.add(box);

  // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] 
  var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff8800 }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xffff33 }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x3333ff }));
  cubeMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x8833ff }));
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
  var mccGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 1, 1, 1);
  mcc = new THREE.Mesh(mccGeometry, cubeMaterialArray);
  mcc.position.set(0, 0, 0);
  scene.add(mcc);

  // cylinder
  // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
  cylinderGeometry = new THREE.CylinderGeometry(0.30, 0.30, 0.80, 20, 4);
  cylinder = new THREE.Mesh(cylinderGeometry, diffuseMaterial);
  cylinder.position.set(2, 0, 0);
  scene.add(cylinder);

  // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
  coneGeometry = new THREE.CylinderGeometry(0.0, 0.30, 0.80, 20, 4);
  cone = new THREE.Mesh(coneGeometry, diffuseMaterial);
  cone.position.set(4, 0, 0);
  scene.add(cone);

  // torus:   parameters -- radius, diameter, radialSegments, torusSegments
  torusGeometry = new THREE.TorusGeometry(1.2, 0.4, 10, 20);
  torus = new THREE.Mesh(torusGeometry, diffuseMaterial);

  torus.rotation.set(0, 0, 0);     // rotation about x,y,z axes
  torus.scale.set(1, 2, 3);
  torus.position.set(6, 0, 0);   // translation

  scene.add(torus);

  // custom object
  var geom = new THREE.Geometry();
  var v0 = new THREE.Vector3(0, 0, 0);
  var v1 = new THREE.Vector3(3, 0, 0);
  var v2 = new THREE.Vector3(0, 3, 0);
  var v3 = new THREE.Vector3(3, 3, 0);
  geom.vertices.push(v0);
  geom.vertices.push(v1);
  geom.vertices.push(v2);
  geom.vertices.push(v3);
  geom.faces.push(new THREE.Face3(0, 1, 2));
  geom.faces.push(new THREE.Face3(1, 3, 2));
  geom.computeFaceNormals();
  customObject = new THREE.Mesh(geom, diffuseMaterial2);
  customObject.position.set(0, 0, -2);
  scene.add(customObject);


  
//by thinking about using facefall from auto.io
 
 var innerBoxGeometry = new THREE.BoxGeometry(15, 15, 15)
 var innerBoxMaterial = new THREE.MeshNormalMaterial({
   flatShading: THREE.FlatShading,
   side: THREE.DoubleSide 
 })

 innerBox = new THREE.Mesh(innerBoxGeometry, innerBoxMaterial)

 innerBox.position.y = -8;

 scene.add(innerBox)

 var boxGeometry = new THREE.BoxGeometry(40, 40, 40)

 var materials = [
   new THREE.MeshBasicMaterial({ color: 0xffff33 }), 
   new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 
   new THREE.MeshBasicMaterial({ color: 0x0000ff }), 
   new THREE.MeshBasicMaterial({ color: 0xFFFFFFFF }), 
   new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1 }), 
   new THREE.MeshBasicMaterial({ color: 0xff0000, /* side: THREE.DoubleSide, */ }) 
 ]
 
 for (let i = 0, len = materials.length; i < len; i++) {
   const material = materials[i]
   material.side = THREE.BackSide;
   material.needsUpdate = true;
 }

 
 boxMesh = new THREE.Mesh(boxGeometry, materials)

 scene.add(boxMesh)

 
}
/////////////////////////////////////////////////////////////////////////////////////
//  initdragon():  define all geometry associated with the dragon
/////////////////////////////////////////////////////////////////////////////////////

function initDragon() {
  dragonMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  //material
  //body, tail
  coneGeometry = new THREE.CylinderGeometry(0.3, 0.0, 0.80, 20, 4);

  cylinderGeometry = new THREE.CylinderGeometry(0.30, 0.30, 0.80, 20, 4);
  cylinder = new THREE.Mesh(cylinderGeometry, diffuseMaterial);
  // head
  boxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth
  // wings
  var geo = new THREE.Geometry();
  var geo2 = new THREE.Geometry();
  var v0 = new THREE.Vector3(0, 0, 0);
  var v1 = new THREE.Vector3(0, 2, 0);
  var v2 = new THREE.Vector3(-2, 2, 0);
  var v3 = new THREE.Vector3(-2, 0, 0);
  var v4 = new THREE.Vector3(-2, -2, 0);
  geo.vertices.push(v0);
  geo.vertices.push(v1);
  geo.vertices.push(v2);
  geo.vertices.push(v3);
  geo.faces.push(new THREE.Face3(3, 1, 0));
  geo.faces.push(new THREE.Face3(3, 1, 2));
  
  geo2.vertices.push(v0);
  geo2.vertices.push(v1);
  geo2.vertices.push(v2);
  geo2.vertices.push(v4);
  geo2.faces.push(new THREE.Face3(3, 1, 0));
  geo2.faces.push(new THREE.Face3(3, 1, 2));
  

  draFrame = new THREE.AxesHelper(1); scene.add(draFrame);
  dra01 = new THREE.Mesh(geo, wingcolor); scene.add(dra01);
  dra1 = new THREE.Mesh(geo2, wingcolor); scene.add(dra1);
  dra02 = new THREE.Mesh(geo, wingcolor); scene.add(dra02);
  dra2 = new THREE.Mesh(geo2, wingcolor); scene.add(dra2);
  dra3 = new THREE.Mesh(boxGeometry, diffuseMaterial); scene.add(dra3);
  dra4 = new THREE.Mesh(cylinderGeometry, diffuseMaterial); scene.add(dra4);
  dra5 = new THREE.Mesh(cylinderGeometry, diffuseMaterial); scene.add(dra5);
  dra6 = new THREE.Mesh(cylinderGeometry, diffuseMaterial); scene.add(dra6);
  dra7 = new THREE.Mesh(coneGeometry, diffuseMaterial); scene.add(dra7);
  dra8 = new THREE.Mesh(boxGeometry, diffuseMaterial); scene.add(dra8);
  dra9 = new THREE.Mesh(boxGeometry, diffuseMaterial); scene.add(dra9);
  dra10 = new THREE.Mesh(boxGeometry, diffuseMaterial); scene.add(dra10);
  dra11 = new THREE.Mesh(boxGeometry, diffuseMaterial); scene.add(dra11);

}


/////////////////////////////////////////////////////////////////////////////////////
//  initHand():  define all geometry associated with the hand
/////////////////////////////////////////////////////////////////////////////////////

function initHand() {
  handMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  boxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth

  link1 = new THREE.Mesh(boxGeometry, handMaterial); scene.add(link1);
  linkFrame1 = new THREE.AxesHelper(1); scene.add(linkFrame1);
  link2 = new THREE.Mesh(boxGeometry, handMaterial); scene.add(link2);
  linkFrame2 = new THREE.AxesHelper(1); scene.add(linkFrame2);
  link3 = new THREE.Mesh(boxGeometry, handMaterial); scene.add(link3);
  linkFrame3 = new THREE.AxesHelper(1); scene.add(linkFrame3);
  link4 = new THREE.Mesh(boxGeometry, handMaterial); scene.add(link4);
  linkFrame4 = new THREE.AxesHelper(1); scene.add(linkFrame4);
  link5 = new THREE.Mesh(boxGeometry, handMaterial); scene.add(link5);
  linkFrame5 = new THREE.AxesHelper(1); scene.add(linkFrame5);

  link1.matrixAutoUpdate = false;
  link2.matrixAutoUpdate = false;
  link3.matrixAutoUpdate = false;
  link4.matrixAutoUpdate = false;
  link5.matrixAutoUpdate = false;
  linkFrame1.matrixAutoUpdate = false;
  linkFrame2.matrixAutoUpdate = false;
  linkFrame3.matrixAutoUpdate = false;
  linkFrame4.matrixAutoUpdate = false;
  linkFrame5.matrixAutoUpdate = false;
}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial({
  //        uniforms: { textureSampler: {type: 't', value: floorTexture}},
  vertexShader: document.getElementById('customVertexShader').textContent,
  fragmentShader: document.getElementById('customFragmentShader').textContent
});

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

function initFileObjects() {
  // list of OBJ files that we want to load, and their material
  models = {
    //	bunny:     {obj:"obj/bunny.obj", mtl: diffuseMaterial, mesh: null},
    //	horse:     {obj:"obj/horse.obj", mtl: diffuseMaterial, mesh: null },
    //	minicooper:{obj:"obj/minicooper.obj", mtl: diffuseMaterial, mesh: null },
    //	trex:      { obj:"obj/trex.obj", mtl: normalShaderMaterial, mesh: null },
    teapot: { obj: "obj/teapot.obj", mtl: customShaderMaterial, mesh: null },
    armadillo: { obj: "obj/armadillo.obj", mtl: customShaderMaterial, mesh: null },
    dragon: { obj: "obj/dragon.obj", mtl: customShaderMaterial, mesh: null }


  };

  var manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
    onResourcesLoaded();
  }
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function (xhr) {
  };

  // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
  for (var _key in models) {
    console.log('Key:', _key);
    (function (key) {
      var objLoader = new THREE.OBJLoader(manager);
      objLoader.load(models[key].obj, function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = models[key].mtl;
            child.material.shading = THREE.SmoothShading;
          }
        });
        models[key].mesh = object;
        //		scene.add( object );
      }, onProgress, onError);
    })(_key);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded() {

  // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
  //                             i.e., creates references to the geometry, and not full copies ]
  meshes["armadillo1"] = models.armadillo.mesh.clone();
  meshes["armadillo2"] = models.armadillo.mesh.clone();
  meshes["dragon1"] = models.dragon.mesh.clone();
  meshes["dragon2"] = models.dragon.mesh.clone();
  meshes["teapot1"] = models.teapot.mesh.clone();

  // position the object instances and parent them to the scene, i.e., WCS

  meshes["armadillo1"].position.set(-6, 1.5, 2);
  meshes["armadillo1"].rotation.set(0, -Math.PI / 2, 0);
  meshes["armadillo1"].scale.set(1, 1, 1);
  scene.add(meshes["armadillo1"]);

  meshes["armadillo2"].position.set(-3, 1.5, 2);
  meshes["armadillo2"].rotation.set(0, -Math.PI / 2, 0);
  meshes["armadillo2"].scale.set(1, 1, 1);
  scene.add(meshes["armadillo2"]);

  meshes["dragon1"].position.set(-5, 0.2, 4);
  meshes["dragon1"].rotation.set(0, Math.PI, 0);
  meshes["dragon1"].scale.set(0.3, 0.3, 0.3);
  scene.add(meshes["dragon1"]);

  meshes["dragon2"].position.set(3, 1.2, 3);
  meshes["dragon2"].rotation.set(0, Math.PI, 0);
  meshes["dragon2"].scale.set(0.2, 0.2, 0.2);
  scene.add(meshes["dragon2"]);


  meshes["teapot1"].position.set(3, 0, 3);
  meshes["teapot1"].scale.set(0.5, 0.5, 0.5);
  scene.add(meshes["teapot1"]);

  meshesLoaded = true;
}


///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W"))
    light.position.y += 0.1;
  else if (keyboard.pressed("S"))
    light.position.y -= 0.1;
  else if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;
  else if (keyboard.pressed(" "))
    animation = !animation;
  else if (keyboard.pressed("B"))
     dragondance2();
  else if (keyboard.pressed("C"))
     dragondance3();
}

// snow background, using texture from three.js and 
var typeNum = 2; 
  var range = 300; 
  
  var texture = new THREE.TextureLoader().load('images/snowflake.png');
  
  
  var materials = [];
  for (var i = 0; i < typeNum; i++) {
      var material = new THREE.PointsMaterial({
          size: 2,
          map: texture, 
          transparent: true, 
          opacity: 1, 
          depthTest: false, 
          blending: THREE.AdditiveBlending 
      });
      material.map.offset = new THREE.Vector2(1/typeNum * i, 0);
      material.map.repeat = new THREE.Vector2(1/typeNum, 1);
      materials.push(material);
  }
  
 
  var geoms = [];
  for (var k = 0; k < typeNum; k++) {
      var geom = new THREE.Geometry();
      for (var i = 0; i < 500; i++) {
          // snow position
          var v = new THREE.Vector3(
              Math.random() * range - range/2, 
              Math.random() * range - range/2,
              Math.random() * range - range/2
          );
          //speed
          v.velocityY = 0.1 + Math.random() / 5;
          v.velocityX = (Math.random() - 0.5) / 3;
          v.velocityZ = (Math.random() - 0.5) / 3;
          geom.vertices.push(v);
      }
      geoms.push(geom);
  }
  
  var clouds = [];
  for (var i = 0; i < typeNum; i++) {
      var points = new THREE.Points(geoms[i], materials[i]);
      clouds.push(points)
      scene.add(points);
  }
  



///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  var dt = 0.02;
  checkKeyboard();
  if (animation && meshesLoaded) {
    // advance the motion of all the animated objects
    myboxMotion.timestep(dt);
    handMotion.timestep(dt);
    dragonMotion.timestep(dt);
    if (meshesLoaded)
      meshes["armadillo1"].position.x += 0.1;
  }
  mcc.rotation.y += 0.01
  boxMesh.rotation.y += 0.01
  innerBox.rotation.y -= 0.005

  sphere.position.set(light.position.x, light.position.y, light.position.z);
  
  
  
  clouds.forEach(function (points, i) {
    var vertices = points.geometry.vertices;

    vertices.forEach(function (v, idx) {
        v.y = v.y - (v.velocityY);
        v.x = v.x - (v.velocityX);
        v.z = v.z - (v.velocityZ);

        if (v.y <= -range/2) v.y = range / 2;
        if (v.x <= -range/2 || v.x >= range/2) v.x = v.x * -1;  
        if (v.z <= -range/2 || v.z >= range/2) v.velocityZ = v.velocityZ * -1;
    });

   points.geometry.verticesNeedUpdate = true;
    
});
renderer.render(scene, camera);
requestAnimationFrame(update);      // requests the next update call;  this creates a loop

};


init();
update();

