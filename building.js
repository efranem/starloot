function Building(x, y, orientation){
	this.x = x;
	this.y = y;
	this.dim = [2,2];
    this.orientation = orientation;
	this.img = new Image;
	this.img.src = 'sprites/buildings/recon_hq_01.png';
    this.sprites = [
		[256*0,256*0],
		[256*0,256*1],
		[256*1,256*0],
		[256*1,256*1],
	];
		
	this.paint = function(ctx){
        ctx.drawImage(this.img, this.sprites[this.orientation][0], this.sprites[this.orientation][1], 256, 256, this.x, this.y, 256, 256);
		ctx.strokeStyle="red";
		ctx.strokeRect(this.x,this.y,256,256);
	};
	
	this.update = function(){
	};
};
