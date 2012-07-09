var BuildingTypes = {
    RECON_HQ : 0,
    ANTENNA : 1,
};

function Building(type, x, y, orientation){
	this.x = x*128;
	this.y = y*64;
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
		this.size = [256,256];
		this.center = [128,128];
		this.dim = [1.3,1.3];
        this.sizeX = 256;
        this.sizeY = 256;
	    break;
	case BuildingTypes.ANTENNA:
		this.img.src = 'sprites/buildings/antenna_01.png';
		this.sprites = [[0,0],[0,0],[0,0],[0,0]];
		this.size = [512,512];
		this.center = [111,475];
		this.dim = [0.9,0.45];
        this.sizeX = 512;
        this.sizeY = 512;
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
        ctx.drawImage(this.img, this.sprites[this.orientation][0], this.sprites[this.orientation][1], this.size[0], this.size[1], this.x-this.center[0], this.y-this.center[1], this.size[0], this.size[1]);
		ctx.strokeStyle="red";
		var cdx = (this.dim[0]*128)/2;
		var cdy = (this.dim[1]*128)/2;
		ctx.strokeRect(this.x-cdx,this.y-cdy,cdx*2,cdy*2);
		ctx.fillStyle="#FF0000";
		ctx.beginPath();
		ctx.arc(this.x,this.y,1.5,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	};
	
	this.update = function(){
	};
};