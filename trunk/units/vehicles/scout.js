/**
 x - Central x coord
 y - Central y coord
*/
function Scout(x, y){
	this.x = x;
	this.y = y;
    this.angle = 0 * Math.PI/180;
	this.v = 2;
	this.target = undefined;
	
	this.image = new Paintable	(x, y, 'sprites/units/recon_01.png', 
								{pX: 1024, pY: 512}, {numX: 8, numY: 4});
	
	this.isSelected = false;
	this.imageSelected = new Paintable (x, y + 15, 'sprites/ui/selector.png',
										{pX: 128, pY: 128}, {numX: 1, numY: 1});   

	this.touch = new Touchable (this.image.getChoosableArea());

	/*function collision(x,y){
		var collisions = tree.nearest({'x':x,'y':y},10,5000);
		if (collisions.length > 0){
			for(var key in collisions){
				
				var dimx = (collisions[key][0].dim[0]*128)/2;
				var dimy = (collisions[key][0].dim[1]*128)/2;
				var cx = collisions[key][0].x-dimx;
				var cy = collisions[key][0].y-dimy;
				var cdx = collisions[key][0].x + dimx;
				var cdy = collisions[key][0].y + dimy;
				if ((x >= cx && x <= cdx) && (y >= cy && y <= cdy)){
					return true;
				}
				
			}
		}
		return false;
	}*/
	
	this.update = function(){
		if (this.target != undefined && Math.abs(this.target.x - (this.x)) < 1.5 && Math.abs(this.target.y - (this.y)) < 1.5){
			this.target = undefined;
		}
		if (this.v!= 0 && this.target != undefined){
		
			var alpha = Math.atan2((this.target.y- (this.y)),(this.target.x - (this.x)));
			if (alpha < 0) alpha += 2 * Math.PI;
			else alpha %= 2 * Math.PI;
			//console.log("Alpha: "+(scout.angle/(Math.PI/180)).toFixed(2) +" degrees");
			var tempAngle = (2 * Math.PI) - alpha;		
            // First we turn to get correct direction and if we got the right direction we move
            if (Math.abs(tempAngle - this.angle) < 0.1){ // If the angle is correct we move
                this.angle = tempAngle;
                var x = this.x + Math.cos(alpha)*2.0;
                var y = this.y + Math.sin(alpha);//*2.0;
                /*if (!collision(x,y)){*/
                    this.x = x;
                    this.y = y;
                /*}*/
            } else { // We turn
                if (direction(this.angle, tempAngle) == AngleDirection.COUNTER){
                    this.angle -= 0.075;
                    if (this.angle < 0) this.angle += (2 * Math.PI);
                }
                else {
                    this.angle += 0.075;
                    this.angle %= (2 * Math.PI);
                }
            }
			// Update painting data
			var sprite = Math.round(this.angle / (11.25 * (Math.PI/180))) % 32;
			this.image.setCentralPoint({x: this.x, y: this.y});
			this.image.setCurrentFrame(sprite);
			this.imageSelected.setCentralPoint({x: this.x, y: this.y + 15});
			// Updating touching data
			this.touch.updateTouchableArea(this.image.getChoosableArea());
		}
	}
	
	this.rotate = function(angle){
		var newAngle = this.angle+angle;
		if (newAngle < 0){
			this.angle = 2*Math.PI + newAngle;
		}else{
			this.angle = newAngle % (2*Math.PI);
		}		
	}
    
    this.updateSelect = function(){
        if (this.isSelected){
			selector.removeSelection(this);
            selector.addSelection(this);
        }
        else
            selector.removeSelection(this);
    }
	
	/**
		Onclick callback event
	*/
	this.onclick = function(){
		this.isSelected = !this.isSelected;
		selector.clearSelection();
		this.updateSelect();
	};
	
	/**
		Paints the current scout on screen
	*/
	this.paint = function(ctx){
        if (this.isSelected == true){ // Paint selector graph
			this.imageSelected.paint(ctx);
        }
        
		this.image.paint(ctx);
	}
	
	/**
		Checks if current scout has been touched
	*/
	this.isTouched = function(point){
		return this.touch.hasTouchedIn(point);
	};
}
