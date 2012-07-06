document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var ctx,angle,angleCos,angleSin,halfWidth,halfHeight;
var pos = 0;
var scout = new Scout();
var terrainProps = new Array;
terrainProps.push(new Building(500, 620, 0));
terrainProps.push(new Building(250, 400, 2));
terrainProps.push(new Building(100, 400, 1));
terrainProps.push(new Building(800, 700, 3));
terrainProps.push(new Wall(353.5,201.5, 0));
terrainProps.push(new Wall(430,240, 0));
terrainProps.push(new Wall(430,283, 2));
terrainProps.push(new Crater(600,440));

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
    mouse.addEventListener(MouseEvents.CLICK, undefined, clickedTarget);
    mouse.addEventListener(MouseEvents.CLICK, scout, 'select');
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
    if (gameLogic.isSelected(scout)){
        var coords = scout.middle();
        if (Math.abs(coords[0] - mouse.x) > 10 || Math.abs(coords[1] - mouse.y) > 10)
            scout.target = {x:mouse.x + camera.transformX,y:(mouse.y+camera.transformY)};
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
    case 107: scout.rotate(0.18);break;
    case 109:scout.rotate(-0.18);break;
    }
};


