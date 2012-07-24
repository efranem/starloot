document.body.onload = function(){
	init();	
}

var canvas = document.getElementById("canvas");
var menuCanvas = document.getElementById("mapCanvas");
menuCanvas.width=128;
menuCanvas.height=128;
var ctx;
var menuCtx;
var guiCtx;
var pos = 0;
var scout1 = new Scout(500, 50, 'scout1');
var scout2 = new Scout(800, 60, 'scout2');
var scout3 = new Scout(500, 230, 'scout3');
var scout4 = new Scout(800, 350, 'scout4');
var terrainProps = new Array;

terrainProps.push(new Building(BuildingTypes.RECON_HQ,6, 8, 'reconbuild1', 0));
terrainProps.push(new Building(BuildingTypes.ANTENNA,9, 8, 'antenna1', 0));
terrainProps.push(new Building(BuildingTypes.CRATER,3, 8, 'crater1', 0));
terrainProps.push(new Building(BuildingTypes.WALL,3,3, 'wall1', 0));
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
	//guiCtx = guiCanvas.getContext("2d");
	
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
	//board.addMovable(animTest);
	
    // init event handlers
	eventManager.init();

	// init main groups
	root.addNode(camera);
	root.addGroup("selector").addNode(selector);
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
	
	gui.initEvents(root.addGroup("guiEvents"));
	
    // Stats windows
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.bottom = '0px';
    document.body.appendChild(stats.domElement);
    
    // loop game
	window.onEachFrame(Game.loop);
	//createGraph(terrainProps,50,[50,50],[1300,700]);
	//var time_a = (new Date).getTime();
	//findPath([50,50],[1300,700],terrainProps,50);
	//var time_b = (new Date).getTime();
	//console.log("Path found in " + (time_b - time_a) + " ms.");
};


