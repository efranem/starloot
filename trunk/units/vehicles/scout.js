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
	this.sprites = [
		[128*1,128*1],
		[128*2,128*1],
		[128*3,128*1],
		[128*0,128*0],
		[128*1,128*0],
		[128*2,128*0],
		[128*3,128*0],
		[128*0,128*1],
	];
	this.sprite;
    this.isSelected = false;
    var selectedImg = new Image;
    selectedImg.src = 'sprites/ui/selector.png';    

	this.paint = function(ctx){
        if (this.isSelected == true){ // Paint selector graph
            ctx.drawImage(selectedImg, this.x, this.y+15);
			
        }
        
		var sprite = Math.round(this.angle / (45 * (Math.PI/180)));
		
		sprite = sprite % 8;
		this.sprite = sprite;
        
        ctx.drawImage(this.img,
			this.sprites[sprite][0],
			this.sprites[sprite][1],
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
			this.angle = (2 * Math.PI) - alpha;		
			var x = this.x + Math.cos(alpha)*2.0;
			var y = this.y + Math.sin(alpha)*2.0;
			if (!collision(x+64,y+64)){
				this.x = x;
				this.y = y;
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
        var coords = [this.x + (this.sizeX / 2) - camera.transformX, this.y + (this.sizeY / 2) - camera.transformY];
        return coords;
    }
	
	this.onclick = function(){
		this.isSelected = !this.isSelected;
		selector.clearSelection();
		this.updateSelect();
	};
}
