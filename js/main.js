'use strict';

			import * as THREE from './three.module.js'
			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
			import * as SkeletonUtils from './jsm/utils/SkeletonUtils.js';
			import {TWEEN} from './jsm/libs/tween.module.min.js'
			

			var modelMesh1;
			var modelMesh2;
			var armR;
			var armL;
			var root;
			var chest;
			var legR;
			var legL;
			var LlegL;
			var LlegR;
			var footR;
			var footL;
			var tween0;
			var tween;

			var armR2;
			var armL2;
			var root2;
			var chest2;
			var legR2;
			var legL2;
			var LlegL2;
			var LlegR2;
			var footR2;
			var footL2;

			var coords;
			var coords2;
			var renderer;
			var scene;
			var camera;
			var scene1;

			init();
			animate();
			//render();



			function init() {
			
				const canvas = document.querySelector('#c');

				renderer = new THREE.WebGLRenderer({ 
					canvas,
					alpha: true,
					antialias: true
				  });
				
				
				
				  const fov = 65;
				  const aspect = 2;  // the canvas default
				  const near = 0.1;
				  const far = 5;
				  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				  camera.position.z = -2;
				  camera.position.x = 0;
				  camera.position.y = 0;

				
			
				  
				
				scene1 = new THREE.Scene();
				scene = scene1;
				
			

				const spotLight = new THREE.SpotLight( 0xffffff );
				spotLight.angle = Math.PI/12;
				
				spotLight.intensity=1;
				scene1.add( new THREE.AmbientLight(0xffffff, 0.5));
				
				const spotLight1 = new THREE.SpotLight( 0xffffff );
				spotLight1.position.set(10,10,10);
				spotLight1.angle = Math.PI/2;
				spotLight1.position.set(0,10,30);
				spotLight1.intensity=1;

				scene1.add(spotLight1);
				
				const controls = new OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 2.5;
				controls.maxDistance = 10;
				controls.target.set( 0, 0, - 0.2 );
				controls.update();
				
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;

				
				modelMesh1 =  new THREE.Object3D();
				modelMesh2 = new THREE.Object3D();
			
				const loader = new GLTFLoader();
				loader.load( './models/scene.gltf', function ( gltf ) {

					gltf.scene.traverse( function ( object ) {

						if ( object.isMesh ) object.castShadow = true;

					} );
						
					modelMesh1 =  SkeletonUtils.clone(gltf.scene);
				
					modelMesh1.position.x =23;
					modelMesh1.position.y= -15;
					modelMesh1.position.z = 7;
					modelMesh1.scale.set(1.8,1.8,1.1)
			
					scene1.add( modelMesh1);
					scene1.scale.set(0.10,0.10,0.10)
					

					getPartiDelCorpo(modelMesh1);
				
					changeColor1(modelMesh1);
					
					
					

				} );

				const loader2 = new GLTFLoader();
				loader2.load( './models/scene.gltf', function ( gltf ) {

					gltf.scene.traverse( function ( object ) {

						if ( object.isMesh ) object.castShadow = true;

					} );
						
					modelMesh2 = SkeletonUtils.clone( gltf.scene);
					modelMesh2.position.x = -23;
					modelMesh2.position.y= -15;
					modelMesh2.position.z = 7;
					modelMesh2.scale.set(1.8,1.8,1.1)

					scene1.add( modelMesh2);
				
					
					scene1.scale.set(0.10,0.10,0.10)

					getPartiDelCorpo2(modelMesh2);

					changeColor2(modelMesh2);
					jumpingJack();
					run();
					
					
					

				} );

			
				

				window.addEventListener( 'resize', onWindowResize );

				function onWindowResize() {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
	
					renderer.setSize( window.innerWidth, window.innerHeight );

	
				}

		
		}

		function getPartiDelCorpo(model){
								
			model.traverse ( o => {
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
				
			} );
		}

		function getPartiDelCorpo2(model){
								
			model.traverse ( o => {
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
				
			} );
		}

		function changeColor1(model){
								
			model.traverse ( o => {
				if ( o.isMesh ){
					o.material.color.setHex(0xfff200);  

					if(o.name=="Object_7") o.material.color.setHex(0x0022ff);   //booty
					//if(o.name=="Object_8") o.material.color.setHex(0x0022ff);   //head
					//if(o.name=="Object_9") o.material.color.setHex(0x0022ff);   //neck
					if(o.name=="Object_10") o.material.color.setHex(0x0022ff);   //chest
					if(o.name=="Object_11") o.material.color.setHex(0x0022ff);   //spina
					if(o.name=="Object_12") o.material.color.setHex(0x0022ff);   //anca
					if(o.name=="Object_13") o.material.color.setHex(0x0022ff);   //gamba
					if(o.name=="Object_16") o.material.color.setHex(0x0022ff);   //foot
					if(o.name=="Object_17") o.material.color.setHex(0x0022ff);   //spalla
					if(o.name=="Object_18") o.material.color.setHex(0x0022ff);   //arm upper
					if(o.name=="Object_22") o.material.color.setHex(0x0022ff);   //spalla
					if(o.name=="Object_23") o.material.color.setHex(0x0022ff);   //upperarm
					if(o.name=="Object_27") o.material.color.setHex(0x0022ff);   //anca
					if(o.name=="Object_28") o.material.color.setHex(0x0022ff);   //lg upper
					if(o.name=="Object_31") o.material.color.setHex(0x0022ff);   //booty
					
				}

			});
		}

		function changeColor2(model){
								
			model.traverse ( o => {
				if ( o.isMesh ){
					o.material.color.setHex(0xff0095);

					if(o.name=="Object_7") o.material.color.setHex(0xff47b5);   //booty
					//if(o.name=="Object_8") o.material.color.setHex(0xff47b5);   //head
					//if(o.name=="Object_9") o.material.color.setHex(0xff47b5);   //neck
					if(o.name=="Object_10") o.material.color.setHex(0xff47b5);   //chest
					if(o.name=="Object_11") o.material.color.setHex(0xff47b5);   //spina
					if(o.name=="Object_12") o.material.color.setHex(0xff47b5);   //anca
					if(o.name=="Object_13") o.material.color.setHex(0xff47b5);   //gamba
					if(o.name=="Object_16") o.material.color.setHex(0xff47b5);   //foot
					if(o.name=="Object_17") o.material.color.setHex(0xff47b5);   //spalla
					if(o.name=="Object_18") o.material.color.setHex(0xff47b5);   //arm upper
					if(o.name=="Object_22") o.material.color.setHex(0xff47b5);   //spalla
					if(o.name=="Object_23") o.material.color.setHex(0xff47b5);   //upperarm
					if(o.name=="Object_27") o.material.color.setHex(0xff47b5);   //anca
					if(o.name=="Object_28") o.material.color.setHex(0xff47b5);   //lg upper
					if(o.name=="Object_31") o.material.color.setHex(0xff47b5);   //booty
					if(o.name=="Object_21") o.material.color.setHex(0xff47b5); //hand
					if(o.name=="Object_26") o.material.color.setHex(0xff47b5);
				}
			});
		}

	

		function jumpingJack(){
			coords2 = { r:-2.78, l: 2.78, j:0,
				rl:-3.04, ll:3.04, lx:-0.16,llx:-0.16,
				fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0 } // Start at (0, 0)

				
				tween0 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords'.
				.to({ r: -1.38, l: 1.38 ,j: 3,
					rl: -2.94, ll: 2.94,lx:-0.16,llx:-0.16,
					fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0}, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
				.onUpdate(function() { // Called after tween.js updates 'coords'.
					// Move 'box' to the position described by 'coords' with a CSS translation.
						armR.rotation.z= coords2.r;
						armL.rotation.z= coords2.l;
						root.position.y= coords2.j
						legR.rotation.z= coords2.rl;
						legL.rotation.z= coords2.ll;
						footR.rotation.z=coords2.fr;
						footL.rotation.z=coords2.fl;
						footR.rotation.x=coords2.fx;
						footL.rotation.x=coords2.fx;
						footR.rotation.y=coords2.fry;
						footL.rotation.y=coords2.fly;
						//console.log(coords2.x);
					})
				// Start the tween immediately.
			
			
				
				var tween2 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
				.to({ r: -0.38, l: 0.38 ,j: 0,
					rl: -2.84, ll: 2.84, lx:0.6,llx:1.0,
				fr:-0.3,fl:0.3,fx: -1.4,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
				.onUpdate(function() { // Called after tween.js updates 'coords2'.
					// Move 'box' to the position described by 'coords2' with a CSS translation.
						armR.rotation.z= coords2.r;
						armL.rotation.z= coords2.l;
						root.position.y= coords2.j
						legR.rotation.z= coords2.rl;
						legL.rotation.z= coords2.ll;
						legL.rotation.x= coords2.lx;
						legR.rotation.x= coords2.lx;
						LlegR.rotation.x=coords2.llx;
						LlegL.rotation.x=coords2.llx;
						footR.rotation.z=coords2.fr;
						footL.rotation.z=coords2.fl;
						footR.rotation.x=coords2.fx;
						footL.rotation.x=coords2.fx;
						footR.rotation.y=coords2.fry;
						footL.rotation.y=coords2.fly;
						//console.log(coords2.x);
					})
				

				
				var tween3 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
				.to({ r: -1.38, l: 1.38 ,j: 3, //arm and root
				rl: -2.94, ll: 2.94,lx:-0.16,llx:-0.16, //legs
				fr:-0.02,fl:0.02,fx: -0.4, fly:0.01,fry:0.01 }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
				.onUpdate(function() { // Called after tween.js updates 'coords2'.
					// Move 'box' to the position described by 'coords2' with a CSS translation.
						armR.rotation.z= coords2.r;
						armL.rotation.z= coords2.l;
						root.position.y= coords2.j
						legR.rotation.z= coords2.rl;
						legR.rotation.x= coords2.lx;
						legL.rotation.z= coords2.ll;
						legL.rotation.x= coords2.lx;
						LlegR.rotation.x=coords2.llx;
						LlegL.rotation.x=coords2.llx;
						footR.rotation.z=coords2.fr;
						footL.rotation.z=coords2.fl;
						footR.rotation.x=coords2.fx;
						footL.rotation.x=coords2.fx;
						footR.rotation.y=coords2.fry;
						footL.rotation.y=coords2.fly;
						//console.log(coords2.x);
					})
				

				
				var tween4 = new TWEEN.Tween(coords2) // Create a new tween that modifies 'coords2'.
				.to({ r:-2.78, l: 2.78, j:0,
					rl:-3.04, ll:3.04, lx:-0.16,llx:-0.16,
					fr:-0.1,fl:0.1,fx: -1,fly:0,fry:0 }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
				.onUpdate(function() { // Called after tween.js updates 'coords2'.
					// Move 'box' to the position described by 'coords2' with a CSS translation.
						armR.rotation.z= coords2.r;
						armL.rotation.z= coords2.l;
						root.position.y= coords2.j
						legR.rotation.z= coords2.rl;
						legL.rotation.z= coords2.ll;
						footR.rotation.x=coords2.fx;
						footL.rotation.x=coords2.fx;
						footR.rotation.z=coords2.fr;
						footL.rotation.z=coords2.fl;
						footR.rotation.x=coords2.fx;
						footL.rotation.x=coords2.fx;
						footR.rotation.y=coords2.fry;
						footL.rotation.y=coords2.fly;
						//console.log(coords2.x);
					})

				tween0.chain(tween2);
				tween2.chain(tween3);
				tween3.chain(tween4);
				tween4.chain(tween0);
				tween0.start();
				
			
		}
	
		function run(){
			
			coords = { r:-2.78, l: 2.78, j:0,hx:0,
				rl: -2.84, ll: 2.84, lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
				fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15} // Start at (0, 0)

				
				var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
				.to({r:-0.78, l: 2.78 ,j: 0, hx:0.5,
					rl: -2.84, ll: 2.84,  lx:-0.16,rx:-0.16,rlx:-0.16,llx:-0.16,
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15}, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15}, 400) // Move to (300, 200) in 1 second.
				.delay(500)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15  }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
				.delay(0)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
					fr:-0.3,fl:0.3,fx: -1.1,fly:-0.15,fry:0.15 }, 400) // Move to (300, 200) in 1 second.
				.delay(500)
				.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
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
			
			

		function animate(time) {
			//render();
			requestAnimationFrame(animate);
			TWEEN.update(time);
			var result = TWEEN.update(time)
			renderer.render( scene, camera );
		}

		function onPointerMove(event){
			event.preventDefault();
            var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                                    -( event.clientY / window.innerHeight ) * 2 + 1,  
                                    0.5 );     
			var raycaster =  new THREE.Raycaster();                                        
			raycaster.setFromCamera( mouse3D, camera );
            var intersects = raycaster.intersectObjects( scene.children);

            if ( intersects.length > 0 ) {
                intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
            }
			
		}

		
		
			



			//

