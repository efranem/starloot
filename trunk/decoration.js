function Crater(x, y){
	this.x = x;
	this.y = y;
	this.img = new Image;
	this.img.src = 'sprites/decoration/crater_2x2.png';
	this.paint = function(ctx){
        ctx.drawImage(this.img, 0, 0, 512, 256, this.x, this.y, 512, 256);
	};
	this.update = function(){
	};
};
