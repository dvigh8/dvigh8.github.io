// Global variables
var canvas, engine, scene, camera, score = 0;
var TOAD_MODEL;

// An array to store each ending of the lane
var ENDINGS = [];

/**
* Load the scene when the canvas is fully loaded
*/
document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        initScene();
        initGame();
        console.log("initiated");
    }
}, false);

/**
 * Creates a new BABYLON Engine and initialize the scene
 */
function initScene() {
    // Get canvas
    canvas = document.getElementById("renderCanvas");

    // Create babylon engine
    engine = new BABYLON.Engine(canvas, true);

    // Create scene
    scene = new BABYLON.Scene(engine);

    // Create the camera
    camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,1.7,0), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,10));
    camera.attachControl(canvas);
    
    var floor = createFloor(scene);
    //var grass = new BABYLON.StandardMaterial("grass", scene);
    //var grasTexture = new BABYLON.GrassProceduralTexture("grass", 512, scene);

    // Create light
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(100,101,0), scene);
   
    engine.runRenderLoop(function () {
        scene.render();
    })
}
function initGame(){

    
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 10, 1, scene);
    sphere.position.y= 1.7;
    
    var animationBox = new BABYLON.Animation("myAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    // An array with all animation keys
    var keys = [];  
 
   //At the animation key 0, the value of scaling is "1"
    keys.push({
        frame: 0,
        value: 200
    });
 
    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 20,
        value: -20
    });
 
    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 100,
        value: 200
    });
    animationBox.setKeys(keys);

    sphere.animations.push(animationBox);
    scene.beginAnimation(sphere, 0, 100, true);
    console.log("animated")
}        
function createFloor(scene) {
  var floor = BABYLON.Mesh.CreateGround("floor", 100, 100, 1, scene, false);
  return floor;
}
