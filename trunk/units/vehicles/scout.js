function Scout(x,y){
	this.x=x;
	this.y=y;
    this.sizeX = 128;
    this.sizeY = 128;
	this.angle = 0 * Math.PI/180;
	this.v = 2;
	this.target = undefined;
	this.img = new Image;
	this.img.src = 'sprites/units/recon_01.png';
    this.isSelected = false;
    var selectedImg = new Image;
    selectedImg.src = 'sprites/ui/selector.png';    

	this.paint = function(ctx){
        if (this.isSelected == true){ // Paint selector graph
            ctx.drawImage(selectedImg, this.x, this.y+15);
			
        }
        
		var sprite = Math.round(this.angle / (11.25 * (Math.PI/180))) % 32;
        ctx.drawImage(this.img,
   			(sprite%8)*128,
   			Math.floor(sprite/8)*128,
			128,
			128,
			this.x,
			this.y,
			128,
			128);
		
	}
	
	function collision(x,y){
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
	}
	
	this.update = function(){
		if (this.target != undefined && Math.abs(this.target.x - (this.x + 64)) < 1.5 && Math.abs(this.target.y - (this.y + 64)) < 1.5){
			this.target = undefined;
		}
		if (this.v!= 0 && this.target != undefined){
		
			var alpha = Math.atan2((this.target.y- (this.y + 64)),(this.target.x - (this.x + 64)));
			if (alpha < 0) alpha += 2 * Math.PI;
			else alpha %= 2 * Math.PI;
			//console.log("Alpha: "+(scout.angle/(Math.PI/180)).toFixed(2) +" degrees");
			var tempAngle = (2 * Math.PI) - alpha;		
            // First we turn to get correct direction and if we got the right direction we move
            if (Math.abs(tempAngle - this.angle) < 0.1){ // If the angle is correct we move
                this.angle = tempAngle;
                var x = this.x + Math.cos(alpha)*2.0;
                var y = this.y + Math.sin(alpha)*2.0;
                if (!collision(x+64,y+64)){
                    this.x = x;
                    this.y = y;
                }
            } else { // We turn
                if (direction(this.angle, tempAngle) == AngleDirection.COUNTER){
                    this.angle -= 0.075;
                    if (this.angle < 0) this.angle += (2 * Math.PI);
                }
                else {
                    this.angle += 0.075;
                    this.angle %= (2 * Math.PI);
                }
                    
                /*var dif = Math.abs(tempAngle - this.angle);
                if (dif > Math.PI){ // If it's bigger than 180� we move uncounterwise
                    this.angle -= 0.05;
                    if (this.angle < 0) this.angle += (2 * Math.PI);
                }
                else { // we turn conterclockwise
                    this.angle += 0.05;
                    if (this.angle > (2 * Math.PI)) this.angle %= (2 * Math.PI);
                }*/
            }
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
    
    this.middle = function(){
        return {x: this.x + (this.sizeX / 2),
                y: this.y + (this.sizeY / 2)
                };
    }
	
	this.onclick = function(){
		this.isSelected = !this.isSelected;
		selector.clearSelection();
		this.updateSelect();
	};
}
