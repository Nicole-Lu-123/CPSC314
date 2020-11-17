/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2019, Assignment 1 
/////////////////////////////////////////////////////////////////////////////////////////
 a=4
 b=5
function go() {
   var a = 14;
    b = 15; 
  } 
go()


console.log('a =',a,'b=',b); 
var foo
var m = 5/0
console.log('m =',m); 
console.log('foo =',foo); 

console.log('Assignment1 (Nicole)');

a=5;  
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
  // set background colour to 0xRRGGBB  where RR,GG,BB are values in [00,ff] in hexadecimal, i.e., [0,255] 
renderer.setClearColor(0xBA55D3);     
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial11 = new THREE.MeshLambertMaterial( {color: 0xffff33} );
var diffuseMaterial12 = new THREE.MeshLambertMaterial( {color: 0x3333ff} );
var diffuseMaterial13 = new THREE.MeshLambertMaterial( {color: 0x8833ff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xFFA500, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xffff33} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////	
// WORLD COORDINATE FRAME
/////////////////////////////////////	

var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////	
// FLOOR with texture
/////////////////////////////////////	

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry11 = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
boxGeometry12 = new THREE.BoxGeometry( 1, 1, 1 ); 
boxGeometry13 = new THREE.BoxGeometry( 1, 1, 1 ); 
box11 = new THREE.Mesh( boxGeometry11, diffuseMaterial11 );
box12 = new THREE.Mesh( boxGeometry12, diffuseMaterial12 );
box13 = new THREE.Mesh( boxGeometry13, diffuseMaterial13 );
box11.position.set(-4, 0, 0);
box12.position.set(-4.5, 1, 0.5);
box12.rotation.set(-4,0,0);
box13.rotation.set(0,-4,0);
box13.position.set(-5, 2, 1);
scene.add( box11 );
scene.add( box12 );
scene.add( box13 );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,0,0);
scene.add( mcc );	

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////



// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder11 = new THREE.Mesh( cylinderGeometry, diffuseMaterial11);
cylinder12 = new THREE.Mesh( cylinderGeometry, diffuseMaterial12);
cylinder13 = new THREE.Mesh( cylinderGeometry, diffuseMaterial13);
cylinder11.position.set(1.5, 0, 0);
cylinder12.position.set(2.3, 0, 0);
cylinder13.position.set(3.1, 0, 0);
scene.add( cylinder11,cylinder12,cylinder13 );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

torus2Geometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(5, 0.6, 0);   // translation
torus.rotation.set(1.57,0,0);     // rotation about x,y,z axes
scene.add( torus );
/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

var geom = new THREE.Geometry(); 
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,3,0);
var v3 = new THREE.Vector3(3,3,0);
var v4 = new THREE.Vector3(3,0,-3);
var v5 = new THREE.Vector3(3,3,-3);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);
geom.vertices.push(v5);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.faces.push( new THREE.Face3( 0,1, 4 ) );
geom.faces.push( new THREE.Face3( 2,3, 5 ) );
geom.faces.push( new THREE.Face3( 2,4, 5 ) );
geom.faces.push( new THREE.Face3( 1,4, 5 ) );
geom.faces.push( new THREE.Face3( 3,1, 5 ) );
geom.faces.push( new THREE.Face3( 0,2,4 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  create armadillo material
/////////////////////////////////////////////////////////////////////////////////////

var armadilloMaterial = new THREE.ShaderMaterial( {
//	uniforms: uniforms,
        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader:( document.getElementById( 'myVertexShader' ).textContent),
	fragmentShader: document.getElementById( 'myFragmentShader' ).textContent
} );

var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};
var onError = function ( xhr ) {
};
var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/armadillo.obj', function ( object ) {
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material = armadilloMaterial;
		}
	} );
	scene.add( object );
}, onProgress, onError );

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    console.log('W pressed');
    if (light.position.y >= 5)
       light.position.y += 0;
    else 
        light.position.y += 0.1;
  } else if (keyboard.pressed("S"))
       if (light.position.y <= -5)
         light.position.y += 0;
       else 
         light.position.y -= 0.1;
  if (keyboard.pressed("A"))
    if (light.position.x <= -5)
       light.position.x += 0;
    else 
       light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    if (light.position.x >= 5)
     light.position.x += 0;
    else 
     light.position.x += 0.1;

  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);

}

update();

var animate = function() {
  requestAnimationFrame(animate);

  cylinder11.rotation.x += 0.02;
  cylinder12.rotation.x += 0.04;
  cylinder13.rotation.x += 0.06;
  

  renderer.render(scene, camera);
  };
  animate();
 