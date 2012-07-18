/**
 x - Central x coord
 y - Central y coord
 name - Element name
*/
function Scout(x, y, name){
	this.x = x;
	this.y = y;
	this.name = name;
    this.angle = 0 * Math.PI/180;
	this.v = 2;
	this.target = undefined;
	this.path = new Array;
	
    this.sprite = 0;
	this.image = new Paintable	(x, y -30, 'recon_01', //'sprites/units/recon_01.png', 
								{pX: 1024, pY: 512}, {numX: 8, numY: 4});
	
	this.isSelected = false;
	this.imageSelected = new Paintable (x, y, 'selector',
										{pX: 128, pY: 128}, {numX: 1, numY: 1});   

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
		if (this.path != undefined && this.path.length > 0 && this.target == undefined) {
			this.target = this.path.splice(0,1)[0];
		}
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
                var y = this.y + Math.sin(alpha)*2.0;
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
			this.image.setCentralPoint({x: this.x, y: this.y-30});
			this.image.setCurrentFrame(sprite);
			this.imageSelected.setCentralPoint({x: this.x, y: this.y});
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
		onMouseEvent callback event
	*/
	this.onclick = function(evt){
		var point = camera.localPosition({x: evt.x, y: evt.y});
		if (this.isTouched(point)){			
            this.isSelected = !this.isSelected;
            if (keyboard.isDown( Keys.CTRL ) == false){
                selector.clearSelection();
            }
            this.updateSelect();
            return true;
        }
        else if (this.isSelected){
            if (Math.abs(this.x - evt.x) > 50 || Math.abs(this.y - evt.y) > 50){
                var point = camera.localPosition({x: evt.x, y: evt.y});
                //this.target = selector.targetPoint(this.x, this.y, point.x, point.y);
				this.path = findPath([this.x,this.y],[point.x,point.y],terrainProps,40);
				this.target = undefined;
                return false; // Not capturing as another element may have a new target as well
            }
        }
        return false;
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
		return this.image.isPaintedPixel(point);
	};
}
