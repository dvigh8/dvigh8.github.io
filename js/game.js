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
    scene.clearColor = new BABYLON.Color3(.504,.768,.952); 

    // Create the camera
    camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0,1.7,0), scene);
    camera.setTarget(new BABYLON.Vector3(0,0,10));
    camera.attachControl(canvas);
    
    var floor = createFloor(scene);
    var grassMaterial = new BABYLON.StandardMaterial("bawl", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture("textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;
    floor.material = grassMaterial;

    // Create light
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(10,10,0), scene);
   
    engine.runRenderLoop(function () {
        scene.render();
    })
}
function initGame(){

    
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 10, 0.07366, scene);
    sphere.position.y= 1.7;
    
    var animationBox = new BABYLON.Animation("myAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    // An array with all animation keys
    var keys = [];  
 
   //At the animation key 0, the value of scaling is "1"
    keys.push({
        frame: 0,
        value: 18.4404
    });
 
    //At the animation key 20, the value of scaling is "0.2"
    keys.push({
        frame: 20,
        value: -5
    });
    keys.push({
        frame: 30,
        value: 1
    });
    keys.push({
        frame: 100,
        value: 1
    });
 
    //At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 180,
        value: 18.4404
    });
    animationBox.setKeys(keys);

    sphere.animations.push(animationBox);
    scene.beginAnimation(sphere, 0, 180, true);
    var material = new BABYLON.StandardMaterial("material01", scene);

    sphere.material = material;

    material.diffuseTexture = new BABYLON.Texture("baseball.png", scene);
    
    console.log("animated")
}        
function createFloor(scene) {
  var floor = BABYLON.Mesh.CreateGround("floor", 100, 100, 1, scene, false);
  return floor;
}
