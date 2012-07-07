function Building(x, y, orientation){
	this.x = x;
	this.y = y;
	this.dim = [1.3,1.3];
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
        ctx.drawImage(this.img, this.sprites[this.orientation][0], this.sprites[this.orientation][1], 256, 256, this.x-128, this.y-128, 256, 256);
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
