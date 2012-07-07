function Crater(x, y){
	this.x = x;
	this.y = y;
	this.dim = [4,2];
	this.img = new Image;
	this.img.src = 'sprites/decoration/crater_4x4.png';
	this.paint = function(ctx){
        ctx.drawImage(this.img, 0, 0, 512, 256, this.x, this.y, 512, 256);
		ctx.strokeStyle="red";
		var cdx = (this.dim[0]*128);
		var cdy = (this.dim[1]*128);
		ctx.strokeRect(this.x,this.y,cdx,cdy);
	};
	this.update = function(){
	};
};
