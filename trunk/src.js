document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var ctx,angle,angleCos,angleSin,halfWidth,halfHeight;
var pos = 0;
var scout = new Scout();
var building1 = new Building(500, 620, 0);
var building2 = new Building(250, 400, 2);
var building3 = new Building(100, 400, 1);
var building4 = new Building(800, 700, 3);
var wall1 = new Wall(353.5,201.5, 0);
var wall2 = new Wall(430,240, 0);
var wall3 = new Wall(430,283, 2);
var crater1 = new Crater(600,440);

function init(){
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	angle = 45*(Math.PI/180);
	angleCos = Math.cos(angle);
	angleSin = Math.sin(angle);
	halfWidth=canvas.width/2;
	halfHeight=canvas.height/2;
	
	camera.transformX = halfWidth;
	camera.transformY = halfHeight;
    
    board.addMovable(scout);
    board.addBuilding(building1);
    board.addBuilding(building2);
    board.addBuilding(building3);
    board.addBuilding(building4);
    board.addObstacle(wall1);
    board.addObstacle(wall2);
    board.addObstacle(wall3);
    board.addObstacle(crater1);
	
    // init event handlers
    keyboard.init();
    keyboard.addEventListener(Keys.UP_ARROW, pressedKey);
    keyboard.addEventListener(Keys.DOWN_ARROW, pressedKey);
    keyboard.addEventListener(Keys.LEFT_ARROW, pressedKey);
    keyboard.addEventListener(Keys.RIGHT_ARROW, pressedKey);
    keyboard.addEventListener(Keys.W, pressedKey);
    keyboard.addEventListener(Keys.S, pressedKey);
    keyboard.addEventListener(Keys.A, pressedKey);
    keyboard.addEventListener(Keys.D, pressedKey);
	//keyboard.addEventListener(Keys.Z, pressedKey); // Test addEvent
	//keyboard.removeEventListener(Keys.Z, gameLoop); // Test removeEvent no exist
	//keyboard.removeEventListener(Keys.Z, pressedKey); // Test removeEvent OK
	mouse.init();
    mouse.addEventListener(MouseEvents.CLICK, clickedTarget);
    mouse.addEventListener(MouseEvents.MOUSE_UP, clickedTarget2);
	//mouse.addEventListener(MouseEvents.MOUSE_DOWN, updateLogic); // Test addEvent
	//mouse.removeEventListener(MouseEvents.MOUSE_DOWN, clickedTarget2); // Test removeEvent no exist
	//mouse.removeEventListener(MouseEvents.WHEEL, updateLogic); // Test removeEvent no exist
	//mouse.removeEventListener(MouseEvents.MOUSE_DOWN, updateLogic); // Test removeEvent OK
    // loop game
	setInterval(gameLoop,16);
};

function gameLoop(){
    updateLogic();
    //physicsTick(); // Not physics at this moment
    renderFrame();
};

function updateLogic(){
	fps.updateFPS();
    // Update logic
    board.updateLogic();
};

// Mouse callbacks functions TEST
var clickedTarget = function(){
    console.log("Button clicked in mouse");
    scout.target = {x:mouse.x + camera.transformX,y:(mouse.y+camera.transformY)};
};

var clickedTarget2 = function(){
    console.log("Button released in mouse");
};

// Keyboard callback function TEST
var pressedKey = function(key){
    switch (key) {
    case 87: /* W */
    case 38: /* Up arrow was pressed */
        camera.transformY -= camera.CAMERA_SPEED;
        break;
    case 83: /* S */
    case 40: /* Down arrow was pressed */
        camera.transformY += camera.CAMERA_SPEED;
        break;
    case 65: /* A */   
    case 37: /* Left arrow was pressed */
        camera.transformX -= camera.CAMERA_SPEED;
        break;
    case 68: /* D */   
    case 39: /* Right arrow was pressed */
        camera.transformX += camera.CAMERA_SPEED;
        break;
    case 107: scout.rotate(0.18);break;
    case 109:scout.rotate(-0.18);break;
    }
};


