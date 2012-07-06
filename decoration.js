function Crater(x, y){
	this.x = x;
	this.y = y;
	this.dim = [2,2];
	this.img = new Image;
	this.img.src = 'sprites/decoration/crater_4x4.png';
	this.paint = function(ctx){
        ctx.drawImage(this.img, 0, 0, 512, 256, this.x, this.y, 512, 256);
		ctx.strokeStyle="red";
		ctx.strokeRect(this.x,this.y,512,256);
	};
	this.update = function(){
	};
};
