function Selector(){
	this.selection = new Array;
	this.squareSelection = new Array;
	this.avgX = 0; // Average point of everyone to get tagret point
	this.avgY = 0;
	
	this.targetPoint = function(xOrig,yOrig,xTarg,yTarg){
		return {x: Math.floor(xTarg - this.avgX + xOrig), y: Math.floor(yTarg - this.avgY + yOrig)};
	};
	
	this.refreshAveragePoint = function(){
		var sumX = 0;
		var sumY = 0;
		for (var obj in this.selection){
			sumX += this.selection[ obj ].x;
			sumY += this.selection[ obj ].y;
		};
		this.avgX = Math.floor(sumX / this.selection.length);
		this.avgY = Math.floor(sumY / this.selection.length);
		//console.log("Avg point: " + this.avgX + "," + this.avgY);
	};
    
    this.addSelection = function(obj){
		this.selection.push(obj);
        obj.isSelected = true;

		this.refreshAveragePoint();
    };
    
    this.removeSelection = function(obj){
        var idx = this.selection.indexOf(obj);
		if (idx != -1){
            this.selection[ idx ].isSelected = false;
            this.selection.splice(idx, 1);
        }
		this.refreshAveragePoint();
    };
    
    this.clearSelection = function(){
        for (var idx in this.selection){
            this.selection[ idx ].isSelected = false;
        };
        this.selection = [];
		this.avgX = 0; 
		this.avgY = 0;
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
		// Lets see ogirin from selection (different starting points)
		if (a[2] < 0){
			a[0] += a[2];
			a[2] = -a[2];
		};
		if (a[3] < 0){
			a[1] += a[3];
			a[3] = -a[3];
		};
		// Select objects under selection
		for (var obj in board.movable){
			var object = board.movable[ obj ];
			var P1 = [object.x, object.x + object.sizeX, object.y, object.y + object.sizeY];
			var P2 = [a[0], a[0] + a[2], a[1], a[1] + a[3]];
			//console.log("P1: " + P1);
			//console.log("P2: " + P2);
			if ( overlap(P1,P2)){
				object.isSelected = true;
				object.updateSelect();
			}
			else{
				object.isSelected = false;
				object.updateSelect();
			};
		};
	};
	
	this.endMouseSelection = function(){
		this.squareSelection = [];
	};
	
	this.update = function(){
		if (this.selection.length > 0){
			this.refreshAveragePoint(); // Refresh avg point of current selection
		}
	};
	
	this.paint = function(ctx){
		if (this.squareSelection.length == 4){
            ctx.strokeStyle="blue";
            var point = camera.localPosition({x: this.squareSelection[0], y: this.squareSelection[1]});
			ctx.strokeRect(point.x , point.y, this.squareSelection[2], this.squareSelection[3]);
		}
	};
};

selector = new Selector();

