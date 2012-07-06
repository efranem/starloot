function Scout(){
	this.x=230;
	this.y=100;
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
			this.x += Math.cos(alpha)*2.0;
			this.y += Math.sin(alpha)*2.0;
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
    
    this.select = function(){
        this.isSelected = !this.isSelected;
        if (this.isSelected)
            gameLogic.addSelection(this);
        else
            gameLogic.removeSelection(this);
    }
    
    this.middle = function(){
        var coords = [this.x + (this.sizeX / 2) - camera.transformX, this.y + (this.sizeY / 2) - camera.transformY];
        return coords;
    }
}
