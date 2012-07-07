document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var ctx;
var pos = 0;
var scout1 = new Scout(100, 100);
var scout2 = new Scout(200, 200);
var terrainProps = new Array;
terrainProps.push(new Building(500, 620, 0));
terrainProps.push(new Building(250, 400, 2));
terrainProps.push(new Building(100, 400, 1));
terrainProps.push(new Building(800, 700, 3));
terrainProps.push(new Wall(353.5,201.5, 0));
terrainProps.push(new Wall(430,240, 0));
terrainProps.push(new Wall(430,283, 2));
terrainProps.push(new Crater(600,440));

var distance = function(a, b){
  return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2));
}

var tree = new kdTree(terrainProps,distance,["x","y"]);

function init(){
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	 
	camera.transformX = 0;
	camera.transformY = 0;
    
    board.addMovable(scout1);
    board.addMovable(scout2);
    board.addTerrainProps(terrainProps);
	
    // init event handlers
    keyboard.init();
    keyboard.addEventListener(Keys.UP_ARROW, undefined, pressedKey);
    keyboard.addEventListener(Keys.DOWN_ARROW, undefined, pressedKey);
    keyboard.addEventListener(Keys.LEFT_ARROW, undefined, pressedKey);
    keyboard.addEventListener(Keys.RIGHT_ARROW, undefined, pressedKey);
    keyboard.addEventListener(Keys.W, undefined, pressedKey);
    keyboard.addEventListener(Keys.S, undefined, pressedKey);
    keyboard.addEventListener(Keys.A, undefined, pressedKey);
    keyboard.addEventListener(Keys.D, undefined, pressedKey);
	mouse.init();
    mouse.addEventListener(MouseEvents.CLICK, scout1, 'select');
    mouse.addEventListener(MouseEvents.CLICK, scout2, 'select');
    mouse.addEventListener(MouseEvents.CLICK, undefined, clickedTarget);
	mouse.addEventListener(MouseEvents.MOUSE_SLIDE, undefined, slideScreen);
    // loop game
	setInterval(gameLoop,16);
};

function gameLoop(){
    logicTick();
    //physicsTick(); // Not physics at this moment
    renderFrame();
};

// Mouse callbacks functions TEST
var clickedTarget = function(){
    console.log("Button clicked in mouse");
    if (gameLogic.isSelected(scout1)){
        var coords = scout1.middle();
        if (Math.abs(coords[0] - mouse.x) > 50 || Math.abs(coords[1] - mouse.y) > 50)
            scout1.target = {x:mouse.x + camera.transformX,y:(mouse.y+camera.transformY)};
    }
    if (gameLogic.isSelected(scout2)){
        var coords = scout2.middle();
        if (Math.abs(coords[0] - mouse.x) > 50 || Math.abs(coords[1] - mouse.y) > 50)
            scout2.target = {x:mouse.x + camera.transformX,y:(mouse.y+camera.transformY)};
    }
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
    case 107: scout1.rotate(0.18);break;
    case 109:scout1.rotate(-0.18);break;
    }
};

// Slide callback function TEST
var slideScreen = function(button, x, y){
	if (button == MouseButtons.LEFT){
		camera.transformX -= x;
		camera.transformY -= y;
	};
};


