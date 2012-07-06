function GameLogic(){
    this.selection = []
    
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
}; 

function logicTick(){
	fps.updateFPS();
    // Update logic
    board.updateLogic();
};

gameLogic = new GameLogic;