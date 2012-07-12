function GameLogic(){
    this.logicTime = 0;

    this.logicTick = function(){
        // Start timing
        var time1 = new Date().getTime();
        
        // Let's apply limits to movement
        camera.updateLogic();
        // Update logic
        board.updateLogic();
        // Update GUI logic
        selector.updateLogic();
        
        this.logicTime = new Date().getTime() - time1;
    };
    
}; 

logic = new GameLogic;