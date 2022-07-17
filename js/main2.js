'use strict';
import * as THREE from './three.module.js'
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from './jsm/utils/SkeletonUtils.js';
import {TWEEN} from './jsm/libs/tween.module.min.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js';


let camera, scene, renderer;
var model1;
var model2;
var cone;
var cone2;
var cone3;
var cone4;
var cone5;
var cone6;
var cone7;
var cone8;
var cone9;
var cliff;
var cliff2;
var lux;
var modelMesh1;
var modelMesh2;
var modelMesh3;
var modelMesh4;
var modelMesh5;
var modelball;
var modelKeeper;
var coords;
var id;
var check=true;
var posBefore;
var posThen;
var d1=-17;
var d2=-1.5;
var d3=-54;
var dtemp;
var scoreKeeper=0;
var scorePlayer1 =0;

var armR;
var armL;
var LarmR;
var LarmL;
var root;
var chest;
var legR;
var legL;
var LlegL;
var LlegR;
var footR;
var footL;

var armR2;
var armL2;
var LarmR2;
var LarmL2;
var root2;
var chest2;
var legR2;
var legL2;
var LlegL2;
var LlegR2;
var footR2;
var footL2;
var kneck2;

var firstHit=false;
var settings;

var armR3;
var armL3;
var LarmR3;
var LarmL3;
var root3;
var chest3;
var legR3;
var legL3;
var LlegL3;
var LlegR3;
var footR3;
var footL3;

var coords2;
var spotlight

var tween0;
var tween;
var tween2;
var tween3;
var tween4;
var tween5;
var tween6;
var tween7;

var tween8;
var tween9;
var tween11;
var tween77;
var tween76;
var tween78;

var controls;
var kick;

var arrayObsX = [];
var arrayObsZ = [];

var arrayConeX = [];
var arrayConeZ = [];

var pointer;
var objects = [];
var playerSelected = 0;
var currentPlayer = 1;
var nextPlayer= 0;
var assist = 0;

var left=false;
var right=false;
var straight=true;

var time;
var colorK;
var colorP;
var mode;

var frontPort = false;


init();
animate();

function init() {




	const container = document.createElement( 'div' );

	document.body.appendChild( container );

	getParams();

	const panel = new GUI( { width: 310 } );
	panel.title('Score')
	settings = {
		'Player': Number(JSON.parse(window.sessionStorage.getItem('ScorePlayer'),10)),
		'Keeper': Number(JSON.parse(window.sessionStorage.getItem('ScoreKeeper'),10)),

	};
	panel.add( settings, 'Player' )
	.listen()
	.disable();

	panel.add( settings, 'Keeper' )
	.listen()
	.disable();

	posBefore=new THREE.Vector3();
	posThen=new THREE.Vector3();

	//document.addEventListener( 'click', onPointerMove );  /*per il mouse


	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xa0a0a0 );
	//scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

	camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 200 );
	//camera.position.set( 600, -30, - 60 );

	camera.position.x= -150;
	camera.position.z= -53;
	camera.position.y = 10;
	//camera.position.y = 200;
	//camera.lookAt( new THREE.Vector3(10,-10,1000));

	
	if(mode==1){
		console.log("a")
		if(time==3)  lux = new THREE.HemisphereLight( 0x252850,0x000000); //NOTTE
		else if(time==1) lux = new THREE.HemisphereLight( 0xffffff,0x00000); 
		else if(time==2)lux = new THREE.HemisphereLight( 0xffffff,0x00000); 
		lux.position.set( 0, 40,-30 );
		scene.add( lux );
	}

	if(mode==2){

		spotlight = new THREE.SpotLight(0xffffff,1.0);
		spotlight.position.set(-39,2,-108.2);
		spotlight.target.position.set(-37,-8.55,-108.2);
		//spotlight.rotation.z=0.1
		spotlight.castShadow = true;
		
		spotlight.angle = 1;
		scene.add(spotlight)
		scene.add( spotlight.target );
	}

	/*const dirLight = new THREE.DirectionalLight( 0xffffff );
	dirLight.position.set( - 3, 10, - 10 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 4;
	dirLight.shadow.camera.bottom = - 4;
	dirLight.shadow.camera.left = - 4;
	dirLight.shadow.camera.right = 4;
	dirLight.shadow.camera.near = 0.1;
	dirLight.shadow.camera.far = 40;
	scene.add( dirLight );*/

	//MODEL SOCCER FIELD
	const loader = new GLTFLoader();
	loader.load( './models/field/scene.gltf', function ( gltf ) {

		gltf.scene.traverse( function ( object ) {
			if ( object.isMesh ) object.castShadow = true;
		} );

		model1 = gltf.scene;
		model1.position.x = 0;
		model1.position.y= 0;
		model1.scale.set(3.0,3.0,3.0)
		scene.add( model1);
		scene.scale.set(0.5, 0.5, 0.5);

	} );


	//MODEL 
	if(mode==2){
		model2 = new THREE.Object3D();
		const loader3 = new GLTFLoader();
		loader.load( './models/ceiling_light/scene.gltf', function ( gltf ) {
		gltf.scene.traverse( function ( object ) {
			if ( object.isMesh ) object.castShadow = true;
		} );

			model2 = gltf.scene;
			model2.position.y= 2;
			model2.position.z= -108.2;
			model2.position.x= -39;
			model2.rotation.z = 0.1;
			model2.scale.set(3.0,3.0,3.0)
			model2.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 
			scene.add( model2);

		} );
	}



	modelball = new THREE.Object3D();
	const loaderball = new GLTFLoader();
	loaderball.load( './models/ball/scene.gltf', function ( gltf ) {

		gltf.scene.traverse( function ( object ) {
			if ( object.isMesh ) object.castShadow = true;
		} );

		modelball = gltf.scene;
		modelball.position.y= -8.55;
		modelball.position.z= -107.2;
		modelball.position.x= 38.8;
		modelball.scale.set(3.0,3.0,3.0)
		modelball.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 
		scene.add( modelball);

	} );

	/********** ********** **********  Obstacles **********  **********   *********** */
	/****1****/

	const loader7 = new THREE.TextureLoader()
	const geometry = new THREE.BoxGeometry(1, 1,1)
	const material3 = new THREE.MeshPhongMaterial()
	const texture3 = new THREE.TextureLoader().load('./img/mc.jpeg')
	material3.map = texture3
	const normalTexture3 = new THREE.TextureLoader().load('./img/normal_4.png')
	material3.bumpMap = normalTexture3
	material3.bumpScale = 10;
	const cube= new THREE.Mesh(geometry, material3)
	cube.position.set(-10,-7,-88.2)
	cube.scale.set(3,3,3);
	scene.add(cube)
	arrayObsX.push(cube.position.x);
	arrayObsZ.push(cube.position.z);

	/****2****/

	const planeGeometry2 = new THREE.BoxGeometry(1, 1,1)
	const material2 = new THREE.MeshPhongMaterial()
	const texture2 = new THREE.TextureLoader().load('./img/juve.jpeg')
	material2.map = texture2
	const normalTexture2 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material2.bumpMap = normalTexture2
	material2.bumpScale = 10;

	/*material.displacementMap = normalTexture;
	material.displacementScale = 2;
	material.displacementBias = 3;
	*/
	const plane2 = new THREE.Mesh(planeGeometry2, material2)
	plane2.position.set(-10,-7,-100.2)
	plane2.scale.set(3,3,3);
	scene.add(plane2)
	arrayObsX.push(plane2.position.x);
	arrayObsZ.push(plane2.position.z);

	/****3****/

	const geometry4 = new THREE.BoxGeometry(1, 1,1)
	const material4 = new THREE.MeshPhongMaterial()
	const texture4 = new THREE.TextureLoader().load('./img/nike.jpg')
	material4.map = texture4


	const normalTexture4 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material4.bumpMap = normalTexture4
	material4.bumpScale = 10;



	const cube4= new THREE.Mesh(geometry4, material4)

	cube4.position.set(-10,-7,-112.2)
	cube4.scale.set(3,3,3);


	scene.add(cube4)



	arrayObsX.push(cube4.position.x);
	arrayObsZ.push(cube4.position.z);

	/****4****/

	const geometry5= new THREE.BoxGeometry(1, 1,1)

	const material5= new THREE.MeshPhongMaterial()

	const texture5 = new THREE.TextureLoader().load('./img/jordan.jpg')
	material5.map = texture5


	const normalTexture5 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material5.bumpMap = normalTexture5
	material5.bumpScale = 10;


	const cube5= new THREE.Mesh(geometry5, material5)

	cube5.position.set(-10,-7,-122.2)
	cube5.scale.set(3,3,3);

	scene.add(cube5)



	/****5****/

	const normalTexture6 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	var materials6 = [
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/nike.jpg'),

	}),
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/nike.jpg'),
	bumpMap: normalTexture6,
	bumpScale: 10
	}),
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/jordan.jpg'),
	bumpMap: normalTexture6,
	bumpScale: 10
	}),
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/mc.jpeg'),
	bumpMap: normalTexture6,
	bumpScale: 10
	}),
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/juve.jpeg'),
	bumpMap: normalTexture6,
	bumpScale: 10
	}),
	new THREE.MeshPhongMaterial({
	map: loader7.load('./img/jordan.jpg'),
	bumpMap: normalTexture6,
	bumpScale: 10
	})
	];


	const geometry6 = new THREE.BoxGeometry( 1, 1, 1 );

	const cube6 = new THREE.Mesh( geometry6, materials6 );
	cube6.position.set(-10,-7,-130.2)
	cube6.scale.set(3,3,3);
	scene.add( cube6 );	

	arrayObsX.push(cube6.position.x);
	arrayObsZ.push(cube6.position.z);


	cliff = new THREE.Object3D();

	loader.load('./models/caution/scene.gltf', function ( gltf ) {

	gltf.scene.traverse( function ( object ) {

	if ( object.isMesh ) object.castShadow = true;

	} );


	cliff =  SkeletonUtils.clone(gltf.scene);

	cliff.scale.set(0.15,0.15,0.15)
	cliff.position.y= -8.40;
	cliff.position.z= -127.2;
	cliff.position.x= 20 ;

	scene.add(cliff);

	} );

	cliff2 = new THREE.Object3D();

	loader.load('./models/caution/scene.gltf', function ( gltf ) {

	gltf.scene.traverse( function ( object ) {

	if ( object.isMesh ) object.castShadow = true;

	} );


	cliff2 =  SkeletonUtils.clone(gltf.scene);

	cliff2.scale.set(0.15,0.15,0.15)
	cliff2.position.y= -8.40;
	cliff2.position.z= -90.2;
	cliff2.position.x= 20 ;

	scene.add(cliff2);

	} );

	//NON UN CLIFF

	/*const geometry11 = new THREE.BoxGeometry( 10, 10,10);
	const material11 = new THREE.MeshPhongMaterial( { color: 0xffffff} );
	const sphere = new THREE.Mesh( geometry11, material11 );
	const texture11 = new THREE.TextureLoader().load('./img/index.jpg')
	material11.map = texture11
	const normalTexture11 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material11.bumpMap = normalTexture11
	material11.bumpScale = 10;
	sphere.position.z = -90.2
	sphere.position.x = 20;
	sphere.position.y = -3.5


	material11.shininess = 100;
	//material11.transmission = 0.1;
	scene.add( sphere );


	*/



	/********** ********** **********CONE OBSTACLES ********** ********** **********/

	cone = new THREE.Object3D();
	const loader4 = new GLTFLoader();
	loader.load( './models/traffic_cone/scene.gltf', function ( gltf ) {

	gltf.scene.traverse( function ( object ) {

	if ( object.isMesh ) object.castShadow = true;

	} );
	/********** Cone 1 **********/
	cone = gltf.scene;
	cone.position.y= -8.55;
	cone.position.z= -108.2;
	cone.position.x= -25;
	cone.scale.set(0.5,0.5,0.5)

	scene.add( cone);
	arrayConeX.push(cone.position.x);
	arrayConeZ.push(cone.position.z);

	/********** Cone 2 **********/
	cone3 =  SkeletonUtils.clone(gltf.scene);
	cone3.scale.set(0.5,0.5,0.5)
	cone3.position.y= -8.55;
	cone3.position.z= -120.2;
	cone3.position.x= -25 ;

	scene.add(cone3);
	arrayConeX.push(cone3.position.x);
	arrayConeZ.push(cone3.position.z);

	/********** Cone 3 **********/
	cone4 =  SkeletonUtils.clone(gltf.scene);
	cone4.scale.set(0.5,0.5,0.5)
	cone4.position.y= -8.55;
	cone4.position.z= -96.2;
	cone4.position.x= -25 ;

	scene.add(cone4);
	arrayConeX.push(cone4.position.x);
	arrayConeZ.push(cone4.position.z);

	/********** Cone 4 **********/
	cone2 =  SkeletonUtils.clone(gltf.scene);
	cone2.scale.set(0.5,0.5,0.5)
	cone2.position.y= -8.55;
	cone2.position.z= -132.2;
	cone2.position.x= -25 ;

	scene.add(cone2);
	arrayConeX.push(cone2.position.x);
	arrayConeZ.push(cone2.position.z);


	/*cone5 =  SkeletonUtils.clone(gltf.scene);
	cone5.scale.set(0.5,0.5,0.5)
	cone5.position.y= -8.55;
	cone5.position.z= -132.2;
	cone5.position.x= -25 ;

	scene.add(cone5);
	arrayConeX.push(cone5.position.x);
	arrayConeZ.push(cone5.position.z);*/

	/********** Cone 5 **********/
	cone6 =  SkeletonUtils.clone(gltf.scene);
	cone6.scale.set(0.5,0.5,0.5)
	cone6.position.y= -8.55;
	cone6.position.z= -84.2;
	cone6.position.x= -25 ;

	scene.add(cone6);
	arrayConeX.push(cone6.position.x);
	arrayConeZ.push(cone6.position.z);

	/********** Cone 5 **********/
	cone7 =  SkeletonUtils.clone(gltf.scene);
	cone7.scale.set(0.5,0.5,0.5)
	cone7.position.y= -8.55;
	cone7.position.z= -142.2;
	cone7.position.x= -25 ;

	scene.add(cone7);
	arrayConeX.push(cone7.position.x);
	arrayConeZ.push(cone7.position.z);


	/*cone8 =  SkeletonUtils.clone(gltf.scene);
	cone8.scale.set(0.5,0.5,0.5)
	cone8.position.y= -8.55;
	cone8.position.z= -84.2;
	cone8.position.x= -25 ;

	scene.add(cone8);
	arrayConeX.push(cone8.position.x);
	arrayConeZ.push(cone8.position.z);*/

	/********** Cone 6 **********/
	cone9 =  SkeletonUtils.clone(gltf.scene);
	cone9.scale.set(0.5,0.5,0.5)
	cone9.position.y= -8.55;
	cone9.position.z= -74.2;
	cone9.position.x= -25 ;

	scene.add(cone9);
	arrayConeX.push(cone9.position.x);
	arrayConeZ.push(cone9.position.z);


	} );
	/********** ********** ********** END CONE OBSTACLES ********** ********** **********/

	/********** ********** **********  ADV **********  **********   *********** */
	/****ADV 1****/

	const planeGeometry = new THREE.BoxGeometry(10, 1,0.2)

	const material = new THREE.MeshPhongMaterial()

	const texture = new THREE.TextureLoader().load('./img/amazon.jpg')
	material.map = texture

	const normalTexture = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material.bumpMap = normalTexture
	material.bumpScale = 10;

	/*material.displacementMap = normalTexture;
	material.displacementScale = 2;
	material.displacementBias = 3;
	*/
	const plane = new THREE.Mesh(planeGeometry, material)

	plane.position.set(-10,-7,-71.2)
	plane.scale.set(3,3,3);


	scene.add(plane)

	/*	
	const loaderADV = new THREE.TextureLoader();
	var materialsADV = [
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV.load('./img/amazon.jpg')
	})
	];


	const geometryADV = new THREE.BoxGeometry( 10, 1, 0.2 );

	const cubeADV = new THREE.Mesh( geometryADV, materialsADV );
	cubeADV.position.set(-10,-7,-71.2)
	cubeADV.scale.set(3,3,3);
	scene.add( cubeADV );
	*/

	/**********ADV 2 *********/
	/*const loaderADV2 = new THREE.TextureLoader();
	var materialsADV2 = [
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV2.load('./img/amazon.jpg')
	})
	];


	const geometryADV2 = new THREE.BoxGeometry( 10, 1, 0.2 );

	const cubeADV2 = new THREE.Mesh( geometryADV2, materialsADV2 );
	cubeADV2.position.set(20,-7,-71.2)
	cubeADV2.scale.set(3,3,3);
	scene.add( cubeADV2 );
	*/

	const planeGeometry1 = new THREE.BoxGeometry(10, 1,0.2)

	const material1 = new THREE.MeshPhongMaterial()

	const texture1 = new THREE.TextureLoader().load('./img/amazon.jpg')
	material1.map = texture1

	const normalTexture1 = new THREE.TextureLoader().load(
	'./img/normal_4.png'
	)
	material1.normalMap = normalTexture1
	material1.normalScale.set(10,10)

	const plane1 = new THREE.Mesh(planeGeometry1, material1)

	plane1.position.set(20,-7,-71.2)
	plane1.scale.set(3,3,3);


	scene.add(plane1)

	/********ADV 3********/
	const loaderADV3 = new THREE.TextureLoader();
	var materialsADV3 = [
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV3.load('./img/slogan.png')
	})
	];


	const geometryADV3 = new THREE.BoxGeometry( 0.2, 5, 5 );

	const cubeADV3 = new THREE.Mesh( geometryADV3, materialsADV3 );
	cubeADV3.position.set(70,10,-108.5)
	cubeADV3.scale.set(3,3,3);
	scene.add( cubeADV3 );

	/**********ADV4**********/
	const loaderADV4 = new THREE.TextureLoader();
	var materialsADV4 = [
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV4.load('./img/slogan.png')
	})
	];


	const geometryADV4 = new THREE.BoxGeometry( 0.2, 5, 5 );

	const cubeADV4 = new THREE.Mesh( geometryADV4, materialsADV4 );
	cubeADV4.position.set(70,10,-82.5)
	cubeADV4.scale.set(3,3,3);
	scene.add( cubeADV4 );

	/**********ADV5**********/
	const loaderADV5 = new THREE.TextureLoader();
	var materialsADV5 = [
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	}),
	new THREE.MeshLambertMaterial({
	map: loaderADV5.load('./img/slogan.png')
	})
	];


	const geometryADV5 = new THREE.BoxGeometry( 0.2, 5, 5 );

	const cubeADV5 = new THREE.Mesh( geometryADV5, materialsADV5 );
	cubeADV5.position.set(70,10,-134.5)
	cubeADV5.scale.set(3,3,3);
	scene.add( cubeADV5 );

	/*******************END ADV *********************/


	/******************* HIERARCHICAL MODEL *********************/
	modelMesh1 = new THREE.Object3D();
	modelMesh2 = new THREE.Object3D();
	modelMesh3 = new THREE.Object3D();
	modelMesh4 = new THREE.Object3D();
	/*********PLAYER******/

	modelMesh5 = new THREE.Object3D();

	const loader2 = new GLTFLoader();
	loader.load( './models/scene.gltf', function ( gltf ) {

		gltf.scene.traverse( function ( object ) {

			if ( object.isMesh ){
				object.castShadow = true;
				if(colorP==1) object.material.color.setHex(0x20a92d);
				if(colorP==2) object.material.color.setHex(0x2271b3);
				objects.push(object);
			}


		} );

		modelMesh5 =  SkeletonUtils.clone(gltf.scene);
		modelMesh5.scale.set(0.5,0.5,0.5)
		modelMesh5.position.y= -8.55;
		modelMesh5.position.z= -108.2;
		modelMesh5.position.x= -39;
		modelMesh5.rotation.y=-20.4;
		scene.add( modelMesh5);
		getPartiDelCorpo(modelMesh5);

	} );

	/************END PLAYER ***********/
	/************KEEPER ***********/
	const loaderKeeper = new GLTFLoader();
	loaderKeeper.load( './models/scene.gltf', function ( gltf ) {

		gltf.scene.traverse( function ( object ) {

			if ( object.isMesh ){
				object.castShadow = true;
				if(colorK==2) object.material.color.setHex(0xe71837);
				if(colorK==2) object.material.color.setHex(0xf400a1 );
				objects.push(object);
			}


		} );


		modelKeeper =  SkeletonUtils.clone(gltf.scene);
		modelKeeper.scale.set(0.5,0.5,0.5)
		modelKeeper.position.y= -8.55;
		modelKeeper.position.z= -108.2;
		modelKeeper.position.x= 66.0;
		modelKeeper.rotation.y=20.4;
		scene.add( modelKeeper);
		getPartiDelCorpo2(modelKeeper);

	} );

	/************END KEEPER***********/	
	/************NEXT PLAYER ***********/
	modelMesh1 = new THREE.Object3D();

	const loaderNext = new GLTFLoader();
	loaderNext.load( './models/scene.gltf', function ( gltf ) {

	gltf.scene.traverse( function ( object ) {

	if ( object.isMesh ){
	object.castShadow = true;
	object.material.color.setHex(0xffff00);
	objects.push(object);
	}


	} );

	modelMesh1 =  SkeletonUtils.clone(gltf.scene);
	modelMesh1.scale.set(0.5,0.5,0.5)
	modelMesh1.position.y= -8.55;
	modelMesh1.position.z= -144.2;
	modelMesh1.position.x= -20;
	modelMesh1.rotation.y=-20.4;

	scene.add( modelMesh1);
	getPartiDelCorpo3(modelMesh1);
	jumpingJack();
	} );
	/************END NEXTPLAYER ***********/

	/*****************************END MODEL ******************************/

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();
	container.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	//controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 2;
	controls.maxDistance = 10;
	controls.target.set( -17, -1.5, -54 );
	//controls.target.set( 38, -1.5, -54 );

	controls.update();
	document.addEventListener("keydown", downPress, false);
	document.addEventListener("keyup", upPress, false);
	window.addEventListener( 'resize', onWindowResize );


	}

	function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.updateProjectionMatrix();

	

}

/*****END INIT FUNCTION ***********/



function getPartiDelCorpo(model){

	model.traverse ( o => {
	//console.log(o.name+": "+o.type);
	// Reference the neck and waist bones
	if ( o.name === 'armr_07') { 
	armR = o;
	}
	if ( o.name === 'arml_04') { 
	armL = o;
	}

	if ( o.name === 'Sketchfab_model') { 
	root = o;
	}
	if ( o.name === 'chest_01') { 
	chest = o;
	}
	if ( o.name === 'upperlegr_013') { 
	legR = o;
	}
	if ( o.name === 'upperlegl_010') { 
	legL = o;
	}
	if ( o.name === 'lowerlegl_011') { 
	LlegL = o;
	}
	if ( o.name === 'lowerlegr_014') { 
	LlegR = o;
	}
	if ( o.name === 'footl_012') { 
	footL = o;
	}
	if ( o.name === 'footr_015') { 
	footR = o;
	}
	if ( o.name === 'forearmr_08') { 
	LarmR = o;
	}
	if ( o.name === 'forearml_05') { 
	LarmL = o;
	}

	} );
}

function getPartiDelCorpo2(model){

	model.traverse ( o => {
	//(o.name+": "+o.type);
	// Reference the neck and waist bones
	if ( o.name === 'armr_07') { 
	armR2 = o;
	}
	if ( o.name === 'arml_04') { 
	armL2 = o;
	}

	if ( o.name === 'Sketchfab_model') { 
	root2 = o;
	}
	if ( o.name === 'chest_01') { 
	chest2 = o;
	}
	if ( o.name === 'upperlegr_013') { 
	legR2 = o;
	}
	if ( o.name === 'upperlegl_010') { 
	legL2 = o;
	}
	if ( o.name === 'lowerlegl_011') { 
	LlegL2 = o;
	}
	if ( o.name === 'lowerlegr_014') { 
	LlegR2 = o;
	}
	if ( o.name === 'footl_012') { 
	footL2 = o;
	}
	if ( o.name === 'footr_015') { 
	footR2 = o;
	}
	if ( o.name === 'kneck_02') { 
	kneck2 = o;
	}
	if ( o.name === 'forearmr_08') { 
	LarmR2 = o;
	}
	if ( o.name === 'forearml_05') { 
	LarmL2 = o;
	}
	} );
}

function getPartiDelCorpo3(model){

	model.traverse ( o => {
	//console.log(o.name+": "+o.type);
	// Reference the neck and waist bones
	if ( o.name === 'armr_07') { 
	armR3 = o;
	}
	if ( o.name === 'arml_04') { 
	armL3 = o;
	}

	if ( o.name === 'Sketchfab_model') { 
	root3 = o;
	}
	if ( o.name === 'chest_01') { 
	chest3 = o;
	}
	if ( o.name === 'upperlegr_013') { 
	legR3 = o;
	}
	if ( o.name === 'upperlegl_010') { 
	legL3 = o;
	}
	if ( o.name === 'lowerlegl_011') { 
	LlegL3 = o;
	}
	if ( o.name === 'lowerlegr_014') { 
	LlegR3 = o;
	}
	if ( o.name === 'footl_012') { 
	footL3 = o;
	}
	if ( o.name === 'footr_015') { 
	footR3 = o;
	}

	} );
}
/*
function ball(){

	coords = { bx:47, by: -8.55, bz:-91.2,lx:-0.16}; // Start at (0, 0)



	tween0 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({ bx:42.5,by:-7,bz:-95,
	lx:1.0}, 400) // Move to (300, 200) in 1 second.
	.delay(3000)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	model2.position.x= coords.bx;
	model2.position.y= coords.by;
	model2.position.z= coords.bz;
	legL.rotation.x= coords.lx;
	//console.log(coords2.x);
	})
	;

	// Start the tween immediately.



	var tween2 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords2'.
	.to({ bx:42.5,by:-8.55,bz:-100.2,lx:-0.16 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	model2.position.x= coords.bx;
	model2.position.y= coords.by;
	model2.position.z= coords.bz;
	legL.rotation.x= coords.lx;
	//console.log(coords2.x);
	})





	tween0.chain(tween2);
	tween0.start();


	}

*/


	function animate(time) {
	//render();
	id=requestAnimationFrame(animate);
	TWEEN.update(time);
	var result = TWEEN.update(time)
	renderer.render( scene, camera );

	//console.log(playerSelected)
}



function run(){

	coords = { r:-2.78, l: 2.78, j:0,hx:0,
	rl: -2.84, ll: 2.84, lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15} // Start at (0, 0)


	var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-0.78, l: 2.78 ,j: 0, hx:0.5,
	rl: -2.84, ll: 2.84,  lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	//console.log(coords.x);
	})
	// Start the tween immediately.

	var tween2 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-0.38, l: 2.58 ,j: 0, hx:0.7,
	rl: -2.84, ll: 2.84,  lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15}, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	armL2.rotation.z= coords.l;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	//console.log(coords.x);
	})
	// Start the tween immediately.

	var tween3 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-2.78, l: 2.78, j:0,hx:0,
	rl: -2.84, ll: 2.84, lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15}, 400) // Move to (300, 200) in 1 second.
	.delay(500)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	armL2.rotation.z= coords.l;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	})
	// Start the tween immediately.

	var tween4 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-2.78, l: 0.78 ,j: 0, hx:-0.5,
	rl: -2.84, ll: 2.84,  lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15  }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	armL2.rotation.z= coords.l;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	//console.log(coords.x);
	})
	// Start the tween immediately.

	var tween5 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-2.58, l: 0.38 ,j: 0, hx:-0.7,
	rl: -2.84, ll: 2.84,  lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	armL2.rotation.z= coords.l;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	//console.log(coords.x);
	})

	var tween6 = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
	.to({r:-2.78, l: 2.78, j:0,hx:0,
	rl: -2.84, ll: 2.84, lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
	.delay(500)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	root2.position.y= coords.j
	chest2.rotation.z= coords.hx
	armR2.rotation.z= coords.r;
	armL2.rotation.z= coords.l;
	legR2.rotation.z= coords.rl;
	legR2.rotation.x= coords.rx;
	legL2.rotation.z= coords.ll;
	legL2.rotation.x= coords.lx;
	LlegR2.rotation.x=coords.rlx;
	footR2.rotation.x=coords.fx;
	footL2.rotation.x=coords.fx;
	footR2.rotation.y=coords.fry;
	footL2.rotation.y=coords.fly;
	})
	// Start the tween immediately.

	tween.chain(tween2);
	tween2.chain(tween3);
	tween3.chain(tween4);
	tween4.chain(tween5);
	tween5.chain(tween6);
	tween6.chain(tween);
	tween.start();
}


function readyToKick(){
	frontPort=true;
	console.log("OK"+frontPort)
	var tweenk = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords'.
	.to({ lar:-0.02,lal:-0.02,al:-0.08,ar:-0.08,arz:0.13,
	llr:-0.11,lll:-0.11,ll:-0.16,lr:-0.16,rf:-0.95,hx: 0,llrz:-0.11,lf:-0.95},100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	verifyHit();
	LarmR.rotation.x= coords2.lar;
	LarmL.rotation.x= coords2.lal;
	chest.rotation.x= coords2.hx
	armR.rotation.x= coords2.ar;
	armL.rotation.x= coords2.al;
	LarmR.rotation.z= coords2.arz;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	LlegL.rotation.x=coords2.lll;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	})

	tweenk.start();

}

function jumpingJack(){
	var coords3 = { r:-2.78, l: 2.78, j:0,
	rl:-3.04, ll:3.04, lx:-0.16,llx:-0.16,
	fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0 } // Start at (0, 0)


	var tweenj = new TWEEN.Tween(coords3) // Create a new tween that modifies 'coords'.
	.to({ r: -1.38, l: 1.38 ,j: 3,
	rl: -2.94, ll: 2.94,lx:-0.16,llx:-0.16,
	fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0}, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	armR3.rotation.z= coords3.r;
	armL3.rotation.z= coords3.l;
	root3.position.y= coords3.j
	legR3.rotation.z= coords3.rl;
	legL3.rotation.z= coords3.ll;
	footR3.rotation.z=coords3.fr;
	footL3.rotation.z=coords3.fl;
	footR3.rotation.x=coords3.fx;
	footL3.rotation.x=coords3.fx;
	footR3.rotation.y=coords3.fry;
	footL3.rotation.y=coords3.fly;
	//console.log(coords3.x);
	})
	// Start the tween immediately.



	var tween2 = new TWEEN.Tween(coords3) // Create a new tween that modifies 'coords3'.
	.to({ r: -0.38, l: 0.38 ,j: 0,
	rl: -2.84, ll: 2.84, lx:0.6,llx:1.0,
	fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords3'.
	// Move 'box' to the position described by 'coords3' with a CSS translation.
	armR3.rotation.z= coords3.r;
	armL3.rotation.z= coords3.l;
	root3.position.y= coords3.j
	legR3.rotation.z= coords3.rl;
	legL3.rotation.z= coords3.ll;
	legL3.rotation.x= coords3.lx;
	legR3.rotation.x= coords3.lx;
	LlegR3.rotation.x=coords3.llx;
	LlegL3.rotation.x=coords3.llx;
	footR3.rotation.z=coords3.fr;
	footL3.rotation.z=coords3.fl;
	footR3.rotation.x=coords3.fx;
	footL3.rotation.x=coords3.fx;
	footR3.rotation.y=coords3.fry;
	footL3.rotation.y=coords3.fly;
	//console.log(coords3.x);
	})



	var tween3 = new TWEEN.Tween(coords3) // Create a new tween that modifies 'coords3'.
	.to({ r: -1.38, l: 1.38 ,j: 3, //arm and root
	rl: -2.94, ll: 2.94,lx:-0.16,llx:-0.16, //legs
	fr:-0.02,fl:0.02,fx: -0.4, fly:0.01,fry:0.01 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords3'.
	// Move 'box' to the position described by 'coords3' with a CSS translation.
	armR3.rotation.z= coords3.r;
	armL3.rotation.z= coords3.l;
	root3.position.y= coords3.j
	legR3.rotation.z= coords3.rl;
	legR3.rotation.x= coords3.lx;
	legL3.rotation.z= coords3.ll;
	legL3.rotation.x= coords3.lx;
	LlegR3.rotation.x=coords3.llx;
	LlegL3.rotation.x=coords3.llx;
	footR3.rotation.z=coords3.fr;
	footL3.rotation.z=coords3.fl;
	footR3.rotation.x=coords3.fx;
	footL3.rotation.x=coords3.fx;
	footR3.rotation.y=coords3.fry;
	footL3.rotation.y=coords3.fly;
	//console.log(coords3.x);
	})



	var tween4 = new TWEEN.Tween(coords3) // Create a new tween that modifies 'coords3'.
	.to({ r:-2.78, l: 2.78, j:0,
	rl:-3.04, ll:3.04, lx:-0.16,llx:-0.16,
	fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords3'.
	// Move 'box' to the position described by 'coords3' with a CSS translation.
	armR3.rotation.z= coords3.r;
	armL3.rotation.z= coords3.l;
	root3.position.y= coords3.j
	legR3.rotation.z= coords3.rl;
	legL3.rotation.z= coords3.ll;
	footR3.rotation.x=coords3.fx;
	footL3.rotation.x=coords3.fx;
	footR3.rotation.z=coords3.fr;
	footL3.rotation.z=coords3.fl;
	footR3.rotation.x=coords3.fx;
	footL3.rotation.x=coords3.fx;
	footR3.rotation.y=coords3.fry;
	footL3.rotation.y=coords3.fly;
	//console.log(coords2.x);
	})

	tweenj.chain(tween2);
	tween2.chain(tween3);
	tween3.chain(tween4);
	tween4.chain(tweenj);
	tweenj.start();


}

function kicking(n){
	coords2 = { lar:-0.02,lal:-0.02,al:-0.08,ar:-0.08,arz:0.13,bx:44.8,by:-8.55,bz:-107.2,
	llr:-0.11,lll:-0.11,ll:-0.16,lr:-0.16,rf:-0.95,hx: 0,llrz:-0.11,lf:-0.95} // Start at (0, 0)

	//console.log(footL.rotation.x)
	//console.log(legR.rotation.x)
	console.log(modelMesh5.position.z);
	tween11 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords'.
	.to({ lar:-0.8,lal:-1.2,al:-0.8,ar:0.5,arz:-0.4,bx:44.8,by:-8.55,bz:-107.2,
	llr:1.1,lll:0.70,ll:0.50,lr:-0.2,rf:-1.3,hx:-0.4,llrz:-0.11,lf:-0.96},100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.

	LarmR.rotation.x= coords2.lar;
	LarmL.rotation.x= coords2.lal;
	chest.rotation.x= coords2.hx
	armR.rotation.x= coords2.ar;
	armL.rotation.x= coords2.al;
	LarmR.rotation.z= coords2.arz;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	LlegL.rotation.x=coords2.lll;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;

	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}


	


	//console.log(coords2.x);
	})
	// Start the tween immediately.



	var tween2 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.8,lal:-1.8,al:-0.6,ar:-1,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:1.3,lll:-0.11,ll:-0.70,lr:1.3,rf:-0.65,hx: -0.3,llrz:0.01,lf:-0.9 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmR.rotation.x= coords2.lar;
	LarmR.rotation.z= coords2.arz;
	armR.rotation.x= coords2.ar;
	armL.rotation.x= coords2.al;
	LarmL.rotation.x= coords2.lal;
	chest.rotation.x= coords2.hx
	legL.rotation.x= coords2.ll;
	LlegL.rotation.x=coords2.lll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	LlegR.rotation.z=coords2.llrz;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft() ){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	
	}


	//console.log(coords2.x);
	})



	var tween3 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.6,lal:-1.8,al:-0.2,ar:-1.3,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.8,lll:0.5,ll:-0.50,lr:1.2,rf:-1.1,hx: -0.2,llrz:0.01,lf:-0.8 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmR.rotation.x= coords2.lar;
	armL.rotation.x= coords2.al;
	LarmL.rotation.x= coords2.lal;
	armR.rotation.x= coords2.ar;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	LlegL.rotation.x=coords2.lll;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;
	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	})



	var tween4 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.2,lal:-1.8,al:-0.2,ar:-1.5,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.2,lll:0.8,ll:-0.50,lr:0.7,rf:-1.5,hx: -0.1,llrz:0.01,lf:-0.6 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	chest.rotation.x= coords2.hx
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}



	})

	var tween5 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.4,lal:-1.0,al:-0.7,ar:0,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.2,lll:0.8,ll:0.50,lr:-0.5,rf:-1,hx: -0.05,llrz:0.01,lf:-1 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	footL.rotation.x = coords2.lf;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	


	})
	var tween6 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.4,lal:-0.8,al:-1.2,ar:0,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.5,lll:0.8,ll:0.8,lr:-0.7,rf:-0.6,hx: -0.1,llrz:0.01,lf:-1.2},100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	footL.rotation.x = coords2.lf;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.position.y = modelMesh5.position.y - 0.015;
	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}



	})

	tween8 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.5,lll:0.8,ll:1.0,lr:-0.9,rf:-0.3,hx: -0.4,llrz:0.01,lf:-0.9 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footL.rotation.x = coords2.lf;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.position.y = modelMesh5.position.y - 0.015;

	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	// //controls.target.set(d1,-1.5, d3)
	// //controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}





	})


	tween9 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.5,lll:0.8,ll:1.0,lr:0.9,rf:-0.6,hx: -0.2,llrz:0.01,lf:-0.9},100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footL.rotation.x = coords2.lf;

	footR.rotation.x = coords2.rf;
	footR.rotation.z = -30.5;
	chest.rotation.x= coords2.hx
	modelMesh5.position.y = modelMesh5.position.y - 0.015;


	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	// //controls.target.set(d1,-1.5, d3)
	// //controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}


	})
	if(n==1){
	tween76 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:64.93,by:-8.55,bz:-100.02,
		llr:0.5,lll:0.8,ll:1.0,lr:0.9,rf:-0.6,hx: 5,llrz:0.01,lf:-0.9,ball:1},800) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.


	modelball.position.x =coords2.bx;

	modelball.position.y =coords2.by;

	modelball.position.z =coords2.bz;

	modelball.rotation.y+=2;

	})

	}

	if(n==2){
	tween76 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:70,by:-2.30,bz:-102.02,
		llr:0.5,lll:0.8,ll:1.0,lr:0.9,rf:-0.6,hx: 5,llrz:0.01,lf:-0.9,ball:1},800) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.


	modelball.position.x =coords2.bx;

	modelball.position.y =coords2.by;

	modelball.position.z =coords2.bz;

	modelball.rotation.y+=2;

	})

	}

	if(n==3){
	tween76 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:70,by:-2.30,bz:-112.02,
		llr:0.5,lll:0.8,ll:1.0,lr:0.9,rf:-0.6,hx: 5,llrz:0.01,lf:-0.9,ball:1},800) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.


	modelball.position.x =coords2.bx;

	modelball.position.y =coords2.by;

	modelball.position.z =coords2.bz;

	modelball.rotation.y+=2;

	})

	}

	if(n==4){
	tween76 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:64.93,by:-8.55,bz:-115.02,
		llr:0.5,lll:0.8,ll:1.0,lr:0.9,rf:-0.6,hx: 5,llrz:0.01,lf:-0.9,ball:1},800) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.


	modelball.position.x =coords2.bx;

	modelball.position.y =coords2.by;

	modelball.position.z =coords2.bz;

	modelball.rotation.y+=2;

	})

	}

	tween77 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.5,lll:0.8,ll:1.0,lr:1.8,rf:-0.6,hx: -0.1,llrz:0.01,lf:-0.9 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footL.rotation.x = coords2.lf;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.position.y = modelMesh5.position.y - 0.001;

	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	// //controls.target.set(d1,-1.5, d3)
	// //controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	})

	tween78 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({lar:-0.9,lal:-0.9,al:-1.3,ar:-0.5,arz:0.2,bx:44.8,by:-8.55,bz:-107.2,
	llr:0.8,lll:0.5,ll:1.2,lr:0.8,rf:-0.8,hx: 0.5,llrz:0.01,lf:-1.2  },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.

	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footL.rotation.x = coords2.lf;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.position.y +=0.02
	modelMesh5.rotation.z+=0.038;
	armR.rotation.z= coords2.ar;
	LarmR.rotation.z= coords2.lar;
	LarmR.rotation.y= coords2.lar;


	modelMesh5.getWorldPosition(posBefore);
	if (straight){ 

	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;

	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;

	// //controls.target.set(d1,-1.5, d3)
	// //controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	})



	tween11.onComplete(()=>{tween2.start();});
	tween2.onComplete(()=>{tween3.start();});
	tween3.onComplete(()=>{tween4.start();});
	tween4.onComplete(()=>{tween5.start();});
	tween5.onComplete(()=>{tween6.start();});
	tween6.onComplete(()=>{tween8.start();});
	tween8.onComplete(()=>{tween9.start();});
	tween9.onComplete(()=>{tween76.start();tween77.start();});
	//tween77.onComplete(()=>{tween78.start()})

	tween11.start();


}



function keeper1(){
	var coords4 = { r:-2.78, l: 2.78, j:0,hx:0,lal:0,lar:0,lalx:0,larx:0,
	rl:-3.04, ll:3.04, lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.1,fl:0.1,fxr: -1,fxl: -1,fly:0,fry:0,y:-8.55,z:-108.2,rz:0 } // Start at (0, 0)
	console.log(modelKeeper.rotation.z)

	var tweenkeep = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords'.
	.to({ r: -0.38, l: 0.38 ,j: 0,hx:0, lal:-1.2,lar:1.3,lalx:-0.3,larx:-0.2,
	rl: -2.84, ll: 2.84,lxr:0.6,lxl:0.6,llxr:1.0,llxl:1.0,
	fr:-0.3,fl:0.3,fxr: -1.4,fxl: -1.4,fly:-0.15,fry:0.15,y:-9.0,z:-108.2,rz:0 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords3'.
	// Move 'box' to the position described by 'coords3' with a CSS translation
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	legR2.rotation.z= coords4.rl;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	legR2.rotation.x= coords4.lxr;
	LarmL2.rotation.y=coords4.lal;
	LarmR2.rotation.y=coords4.lar;
	LarmL2.rotation.x=coords4.lalx;
	LarmR2.rotation.x=coords4.larx;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	//console.log(coords3.x);
	})
	// Start the tween immediately.


	var tween2k = new TWEEN.Tween(coords4)
	// Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:0.4,
	rl: -2.60, ll: 2.60, lxr:0.2,lxl:0.6,llxr:0.5,llxl:1.2,
	fr:-0.3,fl:0.3,fxr: -1.4,fxl: -1.6,fly:-0.15,fry:0.15, y:-9.16,z:-108.2,rz:0 }, 200) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	chest2.rotation.z= coords4.hx;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	legR2.rotation.x= coords4.lxr;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	//modelKeeper.rotation.z+=0.001;
	//console.log(coords4.x);
	})



	var tween3k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:0.4,
	rl: -2.60, ll: 2.60, lxr:0.2,lxl:0.8,llxr:0.5,llxl:1.2,
	fr:-0.3,fl:0.3,fxr: -1.0,fxl: -1.0,fly:-0.15,fry:0.15, y:-8.95,z:-108.2,rz:0 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;

	//console.log(coords4.x);
	})



	var tween4k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({r: -0.18, l: 0.18 ,j: 0,hx:0.4,
	rl:-3.04, ll:3.04, lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15, y:-7.34,z:-107.39,rz:0.39 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	modelKeeper.position.z=coords4.z;
	modelKeeper.rotation.z=coords4.rz;
	//console.log(coords2.x);
	})

	var tween5k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18  ,j: 0,hx:-0.1,
	rl:-3.04, ll:3.55 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.1,fl:0.1,fxr: -0.1,fxl: -0.1,fly:-0.15,fry:0.15,y:-9.24,z:-106.73,rz:1.2 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j
	chest2.rotation.z= coords4.hx;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	modelKeeper.position.z=coords4.z;
	modelKeeper.rotation.z=coords4.rz;
	//console.log(coords2.x);
	})
	var tween6k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:0.1,
	rl:-3.04, ll:3.7 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15,y:-8.14,z:-106.73,rz:0.78  }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	modelKeeper.position.y=coords4.y;
	chest2.rotation.z= coords4.hx;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	//console.log(coords2.x);
	})

	var tween7k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({r: -0.18, l: 0.18  ,j: 0,hx:0.25,
	rl:-3.04, ll:3.5 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15,y:-9.24,z:-106.73,rz:0.78  }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	modelKeeper.position.y=coords4.y;
	chest2.rotation.z= coords4.hx;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	//console.log(coords2.x);
	})

	tweenkeep.onComplete(()=>{tween2k.start();});		
	tween2k.onComplete(()=>{tween3k.start();});	
	tween3k.onComplete(()=>{tween4k.start();});	
	tween4k.onComplete(()=>{tween5k.start();});	
	tween5k.onComplete(()=>{tween6k.start();});	
	tween6k.onComplete(()=>{tween7k.start();});	
	tweenkeep.start();


}

function keeper2(){
	var coords4 = { r:-2.78, l: 2.78, j:0,hx:0,lal:0,lar:0,lalx:0,larx:0,
	rl:-3.04, ll:3.04, lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.1,fl:0.1,fxr: -1,fxl: -1,fly:0,fry:0,y:-8.55,z:-108.2,rz:0 } // Start at (0, 0)

	var tweenkeep = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords'.
	.to({ r: -0.38, l: 0.38 ,j: 0,hx:0, lal:-1.2,lar:1.3,lalx:-0.3,larx:-0.2,
	rl: -2.84, ll: 2.84,lxr:0.6,lxl:0.6,llxr:1.0,llxl:1.0,
	fr:-0.3,fl:0.3,fxr: -1.4,fxl: -1.4,fly:-0.15,fry:0.15,y:-9.0,z:-108.2,rz:0 }, 400) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords3'.
	// Move 'box' to the position described by 'coords3' with a CSS translation
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	legR2.rotation.z= coords4.rl;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	legR2.rotation.x= coords4.lxr;
	LarmL2.rotation.y=coords4.lal;
	LarmR2.rotation.y=coords4.lar;
	LarmL2.rotation.x=coords4.lalx;
	LarmR2.rotation.x=coords4.larx;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	//console.log(coords3.x);
	})
	// Start the tween immediately.


	var tween2k = new TWEEN.Tween(coords4)
	// Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:-0.4,
	rl: -2.60, ll: 2.60, lxr:0.6,lxl:0.2,llxr:1.2,llxl:0.5,
	fr:-0.3,fl:0.3,fxr: -1.6,fxl: -1.4,fly:-0.15,fry:0.15, y:-9.16,z:-108.2,rz:0 }, 200) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	chest2.rotation.z= coords4.hx;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	legR2.rotation.x= coords4.lxr;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	//modelKeeper.rotation.z+=0.001;
	//console.log(coords4.x);
	})



	var tween3k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:0.4,
	rl: -2.60, ll: 2.60, lxr:0.8,lxl:0.2,llxr:1.2,llxl:0.5,
	fr:-0.3,fl:0.3,fxr: -1.0,fxl: -1.0,fly:-0.15,fry:0.15, y:-8.95,z:-108.2,rz:0 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;

	//console.log(coords4.x);
	})



	var tween4k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({r: -0.18, l: 0.18 ,j: 0,hx:0.4,
	rl:-3.04, ll:3.04, lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15, y:-7.34,z:-108.39,rz:-0.39 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	modelKeeper.position.z=coords4.z;
	modelKeeper.rotation.z=coords4.rz;
	//console.log(coords2.x);
	})

	var tween5k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18  ,j: 0,hx:-0.1,
	rl:-3.04, ll:-3.55 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.1,fl:0.1,fxr: -0.1,fxl: -0.1,fly:-0.15,fry:0.15,y:-9.24,z:-108.73,rz:-1.2 }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	armR2.rotation.z= coords4.r;
	armL2.rotation.z= coords4.l;
	root2.position.y= coords4.j
	chest2.rotation.z= coords4.hx;
	legR2.rotation.z= coords4.rl;
	legR2.rotation.x= coords4.lxr;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	legL2.rotation.x= coords4.lxl;
	LlegR2.rotation.x=coords4.llxr;
	LlegL2.rotation.x=coords4.llxl;
	footR2.rotation.z=coords4.fr;
	footL2.rotation.z=coords4.fl;
	footR2.rotation.x=coords4.fxr;
	footL2.rotation.x=coords4.fxl;
	footR2.rotation.y=coords4.fry;
	footL2.rotation.y=coords4.fly;
	modelKeeper.position.y=coords4.y;
	modelKeeper.position.z=coords4.z;
	modelKeeper.rotation.z=coords4.rz;
	//console.log(coords2.x);
	})
	var tween6k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({ r: -0.18, l: 0.18 ,j: 0,hx:-0.1,
	rl:-3.04, ll:-3.7 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15,y:-8.14,z:-106.73,rz:-0.78  }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	modelKeeper.position.y=coords4.y;
	chest2.rotation.z= coords4.hx;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	//console.log(coords2.x);
	})

	var tween7k = new TWEEN.Tween(coords4) // Create a new tween that modifies 'coords4'.
	.to({r: -0.18, l: 0.18  ,j: 0,hx:-0.25,
	rl:-3.04, ll:-3.5 , lxr:-0.16,lxl:-0.16,llxr:-0.16,llxl:-0.16,
	fr:-0.3,fl:0.3,fxr: -0.5,fxl: -0.5,fly:-0.15,fry:0.15,y:-9.24,z:-106.73,rz:-0.78  }, 100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords4'.
	// Move 'box' to the position described by 'coords4' with a CSS translation.
	modelKeeper.position.y=coords4.y;
	chest2.rotation.z= coords4.hx;
	legL2.rotation.z= coords4.ll;
	legR2.rotation.z= coords4.ll;
	//console.log(coords2.x);
	})

	tweenkeep.onComplete(()=>{tween2k.start();});		
	tween2k.onComplete(()=>{tween3k.start();});	
	tween3k.onComplete(()=>{tween4k.start();});	
	tween4k.onComplete(()=>{tween5k.start();});	
	tween5k.onComplete(()=>{tween6k.start();});	
	tween6k.onComplete(()=>{tween7k.start();});	
	tweenkeep.start();


}


function play(){
	coords2 = { lar:-0.02,lal:-0.02,al:-0.08,ar:-0.08,arz:0.13,
	llr:-0.11,lll:-0.11,ll:-0.16,lr:-0.16,rf:-0.95,hx: 0,llrz:-0.11,lf:-0.95} // Start at (0, 0)

	//console.log(footL.rotation.x)
	//console.log(legR.rotation.x)
	//console.log(modelMesh5.position.z);
	tween0 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords'.
	.to({ lar:-0.8,lal:-1.2,al:-0.8,ar:0.5,arz:-0.4,
	llr:1.1,lll:0.70,ll:0.50,lr:-0.2,rf:-1.3,hx:-0.4,llrz:-0.11,lf:-0.96},100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords'.
	// Move 'box' to the position described by 'coords' with a CSS translation.
	verifyHit();
	LarmR.rotation.x= coords2.lar;
	LarmL.rotation.x= coords2.lal;
	chest.rotation.x= coords2.hx
	armR.rotation.x= coords2.ar;
	armL.rotation.x= coords2.al;
	LarmR.rotation.z= coords2.arz;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	LlegL.rotation.x=coords2.lll;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}



	//console.log(coords2.x);
	})
	// Start the tween immediately.



	tween2 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.8,lal:-1.8,al:-0.6,ar:-1,arz:0.2,
	llr:1.3,lll:-0.11,ll:-0.70,lr:1.3,rf:-0.65,hx: -0.3,llrz:0.01,lf:-0.9 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmR.rotation.x= coords2.lar;
	LarmR.rotation.z= coords2.arz;
	armR.rotation.x= coords2.ar;
	armL.rotation.x= coords2.al;
	LarmL.rotation.x= coords2.lal;
	chest.rotation.x= coords2.hx
	legL.rotation.x= coords2.ll;
	LlegL.rotation.x=coords2.lll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	LlegR.rotation.z=coords2.llrz;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft() ){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
}

	


	//console.log(coords2.x);
	})



	tween3 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.6,lal:-1.8,al:-0.2,ar:-1.3,arz:0.2,
	llr:0.8,lll:0.5,ll:-0.50,lr:1.2,rf:-1.1,hx: -0.2,llrz:0.01,lf:-0.8 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmR.rotation.x= coords2.lar;
	armL.rotation.x= coords2.al;
	LarmL.rotation.x= coords2.lal;
	armR.rotation.x= coords2.ar;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	LlegL.rotation.x=coords2.lll;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;
	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}


	})



	tween4 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.2,lal:-1.8,al:-0.2,ar:-1.5,arz:0.2,
	llr:0.2,lll:0.8,ll:-0.50,lr:0.7,rf:-1.5,hx: -0.1,llrz:0.01,lf:-0.6 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	chest.rotation.x= coords2.hx
	footR.rotation.x = coords2.rf;
	footL.rotation.x = coords2.lf;
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	})

	tween5 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.4,lal:-1.0,al:-0.7,ar:0,arz:0.2,
	llr:0.2,lll:0.8,ll:0.50,lr:-0.5,rf:-1,hx: -0.05,llrz:0.01,lf:-1 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	footL.rotation.x = coords2.lf;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}

	


	})
	tween6 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.4,lal:-0.8,al:-1.2,ar:0,arz:0.2,
	llr:0.5,lll:0.8,ll:0.8,lr:-0.7,rf:-0.6,hx: -0.1,llrz:0.01,lf:-1.2 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	footL.rotation.x = coords2.lf;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}




	})

	tween7 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
	.to({ lar:-1.5,lal:-0.9,al:-1.3,ar:0.1,arz:0.2,
	llr:0.5,lll:0.7,ll:1,lr:-0.9,rf:-0.3,hx: -0.2,llrz:0.01,lf:-1.5 },100) // Move to (300, 200) in 1 second.
	.delay(0)
	.easing(TWEEN.Easing.Linear.None) // Use an easing function to make the animation smooth.
	.onUpdate(function() { // Called after tween.js updates 'coords2'.
	// Move 'box' to the position described by 'coords2' with a CSS translation.
	verifyHit();
	LarmL.rotation.x= coords2.lal;
	armL.rotation.x= coords2.al;
	LarmR.rotation.x= coords2.lar;
	armR.rotation.x= coords2.ar;
	LlegL.rotation.x=coords2.lll;
	legL.rotation.x= coords2.ll;
	legR.rotation.x= coords2.lr;
	LlegR.rotation.x=coords2.llr;
	footL.rotation.x = coords2.lf;
	footR.rotation.x = coords2.rf;
	chest.rotation.x= coords2.hx
	modelMesh5.getWorldPosition(posBefore);
	if (straight && verifyFrontBarrier()){ 
	modelMesh5.position.x+=0.1;
	d1+=0.05
	controls.target.set(d1,-1.5, -54)
	controls.update();
	//camera.position.x+=0.05;

	}
	if (left && verifyFieldLeft()){
	d3-=0.05;
	modelMesh5.position.z-=0.1;
	//controls.target.set(d1,-1.5, d3)
	//controls.update();
	//camera.position.z-=0.05;
	} 
	if (right && verifyFieldRight()){
	d3+=0.05;
	modelMesh5.position.z+=0.1;
	// //controls.target.set(d1,-1.5, d3)
	// //controls.update();
	//camera.position.z+=0.05;
	}
	if(mode==2){
		spotlight.position.x = modelMesh5.position.x;
		spotlight.position.y = 2
		spotlight.position.z = modelMesh5.position.z;
		spotlight.target.position.x = modelMesh5.position.x;
		spotlight.target.position.y = -8.55
		spotlight.target.position.z = modelMesh5.position.z;
		model2.position.z= modelMesh5.position.z;
		model2.position.x= modelMesh5.position.x;
	}
	console.log(modelMesh5.position.x);
	verifyKick();



	})

	tween0.onComplete(()=>{tween2.start();});
	tween2.onComplete(()=>{tween3.start();});
	tween3.onComplete(()=>{tween4.start();});
	tween4.onComplete(()=>{tween5.start();});
	tween5.onComplete(()=>{tween6.start();});
	tween6.onComplete(()=>{tween7.start();});
	tween7.onComplete(()=>{tween0.start();});


	tween0.start();


}


function downPress(event) {
	event.preventDefault();
	var key = event.which;
	switch(key){
	case 65: // A,
	//	if(modelMesh5.rotation.y!=0.0){
	//	modelMesh5.rotation.y = -1;

	if(check) {
	check=false;
	play();
	}

	break;
	case 37: // <-,

	if(check) {
	modelMesh5.rotation.y = 0.1;
	left=true;
	straight=false;
	right=false;
	}

	break;

	case 39: // ->,

	if(check) {
	modelMesh5.rotation.y = 3.1;
	left=false;
	straight=false;
	right=true;
	}

	break;

	case 38: // ^,
	if(check) {
	modelMesh5.rotation.y = -20.4;
	left=false;
	straight=true;
	right=false;
	}
	break;

	case 75:
	if(frontPort){
		frontPort=false;
		var rand=Math.floor(Math.random() * 4);
		if(rand==1){
		kicking(1);
		keeper1();
		scoreKeeper+=1;
		updateScore()
		window.setTimeout(function(){window.location.href="game.html?keep=true"},3000)
		}
		if(rand==2){
		kicking(2);
		keeper1();
		scorePlayer1+=1;
		updateScore()
		window.setTimeout(function(){window.location.href="game.html?goal=true"},3000)
		}
		if(rand==3){
		scorePlayer1=1;
		kicking(3);
		keeper2();
		updateScore()
		window.setTimeout(function(){window.location.href="game.html?goal=true"},3000)
		}
		if(rand==4){
		scoreKeeper+=1;
		kicking(4);
		keeper2();
		updateScore()
		window.setTimeout(function(){window.location.href="game.html?keep=true"},3000)
		}
	}


	break;

	}
}

function updateScore(){
	var SK= Number(JSON.parse(window.sessionStorage.getItem('ScoreKeeper'),10));
	var SP= Number(JSON.parse(window.sessionStorage.getItem('ScorePlayer'),10));
	console.log(SP)
	SK+=scoreKeeper;
	SP+=scorePlayer1;
	console.log(SP,JSON.stringify(SP),SP.toString());
	window.sessionStorage.setItem('ScoreKeeper', SK.toString());
	window.sessionStorage.setItem('ScorePlayer', SP.toString());
}

function upPress(event) {
	event.preventDefault();
	var key = event.which;
	switch(key){

	case 65:
	tween7.onComplete(()=>{check=true;});
	break;

	}
}


function verifyFieldLeft(){
	if (modelMesh5.position.z<-133){
	return false;
	}
	else if (modelMesh5.position.x>4.1){
	if(modelMesh5.position.z<-110 && modelMesh5.position.z>-104)
	return false;
	}
	else return true;
}

function verifyFieldRight(){
	if (modelMesh5.position.z>-80){
	return false;
	}
	else if (modelMesh5.position.x>4.1){
	if(modelMesh5.position.z>-104 && modelMesh5.position.z<-110)
	return false;
	}
	else return true;
	}
	function verifyFrontBarrier(){
	if (modelMesh5.position.x>2.1){
	if(modelMesh5.position.z>-110 && modelMesh5.position.z<-104) return true;
	else return false;
	}
	else return true;
}

function verifyHit(){
	if(hit() && firstHit==false){
	console.log("here")
	console.log(scorePlayer1);
	firstHit=true;
	scorePlayer1-=2;
	console.log(scorePlayer1);
	updateScore();
	window.location.href="game.html?fail=true";
	}
}
function hit(){
	var i;

	for(i=0;i<arrayObsX.length;i++){
	if((modelMesh5.position.x-arrayObsX[i])>-4.5 && (modelMesh5.position.x-arrayObsX[i])<3.5){
	if(modelMesh5.position.z>arrayObsZ[i]-2.5 && modelMesh5.position.z<arrayObsZ[i]+2.5){
	return true;
	}
	}
	}
	for(i=0;i<arrayConeX.length;i++){
	if((modelMesh5.position.x-arrayConeX[i])>-2.5 && (modelMesh5.position.x-arrayConeX[i])<2.5){
	if(modelMesh5.position.z>arrayConeZ[i]-1.5 && modelMesh5.position.z<arrayConeZ[i]+1.5){
	return true;
	}
	}
	}
}


function verifyKick(){
	if(modelMesh5.position.x>30) {
	tween7.onComplete(()=>{kick=true;frontPort=true;});
	console.log(frontPort+"a");
	readyToKick();
	}
}

function getParams(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const fail = urlParams.get('fail')
	const goal = urlParams.get('goal')
	const keep = urlParams.get('keep')
	if(goal) alert ("GOAL!!");
	if(fail) alert("GAME OVER");
	if(keep) alert("Kick Saved!!")

	time = Number(JSON.parse(window.sessionStorage.getItem('Time'),10));
	colorK = Number(JSON.parse(window.sessionStorage.getItem('ColorKeeper'),10));
	colorP = Number(JSON.parse(window.sessionStorage.getItem('ColorPlayer'),10));
	mode = Number(JSON.parse(window.sessionStorage.getItem('Mode'),10));

	console.log(time,colorK,colorP,mode);
}








//

