var BuildingTypes = {
    RECON_HQ : 0,
    ANTENNA : 1,
};

function Building(type, x, y, orientation){
	this.x = x;
	this.y = y;
    this.sizeX = 256;
    this.sizeY = 256;
	this.dim = [1.3,1.3];
    this.orientation = orientation;
	this.img = new Image;
	switch (type) {
	case BuildingTypes.RECON_HQ:
		this.img.src = 'sprites/buildings/recon_hq_01.png';	
		this.sprites = [
			[256*0,256*0],
			[256*0,256*1],
			[256*1,256*0],
			[256*1,256*1],
		];
		this.size_x = 256;
		this.size_y = 256;
	    break;
	case BuildingTypes.ANTENNA:
		this.img.src = 'sprites/buildings/antenna_01.png';
		this.sprites = [[0,0],[0,0],[0,0],[0,0]];
		this.size_x = 512;
		this.size_y = 512;
		break;
	default:
		break;
	}
    
    this.middle = function(){
        return {x: this.x + (this.sizeX / 2),
                y: this.y + (this.sizeY / 2)
                };
    }
		
	this.paint = function(ctx){
        ctx.drawImage(this.img, this.sprites[this.orientation][0], this.sprites[this.orientation][1], this.size_x, this.size_y, this.x-this.size_x/2, this.y-this.size_y/2, this.size_x, this.size_y);
		ctx.strokeStyle="red";
		var cdx = (this.dim[0]*128)/2;
		var cdy = (this.dim[1]*128)/2;
		ctx.strokeRect(this.x-cdx,this.y-cdy,cdx*2,cdy*2);
		ctx.fillStyle="#FF0000";
		ctx.beginPath();
		ctx.arc(this.x,this.y,15,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	};
	
	this.update = function(){
	};
};