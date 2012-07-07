function GameLogic(){
    this.selection = new Array;
	this.squareSelection = new Array;
    
    this.addSelection = function(obj){
        this.selection.push(obj);
        obj.isSelected = true;
    };
    
    this.removeSelection = function(obj){
        var idx = this.selection.indexOf(obj);
		if (idx != -1){
            this.selection[ idx ].isSelected = false;
            this.selection.splice(idx, 1);
        }
    };
    
    this.clearSelection = function(){
        for (var idx in this.selection){
            this.selection[ idx ].isSelected = false;
        };
        this.selection = [];
    };
    
    this.isSelected = function(obj){
        for (var idx in this.selection){
            if (this.selection[ idx ] == obj)   
                return true;
        };
        return false;
    };
	
	this.setMouseSelection = function(a){
		this.squareSelection = a;
	};
	
	this.paint = function(ctx){
		if (this.squareSelection.length == 4){
			ctx.strokeStyle="blue";
			ctx.strokeRect(this.squareSelection[0]+camera.transformX,this.squareSelection[1]+camera.transformY,this.squareSelection[2],this.squareSelection[3]);
		}
	};
}; 

function logicTick(){
	fps.updateFPS();
	// Let's apply limits to movement
	camera.applyLimits();
    // Update logic
    board.updateLogic();
};

gameLogic = new GameLogic;