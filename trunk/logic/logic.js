function GameLogic(){
    
}; 

function logicTick(){
	fps.updateFPS();
	// Let's apply limits to movement
	camera.applyLimits();
    // Update logic
    board.updateLogic();
	// Update GUI logic
	selector.update();
};

gameLogic = new GameLogic;