document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var ctx;
var pos = 0;
var scout1 = new Scout(500, 50);
var scout2 = new Scout(800, 60);
var scout3 = new Scout(500, 230);
var scout4 = new Scout(800, 350);
var terrainProps = new Array;
terrainProps.push(new Building(0,500, 620, 0));
terrainProps.push(new Building(1,1200, 620, 0));
/*terrainProps.push(new Building(250, 400, 2));
terrainProps.push(new Building(100, 400, 1));
terrainProps.push(new Building(800, 700, 3));*/
terrainProps.push(new Wall(353.5,201.5, 0));
/*terrainProps.push(new Wall(430,240, 0));
terrainProps.push(new Wall(430,283, 2));*/
terrainProps.push(new Crater(600,440));

var distance = function(a, b){
  return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2));
}

var tree = new kdTree(terrainProps,distance,["x","y"]);

function init(){
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	 
	camera.transformX = 0;
	camera.transformY = 0;
    
    board.addMovable(scout1);
    board.addMovable(scout2);
	board.addMovable(scout3);
	board.addMovable(scout4);
    board.addTerrainProps(terrainProps);
	
    // init event handlers
    keyboard.init();
    keyboard.addEventListener(Keys.UP_ARROW, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.DOWN_ARROW, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.LEFT_ARROW, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.RIGHT_ARROW, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.W, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.S, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.A, board, 'onkeyboarddown');
    keyboard.addEventListener(Keys.D, board, 'onkeyboarddown');
	mouse.init();
    mouse.addEventListener(MouseEvents.CLICK, scout1, 'onclick', MouseButtons.LEFT);
    mouse.addEventListener(MouseEvents.CLICK, scout2, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.CLICK, scout3, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.CLICK, scout4, 'onclick', MouseButtons.LEFT);
    mouse.addEventListener(MouseEvents.CLICK, board, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.MOUSE_SLIDE, undefined, slideScreen);
	mouse.addEventListener(MouseEvents.MOUSE_SLIDE, undefined, mouseSelection);
	mouse.addEventListener(MouseEvents.MOUSE_UP, undefined, mouseEndSelection, MouseButtons.RIGHT);
	mouse.addEventListener(MouseEvents.MOUSE_DOWN, selector, 'clearSelection', MouseButtons.RIGHT);
    
    // loop game
	window.onEachFrame(Game.loop);
};

// Slide callback function TEST
var slideScreen = function(button, lx, ly, gx, gy){
	if (button == MouseButtons.LEFT){
		camera.transformX -= lx;
		camera.transformY -= ly;
	};
};

// Slide callback function TEST
var mouseSelection = function(button, lx, ly, gx, gy){
	if (button == MouseButtons.RIGHT){
		selector.setMouseSelection([mouse.originDown_x, mouse.originDown_y, gx, gy]);
	};
};

// Up callback function TEST
var mouseEndSelection = function(){
	selector.endMouseSelection();
};


