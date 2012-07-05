document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var ctx,angle,angleCos,angleSin,halfWidth,halfHeight;
var pos = 0;
var scout = new Scout();
var building1 = new Building(500, 520, 0);
var building2 = new Building(250, 400, 2);
var building3 = new Building(100, 400, 1);
var building4 = new Building(800, 600, 3);
var wall1 = new Wall(353.5,201.5, 0);
var wall2 = new Wall(430,240, 0);
var wall3 = new Wall(430,283, 2);

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
	
    // init event handlers
    window.onkeydown = function(evt){keyboard.keyDown(evt);};
	window.onkeyup = function(evt){keyboard.keyUp(evt);};
    mouse.init();
    mouse.UpAbles.push(clickedTarget);
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
	keyboard.treatKeys();
    
    // Update logic
    board.updateLogic();
};

// Funci�n de loopback de prueba para eventos del rat�n
var clickedTarget = function(){
    scout.target = {x:mouse.x + camera.transformX,y:(mouse.y+camera.transformY)};
};


