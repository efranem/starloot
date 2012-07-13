document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var menuCanvas = document.getElementById("mapCanvas");
menuCanvas.width=128;
menuCanvas.height=128;
var ctx;
var menuCtx;
var pos = 0;
var scout1 = new Scout(500, 50);
var scout2 = new Scout(800, 60);
var scout3 = new Scout(500, 230);
var scout4 = new Scout(800, 350);
var terrainProps = new Array;
terrainProps.push(new Building(BuildingTypes.RECON_HQ,6, 8, 0));
terrainProps.push(new Building(BuildingTypes.ANTENNA,9, 8, 0));
terrainProps.push(new Building(BuildingTypes.CRATER,3, 8, 0));
terrainProps.push(new Building(BuildingTypes.WALL,3,3,0));
var root = new Group("world");

var stats;

var distance = function(a, b){
  return Math.sqrt(Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2));
}

var tree = new kdTree(terrainProps,distance,["x","y"]);

function init(){
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	menuCtx = menuCanvas.getContext("2d");
	
	camera.transformX = 0;
	camera.transformY = 0;
	
	// scrollbars deletion
	document.documentElement.style.overflow='hidden';
	document.body.scroll="no";
    
    board.addMovable(scout1);
    board.addMovable(scout2);
	board.addMovable(scout3);
	board.addMovable(scout4);
    board.addTerrainProps(terrainProps);
	
    // init event handlers
    keyboard.init();
    /*keyboard.addEventListener(Keys.UP_ARROW, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.DOWN_ARROW, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.LEFT_ARROW, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.RIGHT_ARROW, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.W, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.S, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.A, camera, 'onkeyboarddown');
    keyboard.addEventListener(Keys.D, camera, 'onkeyboarddown');*/
	mouse.init();
    /*mouse.addEventListener(MouseEvents.CLICK, scout1, 'onclick', MouseButtons.LEFT);
    mouse.addEventListener(MouseEvents.CLICK, scout2, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.CLICK, scout3, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.CLICK, scout4, 'onclick', MouseButtons.LEFT);
    mouse.addEventListener(MouseEvents.CLICK, board, 'onclick', MouseButtons.LEFT);
	mouse.addEventListener(MouseEvents.MOUSE_SLIDE, undefined, slideScreen);
	mouse.addEventListener(MouseEvents.MOUSE_SLIDE, undefined, mouseSelection);
	mouse.addEventListener(MouseEvents.MOUSE_UP, undefined, mouseEndSelection, MouseButtons.RIGHT);
	mouse.addEventListener(MouseEvents.MOUSE_DOWN, selector, 'clearSelection', MouseButtons.RIGHT);*/
	
	// init main groups
	root.addNode(camera);
    root.addGroup("board").addNode(board);
    root.getGroup("board").addGroup("buildings")
                        .addNode(terrainProps[0])
                        .addNode(terrainProps[1])
                        .addNode(terrainProps[2])
                        .addNode(terrainProps[3]);
    root.getGroup("board").addGroup("scouts")
					.addNode(scout1)
					.addNode(scout2)
					.addNode(scout3)
					.addNode(scout4);
    
    // Stats windows
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.bottom = '0px';
    document.body.appendChild(stats.domElement);
    
    // loop game
	window.onEachFrame(Game.loop);
	var nodes = gatherNodes(terrainProps);
	paintGraph(ctx,nodes);
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
        var point = camera.localPosition({x: mouse.originDown_x, y: mouse.originDown_y});
		selector.setMouseSelection({x: point.x, y: point.y, gx: gx, gy: gy});
	};
};

// Up callback function TEST
var mouseEndSelection = function(){
	selector.endMouseSelection();
};


